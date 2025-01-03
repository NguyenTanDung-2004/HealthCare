import React from "react";
import StarVoted from "../../img/workout/star-voted.svg";
import Star from "../../img/workout/star.svg";
import IconTime from "../../img/workout/time.svg";
import "../../css/workout_details/CardRecommend.css";

const CardRecommend = ({ name, image, rating, calo, time, onClick }) => {
  const renderRating = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <img key={i} src={i <= rating ? StarVoted : Star} alt="Star" />
      );
    }
    return stars;
  };

  return (
    <>
      <div className="card-recommend" onClick={onClick}>
        <div className="card-recommend__container">
          <img src={image} alt="" />
        </div>
        <div className="card-recommend__info">
          <div className="card-info__top">
            <div className="card-info__item">{calo} calo / set</div>

            <div className="card-info__item">
              <img src={IconTime} alt="" />
              <span>{time}s</span>
            </div>
          </div>

          <div className="card-info__bottom">
            <div className="card-info__name">{name}</div>

            <div className="card-info__rating">
              {renderRating(rating)}

              <span style={{ fontSize: "12px" }}>{rating}</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CardRecommend;
