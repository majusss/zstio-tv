import { useEffect, useRef } from "react";
import axios from "axios";

export default function WeatherHandling() {
  const weatherImgRef = useRef<HTMLImageElement>(null);
  const weatherCityRef = useRef<HTMLHeadingElement>(null);
  const weatherRef = useRef<HTMLHeadingElement>(null);
  useEffect(() => {
    async function initWeather() {
      const apiReq = await axios.get(
        "http://api.weatherapi.com/v1/current.json?key=667dc15b610d47ddb18190743232409&q=50.02,22.67&aqi=no",
      );
      if (
        weatherImgRef.current &&
        weatherRef.current &&
        weatherCityRef.current
      ) {
        weatherImgRef.current.src = apiReq.data.current.condition.icon;
        weatherRef.current.textContent = apiReq.data.current.feelslike_c + "°C";
        weatherCityRef.current.textContent = apiReq.data.location.name;
      }
    }

    initWeather();

    setInterval(initWeather, 1800000);
  }, []);
  return (
    <div
      className={
        "flex justify-center items-center text-white flex-col scale-150 m-3"
      }
    >
      <div className={"flex justify-center items-center"}>
        <img src={""} ref={weatherImgRef} />
        <h1 className={"font-bold"} ref={weatherRef}></h1>
      </div>
      <h1 className={"-mt-3"} ref={weatherCityRef}></h1>
    </div>
  );
}
