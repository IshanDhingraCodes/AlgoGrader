import React from "react";
import CreateProblemForm from "../components/CreateProblemForm";

const AddProblem = () => {
  return (
    <div className="flex w-full flex-1 flex-col gap-8 px-5 sm:px-8 py-7 lg:py-12 md:max-h-screen md:overflow-y-scroll">
      <CreateProblemForm />
    </div>
  );
};

export default AddProblem;
