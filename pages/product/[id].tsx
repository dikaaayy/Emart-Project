import Header from "../../src/components/Header/Header";
import { product } from "@prisma/client";
import { prisma } from "../../lib/prisma";
import { useState } from "react";
import Image from "next/image";
import Router from "next/router";
import Template from "../../public/placeholder.png";
// import DeleteProduct from "../../src/components/deleteProduct";

// export async function getStaticPaths() {
//   const data: product[] = await prisma.product.findMany();
//   const paths = data.map((product) => {
//     return {
//       params: { id: product.productID },
//     };
//   });
//   return {
//     paths: paths,
//     fallback: false,
//   };
// }

// export const getStaticProps = async (context: any) => {
//   const id = context.params.id;
//   const product = await prisma.product.findUnique({
//     where: {
//       productID: id,
//     },
//   });

//   return {
//     props: { product },
//   };
// };

export async function getServerSideProps(context: any) {
  const { id } = context.params;
  const product = await prisma.product.findUnique({
    where: {
      productID: id,
    },
  });
  return { props: { product } };
}

export default function Detail(props: any) {
  const [product, setProduct] = useState({ productID: props.product.productID, name: props.product.name, cost: props.product.cost, description: props.product.description });
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [isOpenToast, setIsOpenToast] = useState(false);

  const editHandler = () => {
    Router.push("/product/edit/" + props.product.productID);
  };

  const openModalHandler = () => {
    setIsOpenModal(true);
  };

  const closeModalHandler = () => {
    setIsOpenModal(false);
  };

  const deleteHandler = () => {
    setIsOpenModal(false);
    setIsOpenToast(true);
    console.log("anjeeng");
    setTimeout(() => {
      setIsOpenToast(false);
      Router.push("/");
    }, 3000);
  };
  // console.log(props.product)
  return (
    <>
      <Header />
      {isOpenModal && <DeleteProduct product={product} handleClose={closeModalHandler} deleteHandler={deleteHandler} />}
      {isOpenToast && (
        <div className={`absolute select-none bg-black bg-opacity-30 z-40 w-screen h-screen flex justify-center items-center`}>
          <div className={`font-semibold flex flex-col items-center justify-center w-[20%] h-[20%] bg-custom-darkBlue text-custom-lightGrey rounded-md gap-y-4`}>
            <p className="text-2xl">Product Deleted!</p>
            <p className="">Redirecting to main page</p>
          </div>
        </div>
      )}
      <div className="pt-28 lg:pt-36 text-center font-semibold text-lg md:text-xl lg:text-2xl">
        <h1>Product Detail</h1>
      </div>
      <div className="flex flex-col lg:flex-row mt-3 lg:mt-8 lg:justify-center lg:h-[65vh]">
        <div className="w-full h-[37vh] lg:h-full lg:w-[40%] flex flex-col items-center justify-center gap-y-4 lg:gap-y-16">
          <div className="relative w-full h-full lg:w-1/2 lg:h-1/2">
            <Image src={"/placeholder.png"} alt="img-template" layout="fill" objectFit="contain" />
          </div>
          <div className="flex gap-x-2 lg:gap-x-0 w-[70%]">
            <div className="relative w-1/3 h-[80px]">
              <Image src={"/placeholder.png"} alt="img-template" layout="fill" objectFit="contain" />
            </div>
            <div className="relative w-1/3 h-[80px]">
              <Image src={"/placeholder.png"} alt="img-template" layout="fill" objectFit="contain" />
            </div>
            <div className="relative w-1/3 h-[80px]">
              <Image src={"/placeholder.png"} alt="img-template" layout="fill" objectFit="contain" />
            </div>
          </div>
        </div>
        <div className="w-full lg:w-1/2 h-full flex flex-col gap-y-3 justify-between py-2 px-8 lg:px-0">
          <div className="space-y-3 mt-5">
            <p className="text-4xl lg:text-5xl font-bold text-custom-darkBlue">{product.name}</p>
            <p className="text-xl font-semibold">{product.cost}</p>
          </div>
          <p className="text-lg">
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Officia consequatur voluptatum quisquam iste dolorem, accusamus, animi, sit ea maxime voluptate ex nisi quod tempore! Molestias deleniti corporis explicabo praesentium
            voluptates.
          </p>
          <div className="flex lg:flex-col gap-x-5 lg:w-1/2 gap-y-4 mt-auto lg:mb-5 lg:text-xl">
            <button className="bg-custom-lightOrange hover:bg-[#e2910f] font-semibold transition text-white px-3 py-2 rounded-md" onClick={editHandler}>
              Edit Item
            </button>
            <button className="bg-white border-[2px] lg:border-[3px] hover:bg-[#f1f1f1] border-custom-lightOrange font-semibold transition text-custom-lightOrange px-4 py-2 rounded-md" type="reset" onClick={openModalHandler}>
              Delete Item
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

function DeleteProduct({ product, handleClose, deleteHandler }: { product: any; handleClose: any; deleteHandler: any }) {
  const { productID: id, name } = product;
  const deleteDataOnDB = (data: string) => {
    try {
      fetch("http://localhost:3000/api/product/deleteproduct", {
        body: data,
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
      });
    } catch (e) {
      console.log(e);
    }
  };
  const handleDelete = () => {
    deleteDataOnDB(id);
    deleteHandler();
  };
  return (
    <div className={`absolute select-none bg-black bg-opacity-30 z-40 w-screen h-screen flex justify-center items-center`}>
      <div className={`flex flex-col justify-center items-center px-32 py-20 bg-custom-darkBlue text-custom-lightGrey rounded-md select-none gap-y-3`}>
        <div className="flex flex-col gap-y-4 mb-4">
          <p className="text-2xl font-semibold">Are you sure you want to delete:</p>
          <hr />
          <div>
            <p className="text-xl font-medium text-custom-lightOrange">
              Product Name : <span className="text-white">{name}</span>
            </p>
            <p className="text-xl font-medium text-custom-lightOrange">
              Product ID : <span className="text-white">{name}</span>
            </p>
          </div>
        </div>
        <div className="flex gap-x-4">
          <button onClick={handleDelete} className="px-6 py-2 bg-custom-lightOrange rounded hover:bg-[#e2910f] font-semibold transition text-white">
            Yes
          </button>
          <button onClick={handleClose} className="px-4 py-2 rounded bg-custom-darkOrange hover:bg-[#d45133] font-semibold transition">
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
