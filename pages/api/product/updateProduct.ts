import type { NextApiRequest, NextApiResponse } from "next";

import { PrismaClient, Prisma } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { name, cost, description, productID } = req.body;
  
    try {
      await prisma.product.update({
          where:{
              productID,
          },
          data:{
              name,
              cost,
              description
          }
      })
      res.status(200).json({ message: "succesfuly updated" });
    } catch (e) {
      console.log(e);
    }
  }