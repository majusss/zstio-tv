import { useEffect, useState } from "react";
import { getCurrentLesson, normalSchedule } from "@/utils/Schedule";

function getCurrentDateFormatted() {
  const months: string[] = [
    "Stycznia",
    "Lutego",
    "Marca",
    "Kwietnia",
    "Maja",
    "Czerwca",
    "Lipca",
    "Sierpnia",
    "Września",
    "Października",
    "Listopada",
    "Grudnia",
  ];

  const days: string[] = [
    "Niedziela",
    "Poniedziałek",
    "Wtorek",
    "Środa",
    "Czwartek",
    "Piątek",
    "Sobota",
  ];

  const currentDate: Date = new Date();
  const dayOfMonth: number = currentDate.getDate();
  const month: string = months[currentDate.getMonth()];
  const dayOfWeek: string = days[currentDate.getDay()];

  return `${dayOfMonth} ${month} - ${dayOfWeek}`;
}

export default function Clock() {
  const date: string = getCurrentDateFormatted();
  const [currentTime, setCurrentTime] = useState("21:37");
  const [currentLesson, setCurrentLesson] = useState({
    current: "",
    timeTo: "",
  });

  useEffect(() => {
    const sysTime = new window.Date();
    setCurrentTime(
      `${("0" + sysTime.getHours()).slice(-2)}:${(
        "0" + sysTime.getMinutes()
      ).slice(-2)}`
    );
    setCurrentLesson(getCurrentLesson(normalSchedule));
    setInterval(() => {
      const newTime = new window.Date();
      setCurrentTime(
        `${("0" + newTime.getHours()).slice(-2)}:${(
          "0" + newTime.getMinutes()
        ).slice(-2)}`
      );
      setCurrentLesson(getCurrentLesson(normalSchedule));
    }, 500);
  }, []);

  return (
    <>
      <div
        className={
          "flex flex-col justify-center items-center m-3 mt-10 px-8 py-1 w-full"
        }
      >
        <h1 className={"text-gray-200 text-8xl font-bold"}>{currentTime}</h1>
        <p className="text-gray-200 font-semibold text-xl mt-2">{date}</p>
      </div>
      <div
        className={
          "flex rounded-lg mb-4 bg-[#0e0e0e] border-[#272727] border-[1px] flex-col items-center justify-center w-[86%] h-[9vh]"
        }
      >
        <h2
          className={`text-gray-200 text-center font-semibold ${
            currentLesson.current == "Koniec lekcji na dziś"
              ? "text-2xl"
              : "text-lg"
          }`}
        >
          {currentLesson.current}
        </h2>

        <h2
          className={`text-gray-200 text-center  ${
            currentLesson.current != "Koniec lekcji na dziś"
              ? "-mt-1 text-3xl"
              : "text-2xl"
          } font-bold`}
        >
          {currentLesson.timeTo}
        </h2>
      </div>
    </>
  );
}
