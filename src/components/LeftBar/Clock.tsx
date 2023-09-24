import { useEffect, useRef } from "react";

export default function Clock() {
  const timeRef = useRef<HTMLHeadingElement>(null);
  useEffect(() => {
    const time = timeRef.current;
    if (!time) return;
    const sysTime = new window.Date();
    time.textContent = `${("0" + sysTime.getHours()).slice(-2)}:${(
      "0" + sysTime.getMinutes()
    ).slice(-2)}`;
    setInterval(() => {
      const newTime = `${("0" + sysTime.getHours()).slice(-2)}:${(
        "0" + sysTime.getMinutes()
      ).slice(-2)}`;
      if (time.textContent != newTime) time.textContent = newTime;
    }, 100);
  }, []);
  return (
    <div className={"flex flex-col justify-center items-center m-3 mt-10"}>
      <h1 className={"text-white text-7xl font-bold"} ref={timeRef}>
        21:37
      </h1>
      <h2 className={"text-white text-center text-2xl"}>za 69 sec przerwa</h2>
    </div>
  );
}
