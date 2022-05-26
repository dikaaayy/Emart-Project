import type { NextApiRequest, NextApiResponse } from "next";

import { prisma } from "../../../lib/prisma";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { name, cost, description, productID } = req.body;

  try {
    await prisma.product.create({
      data: {
        productID,
        name,
        description,
        cost,
      },
    });
  } catch (e) {
    console.log(e);
  }
}
