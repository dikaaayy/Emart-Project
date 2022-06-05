import type { NextApiRequest, NextApiResponse } from "next";

import { prisma } from "../../../lib/prisma";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.body;
  // console.log(id);

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
}
