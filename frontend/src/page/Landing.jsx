import React, { useEffect } from "react";
import Lenis from "lenis";

import LandingNav from "../components/LandingNav";
import Hero from "../components/Hero";
import LogoMarquee from "../components/LogoMarquee";
import Features from "../components/Features";

const Landing = () => {
  useEffect(() => {
    const lenis = new Lenis();
    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);
  }, []);

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
