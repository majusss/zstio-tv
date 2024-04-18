type hourType = {
  number: number;
  timeFrom: string;
  timeTo: string;
};

type getCurrentType = {
  isLesson: boolean;
  timeRemaining: string;
  progress: number;
  lessonNumber: number | null;
};
