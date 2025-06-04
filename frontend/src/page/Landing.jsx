import React from "react";
import LandingNav from "../components/LandingNav";
import Hero from "../components/Hero";

const Landing = () => {
  return (
    <main className="max-w-[1440px] mx-auto px-4 select-none">
      <LandingNav />
      <Hero />
    </main>
  );
};

export default Landing;
