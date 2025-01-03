import React, { useState } from "react";
import "../../css/dish_details/NutritionDetails.css";
import StarVoted from "../../img/nutritional_regimen/star-voted.png";
import Star from "../../img/nutritional_regimen/star.png";

const NutritionDetails = ({ array, totalCalo, img }) => {
  const [rating, setRating] = useState(0);

  const renderRating = () => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <img
          key={i}
          src={i <= rating ? StarVoted : Star}
          alt="Star"
          onClick={() => handleStarClick(i)}
        />
      );
    }
    return stars;
  };

  const handleStarClick = (index) => {
    if (index === rating) {
      setRating(0);
    } else {
      setRating(index);
    }
  };

  return (
    <>
      <div id="section-3" className="nutrition-details">
        <span className="nutrition-details__title">THÀNH PHẦN DINH DƯỠNG</span>
        <span className="nutrition-details__note">
          (Tùy vào khẩu phần và cách chế biến, lượng calo có thể thay đổi chút
          ít.)
        </span>
        <div className="nutrition-details__main">
          <div className="nutrition-details__left">
            <div className="img-container">
              <img src={img} alt="" />
            </div>

            {/* <div className="nutrition-details__rating">{renderRating()}</div> */}
          </div>

          <div className="nutrition-details__right">
            <div className="nutrition-details__wrapper">
              <ul className="nutrition-list">
                {array?.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
              <p className="total-calories">Tổng cộng: {totalCalo} calo</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default NutritionDetails;
