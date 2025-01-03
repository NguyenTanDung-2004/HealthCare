import React from "react";

const Row = ({ stt, name, avatar, bmi, totalPoints }) => {
  return (
    <div className="flex flex-wrap gap-3 w-full border-b border-gray-200 bg-white hover:bg-[#f4f7ff] h-auto items-start md:items-center p-2.5 cursor-pointer">
      <div className="w-full md:w-[150px] flex items-center justify-start md:py-3 mb-2 md:mb-0">
        <div className="text-sm text-[#202224] font-semibold  truncate">
          <span className="md:hidden font-bold">STT: </span>
          {stt}
        </div>
      </div>

      <div className="w-full md:w-[450px] flex items-center justify-start md:py-3 mb-2 md:mb-0">
        <div className="flex items-center gap-4">
          <img src={avatar} alt="Avatar" className="w-8 h-8 rounded-full" />
          <div className="text-sm text-[#202224] font-semibold">
            <span className="md:hidden font-bold">TÊN: </span>
            {name}
          </div>
        </div>
      </div>

      <div className="w-full md:w-[300px] flex items-center justify-start md:py-3 mb-2 md:mb-0">
        <div className="text-sm text-[#202224cc] ">
          <span className="md:hidden font-bold">BMI: </span>
          {bmi}
        </div>
      </div>

      <div className="w-full flex-1 flex items-center justify-start md:py-3 mb-2 md:mb-0">
        <div className="text-sm text-[#202224cc] truncate">
          <span className="md:hidden font-bold">TỔNG ĐIỂM: </span>
          {totalPoints}
        </div>
      </div>
    </div>
  );
};

export default Row;
