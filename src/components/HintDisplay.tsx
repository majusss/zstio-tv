import { useEffect, useState } from "react";
import axios from "axios";
import { useCMSData } from "../utils/ContentManagmentSystem.tsx";

export default function HintDisplay() {
  const { cmsData } = useCMSData();

  if (!cmsData.useHint) return null;

  const [textContent, setTextContent] = useState("");
  const [author, setAuthor] = useState("");

  useEffect(() => {
    async function sendReq() {
      const cytatReq = await axios.get("http://localhost:5173/api/getCytat");
      if (!cytatReq.data.success) return;

      setTextContent(cytatReq.data.cytat.content);
      setAuthor(cytatReq.data.cytat.author);
    }

    sendReq();
  }, []);

  return (
    <div
      className={
        "flex justify-center items-center bg-neutral-900 rounded-tl-2xl rounded-tr-2xl w-full h-[6vh]"
      }
    >
      <h1 className={"text-center text-xl whitespace-nowrap w-full"}>
        <span className={"font-bold"}>{textContent}</span> - {author}
      </h1>
    </div>
  );
}
