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

const LineChart = ({ data, daysInMonth }) => {
  const chartRef = useRef(null); // Tham chiếu đến biểu đồ
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  const handleMouseDown = (e) => {
    setIsDragging(true);
    setStartX(e.pageX - chartRef.current.offsetLeft); // Lấy vị trí bắt đầu
    setScrollLeft(chartRef.current.scrollLeft); // Lưu trạng thái scroll ban đầu
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - chartRef.current.offsetLeft;
    const walk = (x - startX) * 2; //Tốc độ kéo
    chartRef.current.scrollLeft = scrollLeft - walk;
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const chartData = {
    labels: Array.from({ length: daysInMonth }, (_, i) => i + 1),
    datasets: [
      {
        label: "Calories tiêu thụ",
        data: data,
        borderColor: "#1445FE",
        backgroundColor: "rgba(59, 130, 246, 0.1)",
        pointBackgroundColor: "#1445FE",
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
            return `Ngày ${context.label}: ${context.raw} calories`;
          },
        },
      },
      legend: {
        display: false, // Ẩn phần chú thích
      },
    },
    scales: {
      x: {
        grid: {
          color: "#e5e7eb", // Màu lưới dọc
          lineWidth: 1,
        },
        ticks: {
          maxRotation: 0, // Giữ nhãn ngang
          padding: 20, // Khoảng cách giữa trục X và nhãn
        },
      },
      y: {
        beginAtZero: true,
        grid: {
          color: "#e5e7eb", // Màu lưới dọc
          lineWidth: 1, // Độ dày đường lưới
        },
        ticks: {
          stepSize: 40, // Giá trị giữa các vạch
          padding: 20, // Tăng khoảng cách giữa nhãn và trục
        },
      },
    },
  };

  return (
    <div className="relative">
      <div
        className="min-w-[600px] md:min-w-[800px]  w-[1000px] relative overflow-hidden cursor-grab"
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

export default LineChart;
