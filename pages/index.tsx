import ProductPage from "../src/components/ProductPage/ProductPage";
import { product, PrismaClient } from "@prisma/client";
import Header from "../src/components/Header/Header";

const prisma = new PrismaClient();
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
  return (
    <>
      <Header />
      <ProductPage products={props.products}></ProductPage>
    </>
  );
}
