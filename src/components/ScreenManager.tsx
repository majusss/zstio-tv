import { TvContext } from "@/context/TvContext";
import React, { ReactNode, useCallback, useContext, useEffect, useState } from "react";
import Galery from "./Screens/Galery";
import News from "./Screens/News";
import Weather from "./Screens/Weather";

const ScreenManager: React.FC = () => {
  /* eslint-disable */
  enum ScreenId {
    WEATHER,
    SPOTIFY,
    GALERY,
    NEWS,
    SUBSTITUTIONS,
  }

  const screenComponents: Array<{ screenId: ScreenId; node: (screen: any) => React.ReactNode }> = [
    { screenId: ScreenId.WEATHER, node: () => <Weather /> },
    { screenId: ScreenId.SPOTIFY, node: () => <>spoti</> },
    { screenId: ScreenId.GALERY, node: (props) => <Galery displayTime={props.displayTimeSeconds} /> },
    { screenId: ScreenId.NEWS, node: () => <News /> },
    { screenId: ScreenId.SUBSTITUTIONS, node: () => <>zastap</> },
  ];

  const [nextScreenElement, setNextScreen] = useState<null | ReactNode>(null);
  const [animationStart, setAnimationStart] = useState(false);

  const screens = useContext(TvContext)?.screens;
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  const nextScreen = useCallback(async () => {
    if (!screens) return;
    if (screens.length === 1) return;
    setAnimationStart(true);
    setNextScreen(
      screenComponents[
        ScreenId[screens[currentIndex + 1]?.id as unknown as keyof typeof ScreenId] ||
          ScreenId[screens[0]?.id as unknown as keyof typeof ScreenId]
      ].node({
        displayTimeSeconds: screens[currentIndex + 1]?.displayTimeSeconds || screens[0]?.displayTimeSeconds,
      }),
    );
    setTimeout(() => {
      setCurrentIndex((prevIndex) => {
        return prevIndex === screens.length - 1 ? 0 : prevIndex + 1;
      });
      setTimeout(() => setAnimationStart(false), 1000);
    }, 1000);
  }, [screens, currentIndex]);

  useEffect(() => {
    if (!screens) return;
    if (!screens[currentIndex]?.displayTimeSeconds) {
      nextScreen();
      return;
    }
    const interval = setTimeout(nextScreen, screens[currentIndex].displayTimeSeconds * 1000);

    return () => clearTimeout(interval);
  }, [currentIndex, screens]);

  if (!screens || screens.length === 0) {
    return (
      <div className="mt-[33px] flex h-[calc(80vh-41px)] w-screen animate-pulse items-center justify-center text-9xl font-black text-[#181818]">
        BRAK DANYCH
      </div>
    );
  }

  if (!screens[currentIndex]) {
    return null;
  }

  return (
    <div
      className="fixed mt-[33px] flex h-[calc(80vh-41px)] justify-center overflow-hidden"
      style={{
        transition: animationStart ? "all 1s ease-in" : "",
        transform: animationStart ? "translateX(-50%)" : "",
      }}
    >
      {animationStart ? (
        <>
          <div className="h-[calc(80vh-41px)] w-screen">
            {screenComponents[ScreenId[screens[currentIndex].id as unknown as keyof typeof ScreenId]].node(
              screens[currentIndex],
            )}
          </div>

          <div className="h-[calc(80vh-41px)] w-screen">{nextScreenElement}</div>
        </>
      ) : (
        <>
          <div className="h-[calc(80vh-41px)] w-screen">
            {screenComponents[ScreenId[screens[currentIndex].id as unknown as keyof typeof ScreenId]].node(
              screens[currentIndex],
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default ScreenManager;
