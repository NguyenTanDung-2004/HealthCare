import React from "react";
import LineProgress from "../LineProgress";
import { differenceInDays, format } from "date-fns";

const GoalOverview = ({ goal, dailyData, goalDays }) => {
  if (!goal) {
    return null;
  }
  // Xử lý màu sắc dựa trên loại và trạng thái
  const typeColor =
    goal.type === "Giảm cân"
      ? "bg-[#00B69B] text-[#00B69B]"
      : "bg-[#FF9500] text-[#FF9500]";
  const statusColor =
    goal.status === "Đang thực hiện"
      ? "bg-[#1A78F2] text-[#1A78F2]"
      : "bg-[#595858] text-[#595858]";

  let comment = {
    calo: 0,
    kgChange: "0",
    kgNeed: "0",
    time: "0 ngày",
  };

  if (dailyData && goalDays) {
    let totalCalories = 0;
    let currentCalories = 0;
    let currentBurned = 0;

    for (const day of goalDays) {
      const formattedDate = day.date;
      if (dailyData[formattedDate]) {
        totalCalories += dailyData[formattedDate].totalCalories || 0;
        currentCalories += dailyData[formattedDate].currentCalories || 0;
        currentBurned += dailyData[formattedDate].currentBurned || 0;
      }
    }

    const caloChange = currentCalories - currentBurned - totalCalories;
    const kgChange = caloChange / 7700;
    const today = new Date();
    const endDate = new Date(goal.endDate.split("/").reverse().join("/"));
    const startDate = new Date(goal.startDate.split("/").reverse().join("/"));
    let dayLeft = differenceInDays(endDate, today);
    if (endDate < today) {
      dayLeft = 0;
    }

    const targetValue = parseFloat(goal.target);
    const kgNeed = -kgChange + targetValue;

    comment = {
      calo: parseFloat(caloChange.toFixed(2)),
      kgChange: `${kgChange > 0 ? "+" : ""}${parseFloat(kgChange.toFixed(2))}`,
      kgNeed: `${kgNeed > 0 ? "+" : ""}${parseFloat(kgNeed.toFixed(2))}`,
      time: `${dayLeft + 1} ngày`,
    };
  }

  const hasComment =
    comment &&
    (comment.calo || comment.kgChange || comment.kgNeed || comment.time);

  return (
    <div className="mt-10 w-full bg-white p-6 rounded-2xl shadow-md flex flex-col gap-4">
      <div className="w-full flex gap-4 items-center rounded-2xl ">
        <div className="flex g-4">
          <div className="flex bg-[#D9D9D9] rounded-md p-4 justify-center items-center text-xl">
            {goal.target}kg
          </div>
        </div>

        <div className="flex-1 flex flex-col gap-2 w-auto">
          <div className="text-black rounded-md text-base">{goal.name}</div>
          <div className="flex items-center gap-3">
            <LineProgress percentage={goal.percentage} />
            <div className="text-[#787878] rounded-md text-sm">{`${goal.daysCompleted}/${goal.totalDays} ngày`}</div>
          </div>
        </div>

        <div className="flex flex-col gap-2 self-end">
          <div className="flex gap-2">
            <div
              className={`flex relative gap-4 justify-between items-start px-4 py-1.5 min-h-[27px] ${typeColor} bg-opacity-20 rounded-md`}
            >
              <div className="z-0 flex-1 shrink my-auto basis-0 font-Averta-Bold text-[13px]">
                {goal.type}
              </div>
            </div>
            <div
              className={`flex relative gap-4 justify-between items-start px-4 py-1.5 min-h-[27px] ${statusColor} bg-opacity-20 rounded-md`}
            >
              <div className="z-0 flex-1 shrink my-auto basis-0 font-Averta-Bold text-[13px]">
                {goal.status}
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-1 ml-auto">
            <div className="flex justify-between">
              <div className="text-xs text-[#595858] font-semibold mr-1">
                Ngày bắt đầu
              </div>
              <div className="text-xs text-[#888888] text-right">
                {goal.startDate}
              </div>
            </div>
            <div className="flex justify-between">
              <div className="text-xs text-[#595858] font-semibold mr-1">
                Ngày kết thúc
              </div>
              <div className="text-xs text-[#888888] text-right">
                {goal.endDate}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="ml-20 flex flex-1 flex-col mt-10 gap-4 sm:mb-0 md:mb-0 lg:mb-10">
        <div className="text-[#202224] font-bold text-center sm:text-left">
          • Nhận xét chung
        </div>

        {hasComment ? (
          <>
            <div className="text-[#828181] mt-2 ml-4 sm:ml-0">
              - Lượng calories đã tiêu thụ: {comment.calo} calo
            </div>
            <div className="text-[#828181] ml-4 sm:ml-0">
              - Số kg thay đổi: {comment.kgNeed}kg
            </div>
            <div className="text-[#828181] ml-4 sm:ml-0">
              - Số kg cần thay đổi để đạt mục tiêu: {comment.kgChange}kg
            </div>
            <div className="text-[#828181] ml-4 sm:ml-0">
              - Thời gian còn lại: {comment.time}
            </div>
          </>
        ) : (
          <div className="text-[#828181] mt-2 ml-4 sm:ml-0 italic">
            chưa có nhận xét nào
          </div>
        )}
      </div>
    </div>
  );
};

export default GoalOverview;
