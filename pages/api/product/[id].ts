import { NextApiRequest, NextApiResponse } from "next";
import { product} from "@prisma/client";
import { prisma } from "../../../lib/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const productId = req.query.id;

  if (req.method === "DELETE") {
    const product: product = await prisma.product.delete({
      where: {
        productID: Number(productId),
      },
    });
    res.json(product);
  } else {
    console.log("product cannot be deleted");
  }
}
