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
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium text-success bg-success/10">
            <CheckCircle size={12} />
            Easy
          </span>
        );
      case "MEDIUM":
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium text-warning bg-warning/10">
            <Circle size={12} />
            Medium
          </span>
        );
      case "HARD":
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium text-error bg-error/10">
            <AlertTriangle size={12} />
            Hard
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-base-200">
            Unknown
          </span>
        );
    }
  };

  if (isProblemsLoading || solvedProblems === undefined) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader className="size-12 animate-spin text-primary" />
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
    <div className="flex w-full flex-1 flex-col gap-8 px-5 sm:px-8 py-7 lg:py-12 md:max-h-screen md:overflow-y-scroll">
      <div className="w-full">
        {/* Header Section */}
        <div className="mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-start mb-3">
            Solved <span className="text-primary">Problems</span>
          </h1>
          <p className="text-base sm:text-lg text-base-content/70">
            Track your progress and review the problems you've conquered.
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          {stats.map(({ label, count, color }) => (
            <div
              key={label}
              className={`flex flex-col items-center justify-center p-4 rounded-xl bg-base-200 shadow-sm hover:shadow-md transition-shadow duration-300 border-l-4 border-${color}`}
            >
              <span className={`text-3xl font-bold text-${color}`}>
                {count}
              </span>
              <span className="text-sm font-medium text-base-content/80">
                {label}
              </span>
            </div>
          ))}
        </div>

        {/* Problems Section */}
        {solvedProblems.length === 0 ? (
          <div className="bg-base-200 rounded-xl p-6 sm:p-8 text-center shadow-sm">
            <h3 className="text-xl font-semibold mb-3">
              No Problems Solved Yet
            </h3>
            <p className="text-base-content/70 mb-4">
              Start solving problems to see your achievements here!
            </p>
            <Link to="/home" className="btn btn-primary btn-md">
              Explore Problems
            </Link>
          </div>
        ) : (
          <div className="bg-base-200 rounded-xl shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="table w-full">
                <thead>
                  <tr className="text-sm text-base-content/80 bg-base-300">
                    <th className="px-4 py-3">Problem</th>
                    <th className="px-4 py-3">Difficulty</th>
                    <th className="px-4 py-3">Tags</th>
                    <th className="px-4 py-3 text-center">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {solvedProblems.map((problem) => (
                    <tr
                      key={problem.id}
                      className="hover:bg-base-300/50 transition-colors duration-200"
                    >
                      <td className="px-4 py-3 font-medium text-base-content">
                        {problem.title}
                      </td>
                      <td className="px-4 py-3">
                        {getDifficultyBadge(problem.difficulty)}
                      </td>
                      <td className="px-4 py-3 min-w-[150px]">
                        <div className="flex flex-wrap gap-2">
                          {problem.tags?.map((tag, index) => (
                            <span
                              key={index}
                              className="badge badge-outline badge-primary text-xs flex items-center gap-1"
                            >
                              <Tag size={10} />
                              {tag}
                            </span>
                          ))}
                        </div>
                      </td>
                      <td className="px-4 py-3 text-center">
                        <Link
                          to={`/problem/${problem.id}`}
                          className="btn btn-sm btn-outline btn-primary flex items-center gap-1"
                        >
                          <ExternalLink size={14} />
                          View
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="bg-base-300 p-4 flex flex-col sm:flex-row justify-between items-center gap-4">
              <span className="text-sm font-medium">
                Total problems solved:{" "}
                <span className="font-bold">{solvedProblems.length}</span>
              </span>
              <Link to="/home" className="btn btn-sm btn-primary">
                Solve More Problems
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProblemSolvedByUser;
