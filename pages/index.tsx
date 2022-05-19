import ProductPage from "../src/components/ProductPage/ProductPage";
import { product} from "@prisma/client";
import Header from "../src/components/Header/Header";
import { prisma } from "../lib/prisma";

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
