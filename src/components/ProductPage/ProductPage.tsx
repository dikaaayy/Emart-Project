import { product } from "@prisma/client";
import { useEffect, useState, useRef } from "react";
import { debounce } from "lodash";
import ProductCard from "./ProductCard";
import Image from "next/image";

type HomeProp = {
  products: product[];
};
export default function ProductPage(props: HomeProp) {
  const [products, setProducts] = useState<product[]>(props.products);
  const [searchedProduct, setSearchedProduct] = useState<any[]>([]);
  const [searchName, setSearchName] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (searchName === "") {
      setSearchedProduct([]);
      return;
    }
    setIsLoading(true);
    async function fetchData() {
      await fetch("http://localhost:3000/api/product/searchproduct", {
        body: JSON.stringify({ searchName }),
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
      })
        .then((res) => res.json())
        .then((data) => {
          setSearchedProduct(data);
          setIsLoading(false);
        });
    }
    fetchData();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchName]);

  const handler = debounce((e) => {
    setSearchName(e?.target?.value);
  }, 300);

  return (
    <div className="pt-[76px] relative">
      <div className="w-full bg-[#DBE1EE] flex items-center justify-evenly h-20 px-4 rounded-b-2xl mb-5 sticky top-[76px] z-10">
        <form className="w-[95%] flex items-center rounded-lg h-10 border-custom-lightOrange border-[1px] bg-white overflow-hidden">
          <input className="w-[99%] h-full outline-none pl-2" type="text" onChange={handler} placeholder="Search a product" spellCheck={false} ref={inputRef} />
          {searchName !== "" ? (
            <button
              className="px-2"
              onClick={(e) => {
                e.preventDefault();
                setSearchName("");
                inputRef.current!.value = "";
              }}
            >
              x
            </button>
          ) : null}
        </form>
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
          {isLoading ? (
            <div className="mx-auto w-screen flex justify-center">
              <Image src="/loading.svg" width={50} height={50} alt="loading" className="animate-spin" />
            </div>
          ) : (
            searchedProduct.map((product) => {
              return <ProductCard key={product.productID} productId={product.productID} productName={product.name} productPrice={product.cost} />;
            })
          )}
        </div>
      )}
    </div>
  );
}
