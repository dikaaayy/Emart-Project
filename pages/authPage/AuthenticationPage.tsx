import { getProviders, signIn } from "next-auth/react";
import { useRouter } from "next/router";
import Image from "next/image";
import Head from "next/head";

export default function SignIn({ providers }) {
  const router = useRouter();
  return (
    <>
      <Head>
        <title>Signin | Emart</title>
        <link rel="icon" href="/iconlogo.svg" />
      </Head>
      <div className="flex flex-col  w-full h-[100vh]">
        {/* <div className="flex self-center border-2 border-gray items-center w-36 h-12">
        <Image src="/logo.svg" alt="icon" width={800} height={800} />
      </div> jaga-jaga kalau mau add icon*/}
        <div className="flex item-center self-center py-[10%] justify-center flex-row">
          <div className="flex justify-center items-center flex-col border-2 border-gray h-[351px] rounded-xl min-w-[560px] mt-[80px]">
            <h1 className="text-4xl ">WELCOME BACK!</h1>
            <h2 className="text-slate-400 text-2xl">
              Please enter your details
            </h2>
            {Object.values(providers).map((provider) => (
              <div key={provider.name}>
                <button
                  className="flex flex-row  px-16 py-1 font-semibold text-black bg-white border-2 border-gray rounded-xl mt-[54px]  outline-none hover:bg-blue-50 hover:border-blue-400 focus:outline-none"
                  onClick={() => {
                    signIn(provider.id, {
                      callbackUrl: `${window.location.origin}`,
                    });
                  }}
                >
                  <Image
                    src={"/googleIcon.svg"}
                    alt={"/placeholder.png"}
                    width={29}
                    height={29}
                  ></Image>
                  <span className="px-2">Sign in with {provider.name}</span>
                </button>
              </div>
            ))}
          </div>
          <div className="flex ml-[123px]">
            <Image
              src={"/login.png"}
              width={353}
              height={505}
              alt={"/login.png"}
            ></Image>
          </div>
        </div>
      </div>
    </>
  );
}

export async function getServerSideProps(context) {
  const providers = await getProviders();
  return {
    props: { providers },
  };
}
