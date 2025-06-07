import React from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

const PendingProblemsChart = ({ total, solved }) => {
  const pending = total - solved;

  const data = {
    labels: ["Solved", "Pending"],
    datasets: [
      {
        data: [solved, pending],
        backgroundColor: ["#22c55e", "#ef4444"],
        borderColor: ["#15803d", "#b91c1c"],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    cutout: "70%",
    plugins: {
      legend: {
        display: false,
        position: "bottom",
        labels: {
          color: "#d4d4d8",
          boxWidth: 12,
        },
      },
      tooltip: {
        callbacks: {
          label: (ctx) => `${ctx.label}: ${ctx.raw}`,
        },
      },
    },
  };

  return (
    <div className="flex justify-center items-center w-full h-full">
      <div className="w-44 md:w-56 text-center">
        <Doughnut data={data} options={options} />
      </div>
    </div>
  );
};

export default PendingProblemsChart;
