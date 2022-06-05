import type { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";

import { prisma } from "../../../lib/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getSession({ req });
  const ID: string = req.body;
  if (session) {
    try {
      await prisma.product.delete({
        where: {
          productID: ID,
        },
      });
      res.status(200).json({ message: "succesfuly updated" });
    } catch (e) {
      console.log(e);
    }
  } else {
    res.status(401);
  }
}
