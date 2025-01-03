import React, { useState, useEffect } from "react";
import Table from "../../table/Table";
import DetailCardModal from "./DetailCardModal";
import DeleteConfirmationModal from "./DeleteConfirmationModal";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ListMealsTabContent = ({ mealLabel }) => {
  const [meals, setMeals] = useState([]);
  const [selectedMeal, setSelectedMeal] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [mealToDelete, setMealToDelete] = useState(null);

  const apiUrl = process.env.REACT_APP_API_URL;

  useEffect(() => {
    const fetchMeals = async () => {
      try {
        const flagMeal =
          mealLabel === "Bữa sáng"
            ? 1
            : mealLabel === "Bữa trưa"
            ? 2
            : mealLabel === "Bữa tối"
            ? 3
            : 4;

        const response = await fetch(
          `${apiUrl}/userHistory/getListFoodIn1Meal?flagMeal=${flagMeal}`,
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
        setMeals(data);
      } catch (error) {
        console.error("Error fetching meals:", error);
      }
    };
    fetchMeals();
  }, [mealLabel, apiUrl]);

  const handleDelete = (item) => {
    setMealToDelete(item);
    setIsDeleteModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    setIsDeleteModalOpen(false);
    try {
      const flagMeal =
        mealLabel === "Bữa sáng"
          ? 1
          : mealLabel === "Bữa trưa"
          ? 2
          : mealLabel === "Bữa tối"
          ? 3
          : 4;

      const response = await fetch(`${apiUrl}/userHistory/deleteFoodInMeal`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          name: mealToDelete.name,
          fat: mealToDelete.fat,
          carb: mealToDelete.carb,
          protein: mealToDelete.protein,
          calories: mealToDelete.calories,
          weight: mealToDelete.weight,
          flagSystem: mealToDelete.flagSystem,
          flagMeal: flagMeal,
        }),
      });
      if (!response.ok) {
        const text = await response.text();
        console.log(text);
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const responseData = await response.json();
      if (responseData.code === 1000) {
        toast.success("Xóa món ăn thành công!", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
        setMeals((prevMeals) =>
          prevMeals.filter((item) => item.name !== mealToDelete.name)
        );
      } else {
        toast.error(`Xóa món ăn thất bại! ${responseData.message}`, {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
      }
    } catch (err) {
      toast.error("Xóa món ăn thất bại!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      console.log(err);
    } finally {
      setMealToDelete(null);
    }
  };

  const handleCancelDelete = () => {
    setIsDeleteModalOpen(false);
    setMealToDelete(null);
  };

  const handleUpdateMeal = (updatedMeal) => {
    setMeals((prevMeals) =>
      prevMeals.map((meal) =>
        meal.name === updatedMeal.name ? updatedMeal : meal
      )
    );
  };

  const handleEdit = (item) => {
    setSelectedMeal(item);
    setIsModalOpen(true);
  };
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedMeal(null);
  };

  const columns = [
    { header: "TÊN", accessor: "name", className: "w-[330px]" },
    {
      header: "TRỌNG LƯỢNG",
      accessor: "weight",
      className: "w-[140px] text-center",
    },
    {
      header: "NĂNG LƯỢNG",
      accessor: "calories",
      className: "w-[140px] text-center",
    },
    { header: "CARB", accessor: "carb", className: "w-[120px] text-center" },
    {
      header: "PROTEIN",
      accessor: "protein",
      className: "w-[120px] text-center",
    },
    { header: "FAT", accessor: "fat", className: "w-[120px] text-center" },
    { header: "", accessor: "actions", className: "flex-1" },
  ];

  const renderRow = (item, index) => {
    return (
      <tr
        key={index}
        className="text-[#202224] text-opacity-80 text-sm border-t bg-white"
      >
        <td className="p-3 border-b border-[#E5E7EB] text-[#374151] text-sm font-normal">
          {item.name}
        </td>
        <td className="p-3 border-b border-[#E5E7EB] text-[#374151] text-sm font-normal text-center">
          {item.weight}
        </td>
        <td className="p-3 border-b border-[#E5E7EB] text-[#374151] text-sm font-normal  text-center">
          {parseFloat(item.calories.toFixed(2))} calo
        </td>
        <td className="p-3 border-b border-[#E5E7EB] text-[#374151] text-sm font-normal text-center">
          {parseFloat(item.carb.toFixed(2))} g
        </td>
        <td className="p-3 border-b border-[#E5E7EB] text-[#374151] text-sm font-normal text-center">
          {parseFloat(item.protein.toFixed(2))} g
        </td>
        <td className="p-3 border-b border-[#E5E7EB] text-[#374151] text-sm font-normal text-center">
          {parseFloat(item.fat.toFixed(2))} g
        </td>
        <td className="p-3 border-[#E5E7EB] flex justify-center gap-2">
          <i
            className="fa-solid fa-trash text-red-500 cursor-pointer"
            onClick={() => handleDelete(item)}
          ></i>
          <i
            className="fa-solid fa-pen text-black cursor-pointer"
            onClick={() => handleEdit(item)}
          ></i>
        </td>
      </tr>
    );
  };

  return (
    <div className="overflow-y-auto max-h-[500px]">
      <Table columns={columns} renderRow={renderRow} data={meals} />
      {isDeleteModalOpen && (
        <DeleteConfirmationModal
          isOpen={isDeleteModalOpen}
          onClose={handleCancelDelete}
          onDelete={handleConfirmDelete}
        />
      )}
      {isModalOpen && (
        <DetailCardModal
          onClose={handleCloseModal}
          mealLabel={mealLabel}
          foodId={selectedMeal.id}
          name={selectedMeal.name}
          weight={selectedMeal.weight}
          calories={selectedMeal.calories}
          fat={selectedMeal.fat}
          protein={selectedMeal.protein}
          carb={selectedMeal.carb}
          flagSystem={selectedMeal.flagSystem}
          flagUpdate={1}
          onUpdateMeal={handleUpdateMeal}
        />
      )}
    </div>
  );
};

export default ListMealsTabContent;
