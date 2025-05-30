import React, { useEffect } from "react";
import { useProblemStore } from "../store/useProblemStore";
import { Link } from "react-router-dom";
import {
  Tag,
  ExternalLink,
  AlertTriangle,
  CheckCircle,
  Circle,
  Loader,
} from "lucide-react";

const ProblemSolvedByUser = () => {
  const { getSolvedProblemByUser, solvedProblems, isProblemsLoading } =
    useProblemStore();

  useEffect(() => {
    getSolvedProblemByUser();
  }, [getSolvedProblemByUser]);

  const getDifficultyBadge = (difficulty) => {
    switch (difficulty) {
      case "EASY":
        return (
          <span className="badge gap-1 text-success bg-success/10">
            <CheckCircle size={12} />
            Easy
          </span>
        );
      case "MEDIUM":
        return (
          <span className="badge gap-1 text-warning bg-warning/10">
            <Circle size={12} />
            Medium
          </span>
        );
      case "HARD":
        return (
          <span className="badge gap-1 text-error bg-error/10">
            <AlertTriangle size={12} />
            Hard
          </span>
        );
      default:
        return <span className="badge badge-ghost">Unknown</span>;
    }
  };

  if (isProblemsLoading || solvedProblems === undefined) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader className="size-10 animate-spin" />
      </div>
    );
  }

  const stats = [
    {
      label: "Easy",
      count: solvedProblems.filter((p) => p.difficulty === "EASY").length,
      color: "success",
    },
    {
      label: "Medium",
      count: solvedProblems.filter((p) => p.difficulty === "MEDIUM").length,
      color: "warning",
    },
    {
      label: "Hard",
      count: solvedProblems.filter((p) => p.difficulty === "HARD").length,
      color: "error",
    },
  ];

  return (
    <div className="w-full flex-1 px-5 sm:px-8 py-7 lg:py-12 md:max-h-screen md:overflow-y-scroll">
      <div className="w-full flex flex-col gap-8">
        <div>
          <h1 className="text-4xl font-bold text-start mb-2">
            Solved <span className="text-primary">Problems</span>
          </h1>
          <p className="text-lg font-semibold text-gray-500 dark:text-gray-400">
            Review the problems you have solved and track your progress.
          </p>
        </div>

        {/* Stats Tabs */}
        <div className="bg-base-200 rounded-xl p-2 flex items-center justify-between max-w-md">
          {stats.map(({ label, count, color }) => (
            <div
              key={label}
              className={`flex flex-col items-center cursor-pointer rounded-lg px-5 py-3
                  text-${color} font-semibold
                  hover:bg-${color}/20 transition-colors duration-200
                `}
            >
              <span className={`text-2xl font-bold text-${color}`}>
                {count}
              </span>
              <span className="text-sm">{label}</span>
            </div>
          ))}
        </div>

        {solvedProblems.length === 0 ? (
          <div className="bg-base-100 rounded-xl shadow p-6">
            <h3 className="text-lg font-semibold mb-2">
              No problems solved yet
            </h3>
            <p className="text-base-content/70 mb-4">
              Start solving problems to see them listed here!
            </p>
            <Link to="/home" className="btn btn-primary">
              View Problems
            </Link>
          </div>
        ) : (
          <>
            <div className="bg-base-100 rounded-xl shadow overflow-hidden">
              <div className="overflow-x-auto">
                <table className="table table-zebra w-full">
                  <thead>
                    <tr className="text-sm text-base-content">
                      <th className="bg-base-300">Problem</th>
                      <th className="bg-base-300">Difficulty</th>
                      <th className="bg-base-300">Tags</th>
                      <th className="bg-base-300 text-center">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {solvedProblems.map((problem) => (
                      <tr
                        key={problem.id}
                        className="hover:bg-base-200 transition-colors duration-200"
                      >
                        <td className="font-medium">{problem.title}</td>
                        <td>{getDifficultyBadge(problem.difficulty)}</td>
                        <td className="min-w-[120px]">
                          <div className="flex flex-wrap gap-1">
                            {problem.tags?.map((tag, index) => (
                              <span
                                key={index}
                                className="badge badge-outline badge-primary flex items-center gap-1"
                              >
                                <Tag size={10} />
                                {tag}
                              </span>
                            ))}
                          </div>
                        </td>
                        <td className="text-center">
                          <Link
                            to={`/problem/${problem.id}`}
                            className="btn btn-sm btn-outline btn-primary"
                          >
                            <ExternalLink size={14} className="mr-1" />
                            View
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="bg-base-200 p-4 flex justify-between items-center">
                <span className="text-sm">
                  Total problems solved:{" "}
                  <span className="font-bold">{solvedProblems.length}</span>
                </span>
                <Link to="/home" className="btn btn-sm btn-primary">
                  Solve more problems
                </Link>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ProblemSolvedByUser;
