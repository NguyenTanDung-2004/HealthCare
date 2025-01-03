import React, { useState, useEffect } from "react";
import ListMealsTabContent from "./editnutrition/ListMealsTabContent";
import SystemMealsTabContent from "./editnutrition/SystemMealsTabContent";
import UserMealsTabContent from "./editnutrition/UserMealsTabContent";
import AddMealTabContent from "./editnutrition/AddMealTabContent";
import "swiper/css";
import "swiper/css/pagination";

const EditNutritionModal = ({ onClose, mealLabel }) => {
  const [activeTab, setActiveTab] = useState("Danh sách món ăn đã thêm");
  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };
  useEffect(() => {
    if (mealLabel) {
      console.log("Editing meal:", mealLabel);
    }
  }, [mealLabel]);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 ">
      <div className="bg-white rounded-lg w-11/12 max-w-5xl p-6 shadow-lg relative">
        <div className="mb-4 flex justify-end items-center gap-8">
          {/* <input
            type="text"
            placeholder="Tìm kiếm..."
            className="border p-2 rounded-md flex-1 focus:outline-none "
          /> */}
          <button
            onClick={onClose}
            className="text-gray-600 hover:text-gray-800"
          >
            <i className="fa-solid fa-xmark text-3xl"></i>
          </button>
        </div>
        {/* {mealLabel && (
          <div className="text-center text-xl font-semibold mb-4">
            {`Chỉnh sửa món ăn cho ${mealLabel}`}
          </div>
        )} */}
        <div className="flex mb-4">
          <button
            key="Danh sách món ăn đã thêm"
            onClick={() => handleTabChange("Danh sách món ăn đã thêm")}
            className={`px-4 py-2 rounded-t-lg flex-1 ${
              activeTab === "Danh sách món ăn đã thêm"
                ? "bg-[#1445FE] text-white "
                : "bg-gray-200 text-gray-700"
            }`}
          >
            Danh sách món ăn đã thêm
          </button>

          <button
            key="Món ăn của hệ thống"
            onClick={() => handleTabChange("Món ăn của hệ thống")}
            className={`px-4 py-2 rounded-t-lg w-[250px] ${
              activeTab === "Món ăn của hệ thống"
                ? "bg-[#1445FE] text-white "
                : "bg-gray-200 text-gray-700"
            }`}
          >
            Món ăn của hệ thống
          </button>

          <button
            key="Món ăn của bạn"
            onClick={() => handleTabChange("Món ăn của bạn")}
            className={`px-4 py-2 rounded-t-lg w-[250px] ${
              activeTab === "Món ăn của bạn"
                ? "bg-[#1445FE] text-white "
                : "bg-gray-200 text-gray-700"
            }`}
          >
            Món ăn của bạn
          </button>

          <button
            key="Thêm món ăn"
            onClick={() => handleTabChange("Thêm món ăn")}
            className={`px-4 py-2 rounded-t-lg w-[170px] ${
              activeTab === "Thêm món ăn"
                ? "bg-[#1445FE] text-white "
                : "bg-gray-200 text-gray-700"
            }`}
          >
            Thêm món ăn
          </button>
        </div>

        <div className="p-2">
          {activeTab === "Danh sách món ăn đã thêm" && (
            <ListMealsTabContent mealLabel={mealLabel} />
          )}
          {activeTab === "Món ăn của hệ thống" && (
            <SystemMealsTabContent mealLabel={mealLabel} />
          )}
          {activeTab === "Món ăn của bạn" && (
            <UserMealsTabContent mealLabel={mealLabel} />
          )}
          {activeTab === "Thêm món ăn" && (
            <AddMealTabContent mealLabel={mealLabel} />
          )}
        </div>
      </div>
    </div>
  );
};

export default EditNutritionModal;
