import Clock from "./LeftBar/Clock.tsx";
import SpotifyHandling from "./LeftBar/SpotifyHandling.tsx";
import Content from "./LeftBar/Content.tsx";

export default function LeftBar() {
  return (
    <div
      className={
        "w-[20vw] h-screen bg-black self-start flex flex-col items-center justify-center"
      }
    >
      <Clock />
      <Content />
      <SpotifyHandling />
    </div>
  );
}
