import React from "react";

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
  return <div>{tytul}</div>;
}
