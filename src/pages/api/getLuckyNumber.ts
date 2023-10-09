import type { NextApiRequest, NextApiResponse } from "next";
const { Keystore, AccountTools, VulcanHebe } = require("vulcan-api-js");

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<{
    success: boolean;
    luckyNumber: number;
  }>
) {
  const keystore = new Keystore();
  keystore.loadFromObject(
    JSON.parse(
      Buffer.from(process.env.VULCAN_KEYSTORE as string, "base64").toString(
        "utf8"
      )
    )
  );
  const account = AccountTools.loadFromObject(
    JSON.parse(
      Buffer.from(process.env.VULCAN_ACCOUNT as string, "base64").toString(
        "utf8"
      )
    )
  );
  const client = new VulcanHebe(keystore, account);
  await client.selectStudent();
  const luckyNumber = (await client.getLuckyNumber()).number;
  return res.status(200).json({
    success: true,
    luckyNumber,
  });
}
