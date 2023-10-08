import type { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";
import https from "https";
import cheerio from "cheerio";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<{
    success: boolean;
    cytat: { content: string; author: string };
  }>
) {
  const cytatRes = await axios.get("https://www.kalendarzswiat.pl/cytat_dnia", {
    httpsAgent: new https.Agent({
      rejectUnauthorized: false,
    }),
  });

  const $ = cheerio.load(cytatRes.data);

  const match = $(".quote-of-the-day")
    .first()
    .text()
    .trim()
    .match(/„([^”]+)”\s+([^\n]+)/);

  if (match) {
    const content = match[1].trim();
    const author = match[2].trim();
    return res.status(200).json({
      success: true,
      cytat: {
        content: content,
        author: author,
      },
    });
  } else {
    return res.status(200).json({
      success: false,
      cytat: { content: "Brak cytatu na dziś", author: "~" },
    });
  }
}
