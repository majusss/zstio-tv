export const months = [
  "Styczeń",
  "Luty",
  "Marzec",
  "Kwiecień",
  "Maj",
  "Czerwiec",
  "Lipiec",
  "Sierpień",
  "Wrzesień",
  "Październik",
  "Listopad",
  "Grudzień",
];

export const normalHours: hourType[] = [
  {
    number: 1,
    timeFrom: "8:00",
    timeTo: "8:45",
  },
  {
    number: 2,
    timeFrom: "8:50",
    timeTo: "9:35",
  },
  {
    number: 3,
    timeFrom: "9:40",
    timeTo: "10:25",
  },
  {
    number: 4,
    timeFrom: "10:40",
    timeTo: "11:25",
  },
  {
    number: 5,
    timeFrom: "11:30",
    timeTo: "12:15",
  },
  {
    number: 6,
    timeFrom: "12:20",
    timeTo: "13:05",
  },
  {
    number: 7,
    timeFrom: "13:10",
    timeTo: "13:55",
  },
  {
    number: 8,
    timeFrom: "14:00",
    timeTo: "14:45",
  },
  {
    number: 9,
    timeFrom: "14:50",
    timeTo: "15:35",
  },
  {
    number: 10,
    timeFrom: "15:40",
    timeTo: "16:25",
  },
  {
    number: 11,
    timeFrom: "16:35",
    timeTo: "17:20",
  },
  {
    number: 12,
    timeFrom: "17:25",
    timeTo: "18:10",
  },
  {
    number: 13,
    timeFrom: "18:15",
    timeTo: "19:00",
  },
  {
    number: 14,
    timeFrom: "19:05",
    timeTo: "19:50",
  },
];

export const shortHours: hourType[] = [
  {
    number: 1,
    timeFrom: "8:00",
    timeTo: "8:30",
  },
  {
    number: 2,
    timeFrom: "8:35",
    timeTo: "9:05",
  },
  {
    number: 3,
    timeFrom: "9:10",
    timeTo: "9:40",
  },
  {
    number: 4,
    timeFrom: "9:45",
    timeTo: "10:15",
  },
  {
    number: 5,
    timeFrom: "10:30",
    timeTo: "11:00",
  },
  {
    number: 6,
    timeFrom: "11:05",
    timeTo: "11:35",
  },
  {
    number: 7,
    timeFrom: "11:40",
    timeTo: "12:10",
  },
  {
    number: 8,
    timeFrom: "12:15",
    timeTo: "12:45",
  },
  {
    number: 9,
    timeFrom: "12:50",
    timeTo: "13:20",
  },
  {
    number: 10,
    timeFrom: "13:25",
    timeTo: "13:55",
  },
  {
    number: 11,
    timeFrom: "14:00",
    timeTo: "14:30",
  },
  {
    number: 12,
    timeFrom: "14:35",
    timeTo: "15:05",
  },
  {
    number: 13,
    timeFrom: "15:10",
    timeTo: "15:40",
  },
  {
    number: 14,
    timeFrom: "15:45",
    timeTo: "16:15",
  },
];

const formatMinutes = (minuts: number) => {
  if (minuts <= 0) return "minut";

  const lastDigit = minuts % 10;
  const beforeLastDigit = Math.floor(minuts / 10) % 10;

  return beforeLastDigit === 1 || lastDigit === 0 || (lastDigit >= 5 && lastDigit <= 9)
    ? "minut"
    : lastDigit === 1
      ? "minuta"
      : "minuty";
};

export const getCurrent = (currentHour: number, currentMinutes: number, currentSeconds: number): getCurrentType => {
  let currentLesson = null;
  let isLesson = false;
  let lessonNumber = null;

  for (const lesson of normalHours) {
    const [fromHour, fromMinutes] = lesson.timeFrom.split(":");
    const [toHour, toMinutes] = lesson.timeTo.split(":");

    const isAfterFromTime =
      currentHour > Number(fromHour) || (currentHour === Number(fromHour) && currentMinutes >= Number(fromMinutes));
    const isBeforeToTime =
      currentHour < Number(toHour) || (currentHour === Number(toHour) && currentMinutes < Number(toMinutes));

    if (isAfterFromTime && isBeforeToTime) {
      currentLesson = lesson;
      isLesson = true;
      lessonNumber = lesson.number;
      break;
    }
  }

  let timeRemaining = "";
  let progress = 0;

  if (isLesson) {
    const endTime = new Date();
    endTime.setHours(Number(currentLesson!.timeTo.split(":")[0]), Number(currentLesson!.timeTo.split(":")[1]), 0);
    const startTime = new Date();
    startTime.setHours(Number(currentLesson!.timeFrom.split(":")[0]), Number(currentLesson!.timeFrom.split(":")[1]), 0);
    const now = new Date();
    now.setHours(currentHour, currentMinutes, currentSeconds);
    const timeDifference = endTime.getTime() - now.getTime();
    const minutesRemaining = timeDifference / (1000 * 60);
    const totalTimeDifference = endTime.getTime() - startTime.getTime();
    const totalMinutes = Math.ceil(totalTimeDifference / (1000 * 60));
    timeRemaining = `${Math.ceil(minutesRemaining)} ${formatMinutes(Math.ceil(minutesRemaining))}`;
    progress = ((totalMinutes - minutesRemaining) / totalMinutes) * 100;
  } else {
    const nextLesson = normalHours.find((lesson) => {
      const [fromHour, fromMinutes] = lesson.timeFrom.split(":");
      const [toHour, toMinutes] = lesson.timeTo.split(":");
      const isAfterFromTime =
        currentHour < Number(fromHour) || (currentHour === Number(fromHour) && currentMinutes < Number(fromMinutes));
      const isBeforeToTime =
        currentHour < Number(toHour) || (currentHour === Number(toHour) && currentMinutes < Number(toMinutes));
      return isAfterFromTime && isBeforeToTime;
    });

    const previousLesson = normalHours.reduce((previous: hourType | null, current: hourType) => {
      const [toHour, toMinutes] = current.timeTo.split(":");
      const isBeforeToTime =
        currentHour > Number(toHour) || (currentHour === Number(toHour) && currentMinutes >= Number(toMinutes));
      if (isBeforeToTime) {
        return current;
      }
      return previous;
    }, null);

    if (nextLesson) {
      lessonNumber = nextLesson.number;
      const startTime = new Date();
      startTime.setHours(Number(nextLesson.timeFrom.split(":")[0]), Number(nextLesson.timeFrom.split(":")[1]), 0);
      const now = new Date();
      now.setHours(currentHour, currentMinutes, currentSeconds);
      const timeDifference = startTime.getTime() - now.getTime();
      const minutesRemaining = timeDifference / (1000 * 60);
      timeRemaining = `${Math.ceil(minutesRemaining)} ${formatMinutes(Math.ceil(minutesRemaining))}`;
      if (previousLesson) {
        const endTime = new Date();
        endTime.setHours(Number(previousLesson.timeTo.split(":")[0]), Number(previousLesson.timeTo.split(":")[1]), 0);
        const totalTimeDifference = startTime.getTime() - endTime.getTime();
        const totalMinutes = Math.ceil(totalTimeDifference / (1000 * 60));
        progress = (totalMinutes - minutesRemaining / totalMinutes) * 100;
      } else {
        progress = 100;
      }
    } else {
      timeRemaining = "Brak lekcji na dziś";
    }
  }

  return {
    isLesson,
    timeRemaining,
    progress: Math.max(progress, 1),
    lessonNumber,
  };
};
