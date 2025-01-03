import React, { useState, useEffect } from "react";
import BigHorizontalBarChart from "../../chart/BigHorizontalBarChart";
import WorkoutList from "./WorkoutList";
import DishList from "./DishList";

const OneDayStatistics = ({ reportData }) => {
  const [showDetails, setShowDetails] = useState(false);
  const [dailyData, setDailyData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const apiUrl = process.env.REACT_APP_API_URL;
  const { dayMonthYear, currentCalories, totalCalories, currentBurned } =
    reportData;
  const date = `${dayMonthYear.day}/${dayMonthYear.month}/${dayMonthYear.year}`;

  useEffect(() => {
    const fetchDailyData = async () => {
      setLoading(true);
      setError(null);
      try {
        const { day, month, year } = dayMonthYear;
        const url = `${apiUrl}/userHistory/getDataForDateReport?day=${day}&month=${month}&year=${year}`;
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
        setDailyData(data);
      } catch (err) {
        setError(err.message || "Failed to fetch data");
      } finally {
        setLoading(false);
      }
    };
    fetchDailyData();
  }, [apiUrl, dayMonthYear]);

  if (loading) {
    return <div className="text-center">Loading...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500">Error: {error}</div>;
  }
  const caloData = {
    required: totalCalories || 0,
    consumed: currentCalories || 0,
    burned: currentBurned || 0,
  };

  return (
    <div className="mt-10 w-full bg-white p-6 rounded-2xl shadow-md mb-10">
      <h1 className="text-base font-bold mb-4 text-[#202224]">{date}</h1>
      <div className="w-full flex flex-wrap gap-10 justify-between items-center sm:px-4 md:px-8 lg:px-10">
        <BigHorizontalBarChart data={caloData} />

        {showDetails && dailyData && (
          <>
            <WorkoutList workoutData={dailyData.listExerciseInReport} />
            <DishList dishData={dailyData.listSavedFoods} />
          </>
        )}

        <div
          className="w-full text-center italic underline font-light text-xs cursor-pointer"
          onClick={() => setShowDetails(!showDetails)}
        >
          {showDetails ? "thu gọn" : "xem chi tiết danh sách"}
        </div>
      </div>
    </div>
  );
};

export default OneDayStatistics;
