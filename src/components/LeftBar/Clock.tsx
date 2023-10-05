import { useEffect, useState } from "react";
import { getCurrentLesson, normalSchedule } from "../../utils/Schedule.ts";

export default function Clock() {
  const [currentTime, setCurrentTime] = useState("");
  const [currentLesson, setCurrentLesson] = useState(["", ""]);

  useEffect(() => {
    const sysTime = new window.Date();
    setCurrentTime(
      `${("0" + sysTime.getHours()).slice(-2)}:${(
        "0" + sysTime.getMinutes()
      ).slice(-2)}`,
    );
    setCurrentLesson(getCurrentLesson(normalSchedule));
    setInterval(() => {
      setCurrentTime(
        `${("0" + sysTime.getHours()).slice(-2)}:${(
          "0" + sysTime.getMinutes()
        ).slice(-2)}`,
      );
      setCurrentLesson(getCurrentLesson(normalSchedule));
    }, 10000);
  }, []);

  return (
    <div
      className={
        "flex flex-col justify-center items-center m-3 mt-10 px-8 py-1"
      }
    >
      <h1 className={"text-white text-8xl font-bold"}>{currentTime}</h1>
      <h2 className={"text-white text-center text-2xl"}>{currentLesson[0]}</h2>
      <h2 className={"text-white text-center text-2xl"}>{currentLesson[1]}</h2>
    </div>
  );
}
