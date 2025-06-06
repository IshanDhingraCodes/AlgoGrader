import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import CTA from "./ui/CTA";
import { Zap, FileText, CheckCircle, List, BarChart } from "lucide-react";
import { lightDashboard, darkDashboard } from "../assets";
import { useThemeStore } from "../store/useThemeStore";

const Hero = () => {
  const ref = useRef(null);
  const theme = useThemeStore((state) => state.theme);

  const isDarkMode = theme === "black";

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "center center"],
  });

  const rotateX = useTransform(scrollYProgress, [0, 1], [40, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [0.95, 1]);

  return (
    <section
      className="relative min-h-[calc(100vh-5rem)] overflow-hidden"
      aria-label="Hero Section of Algorithm Problem Solving Website"
    >
      <div
        className={`absolute inset-0 pointer-events-none ${
          !isDarkMode ? "bg-grid-pattern" : "darkbg-grid-pattern"
        }`}
        aria-hidden="true"
      />

      {/* floating elements */}
      <div className="absolute inset-0 z-5 hidden lg:block" aria-hidden="true">
        <motion.div
          className="top-[2%] left-[10%] floating-badge"
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1.2 }}
          aria-label="Problem Solving Feature"
        >
          <Zap className="text-warning" aria-hidden="true" />
          <span className="font-semibold text-sm">Problem Solving</span>
        </motion.div>
        <motion.div
          className="top-[42%] left-[15%] floating-badge"
          initial={{ x: -80, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 1.4 }}
          aria-label="Submission Review Feature"
        >
          <FileText className="text-success" aria-hidden="true" />
          <span className="font-semibold text-sm">Submission Review</span>
        </motion.div>
        <motion.div
          className="top-[34%] right-[0%] floating-badge"
          initial={{ x: 80, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 1.6 }}
          aria-label="Solved Problems Tracking Feature"
        >
          <CheckCircle className="text-info" aria-hidden="true" />
          <span className="font-semibold text-sm">Solved Problems</span>
        </motion.div>
        <motion.div
          className="top-[4%] right-[4%] floating-badge"
          initial={{ y: -80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1.8 }}
          aria-label="Custom Playlists Feature"
        >
          <List className="text-secondary" aria-hidden="true" />
          <span className="font-semibold text-sm">Custom Playlists</span>
        </motion.div>
        <motion.div
          className="top-[45%] right-[10%] floating-badge"
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 2.0 }}
          aria-label="Progress Tracking Feature"
        >
          <BarChart className="text-accent" aria-hidden="true" />
          <span className="font-semibold text-sm">Progress Tracking</span>
        </motion.div>
      </div>

      <main
        className="relative flex flex-col justify-center items-center mt-20"
        aria-label="Hero Main Content of Algorithm Problem Solving Website"
      >
        <motion.p
          className="inline-flex py-2 px-4 rounded-full tracking-wider font-semibold bg-base-300 shadow-lg border border-base-300 text-base-content"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6, ease: "easeOut" }}
          aria-label="Website tagline: Practice Smarter, Not Harder"
        >
          &#123; Practice Smarter, Not Harder &#125;
        </motion.p>

        <motion.h1
          className="text-3xl sm:text-5xl md:text-6xl lg:text-[80px] text-center font-medium mt-14 tracking-wide max-w-screen-xl md:max-w-screen-3xl z-10"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.8, ease: "easeOut" }}
          aria-label="Main headline: Practice And Progress Elevate Your Programming Skills for Algorithm Problem Solving"
        >
          <span
            className={`${
              !isDarkMode
                ? "gradient-text-primary-accent"
                : "dark-gradient-text-black-white"
            } lg:text-[100px]`}
          >
            Practice
          </span>{" "}
          And{" "}
          <span
            className={`${
              !isDarkMode
                ? "gradient-text-primary-accent"
                : "dark-gradient-text-black-white"
            } lg:text-[100px]`}
          >
            Progress
          </span>{" "}
          Elevate Your Programming Skills
        </motion.h1>

        <motion.p
          className="md:text-lg mt-10 max-w-screen-lg sm:text-center text-justify mx-4 text-sm text-base-content font-semibold"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 0.8, y: 0 }}
          transition={{ delay: 1.2, duration: 0.8, ease: "easeOut" }}
          aria-label="Description of platform features for algorithm problem solving"
        >
          Track your problem-solving journey, create custom playlists, and
          visualize your progress with interactive graphs.
        </motion.p>

        <CTA
          text="Start Solving Now"
          className="mt-20 mb-10 z-10"
          aria-label="Start Solving Algorithm Problems Now Button"
        />

        {/* Perspective wrapper */}
        <div className="w-full max-w-3xl lg:max-w-5xl perspective-[1200px] z-10">
          <motion.div
            ref={ref}
            className="aspect-auto rounded-3xl relative origin-center border-8 border-base-300 overflow-hidden z-20 bg-base-100 dark:bg-neutral"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            style={{
              rotateX,
              scale,
              maskImage:
                "linear-gradient(to bottom, black 60%, transparent 100%)",
              WebkitMaskImage:
                "linear-gradient(to bottom, black 60%, transparent 100%)",
            }}
            transition={{ delay: 0.8, duration: 0.8, ease: "easeOut" }}
            aria-label="Promotional image of the algorithm problem solving platform"
          >
            <img
              src={isDarkMode ? darkDashboard : lightDashboard}
              alt="Hero visual"
              className="w-full h-full object-contain rounded-2xl"
              loading="lazy"
            />
          </motion.div>
        </div>
      </main>
    </section>
  );
};

export default Hero;
