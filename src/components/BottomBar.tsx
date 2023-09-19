import Clock from "./BottomBar/Clock.tsx";
import SpotifyHandling from "./BottomBar/SpotifyHandling.tsx";
import LuckyHandling from "./BottomBar/LuckyHandling.tsx";

export default function BottomBar() {
    return (<div className={"w-screen bg-black self-start flex items-center justify-between"}>
        <SpotifyHandling/>
        <Clock/>
        <LuckyHandling/>
    </div>)
}
