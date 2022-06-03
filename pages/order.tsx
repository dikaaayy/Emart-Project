import { getSession } from "next-auth/react";
import Head from "next/head";
import Image from "next/image";
import { prisma } from "../lib/prisma";
import Header from "../src/components/Header/Header";

export async function getServerSideProps(context: any) {
  const session = await getSession(context);
  const data = await prisma.orders.findMany({
    select: {
      orderID: true,
      quantity: true,
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
export default function order({ data }: any) {
  // console.log(data);
  return (
    <>
      <Head>
        <title>Order | Emart</title>
        <link rel="icon" href="/iconlogo.svg" />
      </Head>
      <Header />
      <div className="pt-28">
        <p className="text-center text-3xl font-semibold mb-10">My Order</p>
        <div className="mx-10 w-1/2 flex flex-col gap-y-5">
          {data.map((item: any, i: any) => {
            return (
              <div className="border-[1px] shadow p-5 rounded-md" key={i}>
                <p className="ml-1">
                  Order ID: <span className="font-bold">{item.orderID}</span>
                </p>
                <div className="mt-4 flex gap-x-4">
                  <div>
                    <Image src={item.product.imageUrl || "/placeholder.png"} width={150} height={150} alt={item.product.name} />
                  </div>
                  <div className="flex flex-col justify-start pb-1">
                    <p className="text-lg">{item.product.name}</p>
                    <p className="font-semibold">Rp {parseInt(item.product.cost).toLocaleString("en-US", { maximumFractionDigits: 2 })}</p>
                    <p>Qty: {item.quantity}</p>
                    <p>Seller: {item.product.Customer.name}</p>
                    <p className="font-bold mt-auto text-lg">Total: Rp {(parseInt(item.product.cost) * parseInt(item.quantity)).toLocaleString("en-US", { maximumFractionDigits: 2 })}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}
