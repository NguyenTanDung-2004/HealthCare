import React, { useState, useEffect } from "react";
import ThreeLineChart from "../../chart/ThreeLineChart";
import DishList from "./DishList";

const PCFStatistics = ({
  month,
  fatCarbProteinChart,
  listSavedFoodFat,
  listSavedFoodCarb,
  listSavedFoodProtein,
}) => {
  const [top3Protein, setTop3Protein] = useState([]);
  const [top3Carb, setTop3Carb] = useState([]);
  const [top3Fat, setTop3Fat] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [proteinData, setProteinData] = useState([]);
  const [fatData, setFatData] = useState([]);
  const [carbData, setCarbData] = useState([]);

  const getDaysInMonth = (month) => {
    const [year, mm] = month.split("-");
    return new Date(year, mm, 0).getDate();
  };

  const generateDays = (month) => {
    const [year, mm] = month.split("-");
    const daysInMonth = getDaysInMonth(month);

    return Array.from(
      { length: daysInMonth },
      (_, i) => `${String(i + 1).padStart(2, "0")}/${mm}/${year}`
    );
  };

  const transformData = (month, fatCarbProteinChart) => {
    const daysInMonth = getDaysInMonth(month);
    const [year, mm] = month.split("-");

    const daysArray = Array.from({ length: daysInMonth }, (_, i) => i + 1);
    const transformedProteinData = daysArray.map((day) => {
      const foundItem = fatCarbProteinChart?.find((item) => item.day === day);
      return foundItem
        ? foundItem.currentProtein === null
          ? 0
          : foundItem.currentProtein
        : 0;
    });
    const transformedFatData = daysArray.map((day) => {
      const foundItem = fatCarbProteinChart?.find((item) => item.day === day);
      return foundItem
        ? foundItem.currentFat === null
          ? 0
          : foundItem.currentFat
        : 0;
    });
    const transformedCarbData = daysArray.map((day) => {
      const foundItem = fatCarbProteinChart?.find((item) => item.day === day);
      return foundItem
        ? foundItem.currentCarb === null
          ? 0
          : foundItem.currentCarb
        : 0;
    });
    return { transformedProteinData, transformedFatData, transformedCarbData };
  };

  const days = generateDays(month);

  useEffect(() => {
    const { transformedProteinData, transformedFatData, transformedCarbData } =
      transformData(month, fatCarbProteinChart);
    setProteinData(transformedProteinData);
    setFatData(transformedFatData);
    setCarbData(transformedCarbData);
  }, [month, fatCarbProteinChart]);

  useEffect(() => {
    const fetchTop3Days = async () => {
      setLoading(true);
      setError(null);
      try {
        const top3ProteinList = proteinData
          .map((value, index) => {
            const foundItem = fatCarbProteinChart?.find(
              (item) => days[index].split("/")[0] == item.day
            );

            return {
              day: days[index],
              calories: value,
              listSavedFoodProtein: listSavedFoodProtein?.[index] || [],
              requiredCalo: foundItem?.totalProtein || 0,
            };
          })
          .sort((a, b) => b.calories - a.calories)
          .slice(0, 3);
        const top3CarbList = carbData
          .map((value, index) => {
            const foundItem = fatCarbProteinChart?.find(
              (item) => days[index].split("/")[0] == item.day
            );

            return {
              day: days[index],
              calories: value,
              listSavedFoodCarb: listSavedFoodCarb?.[index] || [],
              requiredCalo: foundItem?.totalCarb || 0,
            };
          })
          .sort((a, b) => b.calories - a.calories)
          .slice(0, 3);
        const top3FatList = fatData
          .map((value, index) => {
            const foundItem = fatCarbProteinChart?.find(
              (item) => days[index].split("/")[0] == item.day
            );

            return {
              day: days[index],
              calories: value,
              listSavedFoodFat: listSavedFoodFat?.[index] || [],
              requiredCalo: foundItem?.totalFat || 0,
            };
          })
          .sort((a, b) => b.calories - a.calories)
          .slice(0, 3);
        setTop3Protein(top3ProteinList);
        setTop3Carb(top3CarbList);
        setTop3Fat(top3FatList);
      } catch (err) {
        setError(err.message || "Failed to fetch data");
      } finally {
        setLoading(false);
      }
    };
    fetchTop3Days();
  }, [
    fatData,
    days,
    listSavedFoodFat,
    listSavedFoodCarb,
    listSavedFoodProtein,
    month,
    proteinData,
    carbData,
    fatCarbProteinChart,
  ]);
  if (loading) {
    return <div className="text-center">Loading...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500">Error: {error}</div>;
  }
  return (
    <div className="w-full bg-white p-6 rounded-2xl shadow-md">
      <h1 className="text-base font-bold mb-4 text-[#1445FE]">CALORIES</h1>

      <div className="flex justify-center space-x-6">
        <div className="flex items-center">
          <span className="block w-10 h-1 bg-[#FF6384] mr-2"></span>
          <span className="text-sm font-light text-[#202224] text-opacity-80">
            Protein
          </span>
        </div>
        <div className="flex items-center">
          <span className="block w-10 h-1 bg-[#4BC0C0] mr-2"></span>
          <span className="text-sm font-light text-[#202224] text-opacity-80">
            Fat
          </span>
        </div>
        <div className="flex items-center">
          <span className="block w-10 h-1 bg-[#36A2EB] mr-2"></span>
          <span className="text-sm font-light text-[#202224] text-opacity-80">
            Carb
          </span>
        </div>
      </div>

      <div className="w-full flex flex-col justify-center items-center sm:px-4 md:px-8 lg:px-10">
        <ThreeLineChart
          daysInMonth={getDaysInMonth(month)}
          proteinData={proteinData}
          fatData={fatData}
          carbData={carbData}
        />

        <h1 className="mt-8 text-base font-bold text-[#1445FE]">
          TOP 3 NGÀY TẠP NHIỀU PROTEIN
        </h1>
        {top3Protein.map((item, index) => (
          <DishList
            key={index}
            date={item.day}
            dishData={item.listSavedFoodProtein}
            requiredCalo={item.requiredCalo}
          />
        ))}

        <h1 className="mt-8 text-base font-bold text-[#1445FE]">
          TOP 3 NGÀY TẠP NHIỀU CARB
        </h1>
        {top3Carb.map((item, index) => (
          <DishList
            key={index}
            date={item.day}
            dishData={item.listSavedFoodCarb}
            requiredCalo={item.requiredCalo}
          />
        ))}

        <h1 className="mt-8 text-base font-bold text-[#1445FE]">
          TOP 3 NGÀY TẠP NHIỀU FAT
        </h1>
        {top3Fat.map((item, index) => (
          <DishList
            key={index}
            date={item.day}
            dishData={item.listSavedFoodFat}
            requiredCalo={item.requiredCalo}
          />
        ))}
      </div>
    </div>
  );
};
export default PCFStatistics;
