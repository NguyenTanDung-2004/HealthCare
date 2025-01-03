import React from "react";
import Table from "../../table/Table";

const DishList = ({ data }) => {
  const columns = [
    { header: "STT", accessor: "stt", className: "px-4 py-3 " },
    {
      header: "TÊN MÓN ĂN",
      accessor: "name",
      className: "px-4 py-3",
    },
    {
      header: "NĂNG LƯỢNG",
      accessor: "calories  ",
      className: "px-4 py-3 text-center ",
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
      <td className="px-4 py-5 text-center">{item.calories} calo</td>
      <td className="px-4 py-5 text-center">
        {parseFloat(item.vote.toFixed(2))}/5
      </td>
      <td className="px-4 py-5 text-center">{item.likes}</td>
    </tr>
  );

  return (
    <div className="w-full">
      <h1 className="text-base font-bold mb-4 text-[#202224]">
        TOP 3 MÓN ĂN ĐƯỢC YÊU THÍCH
      </h1>
      <Table columns={columns} renderRow={renderRow} data={data} />
    </div>
  );
};
export default DishList;
