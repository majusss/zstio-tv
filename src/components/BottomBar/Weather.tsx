import { TvContext, TvContextType } from "@/context/TvContext";
import { useContext } from "react";

const Weather: React.FC = () => {
  const weather = (useContext(TvContext) as TvContextType).weather!;
  if (!weather?.now?.show || !weather?.now || !weather?.now?.temperature || !weather?.now?.icons) return null;

  const { temperature, icons } = weather.now;

  return (
    <div className="absolute left-4 flex items-center text-left">
      <div className="flex">
        <div className="mr-2 inline-flex">
          {icons.map((icon: string) => (
            <div key={icon} className="-mx-12">
              <img src={icon} alt="weather icon" className="aspect-square w-56" />
            </div>
          ))}
        </div>
        <div className="flex flex-col justify-center">
          <p className="text-5xl font-bold">Jarosław</p>
          <p className="text-4xl font-bold">{temperature.toFixed(1)}°C</p>
        </div>
      </div>
    </div>
  );
};
export default Weather;
