import { useState } from "react";

export default function AddProduct() {
  const [productName, setProductName] = useState("");
  const [productPrice, setProductPrice] = useState("");

  const submitHandler = (e: any) => {
    e.preventDefault();
    //handler
  };
  return (
    <>
      <div className="">
        <form>
          <div className="ml-10 flex flex-col">
            <label htmlFor="productName" className="text-xl font-semibold">
              Name
            </label>
            <input className="w-1/4 overflow-auto p-2" type="text" name="productName" id="productName" />
          </div>
          <div className="ml-10 flex flex-col">
            <label htmlFor="productCost" className="text-xl font-semibold">
              Cost
            </label>
            <input className="w-1/4 overflow-auto p-2" type="text" name="productCost" id="productCost" />
          </div>
        </form>
      </div>
    </>
  );
}
