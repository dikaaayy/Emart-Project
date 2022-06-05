import { getSession, useSession } from "next-auth/react";
import Head from "next/head";
import Image from "next/image";
import { useState } from "react";
import { prisma } from "../../lib/prisma";
import Header from "../../src/components/Header/Header";
import ProductCard from "../../src/components/ProductPage/ProductCard";

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
  const { name, email, profile_picture: profpic } = props.customer;
  const [product, setProduct] = useState(props.customer.product);
  const { data: session } = useSession();

  const productLength = (len: number) => {
    if (len > 1) {
      return len + " products";
    } else {
      return len + " product";
    }
  };

  return (
    <>
      <Head>
        <title>{name} Store | Emart</title>
        <link rel="icon" href="/iconlogo.svg" />
      </Head>
      <Header />
      <div className="pt-[77px] select-none">
        <div className="w-full overflow-x-clip h-[40vh] pl-24 md:pl-48 pt-32 flex pb-10 items-center gap-x-4 relative bg-center">
          <div className="w-full h-full absolute left-0 top-0 -z-10 blur-[1.2px]" style={{ backgroundImage: `url(/placeholder.png)` }} />
          <Image src={profpic} alt="home" width={120} height={120} className="rounded-full self-center" priority layout="fixed" />
          <div className="self-center space-y-1">
            <Image src="/homeBlack.svg" alt="home" width={40} height={40} />
            <p className="text-3xl font-bold">{name} Store</p>
            <p className="text-lg">{productLength(product.length)}</p>
            {session?.user?.email === email ? (
              <div className="bg-white rounded-3xl absolute right-7 bottom-7 transition hover:bg-[#f1f1f1]">
                <label htmlFor="imgUpload" className="font-bold cursor-pointer py-1 px-5 flex items-center gap-x-3">
                  Upload Banner
                  <Image src="/Upload.svg" alt="home" width={25} height={25} />
                </label>
                <input id="imgUpload" type="file" accept="image/png, image/jpeg" className="hidden" />
              </div>
            ) : (
              <></>
            )}
          </div>
        </div>
        <div className="grid grid-cols-2 gap-y-5 py-8 justify-items-center content-evenly sm:grid-cols-3 sm:gap-y-8 sm:gap-x-5 lg:grid-cols-5 lg:gap-y-12 lg:gap-x-9 xl:mx-36">
          {product.map((product: any) => {
            return <ProductCard key={product.productID} productId={product.productID} productName={product.name} productPrice={product.cost} productImageUrl={product.imageUrl} />;
          })}
        </div>
      </div>
    </>
  );
}
