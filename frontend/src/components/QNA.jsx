import React from "react";
import { useThemeStore } from "../store/useThemeStore";
import { questions } from "../constants";

const QNA = () => {
  const theme = useThemeStore((state) => state.theme);
  const isDarkMode = theme === "black";
  return (
    <div className="my-20 max-w-5xl mx-auto">
      <div
        className="max-w-4xl mx-auto text-center my-20"
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
            Let's Answer Your Questions
          </span>
        </h1>
        <p className="text-base sm:text-lg text-base-content opacity-80 m-4">
          Track your problem-solving journey, create custom playlists, and
          visualize your progress with interactive graphs.
        </p>
      </div>

      {questions.map((q, i) => (
        <div
          className="collapse collapse-arrow join-item border-base-300 border-b"
          key={i}
        >
          <input type="radio" name="my-accordion-4" />
          <div className="collapse-title font-semibold">{q.ques}</div>
          <div className="collapse-content text-sm">{q.ans}</div>
        </div>
      ))}
    </div>
  );
};

export default QNA;
