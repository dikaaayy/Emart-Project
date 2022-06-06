import { getSession } from "next-auth/react";
import Head from "next/head";
import Image from "next/image";
import { useEffect, useState } from "react";
import { prisma } from "../../lib/prisma";
import Header from "../../src/components/Header/Header";

export async function getServerSideProps(context: any) {
  const session = await getSession(context);
  if (!session) {
    return {
      redirect: {
        permanent: false,
        destination: "/",
      },
    };
  }
  const data = await prisma.orders.findMany({
    select: {
      orderID: true,
      quantity: true,
      status: true,
      Customer: true,
      product: {
        include: {
          Customer: true,
        },
      },
    },
    where: {
      product: {
        email: session!.user!.email!,
      },
    },
  });
  return {
    props: { data },
  };
}
export default function Order({ data }: any) {
  useEffect(() => {
    setDatas(data);
  }, [data, data.status]);

  const returnImageUrl = (imageUrl: string | null): string => {
    if (imageUrl === null) {
      return "/placeholder.png";
    } else {
      return imageUrl as string;
    }
  };
  // console.log("Hello");
  // console.log(data);
  const [datas, setDatas] = useState(data);
  const handleSend = async (data: any) => {
    const orderID = data.orderID;
    let status = " ";
    let newDatas = [...datas];
    newDatas.find((e) => {
      if (e.orderID === data.orderID) {
        e.status = "Sent";
        status = "Sent"; // update for db
      }
    });
    setDatas(newDatas); //update local
    const newData = { ...data, status: "Sent" };
    try {
      await fetch("http://localhost:3000/api/product/updateToOrder", {
        body: JSON.stringify({ orderID, status }),
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
      });
      // console.log(newData);
    } catch (e) {
      console.log(e);
    }
  };

  const itemStatusColor = (status: string) => {
    if (status === "Sent") {
      return "text-custom-lightOrange";
    }
    if (status === "ordered") {
      return "text-yellow-500";
    }
    if (status === "Recieved") {
      return "text-green-400";
    }
  };

  const itemStatus = (status:string) =>{
    if (status === "Sent") {
      return "Sent";
    }
    if (status === "ordered") {
      return "Waiting to be sent";
    }
    if (status === "Recieved") {
      return "Recieved";
    }
  }

  return (
    <>
      <Head>
        <title>My Store Order | Emart</title>
        <link rel="icon" href="/iconlogo.svg" />
      </Head>
      <Header />
      <div className="pt-28 pb-10">
        {datas.length !== 0 ? (
          <>
            <p className="text-center text-3xl font-semibold mb-10 text-custom-darkBlue">My Store Order</p>
            <div className="mx-10 w-1/2 flex flex-col gap-y-5">
              {datas.map((item: any, i: any) => {
                return (
                  <div className="border-[1px] shadow p-5 rounded-md" key={i}>
                    <p className="ml-1">
                      Order ID: <span className="font-bold">{item.orderID}</span>
                    </p>
                    <div className="mt-4 flex gap-x-4 relative">
                      <div>
                        <Image src={returnImageUrl(item.product.imageUrl)} width={190} height={190} alt={item.product.name} />
                      </div>
                      <div className="flex flex-col justify-start">
                        <p className="text-lg">{item.product.name}</p>
                        <p className="font-semibold">
                          Rp{" "}
                          {parseInt(item.product.cost).toLocaleString("en-US", {
                            maximumFractionDigits: 2,
                          })}
                        </p>
                        <p>Qty: {item.quantity}</p>
                        <p>Buyer: {item.Customer.name}</p>
                        <p className={`${itemStatusColor(item.status)} font-medium`}>Status: {itemStatus(item.status)}</p>
                        <div className="flex items-center mt-auto">
                          <p className="font-bold text-lg ">
                            Total: Rp{" "}
                            {(parseInt(item.product.cost) * parseInt(item.quantity)).toLocaleString("en-US", {
                              maximumFractionDigits: 2,
                            })}
                          </p>
                          {item.status === "ordered" && (
                            <>
                              <button className="flex bg-custom-lightOrange justify-center hover:bg-[#db9017] font-semibold transition text-white py-2 px-9 rounded-md absolute right-7 bottom-0" onClick={() => handleSend(data[i])}>
                                Send
                              </button>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </>
        ) : (
          <NoOrder />
        )}
      </div>
    </>
  );
}

const NoOrder = () => {
  return (
    <div className="w-[99.1vw] space-y-2 text-custom-darkBlue -mt-10 h-[85vh] flex flex-col items-center justify-center">
      <Image src={"/motorbike.svg"} width={250} height={250} alt="motorbike" />
      <p className="text-2xl font-semibold">Congratulations, All Order is Done!</p>
      <p className="text-xl font-semibold">In the Meantime,Why not Shop yourself Away?</p>
    </div>
  );
};
