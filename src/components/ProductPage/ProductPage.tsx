import { product } from "@prisma/client";
import { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import axios from "axios";
import { ProductGridDiv } from "./styled";
import Image from "next/image";
import debounce from "lodash.debounce";

async function deleteProductOnDatabase(id: number) {
  const status = await axios.delete(`http://localhost:3000/product/${id.toString()}`).catch((error) => {
    if (error.response) {
      // Request made and server responded
      console.log(error.response.data);
      console.log(error.response.status);
      console.log(error.response.headers);
    } else if (error.request) {
      // The request was made but no response was received
      console.log(error.request);
    } else {
      // Something happened in setting up the request that triggered an Error
      console.log("Error", error.message);
    }
  });
  return status;
}

type HomeProp = {
  products: product[];
};
export default function ProductPage(props: HomeProp) {
  const [products, setProducts] = useState<product[]>(props.products);
  const [searchedProduct, setSearchedProduct] = useState<any[]>([]);
  const [searchName, setSearchName] = useState("");

  // console.log(searchName);

  const inputHandler = (e: any) => {
    setSearchName(e.target.value);

    const arr = products.filter((product) => {
      return product.name.toLowerCase().includes(searchName.toLowerCase());
    });

    setSearchedProduct(arr);
    // console.log(searchedProduct);
  };
  // const handler = () => {
  //   debounce(inputHandler, 500);
  // };

  return (
    <div className="pt-20">
      <div className="w-full bg-[#eaeaea] flex items-center justify-evenly h-16 px-4 rounded-b-3xl mb-5">
        <input className="w-[95%] rounded-sm h-7 pl-2 outline-none" type="text" value={searchName} onChange={inputHandler} />
        <button>
          <Image src="/magnifier.svg" alt="search-logo" width="20" height="20" />
        </button>
      </div>
      {searchName === "" ? (
        <ProductGridDiv>
          {products.map((product: product) => {
            return <ProductCard key={product.productID} productId={product.productID} productName={product.name} productPrice={product.cost} />;
          })}
        </ProductGridDiv>
      ) : (
        <>
          <ProductGridDiv>
            {searchedProduct.map((product) => {
              return <ProductCard key={product.productID} productId={product.productID} productName={product.name} productPrice={product.cost} />;
            })}
          </ProductGridDiv>
        </>
      )}
    </div>
  );
}
