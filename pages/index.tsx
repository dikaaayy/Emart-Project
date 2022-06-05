import ProductPage from "../src/components/ProductPage/ProductPage";
import { product } from "@prisma/client";
import Header from "../src/components/Header/Header";
import AuthenticationPage from "./authPage/AuthenticationPage";
import { prisma } from "../lib/prisma";
import { useSession, getSession } from "next-auth/react";
import Protected from "../src/components/Protected/Protected";
import Head from "next/head";

export async function getServerSideProps(context: any) {
  const session = await getSession(context);
  if (!session) {
    return {
      redirect: {
        permanent: false,
        destination: "/authPage/AuthenticationPage",
      },
    };
  }
  const product: product[] = await prisma.product.findMany();
  return {
    props: {
      products: product,
    },
  };
}
type HomeProp = {
  products: product[];
};
export default function Home(props: HomeProp) {
  return (
    <>
      <Head>
        <title>Home | Emart</title>
        <link rel="icon" href="/iconlogo.svg" />
      </Head>
      <Header />
      <ProductPage products={props.products}></ProductPage>
    </>
  );
}
