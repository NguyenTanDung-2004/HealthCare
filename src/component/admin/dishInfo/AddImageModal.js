// src/components/modals/AddImageModal.js
import React from "react";

const AddImageModal = ({
  isOpen,
  onClose,
  newDishImages,
  handleAddDishImages,
  handleSaveDishImages,
}) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg w-[500px] shadow-xl relative">
        <div className="flex justify-between items-center">
          <div className="text-lg font-semibold mb-6 text-gray-700">
            Thêm thành phần mới
          </div>
          <button
            onClick={onClose}
            className=" text-gray-500 hover:text-gray-700 text-xl h-full"
          >
            <i className="fa-solid fa-xmark"></i>
          </button>
        </div>
        {newDishImages.length === 0 ? (
          <div className="mb-4">
            <label className="block text-gray-700 mb-1">
              Chọn ảnh món ăn (tối đa 3 ảnh)
            </label>
            <input
              type="file"
              multiple
              accept="image/*"
              onChange={handleAddDishImages}
              className="w-full border border-gray-300 rounded px-3 py-2"
            />
          </div>
        ) : (
          <div className=" flex flex-wrap gap-4 mb-4">
            {newDishImages.map((image, index) => (
              <div className="w-[150px]" key={index}>
                <img
                  src={image}
                  alt={`Dish ${index + 1}`}
                  className="rounded-lg object-cover w-full h-[100px]"
                />
              </div>
            ))}
          </div>
        )}
        <div className="flex justify-end">
          {newDishImages.length === 0 ? (
            <></>
          ) : (
            <button
              onClick={handleSaveDishImages}
              className="bg-[#1445FE] hover:bg-opacity-80 text-white rounded-md px-6 py-2 text-sm"
            >
              Lưu
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default AddImageModal;
