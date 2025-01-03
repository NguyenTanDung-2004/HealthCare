// src/components/modals/EditIngredientModal.js
import React from "react";

const EditIngredientModal = ({
  isOpen,
  onClose,
  newIngredient,
  setNewIngredient,
  onSaveEditIngredient,
}) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg w-[500px] shadow-xl relative">
        <div className="flex justify-between items-center">
          <div className="text-lg font-semibold mb-6 text-gray-700">
            Sửa thành phần
          </div>
          <button
            onClick={onClose}
            className=" text-gray-500 hover:text-gray-700 text-xl h-full"
          >
            <i className="fa-solid fa-xmark"></i>
          </button>
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 mb-1">Tên nguyên liệu</label>
          <input
            type="text"
            name="name"
            value={newIngredient.name}
            onChange={(e) =>
              setNewIngredient({ ...newIngredient, name: e.target.value })
            }
            className="w-full border border-gray-300 rounded px-3 py-2"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-1">Trọng lượng</label>
          <input
            type="text"
            name="weight"
            value={newIngredient.weight}
            onChange={(e) =>
              setNewIngredient({ ...newIngredient, weight: e.target.value })
            }
            className="w-full border border-gray-300 rounded px-3 py-2"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-1">Năng lượng</label>
          <input
            type="text"
            name="energy"
            value={newIngredient.energy}
            onChange={(e) =>
              setNewIngredient({ ...newIngredient, energy: e.target.value })
            }
            className="w-full border border-gray-300 rounded px-3 py-2"
          />
        </div>
        <div className="flex justify-end">
          <button
            onClick={onSaveEditIngredient}
            className="bg-[#1445FE] hover:bg-opacity-80 text-white rounded-md px-6 py-2 text-sm"
          >
            Lưu
          </button>
        </div>
      </div>
    </div>
  );
};
export default EditIngredientModal;
