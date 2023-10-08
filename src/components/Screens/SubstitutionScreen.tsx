import { useEffect, useState } from "react";
import axios from "axios";

type Lesson = {
  lesson: string;
  teacher: string;
  branch: string;
  subject: string;
  class: string;
  case: string;
  message: string;
};

type Table = {
  time: string;
  zastepstwa: Lesson[];
};

type ScrapedData = {
  data: any;
  time: string;
  tables: Table[];
};

export default function SubstitutionScreen({
  id,
  czasTrwaniaWSekundach,
  czyBardzoWazne,
  czyPokazane,
}: any) {
  const [substitutions, setSubstitutions] = useState<ScrapedData | undefined>();

  useEffect(() => {
    async function sendReq() {
      const substitutionsReq: ScrapedData = (
        await axios.get(
          `${process.env.NEXT_PUBLIC_SERVER_URL}/api/getSubstitutions`
        )
      ).data;

      const { data } = substitutionsReq;
      setSubstitutions(data);
    }

    sendReq();
  }, []);

  if (typeof substitutions === "undefined") return null;

  return (
    <>
      <h1
        className={
          "flex justify-center items-center text-3xl font-semibold w-full my-6"
        }
      >
        Zastępstwa na dzień{" "}
        {substitutions.tables[0].time.replace("Dzień: ", "")}
      </h1>
      <div className={"w-full h-full"}>
        <div className={"w-full flex justify-center items-center flex-col"}>
          {substitutions.tables[0].zastepstwa.map((zastepstwo, key) => {
            return (
              <div
                key={key}
                className={`flex flex-row justify-center items-center w-full m-1.5 text-center`}
              >
                <p
                  className={
                    "w-14 bg-[#232323] rounded-tl-lg rounded-bl-lg h-14 flex justify-center items-center font-semibold text-3xl"
                  }
                >
                  {zastepstwo.lesson.split(",")[0]}
                </p>
                <p
                  className={
                    "w-[18%] border-r bg-[#0e0e0e81] h-14 flex justify-center items-center border-[#232323] text-xl font-semibold"
                  }
                  dangerouslySetInnerHTML={{
                    __html: zastepstwo.branch
                      .replace(/\|/g, " ")
                      .replace(/\+/g, "<br>"),
                  }}
                />

                <p
                  className={
                    "w-[29%] border-r bg-[#0e0e0e81] border-[#232323] h-14 flex justify-center items-center text-xl font-semibold"
                  }
                >
                  {zastepstwo.subject}
                </p>
                <p
                  className={
                    "w-[24%] font-semibold bg-[#0e0e0e81] h-14 flex justify-center items-center text-xl"
                  }
                >
                  {zastepstwo.message != ""
                    ? zastepstwo.message
                    : zastepstwo.case}
                </p>
                <p
                  className={
                    "w-14 bg-[#232323] rounded-tr-lg rounded-br-lg text-2xl h-14 flex justify-center items-center font-semibold"
                  }
                >
                  {zastepstwo.class.length > 0 ? zastepstwo.class : "-"}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}
