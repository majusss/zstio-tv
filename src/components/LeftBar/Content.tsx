import LuckyHandling from "@/components/LeftBar/Content/LuckyHandling";
import WeatherHandling from "@/components/LeftBar/Content/WeatherHandling";

export default function Content() {
  return (
    <div
      className={"flex w-full flex-grow justify-start items-center flex-col"}
    >
      <WeatherHandling />
      <LuckyHandling />
    </div>
  );
}
