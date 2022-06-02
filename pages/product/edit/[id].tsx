import Header from "../../../src/components/Header/Header";
import { product } from "@prisma/client";
import { prisma } from "../../../lib/prisma";
import { useState } from "react";
import Image from "next/image";
import Router from "next/router";
import Head from "next/head";

export async function getServerSideProps(context: any) {
  const { id } = context.params;
  const product = await prisma.product.findUnique({
    where: {
      productID: id,
    },
  });
  return { props: { product } };
}

export default function Update(props: any) {
  const [product, setProduct] = useState({ productID: props.product.productID, name: props.product.name, cost: props.product.cost, description: props.product.description, stock: props.product.stock });
  const [isOpen, setIsOpen] = useState(false);

  const cancelHandler = () => {
    setTimeout(() => {
      Router.push("/product/" + props.product.productID);
    }, 100);
  };

  const submitToDB = async (data: any) => {
    try {
      fetch("http://localhost:3000/api/product/updateProduct", {
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
      });
    } catch (e) {
      console.log(e);
    }
  };

  const submitHandler = (e: any) => {
    try {
      e.preventDefault();
      submitToDB(product);
      setIsOpen(true);
      setTimeout(() => {
        setProduct({ productID: "", name: "", cost: "", description: "", stock: null });
        setIsOpen(false);
        Router.push("/");
      }, 3000);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <>
      <Head>
        <title>Edit Product</title>
        <link rel="icon" href="/iconlogo.svg" />
      </Head>
      <Header />
      {isOpen && (
        <div className={`absolute select-none bg-black bg-opacity-30 z-40 w-screen h-screen`}>
          <div className={`fixed mx-auto top-32 right-0 left-0 font-semibold flex flex-col justify-center items-center w-[20%] h-24 bg-custom-darkBlue text-custom-lightGrey rounded-md select-none gap-y-3`}>
            <p className="text-2xl">Product Updated!</p>
            <p className="">Redirecting to main page</p>
          </div>
        </div>
      )}
      <div className="pt-36 text-center font-semibold text-lg md:text-xl lg:text-2xl">
        <h1>Update Product</h1>
      </div>
      <div className="flex flex-col lg:flex-row mt-3 lg:mt-7 gap-x-24 lg:justify-around mx-auto w-[85vw] lg:w-[65vw] lg:h-[65vh]">
        <div className="w-full  lg:w-1/2 grid grid-cols-2 p-7 lg:p-5 gap-4 content-center">
          <Image src={"/placeholder.png"} alt="img-template" width="320" height="306" objectFit="contain" />
          <Image src={"/placeholder.png"} alt="img-template" width="320" height="306" objectFit="contain" />
          <Image src={"/placeholder.png"} alt="img-template" width="320" height="306" objectFit="contain" />
          <Image src={"/placeholder.png"} alt="img-template" width="320" height="306" objectFit="contain" />
        </div>
        <div className="w-full  lg:w-1/2">
          <form onSubmit={submitHandler} spellCheck={false} autoComplete="off" className="w-full h-full lg:mt-20 mx-auto">
            <div className="flex flex-col gap-y-2 mb-5">
              <label htmlFor="productName" className="lg:text-xl font-semibold">
                Name
              </label>
              <input
                className="w-[80%] sm:w-[65%] lg:w-[60%] overflow-auto p-2 rounded border border-gray-400 outline-1 outline-gray-700 focus:border-gray-500"
                placeholder="Enter Name"
                type="text"
                name="productName"
                id="productName"
                value={product.name}
                onChange={(e) => setProduct({ ...product, name: e.target.value })}
                maxLength={14}
                required
              />
            </div>
            <div className="flex flex-col gap-y-2 mb-5">
              <label htmlFor="productCost" className="lg:text-xl font-semibold">
                Price
              </label>
              <input
                className="w-1/2 lg:w-1/3 overflow-auto p-2 rounded border border-gray-400 outline-1 outline-gray-700 focus:border-gray-500"
                placeholder="Enter Price"
                type="text"
                name="productCost"
                id="productCost"
                value={product.cost}
                onChange={(e) => setProduct({ ...product, cost: e.target.value })}
                maxLength={15}
                required
              />
            </div>
            <div className="flex flex-col gap-y-2 mb-5">
              <label htmlFor="productStock" className="lg:text-xl font-semibold">
                Stock
              </label>
              <input
                className="w-1/2 lg:w-1/3 overflow-auto p-2 rounded border border-gray-400 outline-1 outline-gray-700 focus:border-gray-500"
                placeholder="Enter Price"
                type="text"
                name="productStock"
                id="productStock"
                value={product.stock}
                onChange={(e) => setProduct({ ...product, stock: parseInt(e.target.value) })}
                maxLength={15}
                required
              />
            </div>
            <div className="flex flex-col gap-y-2 mb-10">
              <label htmlFor="productDesc" className="lg:text-xl font-semibold">
                Description
              </label>
              <textarea
                className="w-[80%] sm:w-[65%] lg:w-1/2 overflow-auto p-2 rounded border border-gray-400 outline-1 outline-gray-700 focus:border-gray-500 resize-y pb-5"
                placeholder="Enter Description"
                rows={2}
                name="productDesc"
                id="productDesc"
                value={product.description}
                onChange={(e) => setProduct({ ...product, description: e.target.value })}
                maxLength={16}
                required
              />
            </div>
            <div className="flex gap-x-4">
              <button className="bg-custom-lightOrange hover:bg-[#e2910f] font-semibold transition text-white px-3 py-2 rounded" type="submit">
                Update
              </button>
              <button className="bg-custom-darkOrange hover:bg-[#d45133] font-semibold transition text-white px-4 py-2 rounded" type="reset" onClick={cancelHandler}>
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
