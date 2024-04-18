import TvProvider from "@/context/TvContext";
import { AppProps } from "next/app";
import Head from "next/head";
import "./globals.css";

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <TvProvider>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <Component {...pageProps} />
    </TvProvider>
  );
};

export default App;
