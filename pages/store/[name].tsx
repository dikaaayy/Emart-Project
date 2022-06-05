import { getSession, useSession } from "next-auth/react";
import Head from "next/head";
import Image from "next/image";
import { useState } from "react";
import { prisma } from "../../lib/prisma";
import Header from "../../src/components/Header/Header";
import ProductCard from "../../src/components/ProductPage/ProductCard";
import Banner from "../../src/components/store/Banner";
import { product } from "@prisma/client";

export async function getServerSideProps(context: any) {
  const { name } = context.params;
  const session = await getSession(context);
  if (!session) {
    return {
      redirect: {
        permanent: false,
        destination: "/",
      },
    };
  }
  const customer = await prisma.customer.findUnique({
    where: {
      email: name,
    },
    include: {
      product: true,
    },
  });
  return {
    props: { customer },
  };
}

export default function Store(props: any) {
  const { name, email, profile_picture, banner_url } = props.customer;
  const [product, setProduct] = useState<product[]>(props.customer.product);
  const { data: session } = useSession();

  console.log(props.customer);

  return (
    <>
      <Head>
        <title>{name} Store | Emart</title>
        <link rel="icon" href="/iconlogo.svg" />
      </Head>
      <Header />
      <Banner
        profile_picture={profile_picture}
        name={name}
        bannerUrl={banner_url}
        product_length={product.length}
        session={session!}
        email={email}
      ></Banner>
      <div className="pt-[77px] select-none">
        <div className="grid grid-cols-2 gap-y-5 py-8 justify-items-center content-evenly sm:grid-cols-3 sm:gap-y-8 sm:gap-x-5 lg:grid-cols-5 lg:gap-y-12 lg:gap-x-9 xl:mx-36">
          {product.map((product: any) => {
            return (
              <ProductCard
                key={product.productID}
                productId={product.productID}
                productName={product.name}
                productPrice={product.cost}
                productImageUrl={product.imageUrl}
              />
            );
          })}
        </div>
      </div>
    </>
  );
}
