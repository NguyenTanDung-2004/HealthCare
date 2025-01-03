import React from "react";

const LineProgress = ({ percentage }) => {
  return (
    <div className="relative w-full h-[13px] bg-[#D9D9D9] overflow-hidden">
      <div className="absolute inset-0 bg-[#D9D9D9]"></div>

      <div
        className="absolute inset-0 bg-[#1445FE] transition-all duration-300 ease-in-out"
        style={{ width: `${percentage}%` }}
      ></div>
    </div>
  );
};

export default LineProgress;
