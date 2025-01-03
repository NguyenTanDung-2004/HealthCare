import React, { useState, useEffect, useRef } from "react";
import PieChartComponent from "../../chart/PieChartComponent";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const DetailCardModal = ({
  onClose,
  mealLabel,
  foodId,
  weight,
  calories,
  fat,
  protein,
  carb,
  name,
  flagSystem,
  flagUpdate,
  onUpdateMeal,
}) => {
  const [editable, setEditable] = useState(false);
  const [modifiedName, setModifiedName] = useState(name || "");
  const [modifiedWeight, setModifiedWeight] = useState(parseFloat(weight || 0));
  const [modifiedCalo, setModifiedCalo] = useState(parseFloat(calories || 0));
  const [modifiedProtein, setModifiedProtein] = useState(
    parseFloat(protein || 0)
  );
  const [modifiedFat, setModifiedFat] = useState(parseFloat(fat || 0));
  const [modifiedCarb, setModifiedCarb] = useState(parseFloat(carb || 0));
  const [proteinPercentage, setProteinPercentage] = useState(0);
  const [fatPercentage, setFatPercentage] = useState(0);
  const [carbPercentage, setCarbPercentage] = useState(0);
  const [exerciseTimes, setExerciseTimes] = useState({
    walk: 30,
    run: 20,
    jump: 22,
    swim: 19,
    ride: 21,
  });
  const [meal, setMeal] = useState(null);
  const apiUrl = process.env.REACT_APP_API_URL;

  const weightInputRef = useRef(null);
  const nameInputRef = useRef(null);

  useEffect(() => {
    calculatePercentages(
      modifiedWeight,
      modifiedFat,
      modifiedProtein,
      modifiedCarb
    );
    setMeal({
      name: name,
    });
  }, [modifiedWeight, modifiedFat, modifiedProtein, modifiedCarb, name]);

  const handleNameChange = (e) => {
    setModifiedName(e.target.value);
  };

  const handleWeightChange = (e) => {
    const newWeight = e.target.value;
    const decimalRegex = /^[0-9]*\.?[0-9]*$/;
    if (newWeight === "" || decimalRegex.test(newWeight)) {
      const parsedWeight = parseFloat(newWeight);
      if (parsedWeight >= 1) {
        setModifiedWeight(parsedWeight);
        calculateModifiedNutrients(parsedWeight);
      } else {
        setModifiedWeight(1);
        calculateModifiedNutrients(1);
      }
    }
  };

  const toggleEditable = () => {
    setEditable(!editable);
    if (editable) {
      if (weightInputRef.current) {
        weightInputRef.current.blur();
      }
      if (nameInputRef.current) {
        nameInputRef.current.blur();
      }
    } else {
      if (weightInputRef.current) {
        weightInputRef.current.focus();
      }
      if (nameInputRef.current) {
        nameInputRef.current.focus();
      }
    }
  };

  const calculateModifiedNutrients = (newWeight) => {
    if (typeof newWeight === "number" && newWeight > 0) {
      const baseWeight = parseFloat(weight);
      const ratio = newWeight / baseWeight;
      const newCalo = Math.round(calories * ratio);

      setModifiedCalo(parseFloat((calories * ratio).toFixed(2)));
      setModifiedProtein(parseFloat((protein * ratio).toFixed(2)));
      setModifiedFat(parseFloat((fat * ratio).toFixed(2)));
      setModifiedCarb(parseFloat((carb * ratio).toFixed(2)));
      setExerciseTimes({
        walk: Math.round(30 * ratio),
        run: Math.round(20 * ratio),
        jump: Math.round(22 * ratio),
        swim: Math.round(19 * ratio),
        ride: Math.round(21 * ratio),
      });
    }
  };
  const calculatePercentages = (weight, fat, protein, carb) => {
    const total = parseFloat(fat) + parseFloat(protein) + parseFloat(carb);
    const fatPercent = (parseFloat(fat) / total) * 100 || 0;
    const proteinPercent = (parseFloat(protein) / total) * 100 || 0;
    const carbPercent = (parseFloat(carb) / total) * 100 || 0;

    setFatPercentage(fatPercent);
    setProteinPercentage(proteinPercent);
    setCarbPercentage(carbPercent);
  };

  const handleAddToMeal = async () => {
    try {
      const flag =
        mealLabel === "Bữa sáng"
          ? 1
          : mealLabel === "Bữa trưa"
          ? 2
          : mealLabel === "Bữa tối"
          ? 3
          : 4;
      let response;
      if (flagUpdate === 1) {
        if (flagSystem === 1) {
          response = await fetch(`${apiUrl}/userHistory/updateFoodInMeal`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
            },
            credentials: "include",
            body: JSON.stringify({
              newName: name,
              newFat: modifiedFat,
              newCarb: modifiedCarb,
              newProtein: modifiedProtein,
              newCalories: modifiedCalo,
              newWeight: modifiedWeight,
              oldName: name,
              oldFat: fat,
              oldCarb: carb,
              oldProtein: protein,
              oldCalories: calories,
              oldWeight: weight,
              flagSystem: 1,
              flagMeal: flag,
            }),
          });
        } else {
          response = await fetch(`${apiUrl}/userHistory/updateFoodInMeal`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
            },
            credentials: "include",
            body: JSON.stringify({
              newName: modifiedName,
              newFat: modifiedFat,
              newCarb: modifiedCarb,
              newProtein: modifiedProtein,
              newCalories: modifiedCalo,
              newWeight: modifiedWeight,
              oldName: name,
              oldFat: fat,
              oldCarb: carb,
              oldProtein: protein,
              oldCalories: calories,
              oldWeight: weight,
              flagSystem: 0,
              flagMeal: flag,
            }),
          });
        }
      } else {
        if (flagSystem === 1) {
          response = await fetch(`${apiUrl}/userHistory/userAddSystemFood`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
            },
            credentials: "include",
            body: JSON.stringify({
              foodId: foodId,
              weight: modifiedWeight,
              flag: flag,
            }),
          });
        } else {
          response = await fetch(`${apiUrl}/userHistory/addUserFood`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
            },
            credentials: "include",
            body: JSON.stringify({
              foodName: name,
              weight: modifiedWeight,
              flag: flag,
            }),
          });
        }
      }
      if (!response.ok) {
        const text = await response.text();
        console.log(text);
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const responseData = await response.json();

      if (responseData.code === 1000) {
        toast.success(
          flagUpdate === 1
            ? `Chỉnh sửa món ăn thành công vào ${mealLabel}!`
            : `Thêm món ăn thành công vào ${mealLabel}!`,
          {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
          }
        );
        onClose();
        if (flagUpdate === 1) {
          const updatedMeal = {
            name: flagSystem === 1 ? name : modifiedName,
            weight: modifiedWeight,
            calories: modifiedCalo,
            protein: modifiedProtein,
            carb: modifiedCarb,
            fat: modifiedFat,
          };
          onUpdateMeal(updatedMeal);
        }
      } else {
        toast.error(
          flagUpdate === 1
            ? `Chỉnh sửa món ăn vào ${mealLabel} thất bại! ${responseData.message}`
            : `Thêm món ăn vào ${mealLabel} thất bại! ${responseData.message}`,
          {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
          }
        );
      }
    } catch (err) {
      toast.error("Thêm món ăn thất bại!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      console.log(err);
    }
  };

  const pieLabels = ["Chất béo", "Chất đạm", "Carb"];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg w-[700px] py-6 px-12 shadow-lg relative ">
        <div className="flex justify-between items-center mb-4">
          <div className="flex gap-2 items-center">
            <button
              onClick={onClose}
              className="text-gray-600 hover:text-gray-800"
            >
              <i className="fa-solid fa-arrow-left text-xl"></i>
            </button>
            <h2 className="text-xl font-semibold text-gray-800 uppercase">
              {meal?.name}
            </h2>
            <i
              className={`fa-solid ${
                editable
                  ? "fa-floppy-disk text-green-500"
                  : "fa-pen text-gray-600"
              } cursor-pointer`}
              onClick={toggleEditable}
            ></i>
          </div>
          <button
            onClick={onClose}
            className="text-gray-600 hover:text-gray-800"
          >
            <i className="fa-solid fa-xmark text-3xl"></i>
          </button>
        </div>

        <div className="flex flex-col gap-4">
          <div className="text-gray-500 text-sm text-center">
            Năng lượng: {editable ? modifiedCalo : calories} kCal
          </div>
          {flagSystem !== 1 && (
            <div className="flex items-center gap-2 text-center justify-center">
              <input
                ref={nameInputRef}
                type="text"
                value={modifiedName}
                onChange={handleNameChange}
                className={`border p-2 rounded-md w-[150px] text-center focus:outline-none ${
                  editable ? "focus:outline-[#1445FE] border-[#1445FE]" : ""
                }`}
                disabled={!editable}
              />
            </div>
          )}
          <div className="flex items-center gap-2 text-center justify-center">
            <input
              ref={weightInputRef}
              type="text"
              value={modifiedWeight}
              onChange={handleWeightChange}
              className={`border p-2 rounded-md w-20 text-center focus:outline-none ${
                editable ? "focus:outline-[#1445FE] border-[#1445FE]" : ""
              }`}
              disabled={!editable}
            />
            <span className="text-base">gram</span>
          </div>

          <div className="bg-white flex justify-center items-center h-fit flex-wrap gap-20 rounded-lg p-4 ">
            <PieChartComponent
              bad={fatPercentage}
              normal={proteinPercentage}
              satisfied={carbPercentage}
              labels={pieLabels}
            />
            <div className=" flex flex-col gap-3">
              <div className="flex items-center gap-2">
                <div className="w-[20px] h-[20px] bg-[#FF8E8B] rounded-full"></div>
                <span className="text-gray-700 font-medium text-sm">
                  Chất béo:{" "}
                  {editable ? modifiedFat : parseFloat(fat).toFixed(2)}g
                </span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-[20px] h-[20px] bg-[#36C5E2] rounded-full"></div>
                <span className="text-gray-700 font-medium text-sm">
                  Chất đạm:{" "}
                  {editable ? modifiedProtein : parseFloat(protein).toFixed(2)}g
                </span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-[20px] h-[20px] bg-[#9188FC] rounded-full"></div>
                <span className="text-gray-700 font-medium text-sm">
                  Carb: {editable ? modifiedCarb : parseFloat(carb).toFixed(2)}g
                </span>
              </div>
            </div>
          </div>

          <span className="font-semibold text-base text-black">
            Làm sao để tiêu hao {editable ? modifiedCalo : calories} kCal
          </span>
          <div className="flex gap-6 justify-center bg-[#F9F9F9] shadow-[6px_6px_40px_0px_rgba(0,0,0,0.20)] rounded-xl p-4 ">
            <div className="flex-1 flex items-center justify-center flex-col">
              <img
                src="/images/editnutrition/1.png"
                alt="walk"
                className="w-14 h-14 object-cover rounded-md"
              />

              <span className="font-medium text-base text-[#595858] text-center">
                {exerciseTimes.walk} phút
              </span>
            </div>

            <div className="flex-1 flex items-center justify-center flex-col">
              <img
                src="/images/editnutrition/2.png"
                alt="run"
                className="w-14 h-14 object-cover rounded-md"
              />

              <span className="font-medium text-base text-[#595858] text-center">
                {exerciseTimes.run} phút
              </span>
            </div>

            <div className="flex-1 flex items-center justify-center flex-col">
              <img
                src="/images/editnutrition/3.png"
                alt="jump"
                className="w-14 h-14 object-cover rounded-md"
              />

              <span className="font-medium text-base text-[#595858] text-center">
                {exerciseTimes.jump} phút
              </span>
            </div>

            <div className="flex-1 flex items-center justify-center flex-col">
              <img
                src="/images/editnutrition/4.png"
                alt="swim"
                className="w-14 h-14 object-cover rounded-md"
              />

              <span className="font-medium text-base text-[#595858] text-center">
                {exerciseTimes.swim} phút
              </span>
            </div>

            <div className="flex-1 flex items-center justify-center flex-col">
              <img
                src="/images/editnutrition/5.png"
                alt="ride"
                className="w-14 h-14 object-cover rounded-md"
              />

              <span className="font-medium text-base text-[#595858] text-center">
                {exerciseTimes.ride} phút
              </span>
            </div>
          </div>

          <button
            className="mt-4 py-2 px-4 rounded-md text-white font-semibold bg-[#1445FE] hover:bg-opacity-80 cursor-pointer uppercase self-center"
            onClick={handleAddToMeal}
          >
            {flagUpdate === 1 ? `CHỈNH SỬA MÓN ĂN` : `THÊM VÀO ${mealLabel}`}
          </button>
        </div>
      </div>
    </div>
  );
};

export default DetailCardModal;
