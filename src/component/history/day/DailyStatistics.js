import React, { useState, useEffect } from "react";
import WorkoutList from "./WorkoutList";
import DishList from "./DishList";
import ChartList from "./ChartList";

const DailyStatistics = () => {
  const today = new Date().toISOString().split("T")[0];
  const [selectedDate, setSelectedDate] = useState(today);
  const [reportData, setReportData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [hasError500, setHasError500] = useState(false); // Thêm state để check lỗi 500
  const apiUrl = process.env.REACT_APP_API_URL;

  const handleDateChange = (event) => {
    setSelectedDate(event.target.value);
  };

  const formatDate = (date) => {
    const [year, month, day] = date.split("-");
    return `${day}/${month}/${year}`;
  };

  const fetchReportData = async () => {
    setLoading(true);
    setError(null);
    setHasError500(false); // Reset state lỗi 500 trước khi fetch
    try {
      const [year, month, day] = selectedDate.split("-");
      const url = `${apiUrl}/userHistory/getDataForDateReport?day=${day}&month=${month}&year=${year}`;

      console.log("URL:", url);
      const response = await fetch(url, {
        method: "GET",
        headers: {
          Accept: "application/json",
        },
        credentials: "include",
      });
      if (!response.ok) {
        const text = await response.text();
        console.log(text);
        if (response.status === 500) {
          setHasError500(true);
          return;
        }
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const contentType = response.headers.get("content-type");
      if (!contentType || !contentType.includes("application/json")) {
        throw new Error("Response is not in JSON format!");
      }
      const data = await response.json();
      setReportData(data);
    } catch (err) {
      setError(err.message || "Failed to fetch data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReportData();
  }, [selectedDate]);

  if (loading) {
    return <div className="text-center">Loading...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500">Error: {error}</div>;
  }

  if (hasError500) {
    return (
      <div className="w-full flex flex-col justify-center items-center">
        <div className="w-full flex items-center justify-center gap-4 rounded-lg py-1.5 px-4">
          <div className="relative">
            <input
              type="date"
              value={selectedDate}
              onChange={handleDateChange}
              className="absolute inset-0 opacity-0"
            />
            <i className="fa-solid fa-calendar-days text-2xl text-[#878787]"></i>
          </div>

          <span className="text-[#878787] text-xl font-bold">
            {formatDate(selectedDate)}
          </span>
        </div>
        <div className="text-center text-gray-500 text-lg mt-4">
          Chưa có dữ liệu
        </div>
      </div>
    );
  }

  return (
    <div className="w-full flex flex-col justify-center">
      <div className="w-full flex items-center justify-center gap-4 rounded-lg py-1.5 px-4">
        <div className="relative">
          <input
            type="date"
            value={selectedDate}
            onChange={handleDateChange}
            className="absolute inset-0 opacity-0"
          />
          <i className="fa-solid fa-calendar-days text-2xl text-[#878787]"></i>
        </div>

        <span className="text-[#878787] text-xl font-bold">
          {formatDate(selectedDate)}
        </span>
      </div>
      {reportData && (
        <>
          <WorkoutList workoutData={reportData.listExerciseInReport} />
          <DishList dishData={reportData.listSavedFoods} />
          <ChartList reportData={reportData} />
        </>
      )}
    </div>
  );
};

export default DailyStatistics;
