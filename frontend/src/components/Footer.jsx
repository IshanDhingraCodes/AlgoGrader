import React from "react";
import { logo } from "../assets";

const Footer = () => {
  return (
    <div className="flex flex-wrap items-center justify-center md:justify-between py-5 border-t border-base-300 gap-10 mt-28">
      <div className="flex items-center justify-center gap-2">
        <button
          onClick={() => {
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
          className="flex items-center gap-2 text-2xl font-bold rounded-xl px-2 py-1 focus:outline-none cursor-pointer"
        >
          <img
            src={logo}
            alt="AlgoGrader logo"
            className="w-10 h-10"
            loading="eager"
          />
          AlgoGrader
        </button>
      </div>
      <p className="font-normal text-center text-[18px] leading-[27px]">
        Copyright Ⓒ 2025 AlgoGrader. All Rights Reserved.
      </p>
    </div>
  );
};

export default Footer;
