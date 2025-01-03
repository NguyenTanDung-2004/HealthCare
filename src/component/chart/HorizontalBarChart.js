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

const HorizontalBarChart = ({ data, labels, unit }) => {
  const chartData = {
    labels: labels, // Nhận labels từ prop
    datasets: [
      {
        label: "Cần nạp", // Calories cần nạp
        data: [data.required, 0, 0],
        backgroundColor: "rgba(20, 69, 254, 0.8)", // Xanh dương
      },
      {
        label: "Đã nạp",
        data: [0, data.consumed, 0],
        backgroundColor: "rgba(20, 69, 254, 0.8)", // Xanh dương
        stack: "stack1", // Xếp chồng
      },
      {
        label: "Tiêu hao",
        data: [0, data.burned, 0],
        backgroundColor: "rgba(239, 68, 68, 0.8)", // Đỏ
        stack: "stack1", // Xếp chồng với "Đã nạp"
      },
      {
        label: "Độ chênh lệch (cần nạp - thực sự nạp)", // Độ chênh lệch
        data: [0, 0, Math.abs(data.difference)], // Lấy giá trị tuyệt đối để luôn > 0
        backgroundColor:
          data.difference > 0
            ? "rgba(20, 69, 254, 0.8)"
            : "rgba(239, 68, 68, 0.8)",
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
            if (
              context.dataset.label === "Độ chênh lệch (cần nạp - thực sự nạp)"
            ) {
              return `${context.dataset.label}: ${data.difference} ${unit}`;
            }
            return `${context.dataset.label}: ${context.raw} ${unit}`;
          },
        },
      },
    },
    scales: {
      x: {
        stacked: true,
        beginAtZero: true,
        max: Math.max(data.required, data.consumed + data.burned),
      },
      y: {
        stacked: true,
      },
    },
  };

  return (
    <div className="w-[450px] h-[250px]">
      <Bar data={chartData} options={options} />
    </div>
  );
};

export default HorizontalBarChart;
