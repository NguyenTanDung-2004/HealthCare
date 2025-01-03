import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

const BigHorizontalBarChart = ({ data }) => {
  const chartData = {
    labels: ["Calories cần nạp", "Calories thực sự nạp", "Calories tiêu hao"],
    datasets: [
      {
        label: "Cần nạp",
        data: [data.required, 0, 0],
        backgroundColor: "rgba(20, 69, 254, 0.8)",
      },
      {
        label: "Thực sự nạp",
        data: [0, data.consumed, 0],
        backgroundColor: "rgba(20, 69, 254, 0.8)",
      },
      {
        label: "Tiêu hao",
        data: [0, 0, data.burned],
        backgroundColor: "rgba(20, 69, 254, 0.8)",
      },
    ],
  };

  const options = {
    indexAxis: "y",
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
        labels: {
          color: "black",
          font: {
            weight: "600",
          },
        },
      },
      tooltip: {
        callbacks: {
          label: function (context) {
            return `${context.dataset.label}: ${context.raw}`;
          },
        },
      },
    },
    scales: {
      x: {
        stacked: true,
        beginAtZero: true,
        max: Math.max(data.required, data.consumed),
      },
      y: {
        stacked: false,
      },
    },
  };

  return (
    <div className="w-full h-[350px]">
      <Bar data={chartData} options={options} />
    </div>
  );
};

export default BigHorizontalBarChart;
