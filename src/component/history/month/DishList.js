import React from "react";
import Table from "../../table/Table";

const DishList = ({ date, dishData, requiredCalo }) => {
  const columns = [
    { header: "TÊN", accessor: "foodName", className: "px-4 py-3 " },
    {
      header: "TRỌNG LƯỢNG",
      accessor: "weight",
      className: "px-4 py-3 text-center",
    },
    {
      header: "NĂNG LƯỢNG",
      accessor: "calories",
      className: "px-4 py-3 ",
    },
    {
      header: "CARB",
      accessor: "carb",
      className: "px-4 py-3 hidden lg:table-cell text-center",
    },
    {
      header: "PROTEIN",
      accessor: "protein",
      className: "px-4 py-3 hidden lg:table-cell text-center",
    },
    {
      header: "FAT",
      accessor: "fat",
      className: "px-4 py-2 text-center hidden md:table-cell",
    },
  ];

  const needed = parseFloat(requiredCalo.toFixed(2));

  const renderRow = (item, index) => (
    <tr key={index} className="text-[#202224] text-opacity-80 text-sm border-t">
      <td className="px-4 py-5">{item.foodName}</td>
      <td className="px-4 py-5 text-center">
        {parseFloat(item.weight.toFixed(2))}g
      </td>
      <td className="px-4 py-5 text-center ">
        {parseFloat(item.calories.toFixed(2))} calo
      </td>
      <td className="px-4 py-5 text-center hidden md:table-cell">
        {parseFloat(item.carb.toFixed(2))}g
      </td>
      <td className="px-4 py-5 text-center hidden md:table-cell">
        {parseFloat(item.protein.toFixed(2))}g
      </td>
      <td className="px-4 py-5 text-center hidden md:table-cell">
        {parseFloat(item.fat.toFixed(2))}g
      </td>
    </tr>
  );

  const consumedCalo =
    dishData?.reduce((sum, food) => sum + food.calories, 0) || 0;

  return (
    <div className="w-full mt-8">
      <div className="w-full flex justify-between ">
        <h1 className="text-base font-bold text-[#202224]">{date}</h1>

        <span className=" text-sm font-semibold text-[#00aaff] ">
          Đã nạp {parseFloat(consumedCalo.toFixed(2))}/{needed}
        </span>
      </div>
      <Table columns={columns} renderRow={renderRow} data={dishData} />
    </div>
  );
};

export default DishList;
