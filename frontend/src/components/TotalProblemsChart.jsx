import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
} from "chart.js";

ChartJS.register(BarElement, CategoryScale, LinearScale);

const TotalProblemsChart = ({ problems }) => {
  const easy = problems.filter((p) => p.difficulty === "EASY").length;
  const medium = problems.filter((p) => p.difficulty === "MEDIUM").length;
  const hard = problems.filter((p) => p.difficulty === "HARD").length;

  const data = {
    labels: ["Easy", "Medium", "Hard"],
    datasets: [
      {
        label: "Problems",
        data: [easy, medium, hard],
        backgroundColor: ["#22c55e", "#facc15", "#ef4444"],
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { display: false },
    },
    scales: {
      x: {
        ticks: {
          color: "#4b5563",
        },
        grid: {
          color: "#374151",
        },
      },
      y: {
        ticks: {
          color: "#4b5563",
        },
        grid: {
          color: "#374151",
        },
        beginAtZero: true,
      },
    },
  };

  return <Bar data={data} options={options} />;
};

export default TotalProblemsChart;
