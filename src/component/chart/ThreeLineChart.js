import React, { useRef, useState } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend
);

const ThreeLineChart = ({ daysInMonth, proteinData, fatData, carbData }) => {
  const chartRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  const handleMouseDown = (e) => {
    setIsDragging(true);
    setStartX(e.pageX - chartRef.current.offsetLeft);
    setScrollLeft(chartRef.current.scrollLeft);
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - chartRef.current.offsetLeft;
    const walk = (x - startX) * 2;
    chartRef.current.scrollLeft = scrollLeft - walk;
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const chartData = {
    labels: Array.from({ length: daysInMonth }, (_, i) => `${i + 1}`), // Tạo nhãn cho từng ngày trong tháng
    datasets: [
      {
        label: "Protein đã nạp",
        data: proteinData, // Dữ liệu Protein cho tất cả các ngày trong tháng
        borderColor: "rgba(255, 99, 132, 1)",
        backgroundColor: "rgba(255, 99, 132, 0.1)",
        pointBackgroundColor: "rgba(255, 99, 132, 1)",
        pointBorderColor: "#fff",
        pointBorderWidth: 1,
        pointRadius: 6,
        pointHoverRadius: 8,
        tension: 0.1,
      },
      {
        label: "Fat đã nạp",
        data: fatData, // Dữ liệu Fat cho tất cả các ngày trong tháng
        borderColor: "rgba(75, 192, 192, 1)",
        backgroundColor: "rgba(75, 192, 192, 0.1)",
        pointBackgroundColor: "rgba(75, 192, 192, 1)",
        pointBorderColor: "#fff",
        pointBorderWidth: 1,
        pointRadius: 6,
        pointHoverRadius: 8,
        tension: 0.1,
      },
      {
        label: "Carb đã nạp",
        data: carbData, // Dữ liệu Carb cho tất cả các ngày trong tháng
        borderColor: "rgba(53, 162, 235, 1)",
        backgroundColor: "rgba(53, 162, 235, 0.1)",
        pointBackgroundColor: "rgba(53, 162, 235, 1)",
        pointBorderColor: "#fff",
        pointBorderWidth: 1,
        pointRadius: 6,
        pointHoverRadius: 8,
        tension: 0.1,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      tooltip: {
        callbacks: {
          label: function (context) {
            return `${context.dataset.label} ${context.raw} g`;
          },
        },
      },
      legend: {
        display: false,
      },
    },
    scales: {
      x: {
        grid: {
          color: "#e5e7eb",
          lineWidth: 1,
        },
        ticks: {
          maxRotation: 0,
          padding: 20,
        },
      },
      y: {
        beginAtZero: true,
        grid: {
          color: "#e5e7eb",
          lineWidth: 1,
        },
        ticks: {
          stepSize: 50,
          padding: 20,
        },
      },
    },
  };

  return (
    <div className="relative">
      <div
        className="w-[1000px] relative overflow-hidden cursor-grab"
        ref={chartRef}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        style={{ scrollbarWidth: "none" }}
      >
        <div style={{ minWidth: "2000px", height: "450px" }}>
          <Line data={chartData} options={options} />
        </div>
      </div>
    </div>
  );
};

export default ThreeLineChart;
