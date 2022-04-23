import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import { Customer, product, PrismaClient } from "@prisma/client";
import { useEffect, useState } from "react";

const prisma = new PrismaClient();

async function deleteProduct(id: number) {
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
  const product: string = JSON.stringify(await prisma.product.findMany());
  return {
    props: {
      products: product,
    },
  };
}

type HomeProp = {
  products: string;
};
export default function Home(props: HomeProp) {
  const parsedProducts: product[] = JSON.parse(props.products);
  const [products, setProducts] = useState<product[]>(parsedProducts);

  return (
    <div>
      <table className="table-auto border-solid border-4 w-[100%]">
        <thead>
          <tr>
            <th>Product Name</th>
            <th>Price</th>
            <th>Year</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product: product) => {
            return (
              <tr key={product.productID}>
                <td>
                  <div className=" justify-center flex">{product.name}</div>
                </td>
                <td>
                  <div className="justify-center flex">{product.cost}</div>
                </td>
                <td>
                  <div className="justify-center flex">
                    {product.manufacturingDate?.toString()}
                  </div>
                </td>
                <div>
                  <button
                    onClick={() => {
                      deleteProduct(product.productID);
                    }}
                  >
                    Delete
                  </button>
                </div>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
