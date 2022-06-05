import type { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";

import { prisma } from "../../../lib/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { email, quantity, productID } = req.body;
  const session = await getSession({ req });
  if (session) {
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
  } else {
    res.status(401);
  }
}
