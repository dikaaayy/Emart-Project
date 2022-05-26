import { product } from "@prisma/client";
import { useEffect, useState } from "react";
import { debounce } from "lodash";
import ProductCard from "./ProductCard";
import { ProductGridDiv } from "./styled";
import Image from "next/image";

type HomeProp = {
  products: product[];
};
export default function ProductPage(props: HomeProp) {
  const [products, setProducts] = useState<product[]>(props.products);
  const [searchedProduct, setSearchedProduct] = useState<any[]>([]);
  const [searchName, setSearchName] = useState("");

  useEffect(() => {
    if (searchName === "") setSearchedProduct([]);
    const arr = products.filter((product) => {
      return product?.name?.toLowerCase().includes(searchName.toLowerCase());
    });
    setSearchedProduct(arr);

    setSearchedProduct(arr);
  }, [searchName]);

  // const inputHandler = (e: any) => {
  //   setSearchName(e?.target?.value);
  //   console.log(searchName);

  //   if (searchName === "") setSearchedProduct([]);
  //   const arr = products.filter((product) => {
  //     return product?.name?.toLowerCase().includes(searchName.toLowerCase());
  //   });

  //   setSearchedProduct(arr);
  //   console.log(searchedProduct);
  // };

  const handler = debounce((e) => {
    setSearchName(e?.target?.value);
  }, 250);

  return (
    <div className="pt-20">
      <div className="w-full bg-[#DBE1EE] flex items-center justify-evenly h-16 px-4 rounded-b-2xl mb-5">
        <input className="w-[95%] rounded-lg h-7 pl-2 outline-none border-custom-lightOrange border-[1px]" type="text" onChange={handler} placeholder="Search a product" />
        <button>
          <Image src="/magnifier.svg" alt="search-logo" width="20" height="20" />
        </button>
      </div>
      {searchName === "" ? (
        <div className="grid grid-cols-2 gap-y-5 pb-8 justify-items-center content-evenly sm:grid-cols-3 sm:gap-y-8 sm:gap-x-5 lg:grid-cols-5 lg:gap-y-12 lg:gap-x-9">
          {products.map((product: product) => {
            return <ProductCard key={product.productID} productId={product.productID} productName={product.name} productPrice={product.cost} />;
          })}
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-y-5 pb-8 justify-items-center content-evenly sm:grid-cols-3 sm:gap-y-8 sm:gap-x-5 lg:grid-cols-5 lg:gap-y-12 lg:gap-x-9">
          {searchedProduct.map((product) => {
            return <ProductCard key={product.productID} productId={product.productID} productName={product.name} productPrice={product.cost} />;
          })}
        </div>
      )}
    </div>
  );
}
