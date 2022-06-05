import type { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";

import { prisma } from "../../../lib/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { id } = req.body;
  const session = await getSession({ req });

  if (session) {
    try {
      await prisma.cart.delete({
        where: {
          cartID: id,
        },
      });
      res.status(200).end();
    } catch (e) {
      console.log(e);
    }
  } else {
    return res.status(401);
  }
}
