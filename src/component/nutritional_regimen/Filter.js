import React, { useState, useEffect } from "react";
import "../../css/nutritional_regimen/Filter.css";

const Filter = ({ onFilterChange }) => {
  const [selectedDiets, setSelectedDiets] = useState([]);
  const [selectedCookingTime, setSelectedCookingTime] = useState(null);
  const [selectedLevel, setSelectedLevel] = useState(null);

  const diets = [
    { value: 1, label: "Ít tinh bột" },
    { value: 2, label: "Ít chất béo" },
    { value: 3, label: "Nhiều đạm" },
    { value: 4, label: "Thuần chay" },
    { value: 5, label: "Ăn chay (trứng, sữa)" },
    { value: 6, label: "Healthy" },
    { value: 7, label: "Bình thường" },
  ];
  const levels = [
    { value: 1, label: "Dễ" },
    { value: 2, label: "Trung bình" },
    { value: 3, label: "Khó" },
  ];
  const cookingTimes = ["< 30 phút", "< 1 giờ", "< 2 giờ", "Tất cả"];

  const handleMultiSelect = (item, selected, setSelected) => {
    const updatedSelected = selected.includes(item.value)
      ? selected.filter((i) => i !== item.value)
      : [...selected, item.value];
    setSelected(updatedSelected);
    onFilterChange({
      selectedDiets: updatedSelected,
      selectedCookingTime,
      selectedLevel,
    });
  };

  const handleSingleSelect = (item, setSelected) => {
    const newValue = selectedCookingTime === item.value ? null : item.value;
    setSelected(newValue);
    onFilterChange({
      selectedDiets,
      selectedCookingTime: newValue,
      selectedLevel,
    });
  };

  const handleLevelSelect = (item, setSelected) => {
    const newValue = selectedLevel === item.value ? null : item.value;
    setSelected(newValue);
    onFilterChange({
      selectedDiets,
      selectedCookingTime,
      selectedLevel: newValue,
    });
  };

  useEffect(() => {
    onFilterChange({
      selectedDiets,
      selectedCookingTime,
      selectedLevel,
    });
  }, []);

  return (
    <>
      <div className="dishes-filter">
        <span className="title">Lọc</span>

        {/* diets */}
        <div className="filter-item">
          <div className="filter-label">Chế độ ăn:</div>

          <div className="filter-options">
            {diets.map((dietOption) => (
              <span
                key={dietOption.value}
                className={`filter-option ${
                  selectedDiets.includes(dietOption.value) ? "selected" : ""
                }`}
                onClick={() =>
                  handleMultiSelect(dietOption, selectedDiets, setSelectedDiets)
                }
              >
                {dietOption.label}
              </span>
            ))}
          </div>
        </div>

        {/* cooking time */}
        <div className="filter-item">
          <div className="filter-label">Thời gian nấu:</div>

          <div className="filter-options cooking-time">
            {cookingTimes.map((time, index) => (
              <div key={index}>
                <label>
                  <input
                    type="radio"
                    className="cookingTime"
                    value={time}
                    checked={selectedCookingTime === time}
                    onChange={() => {
                      handleSingleSelect(
                        { value: time },
                        setSelectedCookingTime
                      );
                    }}
                  />
                  {time}
                </label>
              </div>
            ))}
          </div>
        </div>

        {/* levels */}
        <div className="filter-item">
          <div className="filter-label">Level:</div>

          <div className="filter-options">
            {levels.map((level) => (
              <button
                key={level.value}
                className={`filter-button ${
                  selectedLevel === level.value ? "selected" : ""
                }`}
                onClick={() => {
                  handleLevelSelect(level, setSelectedLevel);
                }}
              >
                {level.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Filter;
