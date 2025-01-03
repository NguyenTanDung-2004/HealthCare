import React from "react";
import GoalChart from "../../chart/GoalChart";

const GoalDay = ({ date, index, dailyData }) => {
  let comment = {
    caloNeed: 0,
    caloNap: 0,
    calo: 0,
    kg: "0",
  };

  if (dailyData) {
    const caloChange =
      (dailyData.currentCalories || 0) -
      (dailyData.totalCalories || 0) -
      (dailyData.currentBurned || 0);
    const kgChange = caloChange / 7700;
    comment = {
      calo: parseFloat(caloChange.toFixed(2)),
      kg: `${kgChange > 0 ? "+" : ""}${parseFloat(kgChange.toFixed(2))}`,
      caloNeed: dailyData.totalCalories || 0,
      caloNap:
        (dailyData.currentCalories || 0) - (dailyData.currentBurned || 0),
    };
  }

  const hasComment = comment && (comment.calo || comment.kg);

  const chartData = dailyData
    ? {
        requiredProtein: dailyData.totalProtein
          ? parseFloat(dailyData.totalProtein.toFixed(2))
          : 0,
        requiredFat: dailyData.totalFat
          ? parseFloat(dailyData.totalFat.toFixed(2))
          : 0,
        requiredCarb: dailyData.totalCarb
          ? parseFloat(dailyData.totalCarb.toFixed(2))
          : 0,
        consumedProtein: dailyData.currentProtein
          ? parseFloat(dailyData.currentProtein.toFixed(2))
          : 0,
        consumedFat: dailyData.currentFat
          ? parseFloat(dailyData.currentFat.toFixed(2))
          : 0,
        consumedCarb: dailyData.currentCarb
          ? parseFloat(dailyData.currentCarb.toFixed(2))
          : 0,
        burned: dailyData.currentBurned
          ? parseFloat(dailyData.currentBurned.toFixed(2))
          : 0,
        totalCalories: dailyData.totalCalories
          ? parseFloat(dailyData.totalCalories.toFixed(2))
          : 0,
      }
    : {
        requiredProtein: 0,
        requiredFat: 0,
        requiredCarb: 0,
        consumedProtein: 0,
        consumedFat: 0,
        consumedCarb: 0,
        burned: 0,
        totalCalories: 0,
      };

  return (
    <div className="mt-10 w-full bg-white p-6 rounded-2xl shadow-md mb-10">
      <h1 className="text-base font-bold mb-4 text-[#202224]">
        Ngày {index} - {date}
      </h1>

      <div className="w-full flex flex-wrap gap-10 justify-between items-center sm:px-4 md:px-8 lg:px-10">
        <GoalChart data={chartData} />
        <div className="flex flex-1 flex-col gap-4 sm:mb-0 md:mb-0 lg:mb-10">
          <div className="text-[#202224] font-bold">• Nhận xét</div>

          {hasComment ? (
            <>
              <div className="text-[#828181] mt-2 ml-4">
                - Calories cần nạp: {comment.caloNeed} calo
              </div>
              <div className="text-[#828181] mt-2 ml-4">
                - Calories thực sự nạp: {comment.caloNap} calo
              </div>
              <div className="text-[#828181] mt-2 ml-4">
                - Độ chênh lệch calories: {comment.calo} calo
              </div>
              <div className="text-[#828181] mt-2 ml-4">
                - Số kg thay đổi: {comment.kg}kg
              </div>
            </>
          ) : (
            <div className="text-[#828181] mt-2 ml-4 italic">
              chưa có nhận xét nào
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default GoalDay;
