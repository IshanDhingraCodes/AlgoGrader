import React, { useEffect } from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { useProblemStore } from "../store/useProblemStore";

ChartJS.register(ArcElement, Tooltip, Legend);

const DoughnutChart = () => {
  const { getSolvedProblemByUser, solvedProblems } = useProblemStore();

  useEffect(() => {
    getSolvedProblemByUser();
  }, [getSolvedProblemByUser]);

  const easy = solvedProblems.filter((p) => p.difficulty === "EASY").length;
  const medium = solvedProblems.filter((p) => p.difficulty === "MEDIUM").length;
  const hard = solvedProblems.filter((p) => p.difficulty === "HARD").length;

  const data = {
    labels: ["Easy", "Medium", "Hard"],
    datasets: [
      {
        data: [easy, medium, hard],
        backgroundColor: ["#22c55e", "#facc15", "#ef4444"],
        borderColor: ["#15803d", "#ca8a04", "#b91c1c"],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
    },
  };

  return (
    <div className="w-full aspect-square max-w-[200px] md:max-w-[240px] mx-auto">
      {solvedProblems.length === 0 ? (
        <p className="text-center text-gray-400">No data yet</p>
      ) : (
        <Doughnut data={data} options={options} />
      )}
    </div>
  );
};

export default DoughnutChart;
