import React, { useEffect, useState } from "react";
import LineChart from "../../chart/LineChart";
import WorkoutList from "./WorkoutList";

const WorkoutStatistics = ({ month, exerciseChart, listExercises }) => {
  const [top3Day, setTop3Day] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [data, setData] = useState([]);

  const getDaysInMonth = (month) => {
    const [year, mm] = month.split("-");
    return new Date(year, mm, 0).getDate();
  };

  const generateDays = (month) => {
    const [year, mm] = month.split("-");
    const daysInMonth = getDaysInMonth(month);

    return Array.from(
      { length: daysInMonth },
      (_, i) => `${String(i + 1).padStart(2, "0")}/${mm}/${year}`
    );
  };

  const transformData = (month, exerciseChart) => {
    const daysInMonth = getDaysInMonth(month);
    const [year, mm] = month.split("-");

    const daysArray = Array.from({ length: daysInMonth }, (_, i) => i + 1);

    const transformedData = daysArray.map((day) => {
      const foundItem = exerciseChart?.find((item) => item.day === day);
      return foundItem
        ? foundItem.currentBurned === null
          ? 0
          : foundItem.currentBurned
        : 0;
    });

    return transformedData;
  };

  const days = generateDays(month);

  useEffect(() => {
    const transformedData = transformData(month, exerciseChart);
    setData(transformedData);
  }, [month, exerciseChart]);

  useEffect(() => {
    const fetchTop3Days = async () => {
      setLoading(true);
      setError(null);
      try {
        const top3 = data
          .map((value, index) => ({
            day: days[index],
            calories: value,
            listExercises: listExercises?.[index] || [],
          }))
          .sort((a, b) => b.calories - a.calories)
          .slice(0, 3);
        setTop3Day(top3);
      } catch (err) {
        setError(err.message || "Failed to fetch data");
      } finally {
        setLoading(false);
      }
    };
    fetchTop3Days();
  }, [data, days, listExercises, month]);

  if (loading) {
    return <div className="text-center">Loading...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500">Error: {error}</div>;
  }

  return (
    <div className="w-full bg-white p-6 rounded-2xl shadow-md">
      <h1 className="text-base font-bold mb-4 text-[#1445FE]">BÀI TẬP</h1>

      <div className="w-full flex flex-col justify-center items-center sm:px-4 md:px-8 lg:px-10">
        <LineChart data={data} daysInMonth={getDaysInMonth(month)} />

        <div className="flex self-center items-center">
          <span className="block w-10 h-1 bg-[#1445FE] mr-2 rounded-sm"></span>
          <span className="text-sm font-light text-[#202224] text-opacity-80">
            Calories tiêu hao
          </span>
        </div>

        {top3Day.map((item, index) => (
          <WorkoutList
            key={index}
            date={item.day}
            workoutData={item.listExercises}
          />
        ))}
      </div>
    </div>
  );
};

export default WorkoutStatistics;
