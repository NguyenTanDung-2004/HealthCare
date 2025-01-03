import React, { useState } from "react";
import "../../css/dish_details/DishOverview.css";
import StarVoted from "../../img/nutritional_regimen/star-voted.png";
import Star from "../../img/nutritional_regimen/star.png";
import NoHeart from "../../img/dish_details/icon-no-heart.png";
import FullHeart from "../../img/nutritional_regimen/icon-heart.png";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const DishOverview = ({
  type,
  name,
  img,
  desc,
  calo,
  protein,
  fat,
  carb,
  rating,
  liked,
  foodId,
}) => {
  const [heart, setHeart] = useState(liked === 1 ? FullHeart : NoHeart);
  const navigate = useNavigate();

  let currentResponse = null;

  const getCookie = (name) => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(";").shift();
    return null;
  };

  const handleClickHeart = async () => {
    if (liked === 0 && heart === NoHeart) {
      const url = `http://localhost:8080/food/likeFood`;
      const token = getCookie("jwtToken");
      try {
        const response = await fetch(url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify([foodId]),
          credentials: "include",
        });
        if (!response.ok) {
          const text = await response.text();
          console.log(text);
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        if (data.code === 1000) {
          toast.success("Đã thêm món ăn vào yêu thích", {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
        }
        setHeart(FullHeart);
      } catch (err) {
        console.error("Error like food:", err);
        toast.error("Lỗi hệ thống", {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }
    }
  };

  const renderRating = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <img key={i} src={i <= rating ? StarVoted : Star} alt="Star" />
      );
    }
    return stars;
  };

  const handleClickBack = () => {
    navigate(-1);
  };
  return (
    <>
      <div id="section-1" className="dish-overview">
        <div className="heart-corner">
          <img
            src={heart}
            alt="Heart Icon"
            onClick={() => handleClickHeart()}
          />
        </div>

        <div className="dish-overview__main">
          <div className="dish-overview__left">
            <span className="type-dish">{type}</span>

            <span className="name-dish">{name}</span>

            <img src={img} alt="bún bò" />

            <div className="info-dish">
              <div className="info-item">
                <span className="info-item__name">Calories</span>
                <span className="info-item__amount">{calo}</span>
              </div>

              <div className="info-item">
                <span className="info-item__name">Protein</span>
                <span className="info-item__amount">{protein}g</span>
              </div>

              <div className="info-item">
                <span className="info-item__name">Fat</span>
                <span className="info-item__amount">{fat}g</span>
              </div>

              <div className="info-item">
                <span className="info-item__name">Carb</span>
                <span className="info-item__amount">{carb}g</span>
              </div>
            </div>
          </div>
          <div className="dish-overview__right">
            <button className="btn-back" onClick={() => handleClickBack()}>
              <i class="fa-solid fa-arrow-left-long"></i>
            </button>

            <p>
              <span>{name} </span>
              {desc}
            </p>

            <div className="dish-rating">
              {renderRating(rating)}

              <span>{rating}</span>
            </div>
          </div>
        </div>

        <ToastContainer />
      </div>
    </>
  );
};

export default DishOverview;
