import LeftBar from "@/components/LeftBar";
import MainContent from "@/components/MainContent";

import "./index.css";
import { ApolloProvider } from "@apollo/client";
import client from "@/utils/graphqlProvider";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import Head from "next/head";
export default function Main() {
  const router = useRouter();

  useEffect(() => {
    const cursorParam = router.query.cursor;
    if (cursorParam === "none") {
      document.body.style.cursor = "none";
    }
  }, [router.query.cursor]);

  return (
    <ApolloProvider client={client}>
      <Head>
        <title>ZSTiO TV</title>
      </Head>
      <div className={"w-screen h-screen bg-black flex overflow-hidden"}>
        <LeftBar />
        <MainContent />
      </div>
    </ApolloProvider>
  );
}
