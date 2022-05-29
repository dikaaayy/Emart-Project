import { CardBox, CardImage, ProductName } from "./styled";
import Image from "next/image";
import Router from "next/router";

type ProductCardProps = {
  productId: string | null;
  productName: string | null;
  productPrice: string | null;
};
export default function ProductCard(props: ProductCardProps) {
  return (
    <CardBox
      onClick={() => {
        Router.push("/product/" + props.productId);
      }}
    >
      <CardImage>
        <Image
          alt="/placeholder.png"
          src={"/placeholder.png"}
          width="100%"
          height="100%"
          layout="fill"
          objectFit="cover"
        ></Image>
        <ProductName>
          <span>{props.productName}</span>
          <strong>{props.productPrice}</strong>
        </ProductName>
      </CardImage>
    </CardBox>
  );
}
