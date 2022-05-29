import ProductPage from "../src/components/ProductPage/ProductPage";
import { product } from "@prisma/client";
import Header from "../src/components/Header/Header";
import AuthenticationPage from "../src/components/authPage/AuthenticationPage";
import { prisma } from "../lib/prisma";
import { useSession, getSession } from "next-auth/react";

export async function getServerSideProps() {
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
  const { data: session, status } = useSession();
  if (status === "loading") {
    return <p>Loading...</p>;
  }
  if (status === "unauthenticated") {
    return <AuthenticationPage></AuthenticationPage>;
  }
  return (
    <>
      <Header />
      <ProductPage products={props.products}></ProductPage>
    </>
  );
}
