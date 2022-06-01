import type { NextApiRequest, NextApiResponse } from "next";

import { prisma } from "../../../lib/prisma";
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { email, name, profile_picture } = req.body;

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
}
