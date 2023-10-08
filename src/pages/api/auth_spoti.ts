import type { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<{
    success: boolean;
    data: any;
  }>
) {
  if (!req.query.code)
    return res.status(200).json({ success: false, data: "" });
  const data = {
    client_id: process.env.SPOTI_ID,
    client_secret: process.env.SPOTI_SECRET,
    grant_type: "authorization_code",
    code: req.query.code,
    redirect_uri: process.env.SERVER_URL + "/api/auth_spoti",
  };

  const reqRefresh = await axios.post(
    "https://accounts.spotify.com/api/token",
    null,
    {
      params: data,
    }
  );

  res.status(200).json({ success: true, data: reqRefresh.data });
}
