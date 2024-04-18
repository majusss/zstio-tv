"use client";

import { TvContext, TvContextType } from "@/context/TvContext";
import { getCurrent } from "@/lib/time";
import { CheckBadgeIcon } from "@heroicons/react/20/solid";
import { useContext } from "react";
import Spinner from "./Spinner";

const Timer: React.FC = () => {
  const { hours, minutes, seconds } = (useContext(TvContext) as TvContextType).time;
  const { isLesson, lessonNumber, progress, timeRemaining } = getCurrent(+hours, +minutes, +seconds);
  const { showTimer } = (useContext(TvContext) as TvContextType).settings;

  if (!showTimer) return null;

  return (
    <div className="absolute right-4 flex items-center text-right">
      {lessonNumber ? (
        <>
          <div className="mr-1 flex flex-col">
            <p className="text-5xl font-bold">{isLesson ? `Aktualnie ${lessonNumber} lekcja` : "Trwa przerwa"}</p>
            <p className="text-4xl font-bold">
              {isLesson ? `Pozostało ${timeRemaining}` : `${timeRemaining} do ${lessonNumber} lekcji`}
            </p>
          </div>
          <Spinner progress={progress} />
        </>
      ) : (
        +hours > 8 && (
          <div className="inline-flex items-center text-5xl font-bold">
            <p>Koniec lekcji</p>
            <CheckBadgeIcon className="ml-2 h-16 w-16 animate-pulse text-green-400" />
          </div>
        )
      )}
    </div>
  );
};

export default Timer;
