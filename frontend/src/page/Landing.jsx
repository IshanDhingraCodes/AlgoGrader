import React from "react";
import LandingNav from "../components/LandingNav";
import Hero from "../components/Hero";
import LogoMarquee from "../components/LogoMarquee";
import Features from "../components/Features";

const Landing = () => {
  return (
    <main className="max-w-[1440px] mx-auto px-4 select-none">
      <LandingNav />
      <Hero />
      <LogoMarquee />
      <Features />
    </main>
  );
};

export default Landing;
