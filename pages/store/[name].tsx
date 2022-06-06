import { getSession, useSession } from "next-auth/react";
import Head from "next/head";
import Image from "next/image";
import { useEffect, useState } from "react";
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
  type StoreCustomer = {
    name: string;
    email: string;
    profile_picture: string;
    banner_url: string;
  };
  // useEffect(() => {
  //   let storeCustomer: StoreCustomer = {
  //     name: props.customer.name,
  //     email: props.customer.email,
  //     profile_picture: props.customer.profile_picture,
  //     banner_url: props.customer.banner_url,
  //   };
  //   setStoreOwner(storeCustomer);
  //   setProduct(props.customer.product);
  // }, [
  //   props.customer.banner_url,
  //   props.customer.email,
  //   props.customer.name,
  //   props.customer.profile_picture,
  //   props.customer.product,
  // ]);

  const [store_owner, setStoreOwner] = useState<StoreCustomer>({
    name: props.customer.name,
    email: props.customer.email,
    profile_picture: props.customer.profile_picture,
    banner_url: props.customer.banner_url,
  });
  const [product, setProduct] = useState<product[]>(props.customer.product);
  const { data: session } = useSession();

  return (
    <>
      <Head>
        <title>{store_owner!.name} Store | Emart</title>
        <link rel="icon" href="/iconlogo.svg" />
      </Head>
      <Header />
      <div className="pt-[75px] select-none">
      <Banner
        profile_picture={store_owner!.profile_picture}
        name={store_owner!.name}
        bannerUrl={store_owner!.banner_url}
        product_length={product.length}
        session={session!}
        email={store_owner!.email}
      />
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
