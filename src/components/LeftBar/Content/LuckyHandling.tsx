import axios from "axios";
import useSWR from "swr";

async function fetchData(url: string) {
  const res = await axios.get(url);

  return res.data;
}

export default function LuckyHandling() {
  const { data } = useSWR(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/api/getLuckyNumber`,
    fetchData,
    { refreshInterval: 3 * 60 * 60 * 1000 }
  );

  return (
    <div
      className={
        " flex rounded-lg border-[#272727] bg-[#0e0e0e] border-[1px] items-center justify-center w-[86%] h-[8vh]"
      }
    >
      <h1
        className={
          "font-semibold flex justify-center items-center text-2xl text-gray-200 leading-3"
        }
      >
        Szczęśliwy numerek:
        <span className="text-3xl ml-2 text-gray-200 font-bold">
          {data?.luckyNumber || 0}
        </span>
      </h1>
    </div>
  );
}
