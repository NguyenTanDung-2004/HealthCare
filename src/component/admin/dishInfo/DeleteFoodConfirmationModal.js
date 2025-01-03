import React from "react";

const DeleteFoodConfirmationModal = ({ isOpen, onClose, onDelete }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-md shadow-lg">
        <h2 className="text-lg font-semibold mb-4">Xác nhận xóa bài tập</h2>
        <p className="mb-4">Bạn có chắc chắn muốn xóa bài tập này không?</p>
        <div className="flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 mr-2 bg-gray-300 hover:bg-gray-400 text-gray-800 rounded-md"
          >
            Hủy
          </button>
          <button
            onClick={onDelete}
            className="px-4 py-2 bg-red-500 hover:bg-red-700 text-white rounded-md"
          >
            Xóa
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteFoodConfirmationModal;
