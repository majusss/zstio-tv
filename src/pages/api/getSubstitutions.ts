import axios from "axios";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<{
    success: boolean;
    data: any;
  }>
) {
  const apiReq = (
    await axios.get("https://zastepstwa-zstio.netlify.app/api/getSubstitutions")
  ).data;
  res.status(200).json({ success: true, data: apiReq });
}
