import React from "react";
import Table from "../../table/Table";

const WorkoutList = ({ data }) => {
  const columns = [
    { header: "STT", accessor: "stt", className: "px-4 py-3 " },
    {
      header: "TÊN BÀI TẬP",
      accessor: "name",
      className: "px-4 py-3",
    },
    {
      header: "THỜI GIAN / SET",
      accessor: "time",
      className: "px-4 py-2 text-center",
    },
    {
      header: "MET",
      accessor: "met",
      className: "px-4 py-2 text-center",
    },
    {
      header: "TỔNG VOTE",
      accessor: "vote",
      className: "px-4 py-3 text-center",
    },
    {
      header: "SỐ LƯỢT THÍCH",
      accessor: "likes",
      className: "px-4 py-2 text-center",
    },
  ];

  const renderRow = (item, index) => (
    <tr key={index} className="text-[#202224] text-opacity-80 text-sm border-t">
      <td className="px-4 py-5">{item.stt}</td>
      <td className="px-4 py-5">{item.name}</td>
      <td className="px-4 py-5 text-center">{item.time}s</td>
      <td className="px-4 py-5 text-center">{item.met}</td>
      <td className="px-4 py-5 text-center">
        {parseFloat(item.vote.toFixed(2))}/5
      </td>
      <td className="px-4 py-5 text-center">{item.likes}</td>
    </tr>
  );

  return (
    <div className="w-full">
      <h1 className="text-base font-bold mb-4 text-[#202224]">
        TOP 3 BÀI TẬP ĐƯỢC YÊU THÍCH
      </h1>
      <Table columns={columns} renderRow={renderRow} data={data} />
    </div>
  );
};

export default WorkoutList;
