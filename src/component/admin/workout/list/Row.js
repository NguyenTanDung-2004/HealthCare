import React from "react";

const Row = ({ id, name, soLanTap, met, time, calo, totalCalo, onClick }) => {
  return (
    <div
      onClick={onClick}
      className="flex flex-wrap gap-3 w-full border-b border-gray-200 bg-white hover:bg-[#f4f7ff] h-auto items-start md:items-center p-2.5 cursor-pointer"
    >
      <div className="lg:flex-[3] w-full lg:w-[150px] flex items-center justify-start md:py-3 mb-2 md:mb-0">
        <div className="text-sm text-[#202224] font-semibold  truncate">
          <span className="md:hidden font-bold">ID: </span>
          {id}
        </div>
      </div>

      <div className="lg:flex-[5] w-full lg:w-[300px] flex items-center justify-start md:py-3 mb-2 md:mb-0">
        <div className="text-sm text-[#202224cc] ">
          <span className="md:hidden font-bold">TÊN: </span>
          {name}
        </div>
      </div>

      <div className="lg:flex-[3] w-full lg:w-[140px]  flex items-center justify-center md:py-3 mb-2 md:mb-0">
        <div className="text-sm text-[#202224cc] ">
          <span className="md:hidden font-bold">SỐ LẦN TẬP: </span>
          {soLanTap}
        </div>
      </div>

      <div className="lg:flex-[3] w-full lg:w-[140px] flex items-center justify-center md:py-3 mb-2 md:mb-0">
        <div className="text-sm text-[#202224cc] ">
          <span className="md:hidden font-bold">MET: </span>
          {met}
        </div>
      </div>

      <div className="lg:flex-[3] w-full lg:w-[140px]  flex items-center justify-center md:py-3 mb-2 md:mb-0">
        <div className="text-sm text-[#202224cc] ">
          <span className="md:hidden font-bold">THỜI GIAN/SET: </span>
          {time}s
        </div>
      </div>
    </div>
  );
};

export default Row;
