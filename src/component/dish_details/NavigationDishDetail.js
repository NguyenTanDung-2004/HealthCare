import React, { useEffect, useState } from "react";
import "../../css/dish_details/NavigationDishDetail.css";

const listNavigation = [
  {
    label: "Tổng quan món ăn",
    link: "#section-1",
  },
  {
    label: "Đặc điểm cơ bản",
    link: "#section-2",
  },
  {
    label: "Thành phần dinh dưỡng",
    link: "#section-3",
  },
  {
    label: "Hướng dẫn chế biến",
    link: "#section-4",
  },
  {
    label: "Các món ăn liên quan",
    link: "#section-5",
  },
  {
    label: "Cảm nhận của mọi người",
    link: "#section-6",
  },
];

const NavigationDishDetail = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const handleItemClick = (index) => {
    setActiveIndex(index); // Cập nhật index của item đang active
    const element = document.getElementById(`section-${index + 1}`);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" }); // Cuộn đến phần tử
    }
  };

  return (
    <div className="navigation-dish-list">
      {listNavigation.map((item, index) => (
        <a
          href="#!"
          key={index}
          className={`navigation-dish-item ${
            activeIndex === index ? "active" : ""
          }`}
          onClick={() => handleItemClick(index)}
        >
          {index + 1}
          <span className="tooltip">{item.label}</span>
        </a>
      ))}
    </div>
  );
};

export default NavigationDishDetail;
