import React from "react";
import { ArrowRight } from "lucide-react";

const CTA = ({ text, className }) => {
  return (
    <a href="/sign-in">
      <button
        className={`relative inline-flex h-12 overflow-hidden rounded-full p-[1px] focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50 transition-transform duration-300 hover:scale-105 ${className}`}
      >
        <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />
        <span className="inline-flex h-full w-full cursor-pointer items-center font-bold justify-center rounded-full px-6 py-2 text-lg text-white backdrop-blur-3xl bg-gradient-to-r from-primary to-accent shadow-md hover:shadow-lg">
          {text}

          <ArrowRight className="ml-2 h-6 w-6" aria-hidden="true" />
        </span>
      </button>
    </a>
  );
};

export default CTA;
