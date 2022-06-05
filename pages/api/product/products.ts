import { NextApiRequest, NextApiResponse } from "next";
import { product } from "@prisma/client";
import { prisma } from "../../../lib/prisma";
import { getSession } from "next-auth/react";

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getSession({ req });
  if (session) {
    if (req.method === "GET") {
      const product: product[] = await prisma.product.findMany();
      res.json(product);
    } else {
      console.log("products not found");
    }
  } else {
    return res.status(401);
  }
}
