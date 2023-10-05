import { useCMSData } from "../utils/ContentManagmentSystem.tsx";

export default function panel() {
  const { updateCMSData } = useCMSData();
  const a = () => {
    updateCMSData({
      useShortSchedule: false,
      useHint: false,
      useCustomHint: false,
      customHint:
        "Zgodnie z §47, pkt 2, ppkt 8 Statutu ZSTiO, uczeń ma zakaz opuszczania terenu szkoły podczas trwania zajec i miedzy nimi",
      useSpotify: true,
      useLuckyNumber: true,
      activeScreenIndex: 0,
    });
  };

  return (
    <div>
      <button onClick={a}>chuj</button>
    </div>
  );
}
