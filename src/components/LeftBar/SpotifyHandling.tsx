import axios from "axios";
import useSWR from "swr";
const fetchData = async (url: string) => {
  const spotiReq = await axios.get(url);

  return { spotiReq: spotiReq.data };
};
export default function SpotifyHandling() {
  const { data } = useSWR(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/api/getCurrentPlaying`,
    fetchData,
    { refreshInterval: 10 * 1000 }
  );

  if (!data?.spotiReq?.success) return;

  return (
    <div
      style={{
        backgroundImage: `url(${data?.spotiReq?.image})`,
        top: data?.spotiReq?.playing ? "0%" : "100%",
      }}
      className={
        "relative w-full aspect-square bg-cover bg-no-repeat transition-all duration-[1.5s]"
      }
    >
      <div
        className={
          "w-full h-full flex backdrop-brightness-[40%] flex-col text-white m-3 bg-gradient-to-b from-black to-transparent ml-0 mt-0 justify-end"
        }
      >
        <div
          className={
            "ml-6 text-4xl font-bold whitespace-nowrap w-[calc(100%-3rem)] h-12 overflow-hidden"
          }
        >
          <h2 className="text-ellipsis overflow-hidden h-full">
            {data?.spotiReq?.title}
          </h2>
        </div>
        <div className="ml-6 text-xl text-gray-300 mb-8 font-semibold -mt-1 w-[calc(100%-3rem)] overflow-hidden whitespace-nowrap">
          <h2 className="text-ellipsis overflow-hidden h-full">
            {data?.spotiReq?.artists}
          </h2>
        </div>
      </div>
    </div>
  );
}
