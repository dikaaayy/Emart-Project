import { NextApiRequest, NextApiResponse } from "next";
import { product, PrismaClient, Prisma } from "@prisma/client";

const prisma = new PrismaClient();

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
