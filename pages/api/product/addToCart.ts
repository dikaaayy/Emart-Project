import type { NextApiRequest, NextApiResponse } from "next";

import { prisma } from "../../../lib/prisma";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { email, quantity, productID } = req.body;
  try {
    await prisma.cart.create({
      data: {
        productID,
        email,
        quantity,
      },
    });
    res.status(200).end();
  } catch (e) {
    console.log(e);
  }
}
