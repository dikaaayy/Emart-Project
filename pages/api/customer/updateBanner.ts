import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../lib/prisma";
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { email, banner_url } = req.body;

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
}
