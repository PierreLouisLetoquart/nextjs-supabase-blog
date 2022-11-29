import Head from "next/head";
import React from "react";
import AboutSection from "./sections/about-section";
import Contact from "./sections/contact-section";
import HowItWork from "./sections/how-section";
import MainSection from "./sections/main-section";
import Footer from "../components/Footer";

export default function Home() {
  return (
    <div>
      <Head>
        <title>Home</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <MainSection/>
        <AboutSection/>
        <HowItWork/>
        <Contact/>
        <Footer/>
      </main>
    </div>
  );
}
