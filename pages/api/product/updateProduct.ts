import type { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";

import { prisma } from "../../../lib/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { name, cost, description, productID, imageUrl, stock } = req.body;
  const session = await getSession({ req });
  if (session) {
    try {
      await prisma.product.update({
        where: {
          productID,
        },
        data: {
          name,
          cost,
          description,
          stock: parseInt(stock),
          imageUrl,
        },
      });
      res.status(200).json({ message: "succesfuly updated" });
    } catch (e) {
      console.log(e);
    }
  } else {
    return res.json(401);
  }
}
