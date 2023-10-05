interface Props {
  screens: JSX.Element[];
  activeByIndex: number;
}

export default function ScreenManager({ screens, activeByIndex }: Props) {
  return screens[activeByIndex];
}
