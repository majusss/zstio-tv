interface Settings {
  hintText: string | null;
  showHint: boolean;
  showTimer: boolean;
  showHappyNumber: boolean;
}

interface Weather {
  now: {
    show: boolean;
    temperature: number;
    icons: string[];
  };
  hourly: { time: string; temperature: number; icon: string }[];
}

interface Hint {
  text: string;
  show: boolean;
}

interface News {
  title: string;
  content: string;
  img: string;
  date: string;
}

interface GaleryImage {
  id: string;
  title: string;
  deleteHash: string;
  url: string;
  shown: boolean;
}
