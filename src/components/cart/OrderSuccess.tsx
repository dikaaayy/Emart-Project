import Image from "next/image";
import Link from "next/link";

export default function OrderSuccess() {
  return (
    <div className="w-[99.1vw] fixed bg-white z-10 space-y-8 text-custom-darkBlue -mt-10 h-[85vh] flex flex-col items-center justify-center select-none">
      <div className="text-center">
        <Image src={"/orderSuccess.svg"} width={400} height={400} alt="motorbike" />
        <p className="text-3xl font-semibold">We got your order!</p>
        <p className="text-xl text-[#636364]">The transaction was succesfull</p>
      </div>
      <Link href="/">
        <a className="px-20 text-white mt-10 font-medium rounded-md text-lg py-2 bg-custom-lightOrange">Browse more item</a>
      </Link>
    </div>
  );
}
