import React from "react";
import VerticalBarChart from "../../chart/VerticalBarChart";
import Table from "./Table";

const Rank = ({ rankData }) => {
  if (!rankData) {
    return <div className="text-center">Loading ...</div>;
  }

  // Chuyển đổi dữ liệu top 3 điểm
  const top3Point =
    rankData?.listUserInRanks
      .sort((a, b) => b.currentPoint - a.currentPoint)
      .slice(0, 3)
      .map((user) => ({
        name: user.name || "User",
        avatar: user.linkImage || "https://via.placeholder.com/42",
        score: user.currentPoint,
      })) || [];

  // Chuyển đổi dữ liệu top 3 lần tập
  const top3LanTap =
    rankData?.top3Exercise.map((exercise, index) => ({
      name: `Top ${index + 1}`,
      avatar: exercise.linkRemovedImage || "https://via.placeholder.com/42",
      score: exercise.numberOfUsers || 0,
    })) || [];

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-wrap justify-between gap-4">
        <div className="mt-10 w-full sm:w-[520px] bg-white p-6 rounded-2xl shadow-md mb-10">
          <h1 className="text-base font-bold mb-4 text-[#202224]">
            TOP 3 ĐIỂM SỐ CAO NHẤT
          </h1>

          <div className="w-full flex flex-wrap gap-10 justify-between items-center sm:px-4 md:px-8 lg:px-10">
            <VerticalBarChart data={top3Point} unit="điểm" />
          </div>

          <div className="flex mt-4 justify-center items-center ">
            <span className="block w-10 h-1 bg-[#1445FE] mr-2 rounded-sm"></span>
            <span className="text-xs font-medium text-[#202224] text-opacity-80">
              Điểm
            </span>
          </div>
        </div>

        <div className="mt-10 w-full sm:w-[520px] bg-white p-6 rounded-2xl shadow-md mb-10">
          <h1 className="text-base font-bold mb-4 text-[#202224]">
            TOP 3 TẬP NHIỀU NHẤT
          </h1>

          <div className="w-full flex flex-wrap gap-10 justify-between items-center sm:px-4 md:px-8 lg:px-10">
            <VerticalBarChart data={top3LanTap} unit="lần" />
          </div>

          <div className="flex mt-4 justify-center items-center">
            <span className="block w-10 h-1 bg-[#1445FE] mr-2 rounded-sm"></span>
            <span className="text-xs font-medium text-[#202224] text-opacity-80">
              Số lần tập
            </span>
          </div>
        </div>
      </div>

      <div className="w-full">
        <Table listUserInRanks={rankData?.listUserInRanks || []} />
      </div>
    </div>
  );
};

export default Rank;
