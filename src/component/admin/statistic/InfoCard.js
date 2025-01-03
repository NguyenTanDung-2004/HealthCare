import React from "react";

const InfoCard = ({
  titleInfo,
  dataInfo,
  urliconInfo,
  percentageChangeInfo,
}) => {
  return (
    <div className="flex flex-col justify-center items-center w-[24%] bg-white py-[25px] px-[25px] gap-6 rounded-xl">
      {/* Header Section */}
      <div className="inline-flex w-full justify-between">
        <div className="text-left">
          <div className="text-[#202224] text-[24px] font-bold tracking-wide">
            {dataInfo}
          </div>
        </div>
        <div
          className={`h-[40px] w-[40px] flex justify-center items-center  rounded-3xl`}
        >
          <img
            src={urliconInfo}
            alt={titleInfo}
            width={35}
            height={30}
            className="object-contain"
          />
        </div>
      </div>

      {/* Footer Section */}
      <div className="flex flex-col w-full items-start">
        <span className="text-black text-sm font-medium leading-normal">
          {titleInfo}
        </span>
        {percentageChangeInfo !== -1 && (
          <p className="text-[#7C8DB5] text-sm font-medium leading-normal">
            <span>{percentageChangeInfo}%</span> tổng người dùng
          </p>
        )}
      </div>
    </div>
  );
};

export default InfoCard;
