import Image from "next/image";
import Link from "next/link";

export default function Header() {
  return (
    <div className="w-full fixed z-10 flex justify-between bg-[#16213b] px-4 py-3">
      <Link href={"/"} passHref>
        <a className="p-2 hover:bg-[#1d2b4d] rounded-lg transition">
          <Image src="/home.svg" alt="home" width="30" height="30" />
        </a>
      </Link>
      <div className="flex items-center w-36 h-12">
        <Image src="/logo.svg" alt="icon" width="480px" height="136px" />
      </div>
      <Link href={"/addProduct"} passHref>
        <a className="p-2 hover:bg-[#1d2b4d] rounded-lg flex items-center transition">
          <Image src="/add.svg" alt="home" width="30" height="30" />
        </a>
      </Link>
    </div>
  );
}
