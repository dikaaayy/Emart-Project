import Head from "next/head";
import Header from "../src/components/Header/Header";
import { useEffect, useState } from "react";
import { getSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/router";
import { prisma } from "../lib/prisma";
import CartModal from "../src/components/cart/CartModal";

export async function getServerSideProps(context: any) {
  const session = await getSession(context);
  const data = await prisma.cart.findMany({
    where: {
      email: session?.user?.email!,
    },
    include: {
      product: true,
    },
  });
  return {
    props: { data },
  };
}

export default function Cart({ data }: any) {
  const router = useRouter();
  const [cart, setCart] = useState<any>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [availablity, setAvailablity] = useState(true);
  const [outStock, setOutStock] = useState<any>([]);

  useEffect(() => {
    setIsLoading(true);
    setCart(data);
    setIsLoading(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cart]);

  const deleteInDB = async (id: any) => {
    const newCart = cart.filter(function (item: any) {
      return item.cartID !== id;
    });
    setCart(newCart);
    try {
      fetch("http://localhost:3000/api/product/deleteUserCart", {
        body: JSON.stringify({ id }),
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
      });
    } catch (e) {
      console.log(e);
    }
  };

  const payHandler = async () => {
    let array: any[] = [];
    cart.map(async (item: any) => {
      const res = await fetch("http://localhost:3000/api/product/getCurrentStock", {
        body: JSON.stringify({
          productID: item.product.productID,
        }),
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
      });
      const data = await res.json();
      array.push(data[0].stock);
    });
    setTimeout(() => {
      cart.map((item: any, i: number) => {
        // console.log(item.product.name + " " + array[i]);
        if (array[i] < item.quantity) {
          console.log(item.product.productID);
          setOutStock((prev: any[]) => {
            [...prev, item.product.productID];
          });
          setAvailablity(false);
        }
      });
    }, 110);

    setTimeout(() => {
      isModalOpen ? setIsModalOpen(false) : setIsModalOpen(true);
    }, 110);
  };

  return (
    <>
      <Head>
        <title>Cart | Emart</title>
        <link rel="icon" href="/iconlogo.svg" />
      </Head>
      <Header />
      <div className="pt-28 flex mx-10 cursor-default">
        {isLoading ? (
          <div className="mx-auto w-screen flex justify-center">
            <Image src="/loading.svg" width={50} height={50} alt="loading" className="animate-spin" />
          </div>
        ) : cart.length !== 0 ? (
          <>
            <div className="w-2/3 flex flex-col gap-y-5">
              {cart.map((item: any, i: number) => {
                return (
                  <div className="px-2 py-5 flex gap-x-4" key={i}>
                    <div className="flex items-start gap-x-1">
                      <Image src={"/Trash.svg"} width={20} height={20} alt={"trash"} className="cursor-pointer" onClick={() => deleteInDB(item.cartID)} />
                      <Image src={item.product.imageUrl || "/placeholder.png"} width={140} height={140} alt={item.product.name} />
                    </div>
                    <div className="flex flex-col justify-start">
                      <p className="text-xl">{item.product.name}</p>
                      <p className="font-semibold">Rp {parseInt(item.product.cost).toLocaleString("en-US", { maximumFractionDigits: 2 })}</p>
                      <p>Qty: {item.quantity}</p>
                      <p className="font-bold text-lg mt-auto">Total: Rp {(parseInt(item.product.cost) * parseInt(item.quantity)).toLocaleString("en-US", { maximumFractionDigits: 2 })}</p>
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="w-1/3 border-2 mx-3 p-5 max-h-fit h-[350px] rounded-md space-y-5 shadow">
              <p className="font-bold text-2xl">Cart Summary</p>
              <div className="mx-auto w-[95%] space-y-3">
                <div className="flex flex-col">
                  <p className="text-lg font-semibold">Total Item</p>
                  <p className="self-end">{cart.length}</p>
                </div>
                <div className="flex flex-col">
                  <p className="text-lg font-semibold">Total Quantity</p>
                  <p className="self-end">{cart.reduce((n: any, { quantity }: any) => n + quantity, 0)}</p>
                </div>
                <div className="flex flex-col">
                  <p className="text-lg font-semibold">Total Price</p>
                  <p className="self-end text-xl font-semibold">Rp {cart.reduce((n: any, { quantity, product }: any) => n + parseInt(quantity) * parseInt(product.cost), 0).toLocaleString("en-US", { maximumFractionDigits: 2 })}</p>
                </div>
              </div>
              <button className="bg-custom-lightOrange hover:bg-[#ee9f1f] transition w-full text-white font-semibold py-2 rounded-md" onClick={payHandler}>
                Pay
              </button>
            </div>
            {isModalOpen && availablity && (
              <CartModal
                handleClose={() => {
                  setIsModalOpen(false);
                }}
                data={cart}
              />
            )}
            {!availablity && (
              <div className="fixed">
                <p>not available</p>
                <>{console.log(outStock)}</>
              </div>
            )}
          </>
        ) : (
          <>
            <div className="w-screen space-y-6 text-custom-darkBlue h-[80vh] flex flex-col items-center justify-center">
              <p className="text-3xl font-semibold">Cart is Empty!</p>
              <p className="text-2xl font-semibold">Start Shopping Right Now</p>
            </div>
          </>
        )}
      </div>
    </>
  );
}
