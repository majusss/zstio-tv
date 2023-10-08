import { useEffect, useState } from "react";
import axios from "axios";
import useSWR from "swr";

async function fetchData() {
  const res = await axios.get(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/api/getLuckyNumber`
  );

  return res.data;
}

export default function LuckyHandling() {
  const [luckyNumber, setLuckyNumber] = useState(0);

  const { data } = useSWR(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/api/getLuckyNumber`,
    fetchData
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
