import { useEffect, useState } from "react";
import axios from "axios";

export default function WeatherHandling() {
  const [weatherImg, setWeatherImg] = useState("");
  const [weatherCity, setWeatherCity] = useState("");
  const [weather, setWeather] = useState("");

  useEffect(() => {
    async function initWeather() {
      // MOVE TO SSR
      // const apiReq = await axios.get(
      // );
      // setWeatherImg(apiReq.data.current.condition.icon);
      // setWeather(apiReq.data.current.feelslike_c + "°C");
      // setWeatherCity(apiReq.data.location.name);
    }

    initWeather();

    setInterval(initWeather, 1800000);
  }, []);
  return (
    <div
      className={
        "flex justify-center items-center text-white text-3xl flex-row m-3 w-full"
      }
    >
      <div className={"contents w-[96px] h-[96px] -z-10 mr-5"}>
        <img src={weatherImg} className={"scale-[2]"} />
      </div>
      <div className={"flex justify-center items-center flex-col z-10 ml-5"}>
        <h1 className={"font-bold "}>{weather}</h1>
        <h1 className={""}>{weatherCity}</h1>
      </div>
    </div>
  );
}
