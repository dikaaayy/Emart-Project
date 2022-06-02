import type { NextApiRequest, NextApiResponse } from "next";

import { prisma } from "../../../lib/prisma";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { productID } = req.body;
  //   console.log(productID);
  //   let array: any[] = [];
  //   productID.forEach(async (id: any) => {
  //     try {
  //       const stock = await prisma.product.findMany({
  //         select: {
  //           stock: true,
  //         },
  //         where: {
  //           productID: id,
  //         },
  //       });
  //       array.push("1");
  //       console.log(stock[0].stock);
  //       // array.push(data[0]);
  //     } catch (e) {
  //       console.log(e);
  //     }
  //     array.push("1");
  //   });
  try {
    const data = await prisma.product.findMany({
      select: {
        stock: true,
      },
      where: {
        productID,
      },
    });
    res.send(data);
  } catch (e) {
    console.log(e);
  }
  //   console.log(array);
}
