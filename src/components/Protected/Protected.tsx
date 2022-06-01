import { useSession, getSession } from "next-auth/react";
import React from "react";
import AuthenticationPage from "../authPage/AuthenticationPage";
import { prisma } from "../../../lib/prisma";
import axios from "axios";

type ProtectedProps = {
  children: JSX.Element | JSX.Element[];
};

const Protected = (props: ProtectedProps) => {
  const { data: session, status } = useSession();
  if (status === "loading") {
    return <p>Loading...</p>;
  }
  if (status === "unauthenticated") {
    return <AuthenticationPage></AuthenticationPage>;
  }
  return <React.Fragment>{props.children}</React.Fragment>;
};
export default Protected;
