import type { NextApiRequest, NextApiResponse } from "next";

import { prisma } from "../../../lib/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { name, cost, description, productID, imageUrl, stock, email } =
    req.body;

  try {
    await prisma.product.create({
      data: {
        productID,
        name,
        description,
        cost,
        imageUrl,
        stock,
        email,
      },
    });
    res.status(200).end();
  } catch (e) {
    console.log(imageUrl);
    console.log(e);
  }
}
