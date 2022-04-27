import {
  HeaderAddProductButtonWrapper,
  HeaderContent,
  HeaderLogoWrapper,
  NavBar,
} from "../globalstyled";
import Image from "next/image";

export default function Header() {
  return (
    <NavBar>
      <HeaderContent>
        <Image src="/home.svg" alt="home" width="100%" height="100%"></Image>
        <HeaderLogoWrapper>
          <Image
            src="/placeholder.png"
            alt="icon"
            width="240px"
            height="60px"
          ></Image>
        </HeaderLogoWrapper>
        <HeaderAddProductButtonWrapper>
          <Image src="/add.svg" alt="add" width="35px" height="35px"></Image>
        </HeaderAddProductButtonWrapper>
      </HeaderContent>
    </NavBar>
  );
}
