export default function MainContent() {
  return (
    <div
      className={
        "flex w-[98vw] h-screen justify-center items-center flex-col text-white"
      }
    >
      <h1
        className={
          "flex justify-center items-center text-6xl mb-5 w-full h-[12%]"
        }
      >
        title from cms
      </h1>
      <div className={"border-2 border-white rounded-xl w-[95%] h-[80%]"}></div>
    </div>
  );
}
