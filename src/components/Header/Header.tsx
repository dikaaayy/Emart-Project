import { HeaderAddProductButtonWrapper, HeaderHomeIcon, HeaderLogoWrapper, NavBar } from "../globalstyled";
import Image from "next/image";
import Link from "next/link";

export default function Header() {
  return (
    <NavBar>
      <HeaderHomeIcon>
        <Link href={"/"} passHref>
          <a>
            <Image src="/home.svg" alt="home" width="30" height="30" />
          </a>
        </Link>
      </HeaderHomeIcon>
      <HeaderLogoWrapper>
        <Image src="/logo.svg" alt="icon" width="480px" height="136px" />
      </HeaderLogoWrapper>
      <HeaderAddProductButtonWrapper>
        <Link href={"/addProduct"} passHref>
          <a>
            <Image src="/add.svg" alt="home" width="30" height="30" />
          </a>
        </Link>
      </HeaderAddProductButtonWrapper>
    </NavBar>
  );
}
