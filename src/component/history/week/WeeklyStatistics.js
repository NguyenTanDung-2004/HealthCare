import React, { useState, useEffect } from "react";
import OneDayStatistics from "./OneDayStatistics";

const WeeklyStatistics = () => {
  const [weeklyData, setWeeklyData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const apiUrl = process.env.REACT_APP_API_URL;

  useEffect(() => {
    const fetchWeeklyData = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(
          `${apiUrl}/userHistory/getDataForWeekReport`,
          {
            method: "GET",
            headers: {
              Accept: "application/json",
            },
            credentials: "include", // Add this line to include cookies
          }
        );
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
        setWeeklyData(data);
      } catch (err) {
        setError(err.message || "Failed to fetch data");
      } finally {
        setLoading(false);
      }
    };

    fetchWeeklyData();
  }, []);
  if (loading) {
    return <div className="text-center">Loading...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500">Error: {error}</div>;
  }

  return (
    <div className="w-full flex flex-col justify-center">
      {weeklyData.map((item, index) => (
        <OneDayStatistics key={index} reportData={item} />
      ))}
    </div>
  );
};

export default WeeklyStatistics;
