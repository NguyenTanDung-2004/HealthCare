// src/components/admin/workoutList/WorkoutSelection.js
import React from "react";
import Table from "../../table/Table";

const columns = [
  { header: "", accessor: "checkbox", className: "w-[200px] text-center" },
  { header: "ID", accessor: "id", className: "w-[350px] hidden md:table-cell" },
  { header: "TÊN BÀI TẬP", accessor: "name", className: "flex-1 " },
];

const WorkoutSelection = ({
  workouts,
  selectedWorkouts,
  onToggleWorkout,
  handleNext,
}) => {
  const renderRow = (item, index) => (
    <tr
      key={index}
      className="text-[#202224] text-opacity-80 text-sm border-t bg-white"
    >
      <td className="px-4 py-5 text-center">
        <input
          type="checkbox"
          checked={selectedWorkouts.includes(item.id)}
          onChange={() => onToggleWorkout(item.id)}
          className="w-4 h-4 rounded-md border border-[#B9B9B9]  text-[#1445FE]  focus:ring-0"
        />
      </td>
      <td className="px-4 py-5 hidden md:table-cell">{item.id}</td>
      <td className="px-4 py-5">{item.name}</td>
    </tr>
  );

  return (
    <>
      <div className=" flex overflow-hidden flex-col justify-center w-full max-md:max-w-full">
        <Table columns={columns} renderRow={renderRow} data={workouts} />
      </div>
    </>
  );
};

export default WorkoutSelection;
