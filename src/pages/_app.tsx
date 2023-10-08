"use client";

import LeftBar from "@/components/LeftBar";
import MainContent from "@/components/MainContent";

import "./index.css";
import { ApolloProvider } from "@apollo/client";
import client from "@/utils/graphqlProvider";

export default function Main() {
  return (
    <ApolloProvider client={client}>
      <div className={"w-screen h-screen bg-black flex overflow-hidden"}>
        <LeftBar />
        <MainContent />
      </div>
    </ApolloProvider>
  );
}
