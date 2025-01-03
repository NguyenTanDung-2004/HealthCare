import React from "react";

const CardInfo = ({ image, name, calo, protein, fat, carb, onClick }) => {
  return (
    <div className="bg-[#E4EAFF] rounded-lg shadow-lg px-4 pt-4 pb-6 flex flex-col items-center h-[180px] justify-between cursor-pointer">
      <h3 className="text-base font-semibold text-black text-center mb-1">
        {name}
      </h3>

      <div className="flex gap-4 justify-end">
        <img
          src={image}
          alt={name}
          className="w-24 h-24 object-cover rounded-md mb-2"
        />
        <div className="flex flex-col justify-center gap-2">
          <p className="text-gray-500 text-sm text-center">calo: {calo}</p>
          <p className="text-gray-500 text-sm text-center">
            protein: {protein}g
          </p>
          <p className="text-gray-500 text-sm text-center">fat: {fat}g</p>
          <p className="text-gray-500 text-sm text-center">carb: {carb}g</p>
        </div>
      </div>
    </div>
  );
};

export default CardInfo;
