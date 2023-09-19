import "./index.css"
import BottomBar from "./components/BottomBar.tsx";

export default function App() {

    return (
        <div className={"w-screen h-screen bg-black flex overflow-hidden"}>
            <BottomBar/>
        </div>
    )
}
