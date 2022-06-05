import { useState } from "react";
import { uid } from "uid";
import Header from "../src/components/Header/Header";
import Router from "next/router";
import Image from "next/image";
import { Product } from "../src/helper/types";
import { submitProduct } from "../src/firebase/firebase";
import { addProductToDB } from "../src/database/addtoDB";
import { getSession } from "next-auth/react";
import Head from "next/head";

export async function getServerSideProps(context: any) {
  const session = await getSession(context);
  if (!session) {
    return {
      redirect: {
        permanent: false,
        destination: "/",
      },
    };
  }
  return {
    props: {
      data: {
        state: "true",
      },
    },
  };
}

export default function AddProduct() {
  const [product, setProduct] = useState<Product>({
    productID: String(uid(25)),
    name: "",
    cost: "",
    description: "",
    stock: 0,
    imageUrl: "",
  });
  const [isOpen, setIsOpen] = useState(false);
  const [imageString, setImageString] = useState<string>("/placeholder.png");
  const [imageFile, setImageFile] = useState<File>();

  const submitImageLocally = (file: any) => {
    if (file.target.files && file.target.files[0]) {
      setImageFile(file.target.files[0]);
      setImageString(URL.createObjectURL(file.target.files[0]));
    }
  };

  const submitHandler = async (e: any) => {
    if (
      product.cost === "" ||
      product.name === "" ||
      product.description === "" ||
      product.imageUrl == null ||
      product.stock == 0 ||
      product.stock == null
    )
      return;
    try {
      e.preventDefault();
      setIsOpen(true);
      await submitProduct(imageFile!, product, addProductToDB);
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
        Router.push("/");
      }, 3000);
    } catch (e) {
      console.log(e);
    }
  };
  const cancelHandler = () => {
    setProduct({
      productID: "",
      name: "",
      cost: "",
      description: "",
      imageUrl: "",
      stock: null,
    });
    setTimeout(() => {
      Router.push("/");
    }, 3000);
  };
  return (
    <>
      <Head>
        <title>Add Product | Emart</title>
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
            <p className="text-2xl ">Product Added!</p>
            <p className="">Redirecting to main page</p>
          </div>
        </div>
      )}
      <div className="pt-10 text-center font-semibold text-lg md:text-xl lg:text-2xl"></div>
      <div className="pt-10 text-center font-semibold text-lg md:text-xl lg:text-2xl">
        Add Product
      </div>
      <div className="flex flex-col lg:flex-row mt-3 lg:mt-7 gap-x-24 lg:justify-around mx-auto w-[100vw] lg:w-[65vw] lg:h-[65vh]">
        <div className="flex flex-col">
          <div className=" flex border-2 mt-5 border-black justify-items-center justify-center align-middle lg:w-60 lg:h-60">
            <div className="min-w-full">
              <Image
                src={imageString}
                alt="img-template"
                width="100%"
                height="100%"
                layout="responsive"
              ></Image>
            </div>
          </div>
          <div className="flex flex-col border-2 border-black">
            <label htmlFor="productCost" className="lg:text-xl font-semibold">
              Foto Produk
            </label>
            <div className="w-72 h-72 border-2 border-black">
              <label
                htmlFor="dropzone-file"
                className="flex flex-col justify-center items-center w-full h-64 bg-gray-50 rounded-lg border-2 border-gray-300 border-dashed cursor-pointer dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
              >
                <div className="flex flex-col justify-center items-center pt-5 pb-6">
                  <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                    <span className="font-semibold">Click to upload</span> or
                    drag and drop
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
              <label htmlFor="productName" className="lg:text-xl font-semibold">
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
              <label htmlFor="productCost" className="lg:text-xl font-semibold">
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
            <div className="flex flex-col gap-y-2 mb-4">
              <label
                htmlFor="productDesc"
                className="lg:tetexxt-xl font-semibold"
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
            <div className="flex flex-col gap-y-2 mb-5">
              <label htmlFor="productName" className="lg:text-xl font-semibold">
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
            <div className="flex gap-x-4 mt-4">
              <button
                className="bg-custom-lightOrange hover:bg-[#e2910f] font-semibold transition text-white px-3 py-2 rounded"
                type="submit"
                disabled={isOpen ? true : false}
                onClick={() => {
                  setProduct({ ...product, productID: String(uid(25)) });
                }}
              >
                Update
              </button>
              <button
                className="bg-custom-darkOrange hover:bg-[#d45133] font-semibold transition text-white px-4 py-2 rounded"
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
  );
}
