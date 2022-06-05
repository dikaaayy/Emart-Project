import Backdrop from "./Backdrop";
import { uid } from "uid";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

export default function CartModal({ handleClose, data }: { handleClose: any; data: any[] }) {
  const [checkout, setCheckout] = useState<any>(data);
  const router = useRouter();

  const handleYes = async () => {
    const arr = [...data];
    const newArray: any[] = [];
    arr.forEach((item: any, i: any) => {
      newArray.push({ ...item, orderID: String(uid(20 + i)), stock: item.product.stock });
    });
    newArray.forEach((item: any, i: any) => {
      delete item.cartID;
      delete item.product;
    });
    console.log(newArray);
    try {
      await fetch("http://localhost:3000/api/product/addToOrder", {
        body: JSON.stringify(newArray),
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
      });
      console.log(newArray);
    } catch (e) {
      console.log(e);
    }
    router.push("/cart?success=true");
    handleClose();
  };
  return (
    <Backdrop onClick={handleClose}>
      <div className="w-1/2 h-1/2 bg-white rounded-md p-10 space-y-7 flex flex-col justify-between select-none" onClick={(e) => e.stopPropagation()}>
        <div>
          <p className="text-2xl font-medium mb-5">Check your purchase first!</p>
          {checkout.map((item: any, i: number) => {
            return (
              <div className="flex gap-x-2" key={i}>
                <p className="font-medium">{i + 1}.</p>
                <p>{item.product.name}</p>
              </div>
            );
          })}
        </div>
        <div className="mt-auto space-y-2">
          <p className="text-lg">Are you sure you want to buy all the item above?</p>
          <div className="space-x-3">
            <button className="bg-white border-2 hover:bg-[#f5f5f5] border-custom-lightOrange font-semibold transition text-custom-lightOrange px-2 py-2 rounded-md" onClick={handleClose}>
              Cancel
            </button>
            <button className="bg-custom-lightOrange hover:bg-[#ee9f1f] font-semibold transition text-white px-7 py-2 rounded-md border-custom-lightOrange border-2" onClick={handleYes}>
              Yes
            </button>
          </div>
        </div>
      </div>
    </Backdrop>
  );
}
