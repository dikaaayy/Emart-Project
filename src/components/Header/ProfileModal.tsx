import { signOut } from "next-auth/react";
import { useRouter } from "next/router";

export default function ProfileModal(props: any) {
  const router = useRouter();
  return (
    <div className="bg-custom-lightOrange space-y-3 text-custom-darkBlue font-medium absolute top-[65px] z-20 min-w-max left-8 rounded-b-lg overflow-hidden">
      <p
        className="cursor-pointer hover:bg-[#db9017] p-2"
        onClick={() => {
          router.push("/addProduct");
        }}
      >
        Add Product
      </p>
      <p
        className="cursor-pointer hover:bg-[#db9017] p-2"
        onClick={() => {
          router.push("/order");
        }}
      >
        My Order
      </p>
      <p
        className="cursor-pointer hover:bg-[#db9017] p-2"
        onClick={() => {
          router.push("/store/" + props.store);
        }}
      >
        My Store
      </p>
      <p className="cursor-pointer hover:bg-[#db9017] p-2" onClick={() => signOut()}>
        Sign Out
      </p>
    </div>
  );
}
