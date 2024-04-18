"use client";
import { TvContext } from "@/context/TvContext";
import { useContext } from "react";

const Clock: React.FC = () => {
  const { hours, minutes, day, month } = useContext(TvContext)!.time;
  return (
    <div className="flex flex-col items-center justify-center">
      <h1 className="text-9xl font-bold">{`${hours}:${minutes}`}</h1>
      <p className="text-3xl uppercase text-gray-300">{`${day} ${month}`}</p>
    </div>
  );
};
export default Clock;
