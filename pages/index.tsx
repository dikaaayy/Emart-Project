import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import { product, PrismaClient } from "@prisma/client";
import { useEffect, useState } from "react";
import Link from "next/link";

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
      <Link href={"/AddProduct"}>
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
        </svg>
      </Link>
      <button className="flex items-center gap-x-1"></button>
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
    </>
  );
}
