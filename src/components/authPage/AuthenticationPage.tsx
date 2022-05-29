import { useSession, signIn } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/router";
export default function Component() {
  const { data: session } = useSession();
  const router = useRouter();
  if (!session) {
    return (
      <>
        Not signed in <br />
        <button onClick={() => signIn()}>Sign in</button>
      </>
    );
  } else {
    return <>{router.push("/")}</>;
  }
}
