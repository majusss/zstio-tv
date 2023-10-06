import LuckyHandling from "@/components/LeftBar/Content/LuckyHandling";
import WeatherHandling from "@/components/LeftBar/Content/WeatherHandling";

export default function Content() {
  return (
    <div className={"flex flex-grow justify-start items-center flex-col"}>
      <LuckyHandling />
      <WeatherHandling />
    </div>
  );
}
