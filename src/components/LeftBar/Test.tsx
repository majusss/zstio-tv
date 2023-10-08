import React, { useState, useEffect } from "react";

const TextScroller = ({ text }: any) => {
  const [scrollDirection, setScrollDirection] = useState("right");

  useEffect(() => {
    const textContainer = document.getElementById("text-container");
    const textElement: any = document.getElementById("text-element");

    const handleAnimationIteration = () => {
      if (scrollDirection === "right") {
        setScrollDirection("left");
      } else {
        setScrollDirection("right");
      }
    };

    textElement.addEventListener(
      "animationiteration",
      handleAnimationIteration
    );

    return () => {
      textElement.removeEventListener(
        "animationiteration",
        handleAnimationIteration
      );
    };
  }, [scrollDirection]);

  return (
    <div id="text-container" className={`text-container ${scrollDirection}`}>
      <div id="text-element" className="text-element">
        {text}
      </div>
    </div>
  );
};

export default TextScroller;
