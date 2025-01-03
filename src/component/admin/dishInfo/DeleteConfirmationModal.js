// src/components/modals/DeleteConfirmationModal.js
import React from "react";

const DeleteConfirmationModal = ({ isOpen, onClose, onDelete }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg w-[500px] shadow-xl relative">
        <div className="flex justify-between mb-8">
          <div className="text-lg font-semibold  text-gray-700">
            Bạn có chắc chắn xóa thành phần này ?
          </div>

          <button
            onClick={onClose}
            className=" text-gray-500 hover:text-gray-700 text-xl h-full"
          >
            <i className="fa-solid fa-xmark"></i>
          </button>
        </div>

        <div className="flex justify-end">
          <button
            onClick={onDelete}
            className="bg-[#1445FE] hover:bg-opacity-80 text-white rounded-md px-6 py-2 text-sm"
          >
            Xác nhận
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmationModal;
