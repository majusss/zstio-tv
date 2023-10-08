type LessonTime = {
  start: string;
  end: string;
};

const normalSchedule: LessonTime[] = [
  { start: "08:00", end: "08:45" },
  { start: "08:50", end: "09:35" },
  { start: "09:40", end: "10:25" },
  { start: "10:40", end: "11:25" },
  { start: "11:30", end: "12:15" },
  { start: "12:20", end: "13:05" },
  { start: "13:10", end: "13:55" },
  { start: "14:00", end: "14:45" },
  { start: "14:50", end: "15:35" },
  { start: "15:40", end: "16:25" },
  { start: "16:35", end: "17:20" },
  { start: "17:25", end: "18:10" },
  { start: "18:15", end: "19:00" },
  { start: "19:05", end: "19:50" },
];

const shortenedSchedule: LessonTime[] = [
  { start: "8:00", end: "8:30" },
  { start: "8:35", end: "9:05" },
  { start: "9:10", end: "9:40" },
  { start: "9:45", end: "10:15" },
  { start: "10:30", end: "11:00" },
  { start: "11:05", end: "11:35" },
  { start: "11:40", end: "12:10" },
  { start: "12:15", end: "12:45" },
  { start: "12:50", end: "13:20" },
  { start: "13:25", end: "13:55" },
  { start: "14:00", end: "14:30" },
  { start: "14:35", end: "15:05" },
  { start: "15:10", end: "15:40" },
  { start: "15:45", end: "16:15" },
];

const getCurrentLesson = (
  schedule: LessonTime[]
): { current: string; timeTo: string } => {
  const now = new Date();
  const currentHour = now.getHours();
  const currentMinute = now.getMinutes();
  const currentSecond = now.getSeconds();
  const currentTime = `${currentHour}:${currentMinute}:${currentSecond}`;

  for (let i = 0; i < schedule.length; i++) {
    const lesson = schedule[i];
    const nextLesson = schedule[i + 1];
    const endTimeParts = lesson.end.split(":");
    const endHour = parseInt(endTimeParts[0], 10);
    const endMinute = parseInt(endTimeParts[1], 10);

    if (
      currentHour < endHour ||
      (currentHour === endHour && currentMinute <= endMinute)
    ) {
      const timeRemaining = getTimeRemaining(lesson.end, currentTime);
      return {
        current: `Czas do końca ${i + 1} lekcji:`,
        timeTo: `${timeRemaining.minutesRemaining}:${timeRemaining.secondsRemaining}`,
      };
    }

    if (
      nextLesson &&
      currentTime >= lesson.end &&
      currentTime <= nextLesson.start
    ) {
      const timeRemaining = getTimeRemaining(nextLesson.start, currentTime);
      return {
        current: "Aktualnie trwa przerwa",
        timeTo: `${timeRemaining.minutesRemaining}:${timeRemaining.secondsRemaining}`,
      };
    }
  }

  return { current: "Koniec lekcji na dziś", timeTo: "" };
};

const getTimeRemaining = (
  endTime: string,
  currentTime: string
): { minutesRemaining: string; secondsRemaining: string } => {
  const endParts = endTime.split(":");
  const currentParts = currentTime.split(":");
  const endHour = parseInt(endParts[0], 10);
  const endMinute = parseInt(endParts[1], 10);
  const endSecond = parseInt(endParts[2], 10) || 0;
  const currentHour = parseInt(currentParts[0], 10);
  const currentMinute = parseInt(currentParts[1], 10);
  const currentSecond = parseInt(currentParts[2], 10) || 0;

  const totalSecondsRemaining =
    (endHour - currentHour) * 3600 +
    (endMinute - currentMinute) * 60 +
    (endSecond - currentSecond);

  const minutesRemaining = Math.floor(totalSecondsRemaining / 60).toString();
  const secondsRemaining = (totalSecondsRemaining % 60)
    .toString()
    .padStart(2, "0");

  return { minutesRemaining, secondsRemaining };
};

export {
  normalSchedule,
  shortenedSchedule,
  getCurrentLesson,
  getTimeRemaining,
};
