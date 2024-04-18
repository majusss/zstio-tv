import { TvContext } from "@/context/TvContext";
import { useCallback, useContext, useEffect, useState } from "react";

const Galery: React.FC<{ displayTime: number }> = ({ displayTime }) => {
  const galery = useContext(TvContext)?.galery;
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [animationStart, setAnimationStart] = useState<boolean>(false);
  const nextImage = useCallback(() => {
    if (!galery || galery.length === 1) return;
    setCurrentIndex((prevIndex) => {
      return prevIndex === galery?.length - 1 ? 0 : prevIndex + 1;
    });
  }, [galery]);
  useEffect(() => {
    if (!galery) return;
    setTimeout(() => setAnimationStart(true), (displayTime * 1000 - 1000) / galery?.length);
    setTimeout(nextImage, (displayTime * 1000) / galery?.length);
    setTimeout(() => setAnimationStart(false), (displayTime * 1000 + 1000) / galery?.length);
    // I KNOW WHAT I AM DOING
    // eslint-disable-next-line
  }, [currentIndex]);

  if (!galery || !galery[currentIndex]) return null;

  return (
    <div className="flex h-full w-full items-center justify-center">
      <img
        className="rounded-lg border-8 border-[#202020] opacity-100 transition-opacity duration-700 ease-in-out"
        style={{ opacity: animationStart ? 0 : 1 }}
        key={galery[currentIndex].id}
        src={galery[currentIndex].url}
        alt={galery[currentIndex].title}
      />
    </div>
  );
};
export default Galery;
