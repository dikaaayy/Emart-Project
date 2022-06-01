
import {
  HeaderAddProductButtonWrapper,
  HeaderHomeIcon,
  HeaderLogoWrapper,
  NavBar,
} from "../globalstyled";
import Image from "next/image";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
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
      </HeaderLogoWrapper>
      <HeaderAddProductButtonWrapper>
        <Link href={"/addProduct"} passHref>
          <a>
            <Image src="/add.svg" alt="home" width="30" height="30" />
          </a>
        </Link>
      </HeaderAddProductButtonWrapper>
      {/* Added Only For testing purposes :)) Feel free to delete after*/}
      <div>
        <button className="text-white" onClick={() => signOut()}>
          Sign Out
        </button>
      </div>
    </NavBar>
  );
}
