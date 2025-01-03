// src/components/admin/workoutList/WorkoutConfirmation.js
import React from "react";
import Table from "../../table/Table";

const WorkoutConfirmation = ({
  selectedWorkouts,
  workouts,
  handleConfirm,
  workoutScores,
  handleScoreChange,
}) => {
  const columns = [
    { header: "ID", accessor: "stt", className: "w-[200px] text-center" },
    { header: "TÊN BÀI TẬP", accessor: "name", className: "flex-1" },
    {
      header: "ĐIỂM",
      accessor: "score",
      className: "w-[150px] text-center",
    },
  ];

  const selectedWorkoutData = selectedWorkouts.map((workoutId, index) => {
    const workout = workouts.find((w) => w.id === workoutId);
    return {
      stt: workout.id,
      ...workout,
      score: (
        <select
          value={workoutScores[workoutId] || "10"}
          onChange={(e) => handleScoreChange(workoutId, e.target.value)}
          className="border border-gray-300 rounded px-3 py-2"
        >
          {[10, 20, 30, 40, 50, 60, 70, 80, 90, 100].map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      ),
    };
  });

  const renderRow = (item, index) => (
    <tr
      key={index}
      className="text-[#202224] text-opacity-80 text-sm border-t bg-white"
    >
      <td className="px-4 py-5 text-center">{item.stt}</td>
      <td className="px-4 py-5">{item.name}</td>
      <td className="px-4 py-5 text-center">{item.score}</td>
    </tr>
  );

  return (
    <>
      <div className="mt-4 flex overflow-hidden flex-col justify-center w-full max-md:max-w-full">
        <Table
          columns={columns}
          renderRow={renderRow}
          data={selectedWorkoutData}
        />
      </div>
    </>
  );
};

export default WorkoutConfirmation;
