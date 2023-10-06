import { useEffect, useState } from "react";
import axios from "axios";

export default function SpotifyHandling() {
  const [spotiImg, setSpotiImg] = useState("");
  const [spotiTitle, setSpotiTitle] = useState("");
  const [spotiArtist, setSpotiArtist] = useState("");
  const [isPlaying, setPlaying] = useState(false);

  useEffect(() => {
    async function sendReq() {
      // MOVE TO SSR
      // // TODO: get refresh_token from cms
      // const spotiReq = await axios.get(
      // );
      //
      // if (!spotiReq.data.success) return;
      //
      // setPlaying(spotiReq.data.data.is_playing);
      // if (!isPlaying) return;
      // setSpotiImg(`url(${spotiReq.data.data.item.album.images[0].url})`);
      // setSpotiTitle(spotiReq.data.data.item.name);
      // setSpotiArtist(
      //   spotiReq.data.data.item.artists
      //     .map((artist: { name: string }) => artist.name)
      //     .join(", "),
      // );
    }

    sendReq();

    setInterval(sendReq, 5000);
  }, []);

  return (
    <div
      style={{ backgroundImage: spotiImg, top: isPlaying ? 0 : "100%" }}
      className={
        "relative w-full aspect-square bg-cover bg-no-repeat transition-all duration-[1.5s]"
      }
    >
      <div
        className={
          "w-full h-full flex flex-col text-white m-3 bg-gradient-to-b from-black to-transparent ml-0 mt-0"
        }
      >
        <h1 className={"font-bold ml-1 mt-5 text-3xl"}>{spotiTitle}</h1>
        <h2 className={"ml-1 text-xl"}>{spotiArtist}</h2>
      </div>
    </div>
  );
}
