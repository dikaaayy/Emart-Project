import type { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";

import { prisma } from "../../../lib/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { productID } = req.body;
  const session = await getSession({ req });
  if (session) {
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
  } else {
    return res.status(401);
  }
  //   console.log(array);
}
