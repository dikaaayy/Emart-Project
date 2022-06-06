import { profile } from "console";
import { Session } from "next-auth/core/types";
import Image from "next/image";
import { useEffect, useState } from "react";
import { updateBannerToDb } from "../../database/updateDB";
import { updateBanner } from "../../firebase/firebase";
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
  useEffect(() => {
    if (props.bannerUrl !== null) {
      setImageString(props.bannerUrl!);
    }
    if (props.profile_picture !== null) {
      if (props.profile_picture.includes(":") === true) {
        setProfilePicture(props.profile_picture!);
      }
    }
  }, [props.bannerUrl, props.profile_picture]);
  const [imageString, setImageString] = useState<string>("/defaultBanner.png");
  const [profilePicture, setProfilePicture] =
    useState<string>("/placeholder.png");

  const submitImagetoDatabase = async (file: any) => {
    if (file.target.files && file.target.files[0]) {
      setImageString(URL.createObjectURL(file.target.files[0]));
      console.log(file.target.files[0]);
      updateBanner(
        file.target.files[0] as File,
        props.email!,
        updateBannerToDb
      );
    }
  };
  return (
    <div className="w-full overflow-x-clip h-[40vh] pl-24 md:pl-36 lg:pl-48 pt-32 flex pb-10 items-center relative bg-center">
      <div className="w-full h-full absolute left-0 top-0 -z-10 blur-[1.2px]">
        <Image
          src={imageString}
          alt={"/defaultBanner.png"}
          objectFit="cover"
          layout="fill"
        />
      </div>
      <div className="flex gap-x-10 bg-white py-2 pl-4 pr-12 rounded-lg bg-opacity-70">
      <Image
        src={profilePicture}
        alt="home"
        width={120}
        height={120}
        className="rounded-full self-center"
        priority
        layout="fixed"
      />
      <div className="self-center space-y-1 py-2">
        <Image src="/homeBlack.svg" alt="home" width={40} height={40} />
        <p className="text-3xl font-bold">{props.name} Store</p>
        <p className="text-lg">{productLength(props.product_length)}</p>
        {props.session?.user?.email === props.email &&
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
        }
      </div>
      </div>
    </div>
  );
}
