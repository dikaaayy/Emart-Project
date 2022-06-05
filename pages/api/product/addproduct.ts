import type { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";

import { prisma } from "../../../lib/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { name, cost, description, productID, imageUrl, stock, email } =
    req.body;
  const session = await getSession({ req });
  if (session) {
    try {
      await prisma.product.create({
        data: {
          productID,
          name,
          description,
          cost,
          imageUrl,
          stock,
          email,
        },
      });
      res.status(200).end();
    } catch (e) {
      console.log(imageUrl);
      console.log(e);
    }
  } else {
    res.status(401);
  }
}
