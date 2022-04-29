import { Prisma } from "@prisma/client";
import { useState } from "react";
import { uid } from "uid";
import Header from "../src/components/Header/Header";

interface Product {
  name: string;
  cost: string;
  description: string;
  productID: string;
}

export default function AddProduct() {
  const [product, setProduct] = useState<Product>({ productID: "", name: "", cost: "", description: "" });

  const submitToDB = async (data: Product) => {
    try {
      fetch("http://localhost:3000/api/product/addproduct", {
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
      setProduct({ productID: "", name: "", cost: "", description: "" });
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <>
      <Header />
      <div className="pt-40 text-center font-semibold text-3xl">
        <h1>Add New Product</h1>
      </div>
      <div className="flex justify-center">
        <div className="my-20 flex flex-col justify-center w-[80%] lg:w-[60%] h-[28rem] bg-gray-200 rounded">
          <form onSubmit={submitHandler} autoComplete="off">
            <div className="ml-3 md:ml-10 flex flex-col gap-y-2 mb-5">
              <label htmlFor="productName" className="text-lg md:text-xl font-semibold">
                Name
              </label>
              <input
                className="w-[90%] md:w-1/2 overflow-auto p-2 rounded border border-gray-400 outline-1 outline-gray-700 focus:border-gray-500"
                placeholder="Enter Name"
                type="text"
                name="productName"
                id="productName"
                value={product.name}
                onChange={(e) => setProduct({ ...product, name: e.target.value })}
                maxLength={14}
              />
            </div>
            <div className="ml-3 md:ml-10 flex flex-col gap-y-2 mb-5">
              <label htmlFor="productCost" className="text-lg md:text-xl font-semibold">
                Price
              </label>
              <input
                className="w-[90%] md:w-1/2 overflow-auto p-2 rounded border border-gray-400 outline-1 outline-gray-700 focus:border-gray-500"
                placeholder="Enter Price"
                type="text"
                name="productCost"
                id="productCost"
                value={product.cost}
                onChange={(e) => setProduct({ ...product, cost: e.target.value })}
                maxLength={15}
              />
            </div>
            <div className="ml-3 md:ml-10 flex flex-col gap-y-2 mb-10">
              <label htmlFor="productDesc" className="text-lg md:text-xl font-semibold">
                Description
              </label>
              <textarea
                className="w-[90%] md:w-1/2 overflow-auto p-2 rounded border border-gray-400 outline-1 outline-gray-700 focus:border-gray-500"
                placeholder="Enter Description"
                rows={2}
                name="productDesc"
                id="productDesc"
                value={product.description}
                onChange={(e) => setProduct({ ...product, description: e.target.value })}
                maxLength={16}
              />
            </div>
            <button
              className="ml-3 md:ml-10 bg-[#14213D] hover:bg-[#1a2c52] transition duration-500 text-white px-2 py-2 rounded"
              type="submit"
              onClick={() => {
                setProduct({ ...product, productID: String(uid(25)) });
              }}
            >
              Add Product
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
