import Header from "../../../src/components/Header/Header";
import { prisma } from "../../../lib/prisma";
import { useState } from "react";
import Image from "next/image";
import Router, { useRouter } from "next/router";
import { submitProduct } from "../../../src/firebase/firebase";
import { updateProductToDB } from "../../../src/database/updateDB";
import Head from "next/head";
import { getSession, useSession } from "next-auth/react";
import Protected from "../../../src/components/Protected/Protected";

export async function getServerSideProps(context: any) {
  const { id } = context.params;
  const session = await getSession(context);
  if (!session) {
    return {
      redirect: {
        permanent: false,
        destination: "/",
      },
    };
  }
  const product = await prisma.product.findUnique({
    where: {
      productID: id,
    },
  });
  if (session.user?.email !== product?.email) {
    return {
      redirect: {
        permanent: false,
        destination: "/product/" + product?.productID,
      },
    };
  }
  return { props: { product } };
}

export type Product = {
  productID: String;
  name: String;
  cost: String;
  description: String;
  imageUrl: String;
};

export default function Update(props: any) {
  // const [product, setProduct] = useState({ productID: props.product.productID, name: props.product.name, cost: props.product.cost, description: props.product.description, stock: props.product.stock });
  const [product, setProduct] = useState({
    productID: props.product.productID,
    name: props.product.name,
    cost: props.product.cost,
    description: props.product.description,
    imageUrl: props.product.imageUrl,
    stock: props.product.stock,
  });
  const [isOpen, setIsOpen] = useState(false);
  const [imageString, setImageString] = useState<string>(product.imageUrl);
  const [imageFile, setImageFile] = useState<File>();
  const { data: session } = useSession();
  const router = useRouter();

  const cancelHandler = () => {
    setTimeout(() => {
      router.push("/product/" + props.product.productID);
    }, 100);
  };
  const submitImageLocally = (file: any) => {
    if (file.target.files && file.target.files[0]) {
      setImageFile(file.target.files[0]);
      setImageString(URL.createObjectURL(file.target.files[0]));
    }
  };

  const submitHandler = async (e: any) => {
    try {
      e.preventDefault();
      setIsOpen(true);
      await submitProduct(imageFile!, product, updateProductToDB);
      setTimeout(() => {
        setProduct({
          productID: "",
          name: "",
          cost: "",
          description: "",
          imageUrl: "",
          stock: null,
        });
        setIsOpen(false);
        router.push("/");
      }, 3000);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <Protected>
      <>
        <Head>
          <title>Edit Product</title>
          <link rel="icon" href="/iconlogo.svg" />
        </Head>
        <Header />
        {isOpen && (
          <div
            className={`absolute select-none bg-black bg-opacity-30 z-40 w-screen h-screen`}
          >
            <div
              className={`fixed mx-auto top-32 right-0 left-0 font-semibold flex flex-col justify-center items-center w-[20%] h-24 bg-custom-darkBlue text-custom-lightGrey rounded-md select-none gap-y-3`}
            >
              <p className="text-2xl ">Product Updated!</p>
              <p className="">Redirecting to main page</p>
            </div>
          </div>
        )}
        <div className="pt-36 text-center font-semibold text-lg md:text-xl lg:text-2xl">
          Edit Product
        </div>
        <div className="flex flex-col lg:flex-row mt-3 lg:mt-7 gap-x-24 lg:justify-around mx-auto w-full lg:w-[65vw] lg:h-[65vh]">
          <div className="flex flex-col">
            <div className=" flex border-2 mt-5 border-black justify-items-center justify-center align-middle lg:w-[400px] lg:h-[400px]">
              <div className="min-w-full">
                <Image
                  src={imageString}
                  alt="img-template"
                  width="100%"
                  height="100%"
                  layout="responsive"
                />
              </div>
            </div>
            <div className="flex flex-col mt-3">
              <label htmlFor="productCost" className="text-base font-semibold">
                <span>Product Image</span>
              </label>
              <div className=" flex w-566.5px mt-3 ">
                <label
                  htmlFor="dropzone-file"
                  className="flex flex-col justify-center items-center w-full  bg-white rounded-lg border-2 border-gray-300  cursor-pointer   hover:bg-gray-100  hover:border-gray-500 dark:hover:bg-gray-200"
                >
                  <div className="flex flex-col justify-center items-center pt-5 pb-6">
                    <Image
                      alt={"/Upload.png"}
                      src={"/Upload.png"}
                      height={29.17}
                      width={29.17}
                    />
                    <p className="mb-2 text-sm text-black60 dark:text-gray-400">
                      <span className="font-semibold">Upload Image</span>
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      PNG, JPG only
                    </p>
                  </div>
                  <input
                    id="dropzone-file"
                    type="file"
                    className="hidden"
                    onChange={submitImageLocally}
                  />
                </label>
              </div>
            </div>
          </div>
          <div className="w-full  lg:w-1/2">
            <form
              onSubmit={submitHandler}
              spellCheck={false}
              autoComplete="off"
              className="w-full h-full lg:mt-3 mx-auto"
            >
              <div className="flex flex-col gap-y-2 mb-5">
                <label
                  htmlFor="productName"
                  className="text-base font-semibold"
                >
                  Name
                </label>
                <input
                  className="w-[80%] sm:w-[65%] lg:w-[60%] overflow-auto p-2 rounded border border-gray-400 outline-1 outline-gray-700 focus:border-gray-500"
                  placeholder="Enter Name"
                  type="text"
                  name="productName"
                  id="productName"
                  value={product.name as string}
                  onChange={(e) =>
                    setProduct({ ...product, name: e.target.value })
                  }
                  maxLength={14}
                  required
                />
              </div>
              <div className="flex flex-col gap-y-2 mb-5">
                <label
                  htmlFor="productCost"
                  className="text-base font-semibold"
                >
                  Price
                </label>
                <input
                  className="w-1/2 lg:w-1/3 overflow-auto p-2 rounded border border-gray-400 outline-1 outline-gray-700 focus:border-gray-500"
                  placeholder="Enter Price"
                  type="text"
                  name="productCost"
                  id="productCost"
                  value={product.cost as string}
                  onChange={(e) =>
                    setProduct({ ...product, cost: e.target.value })
                  }
                  maxLength={15}
                  required
                />
              </div>
              <div className="flex flex-col gap-y-2 mb-5">
                <label
                  htmlFor="productName"
                  className="text-base font-semibold"
                >
                  Stock
                </label>
                <input
                  className="w-[80%] sm:w-[65%] lg:w-[60%] overflow-auto p-2 rounded border border-gray-400 outline-1 outline-gray-700 focus:border-gray-500"
                  placeholder="Enter Name"
                  type="number"
                  name="productName"
                  id="productName"
                  value={product.stock!}
                  min="1"
                  onChange={(e) =>
                    setProduct({ ...product, stock: parseInt(e.target.value) })
                  }
                  maxLength={14}
                  required
                />
              </div>
              <div className="flex flex-col gap-y-2 mb-4">
                <label
                  htmlFor="productDesc"
                  className="text-base font-semibold"
                >
                  Description
                </label>
                <textarea
                  className="w-[80%] sm:w-[65%] lg:w-[394px] lg:h-[187px] overflow-scroll p-2 rounded border border-gray-400 outline-1 outline-gray-700 focus:border-gray-500 resize-y pb-5"
                  placeholder="Enter Description"
                  name="productDesc"
                  id="productDesc"
                  value={product.description as string}
                  onChange={(e) =>
                    setProduct({ ...product, description: e.target.value })
                  }
                  maxLength={255}
                  required
                />
              </div>
              <div className="flex gap-x-2 mt-4">
                <button
                  className="flex bg-custom-lightOrange hover:bg-[#e2910f] font-semibold transition text-white px-[49.5px] py-2 rounded"
                  type="submit"
                  disabled={isOpen ? true : false}
                >
                  Save
                </button>
                <button
                  className="bg-custom-darkOrange hover:bg-[#d45133] font-semibold transition text-white px-[43px] py-2 rounded"
                  type="reset"
                  onClick={cancelHandler}
                  disabled={false}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      </>
    </Protected>
  );
}
