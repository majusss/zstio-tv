import React from "react";
import Markdown from "markdown-to-jsx";

type CustomScreenProps = {
  id: number;
  tytul: string;
  opis: string;
  czasTrwaniaWSekundach: number;
  czyBardzoWazne: boolean;
  czyPokazany: boolean;
  dodatkoweZdjecie: string | undefined;
};

export default function CustomScreen({
  id,
  tytul,
  opis,
  czasTrwaniaWSekundach,
  czyBardzoWazne,
  czyPokazany,
  dodatkoweZdjecie,
}: CustomScreenProps) {
  return (
    <div className="w-full flex justify-center items-center flex-col">
      <h1 className={"text-center text-3xl font-semibold w-full mt-6"}>
        {tytul}
        <hr className="h-px mt-4 bg-[#272727] border-0" />
      </h1>
      <div className="markdown text-center w-[80%] mt-5 h-[75vh] overflow-auto transition">
        <Markdown options={{ wrapper: "aside", forceWrapper: true }}>
          {opis}
        </Markdown>
      </div>
    </div>
  );
}
