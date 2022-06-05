import type { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";

import { prisma } from "../../../lib/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { searchName } = req.body;
  const session = await getSession({ req });
  if (session) {
    try {
      const response = await prisma.product.findMany({
        where: {
          name: {
            contains: searchName,
          },
        },
      });
      res.send(response);
    } catch (e) {
      console.log(e);
    }
  } else {
    return res.json(401);
  }
}
