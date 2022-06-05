import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
import { prisma } from "../../../lib/prisma";
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { email, banner_url } = req.body;
  const session = await getSession({ req });
  if (session) {
    try {
      await prisma.customer.update({
        where: {
          email,
        },
        data: {
          banner_url,
        },
      });
      res.status(200).json({ message: "succesfuly updated" });
    } catch (e) {
      console.log(e);
    }
  } else {
    return res.status(401);
  }
}
