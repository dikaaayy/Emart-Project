import Image from "next/image";
import Link from "next/link";
import Searchbar from "./Searchbar";

export default function Header() {
  return (
    <div className="w-full fixed z-10">
      <div className="flex justify-between w-full bg-[#16213b] p-4">
        <div className="flex items-center cursor-pointer">
          <Link href={"/"} passHref>
            <a>
              <Image src="/home.svg" alt="home" width="30" height="30" />
            </a>
          </Link>
        </div>
        <div className="flex justify-center w-36 h-12">
          <Image src="/logo.svg" alt="icon" width="480px" height="136px" />
        </div>
        <div className="flex items-center cursor-pointer font-medium text-white">
          <Link href={"/addProduct"} passHref>
            <a>
              <Image src="/add.svg" alt="home" width="30" height="30" />
            </a>
          </Link>
        </div>
      </div>
      {/* <Searchbar /> */}
    </div>
  );
}
