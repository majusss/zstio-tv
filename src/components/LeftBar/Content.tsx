import LuckyHandling from "./Content/LuckyHandling.tsx";
import WeatherHandling from "./Content/WeatherHandling.tsx";

export default function Content() {
  return (
    <div className={"flex flex-grow justify-start items-center flex-col"}>
      <LuckyHandling />
      <WeatherHandling />
    </div>
  );
}
