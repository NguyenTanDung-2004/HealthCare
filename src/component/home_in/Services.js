import React, { useState } from "react";
import "../../css/home_in/Services.css";
import WorkOutImg from "../../img/home_out/workout.png";
import NutritionalImg from "../../img/home_in/diet-recom.png";
import StatisticImg from "../../img/home_in/statistic.png";
import GoalImg from "../../img/home_in/goals.png";
import ChallengesImg from "../../img/home_in/challenges.png";
import { Link } from "react-router-dom";

const Services = () => {
  const items = [
    { id: 1, label: "Bài tập", img: WorkOutImg, link: "/workout" },
    {
      id: 2,
      label: "Món ăn",
      img: NutritionalImg,
      link: "/nutritional_regimen",
    },
    { id: 3, label: "Mục tiêu", img: GoalImg, link: "/goals" },
    { id: 4, label: "Thống kê", img: StatisticImg, link: "/history" },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const handleSlider = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex + 3 >= items.length ? 0 : prevIndex + 3
    );
  };

  const displayedItems = items.slice(currentIndex, currentIndex + 3);

  const today = new Date();

  const formattedDate = today.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
  return (
    <div>
      <div className="top">
        <div className="health-data">
          <div className="label">
            <div className="blue-point"></div>
            <span>Thông tin sức khỏe</span>
          </div>
          <Link to="/profile" className="main-container">
            <div className="item">
              <div className="div-icon">
                <i className="fa-solid fa-user-nurse"></i>
              </div>
              <div className="item-content">
                <div className="item-label">BMI</div>
                <div className="item-details">23</div>
              </div>
            </div>
            <div className="item">
              <div className="div-icon">
                <i className="fa-solid fa-heart"></i>
              </div>
              <div className="item-content">
                <div className="item-label">Nhịp tim</div>
                <div className="item-details">100 bpm</div>
              </div>
            </div>
            <div className="item">
              <div className="div-icon">
                <i className="fa-solid fa-droplet"></i>
              </div>
              <div className="item-content">
                <div className="item-label">Huyết áp</div>
                <div className="item-details">80-90 mmHg</div>
              </div>
            </div>
            <div className="item">
              <div className="div-icon">
                <i className="fa-solid fa-eye-dropper"></i>
              </div>
              <div className="item-content">
                <div className="item-label">Glucozo level</div>
                <div className="item-details">230/ml</div>
              </div>
            </div>
          </Link>
        </div>
        <div className="challenges">
          <div className="label">
            <div className="blue-point"></div>
            <span>Thử thách</span>
          </div>
          <div className="main-container">
            <Link to="/challenges">
              <img src={ChallengesImg} alt="thử thách" />
            </Link>
          </div>
        </div>
      </div>
      <div className="bottom">
        {displayedItems.map((item) => (
          <div className="item" key={item.id}>
            <div className="label">
              <div className="blue-point"></div>
              <span>{item.label}</span>
            </div>
            <Link to={item.link} className="main-container">
              <img src={item.img} alt={item.label} />
            </Link>
          </div>
        ))}

        <div className="arrow-container">
          <button onClick={handleSlider}>
            <i className="fa-solid fa-arrow-right-arrow-left"></i>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Services;
