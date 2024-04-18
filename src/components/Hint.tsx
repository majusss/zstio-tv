import { TvContext } from "@/context/TvContext";
import Ticker from "@/lib/Ticker";
import { useContext, useRef } from "react";

const Hint: React.FC = () => {
  const hint = useContext(TvContext)?.hint;
  const ref = useRef<HTMLParagraphElement>(null);

  if (!hint?.show || !hint?.text) return null;

  return (
    <div className="absolute top-1 mx-1 text-2xl">
      {ref?.current && ref.current.offsetWidth + 20 > window.innerWidth ? (
        <Ticker>
          <p className="mx-4 whitespace-nowrap">{hint?.text}</p>
        </Ticker>
      ) : (
        <p className="min-w-[100vw] text-center">{hint?.text}</p>
      )}
      <p ref={ref} className="fixed bottom-0 w-fit select-none text-black">
        {hint?.text}
      </p>
    </div>
  );
};

export default Hint;
