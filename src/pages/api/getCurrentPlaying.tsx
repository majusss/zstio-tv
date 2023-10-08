import type { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<{
    success: boolean;
    playing: boolean;
    image: string;
    title: string;
    artists: string;
  }>
) {
  const refreshToken = (
    await axios.get("https://cms.awfulworld.space/api/spotify", {
      headers: {
        Authorization: `bearer ${process.env.SPOTI_CMS_API_TOKEN}`,
      },
    })
  ).data;

  const authHeader = `Basic ${Buffer.from(
    `${process.env.SPOTI_ID}:${process.env.SPOTI_SECRET}`
  ).toString("base64")}`;

  const data = new URLSearchParams();
  data.append("grant_type", "refresh_token"); //TODO: REFRESH TOKEN FROM CMS
  data.append("refresh_token", refreshToken.data.attributes.refreshToken);
  // data.append("refresh_token", process.env.SPOTI_REFRESH_TOKEN as string);

  const accessReq = await axios.post(
    "https://accounts.spotify.com/api/token",
    data,
    {
      headers: {
        Authorization: authHeader,
        "Content-Type": "application/x-www-form-urlencoded",
      },
    }
  );

  const playerReq = await axios.get("https://api.spotify.com/v1/me/player", {
    headers: { Authorization: `Bearer ${accessReq.data.access_token}` },
    validateStatus: (code) => true,
  });

  res.status(200).json({
    success: true,
    playing: playerReq?.data?.is_playing || false,
    image: playerReq?.data?.item?.album?.images[0]?.url || "",
    title: playerReq?.data?.item?.name || "",
    artists:
      playerReq?.data?.item?.artists
        ?.map((artist: { name: string }) => artist.name)
        .join(", ") || "",
  });
}
