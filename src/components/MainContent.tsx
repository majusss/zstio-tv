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
  // @ts-ignore
  const { error, data } = useSWR(query, fetcher);
  const screens: Array<JSX.Element | null> = [];
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
      case 9:
        screens.push(<SubstitutionScreen key={id} {...screenProps} />);
        break;
      default:
        screens.push(<CustomScreen key={id} {...screenProps} />);
        break;
    }
  });

  useEffect(() => {
    const changeScreen = () => {
      const currentScreen = screens[activeIndex];
      if (!currentScreen?.props?.czyBardzoWazne) {
        setActiveIndex((prevIndex) => (prevIndex + 1) % screens.length);
      }
    };

    const intervalDuration =
      screens[activeIndex]?.props?.czasTrwaniaWSekundach * 1000 || 15000;
    const intervalId = setInterval(changeScreen, intervalDuration);

    return () => clearInterval(intervalId);
  }, [screens, activeIndex]);

  return (
    <div className="flex w-[78vw] h-screen justify-between items-center flex-col text-white">
      <div className="rounded-xl w-full h-[80vh] relative bg-[100px]">
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
