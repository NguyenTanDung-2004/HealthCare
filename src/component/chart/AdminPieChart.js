import React from "react";
import { Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  CategoryScale,
} from "chart.js";

ChartJS.register(Title, Tooltip, Legend, ArcElement, CategoryScale);

const AdminPieChart = ({ bad, normal, satisfied, labels }) => {
  const data = {
    labels: labels,
    datasets: [
      {
        data: [bad, normal, satisfied],
        backgroundColor: ["#baaead", "#36C5E2", "#9188FC"],
        borderColor: ["#baaead", "#36C5E2", "#9188FC"],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        callbacks: {
          label: (context) => {
            return `${context.label}: ${context.raw} (${(
              (context.raw / (bad + normal + satisfied)) *
              100
            ).toFixed(2)}%)`;
          },
        },
      },
    },
  };

  return (
    <div className="flex  justify-center items-center w-[200px]">
      <Pie data={data} options={options} />
    </div>
  );
};

export default AdminPieChart;
