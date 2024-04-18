import BottomBar from "@/components/BottomBar";
import Hint from "@/components/Hint";
import ScreenManager from "@/components/ScreenManager";
import { NextPage } from "next";
// import { TvContext, TvContextType } from "@/context/TvContext";
// import { useContext, useEffect } from "react";

const Home: NextPage = () => {
  // const { galery, hint, news, screens, settings, weather } = useContext(TvContext) as TvContextType;

  // useEffect(() => {
  //   console.log({ galery, hint, news, screens, settings, weather });
  // }, [galery, hint, news, screens, settings, weather]);

  return (
    <main className="flex h-screen w-screen">
      <Hint />
      <ScreenManager />
      <BottomBar />
    </main>
  );
};

export default Home;
