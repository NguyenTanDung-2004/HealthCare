import React from "react";
import HorizontalBarChart from "../../chart/HorizontalBarChart";

const ChartList = ({ reportData }) => {
  const caloLabels = [
    "Calories cần nạp",
    "Calories thực sự nạp",
    "Độ chênh lệch",
  ];
  const proteinLabels = [
    "Protein cần nạp",
    "Protein thực sự nạp",
    "Độ chênh lệch",
  ];
  const carbLabels = ["Carb cần nạp", "Carb thực sự nạp", "Độ chênh lệch"];
  const fatLabels = ["Fat cần nạp", "Fat thực sự nạp", "Độ chênh lệch"];

  const caloData = {
    required: reportData?.totalCalories || 0,
    consumed: reportData?.currentCalories || 0,
    burned: reportData?.currentBurned || 0,
    difference:
      (reportData?.totalCalories || 0) - (reportData?.currentCalories || 0),
  };
  const proteinData = {
    required: reportData?.totalProtein || 0,
    consumed: reportData?.currentProtein || 0,
    burned: 0,
    difference:
      (reportData?.totalProtein || 0) - (reportData?.currentProtein || 0),
  };
  const carbData = {
    required: reportData?.totalCarb || 0,
    consumed: reportData?.currentCarb || 0,
    burned: 0,
    difference: (reportData?.totalCarb || 0) - (reportData?.currentCarb || 0),
  };
  const fatData = {
    required: reportData?.totalFat || 0,
    consumed: reportData?.currentFat || 0,
    burned: 0,
    difference: (reportData?.totalFat || 0) - (reportData?.currentFat || 0),
  };

  return (
    <div className="mt-10 w-full bg-white p-6 rounded-2xl shadow-md mb-10">
      <h1 className="text-base font-bold mb-4 text-[#202224]">
        Biểu đồ dinh dưỡng
      </h1>

      <div className="w-full flex flex-wrap gap-10 justify-between items-center sm:px-4 md:px-8 lg:px-10">
        <HorizontalBarChart data={caloData} labels={caloLabels} unit={"calo"} />
        <HorizontalBarChart
          data={proteinData}
          labels={proteinLabels}
          unit={"kg"}
        />
        <HorizontalBarChart data={carbData} labels={carbLabels} unit={"kg"} />
        <HorizontalBarChart data={fatData} labels={fatLabels} unit={"kg"} />
      </div>
    </div>
  );
};

export default ChartList;
