import { HeaderAddProductButtonWrapper, HeaderHomeIcon, HeaderLogoWrapper, NavBar } from "../globalstyled";
import Image from "next/image";
import Link from "next/link";

export default function Header() {
  return (
    <NavBar>
      <HeaderHomeIcon>
        <Link href={"/"} passHref>
          <Image src="/home.svg" alt="home" width="30" height="30" />
        </Link>
      </HeaderHomeIcon>
      <HeaderLogoWrapper>
        <Image src="/placeholder.png" alt="icon" width="240px" height="60px"></Image>
      </HeaderLogoWrapper>
      <HeaderAddProductButtonWrapper>
        <Link href={"/addProduct"} passHref>
          <Image src="/add.svg" alt="home" width="30" height="30" />
        </Link>
      </HeaderAddProductButtonWrapper>
    </NavBar>
  );
}
