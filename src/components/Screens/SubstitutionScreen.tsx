import { useEffect, useState } from "react";
import axios from "axios";

interface Lesson {
  lesson: string;
  teacher: string;
  branch: string;
  subject: string;
  class: string;
  case: string;
  message: string;
}

interface Table {
  time: string;
  zastepstwa: Lesson[];
}

interface ScrapedData {
  time: string;
  tables: Table[];
}

export default function SubstitutionScreen() {
  const [substitutions, setSubstitutions] = useState<ScrapedData | undefined>();
  useEffect(() => {
    async function sendReq() {
      const substitutionsReq: ScrapedData = (
        await axios.get("http://localhost:5173/api/getSubstitutions")
      ).data;
      setSubstitutions(substitutionsReq);
    }

    sendReq();
  }, []);

  if (typeof substitutions === "undefined") return null;

  return (
    <div className={"w-full h-full overflow-y-auto"}>
      <div className={"w-full flex justify-center items-center flex-col"}>
        {substitutions.tables[0].zastepstwa.map((zastepstwo, key) => {
          return (
            <div
              key={key}
              className={`flex flex-row justify-center items-center w-full m-1.5 text-center ${
                key % 2 == 0 ? "" : "text-gray-400"
              }`}
            >
              <p className={"w-[10%]"}>{zastepstwo.lesson}</p>
              <p className={"w-[15%]"}>{zastepstwo.teacher}</p>
              <p className={"w-[18%]"}>
                {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
                {/*@ts-ignore*/}
                {zastepstwo.branch.replaceAll("|", " ")}
              </p>
              <p className={"w-[29%]"}>{zastepstwo.subject}</p>
              <p className={"w-[5%]"}>{zastepstwo.class}</p>
              <p className={"w-[24%]"}>{zastepstwo.case}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
