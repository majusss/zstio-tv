import "./index.css";
import LeftBar from "./components/LeftBar.tsx";
import MainContent from "./components/MainContent.tsx";

export default function App() {
  return (
    <div className={"w-screen h-screen bg-black flex overflow-hidden"}>
      <LeftBar />
      <MainContent />
    </div>
  );
}
