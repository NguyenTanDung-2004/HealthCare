import React from "react";
import LineProgress from "./LineProgress";

const Card = ({
  target,
  name,
  percentage,
  daysCompleted,
  totalDays,
  startDate,
  endDate,
  type,
  status,
  onClick,
}) => {
  // Xử lý màu sắc dựa trên loại và trạng thái
  const typeColor =
    type === "Giảm cân"
      ? "bg-[#00B69B] text-[#00B69B]"
      : "bg-[#FF9500] text-[#FF9500]";
  const statusColor =
    status === "Đang thực hiện"
      ? "bg-[#1A78F2] text-[#1A78F2]"
      : "bg-[#595858] text-[#595858]";

  const outerBgColor =
    status === "Đã kết thúc"
      ? "bg-[#EDEDED] shadow-lg "
      : "bg-white shadow-[6px_6px_40px_0px_rgba(20,69,254,0.15)] ";
  return (
    <div
      onClick={onClick}
      className={`w-full flex gap-4 items-center rounded-2xl p-4 ${outerBgColor} cursor-pointer hover:shadow-[6px_6px_40px_0px_rgba(20,69,254,0.15)]`}
    >
      <div className="flex g-4">
        <div className="flex bg-[#D9D9D9] rounded-md p-4 justify-center items-center text-xl">
          {target}kg
        </div>
      </div>

      <div className="flex-1 flex flex-col gap-2 w-auto sel">
        <div className="text-black rounded-md text-base">{name}</div>
        <div className="flex items-center gap-3">
          <LineProgress percentage={percentage} />
          <div className="text-[#787878] rounded-md text-sm">{`${daysCompleted}/${totalDays} ngày`}</div>
        </div>
      </div>

      <div className="flex flex-col gap-2 self-end">
        <div className="flex gap-2">
          <div
            className={`flex relative gap-4 justify-between items-start px-4 py-1.5 min-h-[27px] ${typeColor} bg-opacity-20 rounded-md`}
          >
            <div className="z-0 flex-1 shrink my-auto basis-0 font-Averta-Bold text-[13px]">
              {type}
            </div>
          </div>
          <div
            className={`flex relative gap-4 justify-between items-start px-4 py-1.5 min-h-[27px] ${statusColor} bg-opacity-20 rounded-md`}
          >
            <div className="z-0 flex-1 shrink my-auto basis-0 font-Averta-Bold text-[13px]">
              {status}
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-1 ml-auto">
          <div className="flex justify-between">
            <div className="text-xs text-[#595858] font-semibold mr-1">
              Ngày bắt đầu
            </div>
            <div className="text-xs text-[#888888] text-right">{startDate}</div>
          </div>
          <div className="flex justify-between">
            <div className="text-xs text-[#595858] font-semibold mr-1">
              Ngày kết thúc
            </div>
            <div className="text-xs text-[#888888] text-right">{endDate}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
