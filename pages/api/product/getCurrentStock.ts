import type { NextApiRequest, NextApiResponse } from "next";

import { prisma } from "../../../lib/prisma";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { productID } = req.body;
  try {
    const data = await prisma.product.findMany({
      select: {
        stock: true,
      },
      where: {
        productID: productID,
      },
    });
    res.send(data);
  } catch (e) {
    console.log(e);
  }
  //   console.log(array);
}
