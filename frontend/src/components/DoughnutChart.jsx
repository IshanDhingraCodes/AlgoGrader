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
    plugins: {
      legend: {
        display: false,
        position: "bottom",
        labels: {
          color: "#d4d4d8",
        },
      },
    },
  };

  return (
    <div className="w-64 md:w-80">
      {solvedProblems.length === 0 ? (
        <p className="text-center text-gray-400">No data yet</p>
      ) : (
        <div className="w-40 md:w-56 mx-auto">
          <Doughnut data={data} options={options} />
        </div>
      )}
    </div>
  );
};

export default DoughnutChart;
