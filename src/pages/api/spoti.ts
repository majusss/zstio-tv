import type { NextApiRequest, NextApiResponse } from "next";
import querystring from "querystring";

const generateRandomString = (length: number): string => {
  let text = "";
  const possible =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  for (var i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  res.redirect(
    "https://accounts.spotify.com/authorize?" +
      querystring.stringify({
        response_type: "code",
        client_id: process.env.SPOTI_ID,
        scope: "user-read-playback-state",
        redirect_uri: process.env.SERVER_URL + "/api/auth_spoti",
        state: generateRandomString(16),
      })
  );
}
