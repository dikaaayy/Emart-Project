import { useState } from "react";

export default function AddProduct() {
  const [productName, setProductName] = useState("");
  const [productPrice, setProductPrice] = useState("");

  const submitHandler = (e: any) => {
    e.preventDefault();
    //handler
    setProductName("");
    setProductPrice("");
  };
  return (
    <>
      <div className="mt-20 pt-10 ml-10 w-1/2 h-[50vh] bg-gray-200 rounded">
        <form onSubmit={submitHandler} autoComplete="off">
          <div className="ml-10 flex flex-col gap-y-2 mb-5">
            <label htmlFor="productName" className="text-xl font-semibold">
              Name
            </label>
            <input className="w-1/2 overflow-auto p-2 rounded" placeholder="Enter Name" type="text" name="productName" id="productName" value={productName} onChange={(e) => setProductName(e.target.value)} maxLength={14} />
          </div>
          <div className="ml-10 flex flex-col gap-y-2 mb-10">
            <label htmlFor="productCost" className="text-xl font-semibold">
              Price
            </label>
            <input className="w-1/2 overflow-auto p-2 rounded" placeholder="Enter Price" type="text" name="productCost" id="productCost" value={productPrice} onChange={(e) => setProductPrice(e.target.value)} maxLength={15} />
          </div>
          <button className="ml-10 bg-[#14213D] hover:bg-[#1a2c52] transition duration-500 text-white px-2 py-2 rounded" type="submit">
            Add Product
          </button>
        </form>
      </div>
    </>
  );
}
