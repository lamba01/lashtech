import React from "react";
import Topnav from "../components/Topnav";
import Hero from "../sections/Hero";
import About from "../sections/About";

function Home() {
  return (
    <div>
      <Topnav />
      <Hero />
      <About />
    </div>
  );
}

export default Home;
