import HintDisplay from "@/components/HintDisplay";
import ScreenManager from "@/components/ScreenManager";
import SubstitutionScreen from "@/components/Screens/SubstitutionScreen";
import PageIndicator from "./PageIndicator";
import { useEffect, useState } from "react";
import CustomScreen from "@/utils/CustomScreen";
import useSWR from "swr";
import { gql } from "@apollo/client";
import request from "graphql-request";

const fetcher = (query: string) =>
  request("https://cms.awfulworld.space/graphql", query);
const query = gql`
  {
    slajdy {
      data {
        id
        attributes {
          typSlajdu {
            __typename
            ... on ComponentSlajdyMultimedia {
              media {
                data {
                  attributes {
                    url
                  }
                }
              }
            }
            ... on ComponentSlajdySlajd {
              tytul
              czasTrwaniaWSekundach
              czyBardzoWazne
              czyPokazany
              opis
            }
          }
        }
      }
    }
  }
`;

const MainContent = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const screens: Array<JSX.Element | null> = [];
  const [animationData, setAnimationData] = useState({
    translateX: 0,
    opacity: 1,
  });
  // @ts-ignore
  const { data } = useSWR(query, fetcher, { refreshInterval: 10 * 60 * 1000 });
  // @ts-ignore
  data?.slajdy?.data?.map((screen: any) => {
    const {
      id,
      tytul,
      opis,
      czasTrwaniaWSekundach,
      czyBardzoWazne,
      czyPokazany,
      dodatkoweZdjecie,
    } = {
      id: screen.id,
      tytul: screen.attributes.typSlajdu[0].tytul,
      opis: screen.attributes.typSlajdu[0].opis,
      czasTrwaniaWSekundach:
        screen.attributes.typSlajdu[0].czasTrwaniaWSekundach,
      czyBardzoWazne: screen.attributes.typSlajdu[0].czyBardzoWazne,
      czyPokazany: screen.attributes.typSlajdu[0].czyPokazany,
      dodatkoweZdjecie: screen?.attributes?.dodatkoweZdjecie?.data?.attributes
        ?.url
        ? `https://cms.awfulworld.space/${screen.attributes.dodatkoweZdjecie.data.attributes.url}`
        : undefined,
    };

    const screenProps = {
      id,
      tytul,
      opis,
      czasTrwaniaWSekundach,
      czyBardzoWazne,
      czyPokazany,
      dodatkoweZdjecie,
    };

    console.log(screenProps);
    switch (parseInt(id)) {
      case 12:
        screens.push(<SubstitutionScreen key={id} {...screenProps} />);
        break;
      default:
        screens.push(<CustomScreen key={id} {...screenProps} />);
        break;
    }
  });

  useEffect(() => {
    const intervalDuration =
      screens[activeIndex]?.props?.czasTrwaniaWSekundach * 1000 || 15000;
    const changeScreen = async () => {
      const currentScreen = screens[activeIndex];
      if (!currentScreen?.props?.czyBardzoWazne) {
        setAnimationData({ translateX: 100, opacity: 0 });
        await new Promise((resolve) => setTimeout(resolve, 1000));
        setActiveIndex((prevIndex) => (prevIndex + 1) % screens.length);
        await new Promise((resolve) => setTimeout(resolve, 1000));
        setAnimationData({ translateX: 0, opacity: 1 });
      }
    };

    const intervalId = setInterval(changeScreen, intervalDuration);

    return () => clearInterval(intervalId);
  }, [screens, activeIndex]);

  return (
    <div className="flex w-[78vw] h-screen justify-between items-center flex-col text-white">
      <div
        className="rounded-xl w-full relative h-[88vh] transition-all overflow-hidden justify-center items-center"
        style={{
          transform: `translateX(${animationData.translateX}%)`,
          opacity: animationData.opacity,
        }}
      >
        <ScreenManager screens={screens} activeByIndex={activeIndex} />
      </div>
      <div className="flex justify-center items-center mb-4 w-full relative">
        <HintDisplay />
        <PageIndicator slides={screens.length} active={activeIndex} />
      </div>
    </div>
  );
};

export default MainContent;
