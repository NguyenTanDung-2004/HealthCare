import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AddMealTabContent = ({ mealLabel }) => {
  const [mealName, setMealName] = useState("");
  const [mealWeight, setMealWeight] = useState("");
  const [mealCalories, setMealCalories] = useState("");
  const [mealProtein, setMealProtein] = useState("");
  const [mealCarb, setMealCarb] = useState("");
  const [mealFat, setMealFat] = useState("");
  const [isFormValid, setIsFormValid] = useState(false);
  const apiUrl = process.env.REACT_APP_API_URL;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isFormValid) {
      try {
        const flag =
          mealLabel === "Bữa sáng"
            ? 1
            : mealLabel === "Bữa trưa"
            ? 2
            : mealLabel === "Bữa tối"
            ? 3
            : 4;
        const response = await fetch(`${apiUrl}/food/userCreateFood`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          credentials: "include",
          body: JSON.stringify({
            name: mealName,
            weight: parseFloat(mealWeight),
            calories: parseFloat(mealCalories),
            protein: parseFloat(mealProtein),
            carb: parseFloat(mealCarb),
            fat: parseFloat(mealFat),
            flag: flag,
          }),
        });

        if (!response.ok) {
          const text = await response.text();
          console.log(text);
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const responseData = await response.json();

        if (responseData.code === 1000) {
          toast.success("Thêm món ăn thành công!", {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
          });
          setMealName("");
          setMealWeight("");
          setMealCalories("");
          setMealProtein("");
          setMealCarb("");
          setMealFat("");
        } else {
          toast.error(`Thêm món ăn thất bại! ${responseData.message}`, {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
          });
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
    }
  };

  useEffect(() => {
    const isNameValid = mealName.trim() !== "";
    const isWeightValid =
      mealWeight.trim() !== "" &&
      !isNaN(parseFloat(mealWeight)) &&
      parseFloat(mealWeight) > 0;
    const isCaloriesValid =
      mealCalories.trim() !== "" &&
      !isNaN(parseFloat(mealCalories)) &&
      parseFloat(mealCalories) > 0;
    const isProteinValid =
      mealProtein.trim() !== "" &&
      !isNaN(parseFloat(mealProtein)) &&
      parseFloat(mealProtein) > 0;
    const isCarbValid =
      mealCarb.trim() !== "" &&
      !isNaN(parseFloat(mealCarb)) &&
      parseFloat(mealCarb) > 0;
    const isFatValid =
      mealFat.trim() !== "" &&
      !isNaN(parseFloat(mealFat)) &&
      parseFloat(mealFat) > 0;

    setIsFormValid(
      isNameValid &&
        isWeightValid &&
        isCaloriesValid &&
        isProteinValid &&
        isCarbValid &&
        isFatValid
    );
  }, [mealName, mealWeight, mealCalories, mealProtein, mealCarb, mealFat]);

  const handleNumberInputChange = (setState) => (e) => {
    const inputValue = e.target.value;
    if (inputValue === "" || !isNaN(parseFloat(inputValue))) {
      setState(inputValue);
    }
  };

  return (
    <div className="flex flex-col p-4 gap-8">
      <div className="flex">
        <div className="w-1/2 flex items-center justify-center">
          <img
            src="/images/editnutrition/dish-default.png"
            alt="Meal"
            className="w-48 h-48 object-cover rounded-md"
          />
        </div>
        <div className="w-1/2 flex flex-col gap-4">
          <div className="flex flex-col">
            <label htmlFor="mealName" className="text-sm text-gray-700">
              Tên món ăn
            </label>
            <input
              type="text"
              id="mealName"
              placeholder="Nhập tên món ăn ..."
              className="border p-2 rounded-md focus:outline-none"
              value={mealName}
              onChange={(e) => setMealName(e.target.value)}
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="mealWeight" className="text-sm text-gray-700">
              Trọng lượng
            </label>
            <input
              type="text"
              id="mealWeight"
              placeholder="g"
              className="border p-2 rounded-md focus:outline-none"
              value={mealWeight}
              onChange={handleNumberInputChange(setMealWeight)}
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="mealCalories" className="text-sm text-gray-700">
              Năng lượng
            </label>
            <input
              type="text"
              id="mealCalories"
              placeholder="kCal"
              className="border p-2 rounded-md focus:outline-none"
              value={mealCalories}
              onChange={handleNumberInputChange(setMealCalories)}
            />
          </div>
        </div>
      </div>

      <div className="flex justify-between items-center gap-2">
        <div className="flex flex-col">
          <label htmlFor="mealProtein" className="text-sm text-gray-700">
            Protein
          </label>
          <input
            type="text"
            id="mealProtein"
            placeholder="g"
            className="border p-2 rounded-md focus:outline-none"
            value={mealProtein}
            onChange={handleNumberInputChange(setMealProtein)}
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="mealCarb" className="text-sm text-gray-700">
            Carb
          </label>
          <input
            type="text"
            id="mealCarb"
            placeholder="g"
            className="border p-2 rounded-md focus:outline-none"
            value={mealCarb}
            onChange={handleNumberInputChange(setMealCarb)}
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="mealFat" className="text-sm text-gray-700">
            Fat
          </label>
          <input
            type="text"
            id="mealFat"
            placeholder="g"
            className="border p-2 rounded-md focus:outline-none"
            value={mealFat}
            onChange={handleNumberInputChange(setMealFat)}
          />
        </div>
      </div>
      <button
        className={`py-2 px-4 rounded-md text-white font-semibold uppercase  ${
          isFormValid
            ? "bg-[#1445FE] hover:bg-opacity-80 cursor-pointer border-none"
            : "bg-gray-400 cursor-not-allowed"
        }`}
        onClick={handleSubmit}
        disabled={!isFormValid}
      >
        THÊM VÀO {mealLabel}
      </button>
    </div>
  );
};

export default AddMealTabContent;
