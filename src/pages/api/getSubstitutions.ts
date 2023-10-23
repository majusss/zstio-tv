import axios from "axios";
import NodeCache from "node-cache";
import type { NextApiRequest, NextApiResponse } from "next";

const cache = new NodeCache({ stdTTL: 10800 });

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<{
    success: boolean;
    data: any;
  }>
) {
  const cachedData = cache.get("substitutions");

  if (cachedData && new Date().getHours() < 19) {
    res.status(200).json({ success: true, data: cachedData });
  } else {
    try {
      const apiReq = (
        await axios.get(
          "https://zastepstwa.awfulworld.space/api/getSubstitutions"
        )
      ).data;

      cache.set("substitutions", apiReq);

      res.status(200).json({ success: true, data: apiReq });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, data: "Wystąpił błąd." });
    }
  }
}
