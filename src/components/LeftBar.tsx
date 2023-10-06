import Clock from "@/components/LeftBar/Clock";
import Content from "@/components/LeftBar/Content";
import SpotifyHandling from "@/components/LeftBar/SpotifyHandling";

export default function LeftBar() {
  return (
    <div
      className={
        "w-[22vw] h-screen bg-black self-start flex flex-col items-center justify-center mr-3"
      }
    >
      <Clock />
      <Content />
      <SpotifyHandling />
    </div>
  );
}
