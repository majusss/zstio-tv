"use client";

import LeftBar from "@/components/LeftBar";
import MainContent from "@/components/MainContent";

import "./index.css";

export default function () {
  return (
    <div className={"w-screen h-screen bg-black flex overflow-hidden"}>
      <LeftBar />
      <MainContent />
    </div>
  );
}
