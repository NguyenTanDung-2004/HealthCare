import React, { useState, useEffect } from "react";
import "../../css/workout/CategoryList.css";

export const categories = [
  // export categories ở đây
  { label: "Tất cả", type: "all" },
  { label: "Ngực", type: "chest" },
  { label: "Vai", type: "shoulder" },
  { label: "Mông", type: "ass" },
  { label: "Khởi động", type: "start" },
  { label: "Toàn thân", type: "body" },
];

const CategoryList = ({ onCategoryChange }) => {
  const [selectedCategory, setSelectedCategory] = useState("Tất cả");

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
    onCategoryChange(category);
  };

  return (
    <div className="category-list">
      {categories.map((category, index) => (
        <div
          key={index}
          className={`category-item ${
            selectedCategory === category.label ? "active" : ""
          }`}
          onClick={() => handleCategoryClick(category.label)}
        >
          {category.label}
        </div>
      ))}
    </div>
  );
};

export default CategoryList;
