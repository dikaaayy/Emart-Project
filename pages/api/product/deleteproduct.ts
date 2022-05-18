import type { NextApiRequest, NextApiResponse } from "next";

import { prisma } from "../../../lib/prisma";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const ID = req.body;
  try {
    await prisma.product.delete({
      where: {
        productID: String(ID),
      },
    });
    res.status(200).json({ message: "succesfuly updated" });
  } catch (e) {
    console.log(e);
  }
}
