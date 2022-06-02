import type { NextApiRequest, NextApiResponse } from "next";

import { prisma } from "../../../lib/prisma";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { email, quantity, productID, orderID } = req.body;
  try {
    await prisma.orders.createMany({
      data: req.body,
    });
    res.status(200).end();
  } catch (e) {
    console.log(e);
  }
}
