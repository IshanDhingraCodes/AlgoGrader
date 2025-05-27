import React from "react";
import { useAuthStore } from "../store/useAuthStore";

const HomePage = () => {
  const { authUser } = useAuthStore();

  return (
    <div className="flex w-full flex-1 flex-col gap-8 px-5 sm:px-8 py-7 lg:py-12 md:max-h-screen md:overflow-y-scroll">
      <h1 className="text-4xl font-semibold z-10 text-start">
        Welcome <span className="text-primary">{authUser.name}</span>
      </h1>
      <p className="text-lg font-semibold text-gray-500 dark:text-gray-400 z-10">
        Your space to practice coding questions and build confidence for
        interviews.
      </p>
    </div>
  );
};

export default HomePage;
