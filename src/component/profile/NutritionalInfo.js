import React, { useState, useEffect } from "react";
import HeartProgress from "./HeartProgress";
import LineProgress from "./LineProgress";
import EditNutritionModal from "./EditNutritionModal";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const NutritionalInfo = ({ userData }) => {
  const today = new Date().toISOString().split("T")[0];
  const [selectedDate, setSelectedDate] = useState(today);
  const diets = [
    "Ít tinh bột",
    "Ít chất béo",
    "Nhiều đạm",
    "Thuần chay",
    "Ăn chay (trứng, sữa)",
    "Healthy",
    "Bình thường",
  ];
  const initialNutritionData = {
    dailyCalories: 0,
    remainingCalories: 0,
    burnedCalories: 0,
    intakePercentage: 0,
    diet: "Ít tinh bột",
    meals: [
      { label: "Bữa sáng", calories: 0 },
      { label: "Bữa trưa", calories: 0 },
      { label: "Bữa tối", calories: 0 },
      { label: "Bữa phụ", calories: 0 },
    ],
    protein: {
      percentage: 0,
      intake: 0,
      total: 0,
    },
    carb: {
      percentage: 0,
      intake: 0,
      total: 0,
    },
    fat: {
      percentage: 0,
      intake: 0,
      total: 0,
    },
  };
  const [nutritionData, setNutritionData] = useState(initialNutritionData);
  const apiUrl = process.env.REACT_APP_API_URL;
  const [loading, setLoading] = useState(false);

  const fetchCurrentDiet = async () => {
    try {
      const response = await fetch(`${apiUrl}/user/getCurrentDiet`, {
        method: "GET",
        headers: {
          Accept: "application/json",
        },
        credentials: "include",
      });
      if (!response.ok) {
        const text = await response.text();
        console.log(text);
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      const flagDiet = parseInt(data);
      return diets[flagDiet - 1];
    } catch (error) {
      console.error("Error fetching current diet:", error);
      return null;
    }
  };

  const fetchNutritionData = async () => {
    const isFutureDate = selectedDate > today;
    if (isFutureDate) {
      return {
        dailyCalories: 0,
        remainingCalories: 0,
        burnedCalories: 0,
        intakePercentage: 0,
        meals: initialNutritionData.meals.map((meal) => ({
          ...meal,
          calories: 0,
        })),
        protein: {
          percentage: 0,
          intake: 0,
          total: 0,
        },
        carb: {
          percentage: 0,
          intake: 0,
          total: 0,
        },
        fat: {
          percentage: 0,
          intake: 0,
          total: 0,
        },
        diet: initialNutritionData.diet,
      };
    }
    try {
      const [year, month, day] = selectedDate.split("-");

      const response = await fetch(
        `${apiUrl}/userHistory/getDataForDateReport?day=${day}&month=${month}&year=${year}`,
        {
          method: "GET",
          headers: {
            Accept: "application/json",
          },
          credentials: "include",
        }
      );

      if (!response.ok) {
        const text = await response.text();
        console.log(text);
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log("API Data Report:", data);
      const intakePercentage =
        data.totalCalories > 0
          ? parseFloat(
              ((data.currentCalories / data.totalCalories) * 100).toFixed(2)
            )
          : 0;

      const proteinPercentage =
        data.totalProtein > 0
          ? parseFloat(
              ((data.currentProtein / data.totalProtein) * 100).toFixed(2)
            )
          : 0;
      const carbPercentage =
        data.totalCarb > 0
          ? parseFloat(((data.currentCarb / data.totalCarb) * 100).toFixed(2))
          : 0;
      const fatPercentage =
        data.totalFat > 0
          ? parseFloat(((data.currentFat / data.totalFat) * 100).toFixed(2))
          : 0;

      const calculateMealCalories = (flag) => {
        return data.listSavedFoods
          ?.filter((item) => item.flag === flag)
          .reduce((acc, item) => acc + (item.calories || 0), 0);
      };
      const breakfastCalories = calculateMealCalories(1);
      const lunchCalories = calculateMealCalories(2);
      const dinnerCalories = calculateMealCalories(3);
      const snackCalories = calculateMealCalories(4);
      const flagDiet = parseInt(data.flagDiet);
      const diet = diets[flagDiet - 1];
      return {
        dailyCalories: parseFloat((data.totalCalories || 0).toFixed(2)),
        remainingCalories: parseFloat(
          (data.totalCalories - data.currentCalories || 0).toFixed(2)
        ),
        burnedCalories: parseFloat((data.currentBurned || 0).toFixed(2)),
        intakePercentage: intakePercentage > 100 ? 100 : intakePercentage,
        diet: diet,
        meals: [
          {
            label: "Bữa sáng",
            calories: parseFloat((breakfastCalories || 0).toFixed(2)),
          },
          {
            label: "Bữa trưa",
            calories: parseFloat((lunchCalories || 0).toFixed(2)),
          },
          {
            label: "Bữa tối",
            calories: parseFloat((dinnerCalories || 0).toFixed(2)),
          },
          {
            label: "Bữa phụ",
            calories: parseFloat((snackCalories || 0).toFixed(2)),
          },
        ],
        protein: {
          percentage: proteinPercentage > 100 ? 100 : proteinPercentage,
          intake: parseFloat((data.currentProtein || 0).toFixed(2)),
          total: parseFloat((data.totalProtein || 0).toFixed(2)),
        },
        carb: {
          percentage: carbPercentage > 100 ? 100 : carbPercentage,
          intake: parseFloat((data.currentCarb || 0).toFixed(2)),
          total: parseFloat((data.totalCarb || 0).toFixed(2)),
        },
        fat: {
          percentage: fatPercentage > 100 ? 100 : fatPercentage,
          intake: parseFloat((data.currentFat || 0).toFixed(2)),
          total: parseFloat((data.totalFat || 0).toFixed(2)),
        },
      };
    } catch (e) {
      console.log(e);
      return null;
    }
  };

  useEffect(() => {
    setLoading(true);

    Promise.all([fetchCurrentDiet(), fetchNutritionData()])
      .then(([currentDiet, nutritionData]) => {
        if (nutritionData) {
          setNutritionData((prev) => ({
            ...prev,
            ...nutritionData,
            diet: currentDiet || prev.diet,
          }));
        } else {
          setNutritionData((prev) => ({
            ...prev,
            diet: currentDiet || prev.diet,
          }));
        }
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [selectedDate, apiUrl]);

  const [isDietDropdownOpen, setIsDietDropdownOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedMeal, setSelectedMeal] = useState("");

  const handleAddMeal = (meal) => {
    const isToday = selectedDate === today;
    if (isToday) {
      setSelectedMeal(meal.label);
      setIsEditModalOpen(true);
    }
  };

  const handleDietChange = async (diet) => {
    setLoading(true);
    try {
      const flagDiet = diets.indexOf(diet) + 1;

      const response = await fetch(
        `${apiUrl}/user/updateUserDiet?flagDiet=${flagDiet}`,
        {
          method: "POST",
          headers: {
            Accept: "application/json",
          },
          credentials: "include",
        }
      );
      if (!response.ok) {
        const text = await response.text();
        console.log(text);
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const responseData = await response.json();
      if (responseData.code === 1000) {
        toast.success("Cập nhật chế độ ăn thành công!", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
        setNutritionData((prevData) => ({ ...prevData, diet }));
        setIsDietDropdownOpen(false);
      } else {
        toast.error(`Cập nhật chế độ ăn thất bại! ${responseData.message}`, {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
      }
    } catch (err) {
      toast.error("Cập nhật chế độ ăn thất bại!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDateChange = (event) => {
    setSelectedDate(event.target.value);
  };

  const formatDate = (date) => {
    const [year, month, day] = date.split("-");
    return `${day}/${month}/${year}`;
  };
  const handleCloseModal = () => {
    setIsEditModalOpen(false);
    setSelectedMeal("");
  };
  const getPercentageColor = (percentage) => {
    return percentage >= 100 ? "text-[#FF0000]" : "text-[#1445FE]";
  };

  return (
    <div className="w-full h-auto flex flex-col gap-3 ">
      <div className="text-[#FF0000]  hidden"></div>
      <div className=" bg-[#B2DFFF] hidden"></div>
      <div className=" text-[#1445FE] hidden"></div>
      <div className="bg-white flex items-center gap-4 rounded-lg py-1.5 px-4">
        <div className="relative">
          <input
            type="date"
            value={selectedDate}
            onChange={handleDateChange}
            className="absolute inset-0 opacity-0"
          />
          <i className="fa-solid fa-calendar-days text-lg text-black"></i>
        </div>

        <span className="text-black text-base font-medium">
          {formatDate(selectedDate)}
        </span>
      </div>

      {loading ? (
        <div>Loading...</div>
      ) : (
        <div className="bg-white flex flex-col items-center justify-center gap-4 rounded-lg p-4">
          <div className="flex flex-col items-center">
            <div className="text-base font-semibold text-[#595858]">
              Calories cần nạp
            </div>
            <div className="text-lg font-bold text-[#1445FE] self-center">
              {nutritionData.dailyCalories}
            </div>
          </div>

          <div className="w-full flex items-center justify-between lg:px-14 md:px-4 sm:px-0">
            <div className="flex flex-col items-center">
              <div className="text-[#595858] text-base font-semibold">
                Calories còn lại
              </div>
              <div className="text-lg font-bold text-[#FF0000] self-center">
                {nutritionData.remainingCalories}
              </div>
            </div>

            <div className="flex flex-col items-center justify-center">
              <HeartProgress percentage={nutritionData.intakePercentage} />
              <div
                className={`text-lg font-bold self-center ${getPercentageColor(
                  nutritionData.intakePercentage
                )}`}
              >
                {nutritionData.intakePercentage > 100
                  ? 100
                  : nutritionData.intakePercentage}
                %
              </div>
              <div className="text-[#595858] text-base font-semibold">
                Đã nạp
              </div>
            </div>

            <div className="flex flex-col items-center">
              <div className="text-[#595858] text-base font-semibold">
                Calories tiêu hao
              </div>
              <div className="text-lg font-bold text-[#CCCCCC] self-center">
                {nutritionData.burnedCalories}
              </div>
            </div>
          </div>

          <div className="mt-5 w-full flex flex-wrap items-center justify-between lg:px-16 md:px-4 sm:px-0">
            {nutritionData.meals.map((meal, index) => (
              <div
                key={index}
                className="flex flex-col items-center justify-center gap-2"
              >
                <div className="text-[#595858] text-base font-semibold">
                  {meal.label}
                </div>
                {selectedDate === today ? (
                  meal.calories > 0 ? (
                    <div
                      className="text-lg font-bold text-[#1445FE] cursor-pointer"
                      onClick={() => handleAddMeal(meal)}
                    >
                      {meal.calories}
                    </div>
                  ) : (
                    <button
                      onClick={() => handleAddMeal(meal)}
                      className="w-5 h-5 rounded-full bg-[#1445FE] text-white flex items-center justify-center"
                    >
                      <i className="fa-solid fa-plus text-xs"></i>
                    </button>
                  )
                ) : (
                  <div className="text-lg font-bold text-[#1445FE] ">
                    {meal.calories}
                  </div>
                )}
              </div>
            ))}
          </div>
          <div className="mt-5  w-full flex flex-wrap items-center justify-between lg:px-16 md:px-4 sm:px-0">
            <div className="w-[140px] flex flex-col gap-2">
              <div className="flex justify-between">
                <div className="text-[#595858] text-sm font-semibold">
                  Protein
                </div>
                <div
                  className={`text-[#595858] text-sm font-medium ${getPercentageColor(
                    nutritionData.protein.percentage
                  )}`}
                >
                  {nutritionData.protein.percentage > 100
                    ? 100
                    : nutritionData.protein.percentage}
                  %
                </div>
              </div>

              <LineProgress
                percentage={
                  nutritionData.protein.percentage > 100
                    ? 100
                    : nutritionData.protein.percentage
                }
              />
              <div className="text-[#595858] text-sm font-medium self-center">
                {nutritionData.protein.intake}/{nutritionData.protein.total}g
              </div>
            </div>

            <div className="w-[140px] flex flex-col gap-2">
              <div className="flex justify-between">
                <div className="text-[#595858] text-sm font-semibold">Carb</div>
                <div
                  className={`text-[#595858] text-sm font-medium ${getPercentageColor(
                    nutritionData.carb.percentage
                  )}`}
                >
                  {nutritionData.carb.percentage > 100
                    ? 100
                    : nutritionData.carb.percentage}
                  %
                </div>
              </div>

              <LineProgress percentage={nutritionData.carb.percentage} />
              <div className="text-[#595858] text-sm font-medium self-center">
                {nutritionData.carb.intake}/{nutritionData.carb.total}g
              </div>
            </div>

            <div className="w-[140px] flex flex-col gap-2">
              <div className="flex justify-between">
                <div className="text-[#595858] text-sm font-semibold">Fat</div>
                <div
                  className={`text-[#595858] text-sm font-medium ${getPercentageColor(
                    nutritionData.fat.percentage
                  )}`}
                >
                  {nutritionData.fat.percentage > 100
                    ? 100
                    : nutritionData.fat.percentage}
                  %
                </div>
              </div>

              <LineProgress percentage={nutritionData.fat.percentage} />
              <div className="text-[#595858] text-sm font-medium self-center">
                {nutritionData.fat.intake}/{nutritionData.fat.total}g
              </div>
            </div>
          </div>

          <div className="mt-5 w-full flex gap-4 items-center justify-start lg:px-16 md:px-4 sm:px-0">
            <div className="text-black text-base font-semibold">
              Bạn đang thực hiện chế độ ăn:
            </div>

            <div
              className="relative w-[180px] cursor-pointer"
              onClick={() => setIsDietDropdownOpen(!isDietDropdownOpen)}
            >
              <div
                className={`bg-[#B2DFFF]  text-black text-center text-sm rounded-2xl font-semibold py-0.5 `}
              >
                {nutritionData.diet}
              </div>

              {isDietDropdownOpen && (
                <div className="absolute top-6 -left-1.5 flex flex-col bg-[#EAF0F0] p-2 gap-2 rounded-lg shadow-lg">
                  {diets.map((diet, index) => (
                    <div
                      key={index}
                      onClick={() => handleDietChange(diet)}
                      className={`w-[140px] text-black text-center text-sm rounded-2xl font-semibold py-0.5 cursor-pointer bg-white hover:bg-gray-100`}
                    >
                      {diet}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
      {isEditModalOpen && (
        <EditNutritionModal
          onClose={handleCloseModal}
          mealLabel={selectedMeal}
        />
      )}
    </div>
  );
};

export default NutritionalInfo;
