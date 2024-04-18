"use client";

import { months } from "@/lib/time";
import { Screen } from "@/types/screen";
import axios from "axios";
import React, { useEffect, useState } from "react";
import useSWR from "swr";

export type TvContextType = {
  time: {
    hours: string;
    minutes: string;
    seconds: string;
    day: string;
    month: string;
  };
  settings: Settings;
  weather: undefined | Weather;
  hint: undefined | Hint;
  screens: undefined | Screen[];
  news: undefined | News[];
  galery: undefined | GaleryImage[];
};

export const TvContext = React.createContext<TvContextType | null>(null);

const TvProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  /**
   * TIME SECTION
   */
  const tempDate = new Date();
  const [hours, setHours] = useState<string>(tempDate.getHours().toString().padStart(2, "0"));
  const [minutes, setMinutes] = useState<string>(tempDate.getMinutes().toString().padStart(2, "0"));
  const [seconds, setSeconds] = useState<string>(tempDate.getSeconds().toString().padStart(2, "0"));
  const [day, setDay] = useState<string>(tempDate.getDate().toString());
  const [month, setMonth] = useState<string>(months[tempDate.getMonth()]);

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      setHours(now.getHours().toString().padStart(2, "0"));
      setMinutes(now.getMinutes().toString().padStart(2, "0"));
      setSeconds(now.getSeconds().toString().padStart(2, "0"));
      setDay(now.getDate().toString());
      setMonth(months[now.getMonth()]);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  /**
   * SETTINGS SECTION
   */
  const [hintText, setHintText] = useState<null | string>(null);
  const [showHint, setShowHint] = useState<boolean>(false);
  const [showTimer, setShowTimer] = useState<boolean>(true);
  const [showHappyNumber, setShowHappyNumber] = useState<boolean>(false);

  useSWR(
    "/api/settings",
    async () => {
      try {
        if (!process.env.NEXT_PUBLIC_API) return;
        const data = (await axios.get(`${process.env.NEXT_PUBLIC_API}/settings`)).data.settings as Settings;
        setHintText(data.hintText);
        setShowHint(data.showHint);
        setShowTimer(data.showTimer);
        setShowHappyNumber(data.showHappyNumber);
      } catch (error) {
        //
      }
      return;
    },
    { refreshInterval: 5000 },
  );

  /**
   * WEATHER SECTION
   */
  const { data: weather } = useSWR(
    "/api/weather",
    async () => {
      try {
        if (!process.env.NEXT_PUBLIC_API) return;
        const weather = (await axios.get(`${process.env.NEXT_PUBLIC_API}/weather`)).data.weather as Weather;
        return {
          ...weather,
          hourly: weather.hourly.filter((w) =>
            ((delta) => delta <= 4 && delta != 0)(Math.abs(new Date(w.time).getHours() - new Date().getHours())),
          ),
        };
      } catch (error) {
        //
      }
      return;
    },
    { refreshInterval: 5000 },
  );

  /**
   * HINT SECTION
   */
  const { data: hint } = useSWR(
    "/api/hint",
    async () => {
      try {
        if (!process.env.NEXT_PUBLIC_API) return;
        const hint = (await axios.get(`${process.env.NEXT_PUBLIC_API}/hint`)).data.hint as Hint;
        return hint;
      } catch (error) {
        //
      }
      return;
    },
    { refreshInterval: 5000 },
  );

  /**
   * SCREENS SECTION
   */
  const { data: screens } = useSWR(
    "/api/screen",
    async () => {
      try {
        if (!process.env.NEXT_PUBLIC_API) return;
        const screens = (await axios.get(`${process.env.NEXT_PUBLIC_API}/screen`)).data.screens as Screen[];
        return screens.filter((s) => s.show).sort((a, b) => a.index - b.index);
      } catch (error) {
        //
      }
      return;
    },
    { refreshInterval: 5000 },
  );

  /**
   * NEWS SECTION
   */
  const { data: news } = useSWR(
    "/api/news",
    async () => {
      try {
        if (!process.env.NEXT_PUBLIC_API) return;
        const news = (await axios.get(`${process.env.NEXT_PUBLIC_API}/news`)).data.news as News[];
        return news;
      } catch (error) {
        //
      }
      return;
    },
    { refreshInterval: 5000 },
  );

  /**
   * NEWS SECTION
   */
  const { data: galery } = useSWR(
    "/api/galery",
    async () => {
      try {
        if (!process.env.NEXT_PUBLIC_API) return;
        const galery = (await axios.get(`${process.env.NEXT_PUBLIC_API}/galery`)).data.galery as GaleryImage[];
        return galery.filter((g) => g.shown).sort((a, b) => a.id.localeCompare(b.id));
      } catch (error) {
        //
      }
      return;
    },
    { refreshInterval: 5000 },
  );

  return (
    <TvContext.Provider
      value={{
        time: { hours, minutes, seconds, day, month },
        settings: {
          hintText,
          showHint,
          showTimer,
          showHappyNumber,
        },
        weather,
        hint,
        screens,
        news,
        galery,
      }}
    >
      {children}
    </TvContext.Provider>
  );
};

export default TvProvider;
