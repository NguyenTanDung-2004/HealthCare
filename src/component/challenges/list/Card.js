import React from "react";

const Card = ({
  image,
  nameWorkout,
  soLanTap,
  soNguoiTap,
  point,
  time,
  calories,
  onClick,
}) => {
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
        {/* <div className="self-start text-xs text-[#979797] font-semibold">
          {nameChallenges}
        </div> */}
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

      <div
        onClick={onClick}
        className="bg-[#1445FE] hover:bg-opacity-80 rounded-lg text-white text-sm px-4 py-2 text-center w-[120px]"
      >
        THỰC HIỆN
      </div>
    </div>
  );
};

export default Card;
