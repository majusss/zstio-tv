type Props = {
  screens: any[];
  activeByIndex: number;
};

export default function ScreenManager({ screens, activeByIndex }: Props) {
  return screens[activeByIndex];
}
