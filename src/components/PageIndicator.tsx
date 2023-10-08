import React from "react";

function PageIndicator({ slides, active }: any) {
  return (
    <div
      className={
        "flex justify-center items-center mr-4 overflow-hidden bg-neutral-900 w-[15%] rounded-xl h-full transition-all"
      }
    >
      {[...Array(slides)].map((x, i) => (
        <svg
          key={i}
          xmlns="http://www.w3.org/2000/svg"
          height="0.6rem"
          viewBox="0 0 512 512"
          className="mr-1"
          fill={active == i ? "#fff" : "#828282"}
        >
          <path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512z" />
        </svg>
      ))}
    </div>
  );
}

export default PageIndicator;
