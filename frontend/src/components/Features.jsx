import React from "react";
import { useThemeStore } from "../store/useThemeStore";
import { workspace } from "../assets";
import { motion } from "motion/react";

const Features = () => {
  const theme = useThemeStore((state) => state.theme);
  const isDarkMode = theme === "black";

  return (
    <section className="my-30" aria-label="Features and Benefits" role="region">
      <div
        className="max-w-3xl mx-auto text-center"
        role="banner"
        aria-labelledby="features-heading"
      >
        <h1
          id="features-heading"
          className="text-4xl sm:text-6xl font-extrabold tracking-wider"
        >
          <span
            className={`font-bold ${
              !isDarkMode
                ? "gradient-text-primary-accent"
                : "dark-gradient-text-black-white"
            }`}
          >
            Features
          </span>{" "}
          &{" "}
          <span
            className={`font-bold ${
              !isDarkMode
                ? "gradient-text-primary-accent"
                : "dark-gradient-text-black-white"
            }`}
          >
            Benefits
          </span>
        </h1>
        <p className="md:text-lg text-base-content opacity-80 mx-4 mt-5">
          Track your problem-solving journey, create custom playlists, and
          visualize your progress with interactive graphs.
        </p>
      </div>

      <div
        className="grid grid-cols-1 md:grid-cols-6 gap-4 gap-y-6 max-w-7xl mx-auto mt-20 px-4 sm:px-6 md:px-10"
        aria-label="Feature Grid"
      >
        <motion.div
          className="md:col-span-6 card bg-base-200 shadow-lg border border-base-300 rounded-3xl overflow-hidden flex flex-col md:flex-row min-h-[350px] transition-transform duration-300 hover:scale-[1.02]"
          aria-label="workspace"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
        >
          <div className="w-full md:w-1/2 h-full">
            <img
              src={workspace}
              alt="Illustration for workspace"
              className="w-full h-full object-fit"
            />
          </div>

          <div className="w-full md:w-1/2 p-6 md:p-8 flex flex-col justify-center items-start space-y-4">
            <p className="text-2xl sm:text-3xl font-extrabold text-base-content tracking-wide leading-snug">
              Your Problem-Solving Playground
            </p>
            <p className="text-base text-base-content opacity-80 leading-relaxed text-justify">
              Solve coding problems in a focused, high-performance environment
              built for productivity. From practicing algorithms to acing
              technical interviews, our workspace gives you powerful tools,
              instant feedback, and a smooth experience every step of the way.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Features;
