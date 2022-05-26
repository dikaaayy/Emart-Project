import { useSession, signIn, signOut } from "next-auth/react";
import Image from "next/image";
export default function Component() {
  const { data: session } = useSession();
  if (session) {
    return (
      <>
        Signed in as {session.user!.email} <br />
        <Image width={20} height={20} src={`${session.user?.image}`}></Image>
        <button onClick={() => signOut()}>Sign out</button>
      </>
    );
  }
  return (
    <>
      Not signed in <br />
      <button onClick={() => signIn()}>Sign in</button>
    </>
  );
}
