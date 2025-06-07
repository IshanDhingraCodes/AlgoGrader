import React, { useEffect } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { useProblemStore } from "../store/useProblemStore";
import { Loader } from "lucide-react";
import ProblemTable from "../components/ProblemTable";
import DoughnutChart from "../components/DoughnutChart";
import TotalProblemsChart from "../components/TotalProblemsChart";
import PendingProblemsChart from "../components/PendingProblemsChart";

const HomePage = () => {
  const { authUser } = useAuthStore();
  const {
    getAllProblems,
    problems,
    isProblemsLoading,
    getSolvedProblemByUser,
    solvedProblems,
  } = useProblemStore();

  useEffect(() => {
    getAllProblems();
  }, [getAllProblems]);

  useEffect(() => {
    getSolvedProblemByUser();
  }, [getSolvedProblemByUser]);

  if (isProblemsLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader className="size-10 animate-spin" />
      </div>
    );
  }

  return (
    <div className="flex w-full flex-1 flex-col gap-8 px-5 sm:px-8 py-7 lg:py-12 md:max-h-screen md:overflow-y-scroll">
      <h1 className="text-4xl font-bold text-start">
        Welcome <span className="text-primary">{authUser.name}</span>
      </h1>
      <p className="text-lg font-semibold text-gray-500 dark:text-gray-400">
        Your space to practice coding questions and build confidence for
        interviews.
      </p>

      {/* Stats Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-base-300 rounded-lg p-5 shadow hover:shadow-lg transition flex flex-col items-center justify-between min-h-[300px]">
          <h3 className="text-md font-semibold">Problems Solved</h3>
          <DoughnutChart />
        </div>
        <div className="bg-base-300 rounded-lg p-5 shadow hover:shadow-lg transition flex flex-col items-center justify-between min-h-[300px]">
          <h3 className="text-md font-medium  text-center">Total Problems</h3>
          <TotalProblemsChart problems={problems} />
        </div>
        <div className="bg-base-300 rounded-lg p-5 shadow hover:shadow-lg transition flex flex-col items-center justify-between min-h-[300px]">
          <h3 className="text-md font-medium text-center">Pending Overview</h3>
          <PendingProblemsChart
            total={problems.length}
            solved={solvedProblems.length}
          />
        </div>
      </div>

      {/* Table */}
      <div>
        {problems.length > 0 ? (
          <ProblemTable problems={problems} />
        ) : (
          <p className="text-center text-gray-400 border border-primary px-4 py-2 rounded-md border-dashed">
            No problems found
          </p>
        )}
      </div>
    </div>
  );
};

export default HomePage;
