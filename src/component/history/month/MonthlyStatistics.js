import React, { useState, useRef, useEffect } from "react";
import WorkoutStatistics from "./WorkoutStatistics";
import CaloriesStatistics from "./CaloriesStatistics";
import PCFStatistics from "./PCFStatistics";

const MonthlyStatistics = () => {
  // chọn tháng
  const [selectedMonth, setSelectedMonth] = useState(() => {
    const today = new Date();
    return `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(
      2,
      "0"
    )}`;
  });
  const [monthlyData, setMonthlyData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const apiUrl = process.env.REACT_APP_API_URL;
  const inputRef = useRef(null);

  const handleMonthChange = (event) => {
    setSelectedMonth(event.target.value);
  };

  const handleSelectMonthClick = () => {
    inputRef.current.showPicker();
  };

  const formatMonth = (month) => {
    const [year, mm] = month.split("-");
    return `${mm}/${year}`;
  };

  // Hiển thị các statistic
  const [isWorkoutVisible, setIsWorkoutVisible] = useState(true);
  const [isCaloriesVisible, setIsCaloriesVisible] = useState(false);
  const [isPCFVisible, setIsPCFVisible] = useState(false);
  const toggleWorkoutVisibility = () => {
    setIsWorkoutVisible((prev) => !prev);
  };

  const toggleCaloriesVisibility = () => {
    setIsCaloriesVisible((prev) => !prev);
  };
  const togglePCFVisibility = () => {
    setIsPCFVisible((prev) => !prev);
  };

  useEffect(() => {
    const fetchMonthlyData = async () => {
      setLoading(true);
      setError(null);
      try {
        const [year, month] = selectedMonth.split("-");
        const url = `${apiUrl}/userHistory/getDataForMonthReport?month=${month}&year=${year}`;
        const response = await fetch(url, {
          method: "GET",
          headers: {
            Accept: "application/json",
          },
          credentials: "include", // Add this line to include cookies
        });
        if (!response.ok) {
          const text = await response.text();
          console.log(text);
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const contentType = response.headers.get("content-type");
        if (!contentType || !contentType.includes("application/json")) {
          throw new Error("Response is not in JSON format!");
        }
        const data = await response.json();
        setMonthlyData(data);
      } catch (err) {
        setError(err.message || "Failed to fetch data");
      } finally {
        setLoading(false);
      }
    };
    fetchMonthlyData();
  }, [selectedMonth, apiUrl]);

  if (loading) {
    return <div className="text-center">Loading...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500">Error: {error}</div>;
  }

  return (
    <div className="w-full flex flex-col justify-center gap-8">
      <div
        onClick={handleSelectMonthClick}
        className="w-[150px] flex items-center justify-center self-center gap-1 bg-[#E8E8E8] border-[0.5px] border-[#595858] rounded-md hover:bg-white cursor-pointer"
      >
        <div className="relative">
          <input
            ref={inputRef}
            type="month"
            value={selectedMonth}
            onChange={handleMonthChange}
            className="absolute inset-0 opacity-0 pointer-events-none"
          />
        </div>
        <span className="px-4 py-1 text-black text-xl font-medium">
          {formatMonth(selectedMonth)}
        </span>
      </div>

      <div
        onClick={toggleWorkoutVisibility}
        className="w-full px-5 py-2 flex justify-between items-center bg-[#595858] text-white text-lg cursor-pointer rounded-xl"
      >
        <span>LỊCH SỬ VÀ THỐNG KÊ BÀI TẬP</span>
        <i
          className={`fa-solid ${
            !isWorkoutVisible ? "fa-chevron-up" : "fa-chevron-down"
          } `}
        ></i>
      </div>
      {isWorkoutVisible && monthlyData && (
        <WorkoutStatistics
          month={selectedMonth}
          exerciseChart={monthlyData.exerciseChart}
          listExercises={monthlyData.listExercises}
        />
      )}

      <div
        onClick={toggleCaloriesVisibility}
        className="w-full px-5 py-2 flex justify-between items-center bg-[#595858] text-white text-lg cursor-pointer rounded-xl"
      >
        <span>LỊCH SỬ VÀ THỐNG KÊ CALORIES</span>
        <i
          className={`fa-solid ${
            !isCaloriesVisible ? "fa-chevron-up" : "fa-chevron-down"
          } `}
        ></i>
      </div>
      {isCaloriesVisible && monthlyData && (
        <CaloriesStatistics
          month={selectedMonth}
          caloriesChart={monthlyData.caloriesChart}
          listSavedFoodsCalories={monthlyData.listSavedFoodsCalories}
        />
      )}

      <div
        onClick={togglePCFVisibility}
        className="w-full px-5 py-2 flex justify-between items-center bg-[#595858] text-white text-lg cursor-pointer rounded-xl"
      >
        <span>LỊCH SỬ VÀ THỐNG KÊ PROTEIN - CARB - FAT</span>
        <i
          className={`fa-solid ${
            !isPCFVisible ? "fa-chevron-up" : "fa-chevron-down"
          } `}
        ></i>
      </div>
      {isPCFVisible && monthlyData && (
        <PCFStatistics
          month={selectedMonth}
          fatCarbProteinChart={monthlyData.fatCarbProteinChart}
          listSavedFoodFat={monthlyData.listSavedFoodFat}
          listSavedFoodCarb={monthlyData.listSavedFoodCarb}
          listSavedFoodProtein={monthlyData.listSavedFoodProtein}
        />
      )}
    </div>
  );
};

export default MonthlyStatistics;
