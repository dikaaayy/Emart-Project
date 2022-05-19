import type { NextApiRequest, NextApiResponse } from "next";

import { prisma } from "../../../lib/prisma";


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