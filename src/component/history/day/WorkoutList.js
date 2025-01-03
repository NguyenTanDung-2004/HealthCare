import React from "react";
import Table from "../../table/Table";

const WorkoutList = ({ workoutData }) => {
  const columns = [
    { header: "TÊN", accessor: "name", className: "px-4 py-3 " },
    {
      header: "SỐ LẦN TẬP",
      accessor: "numberOfSets",
      className: "px-4 py-3 text-center",
    },
    {
      header: "MET",
      accessor: "met",
      className: "px-4 py-3 hidden lg:table-cell text-center",
    },
    {
      header: "THỜI GIAN/SET",
      accessor: "timeSet",
      className: "px-4 py-3 hidden lg:table-cell text-center",
    },
    {
      header: "CALO/SET",
      accessor: "caloriesSet",
      className: "px-4 py-3 hidden lg:table-cell text-center",
    },
    {
      header: "TỔNG CALORIES",
      accessor: "totalCalories",
      className: "px-4 py-2 text-center",
    },
  ];

  const renderRow = (item, index) => (
    <tr key={index} className="text-[#202224] text-opacity-80 text-sm border-t">
      <td className="px-4 py-5">{item.name}</td>
      <td className="px-4 py-5 text-center">{item.numberOfSets}</td>
      <td className="px-4 py-5 text-center hidden md:table-cell">{item.met}</td>
      <td className="px-4 py-5 text-center hidden md:table-cell">
        {item.timeSet}s
      </td>
      <td className="px-4 py-5 text-center hidden md:table-cell">
        {parseFloat(item.caloriesSet.toFixed(2))} calo
      </td>
      <td className="px-4 py-5 text-center">
        {parseFloat(item.totalCalories.toFixed(2))} calo
      </td>
    </tr>
  );
  return (
    <div className="mt-4 w-full bg-white p-6 rounded-2xl shadow-md">
      <h1 className="text-base font-bold mb-4 text-[#202224]">
        Danh sách bài tập
      </h1>
      <Table columns={columns} renderRow={renderRow} data={workoutData} />
    </div>
  );
};

export default WorkoutList;
