import React, { useState } from "react";
import "../../css/nutritional_regimen/CategoryList.css";

const CategoryList = ({ onCategoryChange, types }) => {
  const [selectedCategory, setSelectedCategory] = useState("Tất cả");

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
    onCategoryChange(category);
  };

  return (
    <>
      <div className="category-list">
        {types.map((category, index) => (
          <div
            key={index}
            className={`category-item ${
              selectedCategory === category ? "active" : ""
            }`}
            onClick={() => handleCategoryClick(category)}
          >
            {category}
          </div>
        ))}
      </div>
    </>
  );
};

export default CategoryList;
