import React, { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AddGoalModal = ({ onClose }) => {
  const today = new Date().toISOString().split("T")[0];
  const [name, setName] = useState("");
  const [startDate, setStartDate] = useState(today);
  const [duration, setDuration] = useState(7);
  const [goalType, setGoalType] = useState("Tăng cân");
  const [weightChange, setWeightChange] = useState(0.1);
  const [systemName, setSystemName] = useState("");
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);

  const toastConfig = {
    position: "top-right",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
  };
  const handleSave = () => {
    if (!name) {
      toast.error("Vui lòng nhập tên mục tiêu", toastConfig);
      return;
    }
    if (weightChange <= 0) {
      toast.error("Vui lòng nhập cân nặng", toastConfig);
      return;
    }
    setIsConfirmModalOpen(true);
  };

  const getCookie = (name) => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(";").shift();
    return null;
  };

  const handleFinalSave = async () => {
    if (
      systemName !== "Hệ thống chăm sóc sức khỏe và đề xuất thức ăn và bài tập"
    ) {
      toast.error("Tên hệ thống không đúng, vui lòng thử lại.", toastConfig);
      return;
    }
    const end = new Date(
      new Date(startDate).getTime() + duration * 24 * 60 * 60 * 1000
    );
    const body = {
      end: end.toISOString().split("T")[0],
      flagIncrease: goalType === "Tăng cân" ? 1 : 2,
      weight: weightChange,
      name: name,
    };
    console.log("Body request:", JSON.stringify(body));
    try {
      const url = `http://localhost:8080/userTarget/createUserTarget`;
      const token = getCookie("jwtToken");
      if (!token) {
        toast.error("Không tìm thấy token", toastConfig);
        return;
      }
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(body),
        credentials: "include",
      });
      if (!response.ok) {
        const text = await response.text();
        console.log(text);
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      if (data.code === 1000) {
        window.location.reload(true); // Force refresh trang nếu thành công
      } else {
        toast.error(data.message, toastConfig);
        onClose(); // Đóng modal khi có lỗi
      }
    } catch (err) {
      console.error("Error create user target:", err);
      toast.error(`Lỗi hệ thống: ${err.message}`, toastConfig);
      onClose(); // Đóng modal khi có lỗi
    }
  };

  return (
    <>
      <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
        <div className="bg-white rounded-lg w-11/12 max-w-lg p-6 shadow-lg relative">
          <button
            onClick={onClose}
            className="absolute top-2 right-2 text-gray-400 hover:text-gray-600 text-xl font-bold"
          >
            ×
          </button>
          <h2 className="text-lg font-semibold text-gray-700 text-center mb-6">
            Đặt mục tiêu cá nhân
          </h2>
          <div className="flex flex-col gap-4">
            {/* Tên mục tiêu */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Tên
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Nhập ..."
                className="w-full border border-gray-300 rounded-md px-3 py-2"
              />
            </div>

            {/* Ngày bắt đầu */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Ngày bắt đầu
              </label>
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="w-full border border-gray-300 rounded-md px-3 py-2"
                disabled
              />
            </div>

            {/* Thời gian thực hiện */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Thời gian thực hiện
              </label>
              <select
                value={duration}
                onChange={(e) => setDuration(Number(e.target.value))}
                className="w-full border border-gray-300 rounded-md px-3 py-2"
              >
                {[7, 14, 21, 28].map((day) => (
                  <option key={day} value={day}>
                    {day} ngày
                  </option>
                ))}
              </select>
            </div>

            {/* Loại mục tiêu */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Loại mục tiêu
              </label>
              <div className="flex gap-4">
                <button
                  type="button"
                  onClick={() => setGoalType("Tăng cân")}
                  className={`flex relative gap-4 justify-between items-start px-4 py-1.5 min-h-[27px]  bg-opacity-20 rounded-md
                  ${
                    goalType === "Tăng cân"
                      ? "bg-[#FF9500] text-[#FF9500]"
                      : "bg-[#595858] text-[#595858]"
                  }`}
                >
                  Tăng cân
                </button>
                <button
                  type="button"
                  onClick={() => setGoalType("Giảm cân")}
                  className={`flex relative gap-4 justify-between items-start px-4 py-1.5 min-h-[27px]  bg-opacity-20 rounded-md 
                  ${
                    goalType === "Giảm cân"
                      ? "bg-[#00B69B] text-[#00B69B]"
                      : "bg-[#595858] text-[#595858]"
                  }`}
                >
                  Giảm cân
                </button>
              </div>
            </div>

            {/* Số cân nặng */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Số cân nặng
              </label>
              <div className="flex items-center">
                <input
                  type="number"
                  value={weightChange}
                  onChange={(e) => {
                    const value = Number(e.target.value);
                    const maxWeightChange = duration / 7;
                    setWeightChange(
                      value > maxWeightChange ? maxWeightChange : value
                    );
                  }}
                  step="0.1"
                  min="0.1"
                  max={duration / 7}
                  className="flex-1 border border-gray-300 rounded-md px-3 py-2"
                />
                <span className="ml-2 text-sm text-gray-500">kg</span>
              </div>
              {weightChange > duration / 7 && (
                <p className="text-red-500 text-sm mt-1">
                  Số cân nặng tối đa là {duration / 7} kg.
                </p>
              )}
            </div>
          </div>

          {/* Nút điều hướng */}
          <div className="flex justify-end gap-4 mt-6">
            <button
              onClick={onClose}
              className="bg-gray-300 hover:bg-gray-400 text-gray-700 font-semibold py-2 px-4 rounded"
            >
              Hủy bỏ
            </button>
            <button
              onClick={handleSave}
              className={`py-2 px-4 rounded font-semibold text-white ${
                name && weightChange > 0
                  ? "bg-[#1445FE] hover:bg-opacity-80"
                  : "bg-gray-400 cursor-not-allowed"
              }`}
            >
              Xác nhận
            </button>
          </div>
        </div>
      </div>

      {/* Modal xác nhận */}
      {isConfirmModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white rounded-lg w-11/12 max-w-md p-6 shadow-lg">
            <h3 className="text-lg font-semibold text-gray-700 text-center mb-4">
              Nhập tên hệ thống
            </h3>
            <input
              type="text"
              value={systemName}
              onChange={(e) => setSystemName(e.target.value)}
              placeholder="Hệ thống chăm sóc sức khỏe..."
              className="w-full border border-gray-300 rounded-md px-3 py-2 mb-4"
            />
            <div className="flex justify-end gap-4">
              <button
                onClick={() => setIsConfirmModalOpen(false)}
                className="bg-gray-300 hover:bg-gray-400 text-gray-700 font-semibold py-2 px-4 rounded"
              >
                Hủy
              </button>
              <button
                onClick={handleFinalSave}
                className="bg-[#1445FE] hover:bg-opacity-80 text-white font-semibold py-2 px-4 rounded"
              >
                Lưu
              </button>
            </div>
          </div>
        </div>
      )}
      <ToastContainer />
    </>
  );
};

export default AddGoalModal;
