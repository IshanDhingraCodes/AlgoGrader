import React from "react";
import CTA from "./ui/CTA";

const CallToAction = () => {
  return (
    <section className="flex justify-center items-center sm:my-16 my-6 md:px-16 px-6 md:py-12 py-4 md:flex-row flex-col bg-base-200 rounded-[20px] shadow-xl md:my-40">
      <div className="flex-1 flex flex-col">
        <h2 className="font-semibold xs:text-[48px] text-[40px] xs:leading-[76.8px] leading-[66.8px] w-full">
          Let&#39;s try our service now!
        </h2>
        <p className="font-normal text-base-content text-[18px] leading-[30.8px] max-w-[600px] mt-5 opacity-80">
          Track your problem-solving journey, create custom playlists, and
          visualize your progress with interactive graphs.
        </p>
      </div>

      <div className="flex justify-center items-center md:ml-10 ml-0 md:mt-0 mt-10">
        <CTA text="Get Started" />
      </div>
    </section>
  );
};

export default CallToAction;
