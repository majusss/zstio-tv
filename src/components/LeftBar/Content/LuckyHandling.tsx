import { useEffect, useState } from "react";
import axios from "axios";

export default function LuckyHandling() {
  const [luckyNumber, setLuckyNumber] = useState(0);

  useEffect(() => {
    async function sendReq() {
      // MOVE TO SSR
      // const luckyNumberReq = await axios.get(
      // );
      // if (!luckyNumberReq.data.success) return;
      //
      // setLuckyNumber(luckyNumberReq.data.luckyNumber);
    }

    sendReq();
  }, []);

  return (
    <div
      className={"text-white flex items-center justify-center w-full py-3 mx-3"}
    >
      <h1 className={"font-bold text-lg"}>
        Szczęśliwy numerek: {luckyNumber}🎉
      </h1>
    </div>
  );
}
