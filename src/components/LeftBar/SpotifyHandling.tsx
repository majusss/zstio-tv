import { useEffect, useState } from "react";
import axios from "axios";

export default function SpotifyHandling() {
  const [spotiImg, setSpotiImg] = useState("");
  const [spotiTitle, setSpotiTitle] = useState("");
  const [spotiArtist, setSpotiArtist] = useState("");
  const [isPlaying, setPlaying] = useState(false);

  useEffect(() => {
    async function sendReq() {
      const spotiReq = await axios.get(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/getCurrentPlaying`
      );

      if (!spotiReq.data.success) return;

      setPlaying(spotiReq.data.playing);
      if (!isPlaying) return;
      setSpotiImg(`url(${spotiReq.data.image})`);
      setSpotiTitle(spotiReq.data.title);
      setSpotiArtist(spotiReq.data.artists);
    }

    sendReq();

    setInterval(sendReq, 10000);
  }, [isPlaying]);

  return (
    <div
      style={{ backgroundImage: spotiImg, top: isPlaying ? "15%" : "100%" }}
      className={
        "relative w-full aspect-square bg-cover bg-no-repeat transition-all duration-[1.5s]"
      }
    >
      <div
        className={
          "w-full h-full flex backdrop-brightness-50 flex-col text-white m-3 bg-gradient-to-b from-black to-transparent ml-0 mt-0 justify-end"
        }
      >
        <div
          className={
            "ml-6 text-4xl font-bold whitespace-nowrap w-[calc(100%-3rem)] h-12 overflow-hidden"
          }
        >
          <h2>{spotiTitle}</h2>
        </div>
        <h2
          className={
            "ml-6 text-xl text-gray-300 mb-36 font-semibold -mt-1 text-ellipsis w-[calc(100%-3rem)] overflow-hidden"
          }
        >
          {spotiArtist}
        </h2>
      </div>
    </div>
  );
}
