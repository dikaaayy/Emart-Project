import { getProviders, signIn } from "next-auth/react";
import { useRouter } from "next/router";

export default function SignIn({ providers }) {
  const router = useRouter();
  return (
    <>
      {Object.values(providers).map((provider) => (
        <div key={provider.name}>
          <button
            className="px-6 py-3 mt-4 font-semibold text-gray-900 bg-white border-2 border-gray-500rounded-md shadow outline-none hover:bg-blue-50 hover:border-blue-400 focus:outline-none"
            onClick={() => {
              signIn(provider.id, {
                callbackUrl: `${window.location.origin}`,
              });
            }}
          >
            Sign in with {provider.name}
          </button>
        </div>
      ))}
    </>
  );
}

export async function getServerSideProps(context) {
  const providers = await getProviders();
  return {
    props: { providers },
  };
}
