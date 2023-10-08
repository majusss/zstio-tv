import type { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<{
    success: boolean;
    icon: string;
    temperature: string;
  }>
) {
  const apiReq = await axios.get(
    "http://api.weatherapi.com/v1/current.json?key=667dc15b610d47ddb18190743232409&q=jaroslaw&aqi=no"
  );
  res.status(200).json({
    success: true,
    icon: apiReq.data.current.condition.icon,
    temperature: apiReq.data.current.feelslike_c + "°C",
  });
}
