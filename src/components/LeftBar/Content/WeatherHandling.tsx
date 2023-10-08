import axios from "axios";
import useSWR from "swr";

async function fetchData() {
  const res = await axios.get(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/api/getWeather`
  );

  const { icon, temperature } = res.data;

  return { icon, temperature };
}

export default function WeatherHandling() {
  const { data } = useSWR(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/api/getWeather`,
    fetchData
  );

  return (
    <div
      className={
        "flex rounded-lg mb-4 text-gray-200 bg-[#0e0e0e] border-[#272727] text-lg border-[1px] items-center justify-center w-[86%] h-[8vh]"
      }
    >
      <img src={data?.icon} width={50} height={50} className="mr-2" />
      <h1 className="font-semibold text-2xl">Jarosław:</h1>
      <h1 className="font-bold ml-2 text-3xl">{data?.temperature}</h1>
    </div>
  );
}
