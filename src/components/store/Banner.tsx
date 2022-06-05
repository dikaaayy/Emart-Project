import { Session } from "next-auth/core/types";
import Image from "next/image";
import { useState } from "react";
import { Product } from "../../helper/types";

type BannerProps = {
  profile_picture: string;
  name: string;
  bannerUrl: string | undefined;
  product_length: number;
  session: Session;
  email: string;
};
const productLength = (len: number) => {
  if (len > 1) {
    return len + " products";
  } else {
    return len + " product";
  }
};

export default function Banner(props: BannerProps) {
  const [imageString, setImageString] = useState<string>(props.bannerUrl!);
  const [imageFile, setImageFile] = useState<File>();

  const submitImagetoDatabase = (file: any) => {
    if (file.target.files && file.target.files[0]) {
      setImageFile(file.target.files[0]);
      setImageString(URL.createObjectURL(file.target.files[0]));
    }
  };
  return (
    <div className="w-full overflow-x-clip h-[40vh] pl-24 md:pl-48 pt-32 flex pb-10 items-center gap-x-4 relative bg-center">
      <div className="w-full h-full absolute left-0 top-0 -z-10 blur-[1.2px]">
        <Image
          src={props.bannerUrl === null ? "/defaultBanner.png" : imageString}
          alt={"/defaultBanner.png"}
          objectFit="cover"
          layout="fill"
        ></Image>
      </div>
      <Image
        src={props.profile_picture}
        alt="home"
        width={120}
        height={120}
        className="rounded-full self-center"
        priority
        layout="fixed"
      />
      <div className="self-center space-y-1">
        <Image src="/homeBlack.svg" alt="home" width={40} height={40} />
        <p className="text-3xl font-bold">{props.name} Store</p>
        <p className="text-lg">{productLength(props.product_length)}</p>
        {props.session?.user?.email === props.email ? (
          <div className="bg-white rounded-3xl absolute right-7 bottom-7 transition hover:bg-[#f1f1f1]">
            <label
              htmlFor="imgUpload"
              className="font-bold cursor-pointer py-1 px-5 flex items-center gap-x-3"
            >
              Upload Banner
              <Image src="/Upload.svg" alt="home" width={25} height={25} />
            </label>
            <input
              id="imgUpload"
              type="file"
              accept="image/png, image/jpeg"
              className="hidden"
              onChange={submitImagetoDatabase}
            />
          </div>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
}
