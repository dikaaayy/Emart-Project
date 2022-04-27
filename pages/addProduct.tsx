// import axios from "axios";
import { Prisma } from "@prisma/client";
import { useState } from "react";

export default function AddProduct() {
  const [product, setProduct] = useState({ productID: 0, name: "", price: "" });

  // const submitToDB = async (name: string, price: string) => {
  //   axios({
  //     method: "post",
  //     url: "http://localhost:3000/api/product/addproduct",
  //     headers: {},
  //     data: {
  //       foo: "bar",
  //     },
  //   });
  // };
  const submitToDB = async (product: Prisma.productCreateInput) => {
    console.log(product);
    const response = await fetch("/api/addproduct", {
      method: "POST",
      body: JSON.stringify(product),
    });
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    return await response.json();
  };

  const submitHandler = (e: any) => {
    e.preventDefault();
    submitToDB(product);
    setProduct({ productID: 0, name: "", price: "" });
  };
  return (
    <>
      <div className="mt-20 pt-10 ml-10 w-1/2 h-[50vh] bg-gray-200 rounded">
        <form onSubmit={submitHandler} autoComplete="off">
          <div className="ml-10 flex flex-col gap-y-2 mb-5">
            <label htmlFor="productName" className="text-xl font-semibold">
              Name
            </label>
            <input
              className="w-1/2 overflow-auto p-2 rounded"
              placeholder="Enter Name"
              type="text"
              name="productName"
              id="productName"
              value={product.name}
              onChange={(e) => setProduct({ ...product, name: e.target.value })}
              maxLength={14}
            />
          </div>
          <div className="ml-10 flex flex-col gap-y-2 mb-10">
            <label htmlFor="productCost" className="text-xl font-semibold">
              Price
            </label>
            <input
              className="w-1/2 overflow-auto p-2 rounded"
              placeholder="Enter Price"
              type="text"
              name="productCost"
              id="productCost"
              value={product.price}
              onChange={(e) => setProduct({ ...product, price: e.target.value })}
              maxLength={15}
            />
          </div>
          <button className="ml-10 bg-[#14213D] hover:bg-[#1a2c52] transition duration-500 text-white px-2 py-2 rounded" type="submit">
            Add Product
          </button>
        </form>
      </div>
    </>
  );
}
