// import axios from "axios";
import { Prisma } from "@prisma/client";
import { useState } from "react";

interface Product {
  name: string;
  cost: string;
  description: string;
  productID: number;
}

export default function AddProduct() {
  const [product, setProduct] = useState<Product>({ productID: 100, name: "", cost: "", description: "" });

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
  // const submitToDB = async (product: Prisma.productCreateInput) => {
  //   console.log(product);
  //   const response = await fetch("/api/addproduct", {
  //     method: "POST",
  //     body: JSON.stringify(product),
  //   });
  //   if (!response.ok) {
  //     throw new Error(response.statusText);
  //   }
  //   return await response.json();
  // };
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
      console.log(product);
      submitToDB(product);
      setProduct({ productID: 0, name: "", cost: "", description: "" });
    } catch (e) {
      console.log(e);
    }
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
          <div className="ml-10 flex flex-col gap-y-2 mb-5">
            <label htmlFor="productCost" className="text-xl font-semibold">
              Price
            </label>
            <input
              className="w-1/2 overflow-auto p-2 rounded"
              placeholder="Enter Price"
              type="text"
              name="productCost"
              id="productCost"
              value={product.cost}
              onChange={(e) => setProduct({ ...product, cost: e.target.value })}
              maxLength={15}
            />
          </div>
          <div className="ml-10 flex flex-col gap-y-2 mb-10">
            <label htmlFor="productDesc" className="text-xl font-semibold">
              Description
            </label>
            <input
              className="w-1/2 overflow-auto p-2 rounded"
              placeholder="Enter Description"
              type="text"
              name="productDesc"
              id="productDesc"
              value={product.description}
              onChange={(e) => setProduct({ ...product, description: e.target.value })}
              maxLength={16}
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
