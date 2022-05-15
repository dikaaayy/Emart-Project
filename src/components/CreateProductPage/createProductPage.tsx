import { useState } from "react";
// import { Form } from "./styled";

export default function createProductPage() {
  const [productName, setProductName] = useState("");
  const [productPrice, setProductPrice] = useState("");

  const submitHandler = (e: any) => {
    e.preventDefault();
    //handler
  };
  return (
    <>
      <h2>Test</h2>
    </>
  );
}
