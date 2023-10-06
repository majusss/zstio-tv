import HintDisplay from "@/components/HintDisplay";
import ScreenManager from "@/components/ScreenManager";
import SubstitutionScreen from "@/components/Screens/SubstitutionScreen";

export default function MainContent() {
  return (
    <div
      className={
        "flex w-[77vw] h-screen justify-between items-center flex-col text-white"
      }
    >
      <h1
        className={"flex justify-center items-center text-6xl w-full h-[12vh]"}
      >
        {/*TODO: TITLE FROM CMS*/}
        title from cms
      </h1>
      <div className={"rounded-xl w-full h-[68vh] mr-3"}>
        <ScreenManager screens={[SubstitutionScreen()]} activeByIndex={0} />
      </div>
      <HintDisplay />
    </div>
  );
}
