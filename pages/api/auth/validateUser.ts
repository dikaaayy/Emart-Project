//used to validate if user exists in DB or not
import { NextApiRequest, NextApiResponse } from "next";
import { product } from "@prisma/client";
import { prisma } from "../../../lib/prisma";
import { responseSymbol } from "next/dist/server/web/spec-compliant/fetch-event";

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { email } = req.query;
  try {
    if (req.method === "GET") {
      let placeCount = await prisma.customer.count({
        where: {
          email: email as string,
        },
      });
      return res.status(200).json({ count: placeCount });
    }
  } catch (e) {
    return res.json(e);
  }
}
