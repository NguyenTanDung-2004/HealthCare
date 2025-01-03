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

const VerticalBarChart = ({ data, unit }) => {
  const labels = data.map((item) => item.name);
  const scores = data.map((item) => item.score);
  const avatars = data.map((item) => item.avatar);

  const chartData = {
    labels: data.map((item) => item.name),
    datasets: [
      {
        label: "Scores",
        data: data.map((item) => item.score),
        backgroundColor: "rgb(20, 69, 254)",
        barThickness: 40, // Chiều rộng của cột
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        callbacks: {
          label: function (context) {
            return `${context.raw} ${unit}`; // Hiển thị giá trị kèm đơn vị
          },
        },
      },
    },
    scales: {
      x: {
        beginAtZero: true,
      },
      y: {
        beginAtZero: true,
        grace: "10%", // Thêm khoảng cách trên đầu cột để tránh avatar bị che
      },
    },
  };

  return (
    <div className="relative w-[400px] max-w-md mx-auto h-[300px]">
      {/* Chart */}
      <Bar data={chartData} options={options} />

      {/* Avatars */}
      <div className="absolute top-0 left-0 w-full h-full flex justify-around items-start pointer-events-none">
        {avatars.map((avatar, index) => (
          <div
            key={index}
            className="absolute flex flex-col items-center "
            style={{
              bottom: `calc(${
                (scores[index] / Math.max(...scores)) * 80
              }% + 40px)`,
              left: `${(index + 0.5) * (100 / labels.length)}%`,
              transform: "translateX(-50%)",
            }}
          >
            <div
              className="w-10 h-10 rounded-full border-2 border-white bg-cover shadow-md self-center"
              style={{ backgroundImage: `url(${avatar})` }}
            ></div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default VerticalBarChart;
