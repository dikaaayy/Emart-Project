import type { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
import { json } from "stream/consumers";

import { prisma } from "../../../lib/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { orderID, status } = req.body;
  const session = await getSession({ req });
  if (session) {
    try {
      await prisma.orders.update({
        where: {
          orderID,
        },
        data: {
          status,
        },
      });
      return res.status(200).json({ message: "Update Sucessfull" });
    } catch (e) {
      console.log(e);
    }
  } else {
    return res.status(401);
  }
}
