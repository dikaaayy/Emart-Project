import { getSession } from "next-auth/react";
import Backdrop from "./Backdrop";
import { prisma } from "../../../lib/prisma";

// export async function getServerSideProps() {
//   const stock = await prisma.product.findMany({
//     select: {
//       stock: true,
//     },
//   });
//   return {
//     props: { stock },
//   };
// }

export default function CartModal({ handleClose, data }: { handleClose: any; data: any[] }) {
  //   console.log(data);
  //   console.log(stock);
  const handleYes = () => {};
  return (
    <Backdrop onClick={handleClose}>
      <div className="w-1/2 h-1/2 bg-white rounded-md p-10 space-y-7 flex flex-col justify-between select-none" onClick={(e) => e.stopPropagation()}>
        <div>
          <p className="text-2xl font-medium mb-5">Check your purchase first!</p>
          {data.map((item, i) => {
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
