import type { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";

import { prisma } from "../../../lib/prisma";
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { email, name, profile_picture } = req.body;
  const session = await getSession({ req });
  if (session) {
    try {
      await prisma.customer.create({
        data: {
          email,
          name,
          profile_picture,
        },
      });
      return res.status(200).json({ message: "succesfuly created" });
    } catch (e) {
      return res.json(e);
    }
  } else {
    return res.status(401);
  }
}
