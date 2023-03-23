import Head from "next/head";
import MainScreen from "@/components/LandingPage/MainScreen";


export default function Home() {
  return (
    <>
      <Head>
        <title>Ask to Lord Krishna</title>
        <meta name="description" content="Ask anything to Lord Krishna by Vattsal Bhatt" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
        <link
          href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </Head>
      <MainScreen />
    </>
  );
}
