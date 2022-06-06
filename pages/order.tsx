import { getSession } from "next-auth/react";
import Head from "next/head";
import Image from "next/image";
import { useEffect, useState } from "react";
import { prisma } from "../lib/prisma";
import Header from "../src/components/Header/Header";

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
      product: {
        include: {
          Customer: true,
        },
      },
    },
    where: {
      email: session?.user?.email!,
    },
  });
  return {
    props: { data },
  };
}
export default function Order({ data }: any) {
  const [datas, setDatas] = useState(data);
  const returnImageUrl = (imageUrl: string | null): string => {
    if (imageUrl === null) {
      return "/placeholder.png";
    } else {
      return imageUrl as string;
    }
  };
  const handleSend = async (data: any) => {
    const orderID = data.orderID;
    let status = "";
    let newDatas = [...datas];
    newDatas.find((e) => {
      if (e.orderID === orderID) {
        e.status = "Recieved";
        status = "Recieved";
        console.log(e.status);
      }
    });
    setDatas(newDatas); //updateLocal
    console.log(datas);
    try {
      await fetch("http://localhost:3000/api/product/updateToOrder", {
        body: JSON.stringify({ orderID, status }),
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
      });
      console.log(datas);
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

  return (
    <>
      <Head>
        <title>Order | Emart</title>
        <link rel="icon" href="/iconlogo.svg" />
      </Head>
      <Header />
      <div className="pt-28 pb-10">
        {datas.length !== 0 ? (
          <>
            <p className="text-center text-3xl font-semibold mb-10 text-custom-darkBlue">My Order</p>
            <div className="mx-10 w-1/2 flex flex-col gap-y-5">
              {datas.map((item: any, i: any) => {
                return (
                  <div className="border-[1px] shadow p-5 rounded-md" key={i}>
                    <p className="ml-1">
                      Order ID: <span className="font-bold">{item.orderID}</span>
                    </p>
                    <div className="mt-4 flex gap-x-4 relative">
                      <div>
                        <Image src={returnImageUrl(item.product.imageUrl)} width={180} height={180} alt={item.product.name} />
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
                        <p>Seller: {item.product.Customer.name}</p>
                        <p className={`${itemStatusColor(item.status)} font-medium`}>Status: {item.status}</p>
                        <div className="flex items-center mt-auto">
                          <p className="font-bold text-lg ">
                            Total: Rp{" "}
                            {(parseInt(item.product.cost) * parseInt(item.quantity)).toLocaleString("en-US", {
                              maximumFractionDigits: 2,
                            })}
                          </p>
                          {item.status === "Sent" && (
                            <button className="flex bg-green-400 justify-center hover:bg-green-500 font-semibold transition text-white py-2 px-5 rounded-md absolute right-7 bottom-0" onClick={() => handleSend(data[i])}>
                              Recieved
                            </button>
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
          <div className="w-[99.1vw] space-y-2 text-custom-darkBlue -mt-10 h-[85vh] flex flex-col items-center justify-center">
            <Image src={"/motorbike.svg"} width={250} height={250} alt="motorbike" />
            <p className="text-2xl font-semibold">You Havent ordered anything!</p>
            <p className="text-xl font-semibold">Start Shopping Right Now</p>
          </div>
        )}
      </div>
    </>
  );
}
