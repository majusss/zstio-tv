import { TvContext } from "@/context/TvContext";
import { ClockIcon } from "@heroicons/react/20/solid";
import { useContext } from "react";

const Weather: React.FC = () => {
  const weather = useContext(TvContext)?.weather;
  return (
    <div className="flex h-full w-full flex-col flex-wrap items-center justify-center gap-4 text-5xl font-bold">
      {weather?.hourly.map((w) => (
        <div
          key={w.time}
          className="inline-flex h-28 w-[45%] items-center justify-around gap-4 rounded-xl bg-[#202020]"
        >
          <div className="inline-flex items-center">
            <ClockIcon className="h-20 w-20" />
            <p>{`${new Date(w.time).getHours()}:00`}</p>
          </div>
          <div className="inline-flex items-center">
            <img src={w.icon} alt="" />
            <p>{`${w.temperature}°C`}</p>
          </div>
        </div>
      ))}
    </div>
  );
};
export default Weather;
