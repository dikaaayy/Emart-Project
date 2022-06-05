import { NextApiRequest, NextApiResponse } from "next";
import { product} from "@prisma/client";
import { prisma } from "../../../lib/prisma";

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    const product: product[] = await prisma.product.findMany();
    res.json(product);
  } else {
    console.log("products not found");
  }
}
