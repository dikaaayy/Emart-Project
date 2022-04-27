import { CardBox, CardImage, ProductName } from "./styled";
import Image from "next/image";
type ProductCardProps = {
  productName: string | null;
  productPrice: string | null;
};
export default function ProductCard(props: ProductCardProps) {
  return (
    <CardBox>
      <CardImage>
        <Image
          alt="placeholder"
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
