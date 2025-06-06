import React from "react";
import { useThemeStore } from "../store/useThemeStore";
import { workspace } from "../assets";
import { motion } from "framer-motion";
import {
  ai,
  filter,
  languages,
  learning,
  playlists,
  progress,
} from "../assets/features";

const Features = () => {
  const theme = useThemeStore((state) => state.theme);
  const isDarkMode = theme === "black";

  return (
    <section
      className="my-20 px-4 sm:px-6 md:px-10"
      aria-label="Features and Benefits"
      role="region"
      id="feature"
    >
      <div
        className="max-w-3xl mx-auto text-center"
        role="banner"
        aria-labelledby="features-heading"
      >
        <h1
          id="features-heading"
          className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-wider mb-4"
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
        <p className="text-base sm:text-lg lg:text-xl text-base-content opacity-80 mx-4 mt-3 max-w-2xl">
          Track your problem-solving journey, create custom playlists, and
          visualize your progress with interactive graphs.
        </p>
      </div>

      <div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-4 gap-y-6 max-w-7xl mx-auto mt-10 sm:mt-20"
        aria-label="Feature Grid"
      >
        {/* Workspace card */}
        <motion.div
          className="sm:col-span-2 lg:col-span-6 card bg-base-200 shadow-lg border border-base-300 rounded-3xl overflow-hidden flex flex-col md:flex-row min-h-[350px] transition-transform duration-300 hover:scale-[1.02]"
          aria-label="workspace"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
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
            <p className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-base-content tracking-wide leading-snug mb-4">
              Your Problem-Solving Playground
            </p>
            <p className="text-sm sm:text-base lg:text-lg text-base-content opacity-80 leading-relaxed text-justify">
              Solve coding problems in a focused, high-performance environment
              built for productivity. From practicing algorithms to acing
              technical interviews, our workspace gives you powerful tools,
              instant feedback, and a smooth experience every step of the way.
            </p>
          </div>
        </motion.div>

        {/* Multi-Language */}
        <motion.div
          className="sm:col-span-2 lg:col-span-2 p-6 flex flex-col items-center justify-center md:gap-10 rounded-3xl min-h-[220px] card bg-base-200 shadow-lg border border-base-300 transition-transform duration-300 hover:scale-[1.02]"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.4 }}
        >
          <div className="flex flex-col gap-4">
            <h3 className="feature-heading text-xl sm:text-2xl lg:text-5xl font-bold mb-4">
              Multi-Language Support
            </h3>
            <p className="text-sm sm:text-base lg:text-lg text-base-content opacity-80 text-justify mt-4">
              Practice in your preferred language with support for JavaScript,
              Python, and Java. Each problem includes language-specific code
              snippets and reference solutions.
            </p>
          </div>
          <img
            src={languages}
            alt="languages"
            className="w-full object-contain max-h-40"
          />
        </motion.div>

        {/* Progress + Playlist */}
        <div className="w-full sm:col-span-2 lg:col-span-2 grid grid-rows-2 gap-4">
          <motion.div
            className="card bg-base-200 shadow-lg border border-base-300 rounded-3xl flex flex-col items-center p-8 min-h-[220px] transition-transform duration-300 hover:scale-[1.02]"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
          >
            <img
              src={progress}
              alt="progress"
              className="w-full object-contain max-h-40"
            />
            <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-base-content mb-3 text-center">
              Progress Analytics
            </h3>
            <p className="text-sm sm:text-base lg:text-lg text-base-content opacity-80 text-center">
              Track your growth with detailed analytics and visualizations.
            </p>
          </motion.div>

          <motion.div
            className="card bg-base-200 shadow-lg border border-base-300 rounded-3xl flex flex-col items-center justify-center px-8 gap-4 min-h-[220px] transition-transform duration-300 hover:scale-[1.02]"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.6 }}
          >
            <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-base-content mb-3 text-center">
              Custom Playlists
            </h3>
            <img
              src={playlists}
              alt="playlists"
              className="w-full object-contain max-h-40"
            />
            <p className="text-sm sm:text-base lg:text-lg text-base-content opacity-80 text-center">
              Create and organize your practice sessions with custom playlists.
            </p>
          </motion.div>
        </div>

        {/* Learning */}
        <motion.div
          className="sm:col-span-2 lg:col-span-2 p-6 flex flex-col items-center justify-center md:gap-10 rounded-3xl min-h-[250px] card bg-base-200 shadow-lg border border-base-300 transition-transform duration-300 hover:scale-[1.02]"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.7 }}
        >
          <img
            src={learning}
            alt="learning"
            className="w-full max-h-60 object-contain"
          />
          <div className="flex flex-col items-center text-center">
            <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold my-4">
              Learning Resources
            </h3>
            <p className="text-sm sm:text-base lg:text-lg text-base-content opacity-80 text-justify">
              Access detailed problem descriptions, examples, constraints, and
              hints. Each problem includes comprehensive explanations and
              editorial solutions.
            </p>
          </div>
        </motion.div>

        {/* AI */}
        <motion.div
          className="sm:col-span-2 lg:col-span-3 card bg-base-200 shadow-lg border border-base-300 rounded-3xl flex flex-col items-center p-8 min-h-[220px] transition-transform duration-300 hover:scale-[1.02]"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.8 }}
        >
          <img src={ai} alt="ai" className="w-full max-h-40 object-contain" />
          <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-base-content my-3 text-center">
            AI-Powered Discussion
          </h3>
          <p className="text-sm sm:text-base lg:text-lg text-base-content opacity-80 text-center">
            Get help and discuss solutions with our AI assistant. Receive hints,
            explanations, and guidance tailored to your learning needs.
          </p>
        </motion.div>

        {/* Filter */}
        <motion.div
          className="sm:col-span-2 lg:col-span-3 card bg-base-200 shadow-lg border border-base-300 rounded-3xl flex flex-col items-center p-8 min-h-[220px] transition-transform duration-300 hover:scale-[1.02]"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.9 }}
        >
          <div className="flex flex-col sm:flex-row items-center gap-4 justify-center h-full text-center sm:text-left">
            <img
              src={filter}
              alt="filter"
              className="w-full sm:w-1/3 max-h-40 object-contain"
            />
            <div className="flex flex-col gap-2 sm:w-2/3">
              <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-base-content mb-3">
                Problem Management
              </h3>
              <p className="text-sm sm:text-base lg:text-lg text-base-content opacity-80">
                Filter problems by difficulty, tags, and search terms. Track
                your submissions and view detailed test case results for each
                solution.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Features;
