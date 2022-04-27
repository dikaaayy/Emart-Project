import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import { product, PrismaClient } from "@prisma/client";
import { useEffect, useState } from "react";
import ProductCard from "../src/components/ProductCard";

const prisma = new PrismaClient();

async function deleteProductOnDatabase(id: number) {
  try {
    fetch(`http://localhost:3000/api/product/${id.toString()}`, {
      headers: {
        "Content-Type": "application/json",
      },
      method: "DELETE",
    });
  } catch (error) {
    console.log(error);
  }
}

export async function getServerSideProps() {
  const product: product[] = await prisma.product.findMany();
  return {
    props: {
      products: product,
    },
  };
}
type HomeProp = {
  products: product[];
};
export default function Home(props: HomeProp) {
  const [products, setProducts] = useState<product[]>(props.products);
  const deleteProduct = (products: product[], id: number) => {
    let newProducts = products.filter((e) => {
      return e.productID != id;
    });
    setProducts(newProducts);
    deleteProductOnDatabase(id);
  };

  return (
    <>
      {products.map((product: product) => {
        return (
          <div key={product.productID} className="justify-center flex">
            {product.name}
            <button
              onClick={() => {
                deleteProduct(products, product.productID);
              }}
            >
              Delete
            </button>
          </div>
        );
      })}
      <ProductCard></ProductCard>
    </>
  );
}
