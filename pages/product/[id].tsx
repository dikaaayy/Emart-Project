import Header from "../../src/components/Header/Header";
import { prisma } from "../../lib/prisma";
import { useState } from "react";
import Image from "next/image";
import Router, { useRouter } from "next/router";
import Head from "next/head";
import { getSession, useSession } from "next-auth/react";
import Link from "next/link";
import firstname from "../../src/helper/returnfirstname";
import Protected from "../../src/components/Protected/Protected";

export async function getServerSideProps(context: any) {
  const { id } = context.params;
  const session = await getSession(context);
  if (!session) {
    return {
      redirect: {
        permanent: false,
        destination: "/",
      },
    };
  }
  const product = await prisma.product.findUnique({
    where: {
      productID: id,
    },
    include: {
      Customer: true,
    },
  });
  return { props: { product } };
}

export default function Detail(props: any) {
  const [product, setProduct] = useState({
    productID: props.product.productID,
    name: props.product.name,
    cost: props.product.cost,
    description: props.product.description,
  });
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isOpenToast, setIsOpenToast] = useState(false);
  const [isAddToCartToast, setIsAddToCartToast] = useState(false);
  const { data: session } = useSession();
  const [quantity, setQuantity] = useState(1);
  const router = useRouter();

  // console.log(props);

  const editHandler = () => {
    router.push("/product/edit/" + props.product.productID);
  };

  const openModalHandler = () => {
    setIsDeleteModalOpen(true);
  };

  const closeModalHandler = () => {
    setIsDeleteModalOpen(false);
  };
  const returnImageUrl = (imageUrl: string | null): string => {
    if (imageUrl === null) {
      return "/placeholder.png";
    } else {
      return imageUrl as string;
    }
  };

  const addCartHandler = () => {
    try {
      fetch("http://localhost:3000/api/product/addToCart", {
        body: JSON.stringify({
          quantity,
          email: session?.user?.email,
          productID: product.productID,
        }),
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
      });
    } catch (e) {
      console.log(e);
    }
    setIsAddToCartToast(true);
    setTimeout(() => {
      setIsAddToCartToast(false);
    }, 3000);
  };

  const deleteHandler = () => {
    setIsDeleteModalOpen(false);
    setIsOpenToast(true);
    setTimeout(() => {
      setIsOpenToast(false);
      router.push("/");
    }, 4000);
  };
  return (
    <>
      <Head>
        <title>{product.name} | Detail Product</title>
      </Head>
      <Header />
      {isDeleteModalOpen && (
        <DeleteProduct
          product={product}
          handleClose={closeModalHandler}
          deleteHandler={deleteHandler}
        />
      )}
      {isOpenToast && (
        <div
          className={`absolute select-none bg-black bg-opacity-30 z-40 w-screen h-screen flex justify-center items-center`}
        >
          <div
            className={`font-semibold flex flex-col items-center justify-center w-[20%] h-[20%] bg-custom-darkBlue text-custom-lightGrey rounded-md gap-y-4`}
          >
            <p className="text-2xl">Product Deleted!</p>
            <p className="">Redirecting to main page</p>
          </div>
        </div>
      )}
      {isAddToCartToast && (
        <div className="fixed left-0 right-0 w-1/4 h-[7%] bg-custom-lightOrange rounded-md top-28 mx-auto flex justify-center items-center">
          <p className="text-lg font-semibold text-custom-darkBlue ">
            Item added to cart!
          </p>
        </div>
      )}
      <div className="pt-28 lg:pt-36 text-center font-semibold text-lg md:text-xl lg:text-2xl">
        <h1>Product Detail</h1>
      </div>
      <div className="flex flex-col  mt-3 justify-center items-center md:flex-row">
        <div className="flex flex-col mr-10">
          <div className="w-[400px] h-[400px] items-center">
            <Image
              src={returnImageUrl(props.product.imageUrl)}
              alt="img-template"
              width={700}
              height={700}
            />
          </div>
          <div className="flex flex-row rounded-lg mt-10">
            <Link href={"/store/" + props.product.email} passHref>
              <div className="border-2 border-black flex flex-row items-center px-2 py-2 hover:bg-slate-100 cursor-pointer rounded-lg">
                <Image src="/homeBlack.svg" alt="home" width={34} height={34} />
                <span className="text-black px-2">
                  {`${firstname(props.product.Customer.name)}'s`} Store
                </span>
              </div>
            </Link>
          </div>
        </div>
        <div className="w-full lg:w-1/2 h-full flex flex-col gap-y-3 justify-between py-2 px-8 lg:px-0">
          <div className="space-y-3 mt-5">
            <p className="text-4xl lg:text-5xl font-bold text-custom-darkBlue">
              {product.name}
            </p>
            <p className="text-xl font-semibold">
              Rp{" "}
              {parseInt(product.cost).toLocaleString("en-US", {
                maximumFractionDigits: 2,
              })}
            </p>
            <p className="text-lg">{product.description}</p>
          </div>
          {props.product.email === session?.user?.email ? (
            <>
              <p className="font-medium text-2xl">
                Stock: {props.product.stock}
              </p>
              <div className="flex lg:flex-col gap-x-5 lg:w-[80%] gap-y-4 lg:mb-5 lg:text-xl lg:mx-auto">
                <button
                  className="bg-custom-lightOrange hover:bg-[#e2910f] font-semibold transition text-white px-3 py-2 rounded-md"
                  onClick={editHandler}
                >
                  Edit Item
                </button>
                <button
                  className="flex flex-col items-center justify-center bg-white border-[2px] lg:border-[3px] hover:bg-[#f1f1f1] border-[#F05E3E] font-semibold transition text-[#F05E3E] px-4 py-2 rounded-md"
                  type="reset"
                  onClick={openModalHandler}
                >
                  <span>Delete Item</span>
                </button>
              </div>
            </>
          ) : (
            <>
              <p className="font-medium text-2xl">
                Stock: {props.product.stock}
              </p>
              <div className="flex flex-col items-end gap-y-3">
                <div className="flex gap-x-2 select-none">
                  <button
                    onClick={() => setQuantity(quantity - 1)}
                    disabled={quantity === 1}
                    className={`${quantity === 1 ? "opacity-40" : ""}`}
                  >
                    <Image
                      src={"/minus.svg"}
                      width={30}
                      height={30}
                      alt="minus"
                    />
                  </button>
                  <p className="text-xl font-medium">{quantity}</p>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    disabled={quantity === props.product.stock}
                    className={`${
                      quantity === props.product.stock ? "opacity-40" : ""
                    }`}
                  >
                    <Image
                      src={"/plus.svg"}
                      width={30}
                      height={30}
                      alt="minus"
                    />
                  </button>
                </div>
                <p className="text-2xl font-semibold">
                  Rp{" "}
                  {(parseInt(product.cost) * quantity).toLocaleString("en-US", {
                    maximumFractionDigits: 2,
                  })}
                </p>
                <div className="flex justify-end gap-x-5 lg:w-[30%] gap-y-4 lg:text-lg">
                  <button
                    className="bg-custom-lightOrange hover:bg-[#e2910f] font-semibold transition text-white px-8 py-2 rounded-md"
                    onClick={addCartHandler}
                  >
                    Add To Cart
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}

function DeleteProduct({
  product,
  handleClose,
  deleteHandler,
}: {
  product: any;
  handleClose: any;
  deleteHandler: any;
}) {
  const { productID: id, name } = product;
  const deleteDataOnDB = (data: string) => {
    try {
      fetch("http://localhost:3000/api/product/deleteproduct", {
        body: JSON.stringify(data),
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
    <div
      className={`absolute select-none bg-black bg-opacity-30 z-40 w-screen h-[110vh] md:h-screen flex justify-center items-center`}
    >
      <div
        className={`flex flex-col justify-center items-center px-10 sm:px-16 py-8 md:px-24 md:py-12 lg:px-32 lg:py-20 bg-custom-darkBlue text-custom-lightGrey rounded-md select-none gap-y-3`}
      >
        <div className="flex flex-col gap-y-4 mb-4">
          <p className="text-2xl font-semibold">
            Are you sure you want to delete:
          </p>
          <hr />
          <div>
            <p className="text-xl font-medium text-custom-lightOrange">
              Product Name : <span className="text-white">{name}</span>
            </p>
            <p className="text-xl font-medium text-custom-lightOrange">
              Product ID : <span className="text-white">{id}</span>
            </p>
          </div>
        </div>
        <div className="flex gap-x-4">
          <button
            onClick={handleDelete}
            className="px-6 py-2 bg-custom-lightOrange rounded hover:bg-[#e2910f] font-semibold transition text-white"
          >
            Yes
          </button>
          <button
            onClick={handleClose}
            className="px-4 py-2 rounded bg-custom-darkOrange hover:bg-[#d45133] font-semibold transition"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
