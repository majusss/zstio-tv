/* eslint-disable */
enum ScreenId {
  WEATHER,
  SPOTIFY,
  GALERY,
  NEWS,
  SUBSTITUTIONS,
}

export interface Screen {
  id: ScreenId;
  index: number;
  title: string;
  displayTimeSeconds: number;
  show: boolean;
}
