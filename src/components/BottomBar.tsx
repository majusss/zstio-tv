import Clock from "./BottomBar/Clock";
import Timer from "./BottomBar/Timer";
import Weather from "./BottomBar/Weather";

const BottomBar: React.FC = () => {
  return (
    <>
      <div className="fixed bottom-2 z-50 flex h-[20vh] w-screen items-center justify-center bg-black font-sp-pro transition-all *:drop-shadow-[4px_4px_15px_rgba(255,255,255,0.25)]">
        <Weather />
        <Clock />
        <Timer />
      </div>
    </>
  );
};
export default BottomBar;
