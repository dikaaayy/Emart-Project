import type { NextApiRequest, NextApiResponse } from "next";

import { PrismaClient, Prisma } from "@prisma/client";

const prisma = new PrismaClient();

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    const product: Prisma.productCreateInput = JSON.parse(req.body);
    const savedProduct = await prisma.product.create({ data: product });
    res.status(200).json(savedProduct);
  } catch (err) {
    res.status(400).json({ message: "Something went wrong" });
  }
};
