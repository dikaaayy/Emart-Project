import Image from "next/image";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";
import { useState } from "react";
import ProfileModal from "./ProfileModal";

export default function Header() {
  const { data: session } = useSession();
  const [isOpen, setIsOpen] = useState(false);
  // console.log(session?.user?.image);
  return (
    <div className="w-full fixed z-20 flex justify-between bg-[#16213b] px-6 py-3">
      <Link href={"/"} passHref>
        <a className="p-2 hover:bg-[#1d2b4d] rounded-lg transition">
          <Image src="/home.svg" alt="home" width="30" height="30" />
        </a>
      </Link>
      <div className="flex items-center w-36 h-12">
        <Image src="/logo.svg" alt="icon" width="480px" height="136px" />
      </div>
      <div className="flex items-center gap-x-2 relative">
        {/* <Link href={"/addProduct"} passHref>
          <a className="p-2 hover:bg-[#1d2b4d] rounded-lg flex items-center transition">
            <Image src="/add.svg" alt="home" width="30" height="30" />
          </a>
        </Link> */}
        <Link href={"/cart"} passHref>
          <a className="p-2 hover:bg-[#db9017] rounded-full flex items-center transition bg-custom-lightOrange">
            <Image src="/Vector.svg" alt="home" width="25" height="25" />
          </a>
        </Link>
        <button className="flex items-center" onClick={() => setIsOpen(!isOpen)}>
          <Image src={session?.user?.image!} alt={session?.user?.name!} width={45} height={45} className="rounded-full" />
        </button>
        {isOpen && <ProfileModal />}
      </div>
    </div>
  );
}
