import React, { useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Card = ({
  id,
  exerciseId,
  image,
  nameChallenges,
  nameWorkout,
  soLanTap,
  soNguoiTap,
  point,
  time,
  calories,
  onCardUpdate, // Add onCardUpdate callback
}) => {
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [newPoint, setNewPoint] = useState(point);
  const apiUrl = process.env.REACT_APP_API_URL;

  const handleDelete = async () => {
    try {
      const response = await fetch(
        `${apiUrl}/challenge/deleteChallenge?exerciseId=${exerciseId}`,
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
        toast.success("Xóa thử thách thành công!", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
        setDeleteModalOpen(false);
        onCardUpdate();
      } else {
        toast.error(`Xóa thử thách thất bại! ${responseData.message}`, {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
      }
    } catch (err) {
      toast.error("Xóa thử thách thất bại!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      console.error("Error deleting challenge:", err);
    }
  };

  const handleSave = async () => {
    try {
      const response = await fetch(`${apiUrl}/challenge/editChallenge`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          exerciseId: exerciseId,
          point: newPoint,
        }),
      });
      if (!response.ok) {
        const text = await response.text();
        console.log(text);
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const responseData = await response.json();

      if (responseData.code === 1000) {
        toast.success("Lưu điểm thành công!", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
        setEditModalOpen(false);
        onCardUpdate();
      } else {
        toast.error(`Lưu điểm thất bại! ${responseData.message}`, {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
      }
    } catch (error) {
      toast.error("Lưu điểm thất bại!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      console.error("Error editing challenge:", error);
    }
  };

  const pointOptions = Array.from({ length: 10 }, (_, i) => (i + 1) * 10);
  return (
    <div className="w-full flex flex-wrap gap-4 items-center rounded-2xl py-4 px-5 bg-white shadow-lg cursor-pointer hover:shadow-[6px_6px_40px_0px_rgba(20,69,254,0.15)]">
      <div className="flex-shrink-0">
        <img
          className="rounded-md w-[180px] h-[110px] object-cover"
          src={image || "https://via.placeholder.com/150"}
          alt="ảnh"
        />
      </div>

      <div className="flex-1 flex flex-col w-auto">
        <div className="self-start text-xs text-[#979797] font-semibold">
          {nameChallenges}
        </div>
        <div className="self-start mt-1 w-full text-base text-black font-medium ">
          {nameWorkout}
        </div>
        <div className="self-start mt-4 flex flex-wrap gap-4 text-sm text-[#595858] font-medium">
          <div className="">Số lần tập: {soLanTap}</div>
          <div className="">Số người dùng: {soNguoiTap}</div>
        </div>

        <div className="flex flex-wrap gap-4 text-sm text-[#595858] font-medium">
          <div>Điểm: {point}</div>
          <div>Thời gian/set: {time}s</div>
          <div>Calo/set: {calories} calo</div>
        </div>
      </div>

      <div className=" flex flex-col gap-4 sm:gap-10 w-full sm:w-auto items-end">
        <div className="flex gap-3">
          <i
            className="fa-solid fa-trash text-red-500 cursor-pointer"
            onClick={() => setDeleteModalOpen(true)}
          ></i>

          <i
            className="fa-solid fa-pen text-black cursor-pointer"
            onClick={() => setEditModalOpen(true)}
          ></i>
        </div>
      </div>

      {isDeleteModalOpen && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg w-[500px] shadow-xl relative">
            <div className="flex justify-between mb-8">
              <div className="text-lg font-semibold  text-gray-700">
                Bạn có chắc chắn xóa thử thách này ?
              </div>

              <button
                onClick={() => setDeleteModalOpen(false)}
                className=" text-gray-500 hover:text-gray-700 text-xl h-full"
              >
                <i class="fa-solid fa-xmark"></i>
              </button>
            </div>

            <div className="flex justify-end">
              <button
                onClick={handleDelete}
                className="bg-[#1445FE] hover:bg-opacity-80 text-white rounded-md px-6 py-2 text-sm"
              >
                Xác nhận
              </button>
            </div>
          </div>
        </div>
      )}

      {isEditModalOpen && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg w-[500px] shadow-xl relative">
            <div className="flex justify-between items-center mb-6">
              <div className="text-lg font-semibold  text-gray-700">
                THAY ĐỔI ĐIỂM CỦA THỬ THÁCH NÀY ?
              </div>
              <button
                onClick={() => setEditModalOpen(false)}
                className=" text-gray-500 hover:text-gray-700 text-xl h-full"
              >
                <i class="fa-solid fa-xmark"></i>
              </button>
            </div>
            <select
              className="w-full p-2 border border-gray-300 rounded mb-6"
              value={newPoint}
              onChange={(e) => setNewPoint(parseInt(e.target.value))}
            >
              {pointOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>

            <div className="flex justify-end">
              <button
                onClick={handleSave}
                className="bg-[#1445FE] hover:bg-opacity-80 text-white rounded-md px-6 py-2 text-sm"
              >
                Lưu
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Card;
