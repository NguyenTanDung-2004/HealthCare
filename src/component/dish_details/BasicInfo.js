import React, { useState } from "react";
import "../../css/dish_details/BasicInfo.css";
import StarVoted from "../../img/nutritional_regimen/star-voted.png";
import Star from "../../img/nutritional_regimen/star.png";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const BasicInfo = ({
  img,
  method,
  time,
  type,
  level,
  diet,
  favourites,
  vote,
  foodId,
}) => {
  const [rating, setRating] = useState(vote);
  let currentResponse = null;

  const getCookie = (name) => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(";").shift();
    return null;
  };

  const handleStarClick = async (index) => {
    setRating(index);
    const url = `http://localhost:8080/food/voteFood`;
    const token = getCookie("jwtToken");
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify([{ id: foodId, stars: index }]),
        credentials: "include",
      });
      if (!response.ok) {
        const text = await response.text();
        console.log(text);
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      if (data.code === 1000) {
        toast.success("Cảm ơn bạn đã vote cho món ăn này!", {
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
    } catch (err) {
      console.error("Error vote food:", err);
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
  };

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

  const formatTime = (minutes) => {
    if (minutes >= 60) {
      const hours = Math.floor(minutes / 60);
      const mins = minutes % 60;
      return `${hours} giờ ${mins} phút`;
    }
    return `${minutes} phút`;
  };

  return (
    <>
      <div id="section-2" className="basic-info">
        <span className="basic-info__title">THÔNG TIN CƠ BẢN </span>
        <div className="basic-info__main">
          <div className="basic-info__left">
            <div className="img-container">
              <img src={img} alt="" />
            </div>

            <div className="basic-info__rating">{renderRating()}</div>
          </div>
          <div className="basic-info__right">
            <div className="basic-info__item">
              <span>Phương pháp chế biến: {method}</span>
            </div>

            <div className="basic-info__item">
              <span>Thời gian nấu: {formatTime(time)}</span>
            </div>

            <div className="basic-info__item">
              <span>Loại món ăn: {type}</span>
            </div>

            <div className="basic-info__item">
              <span>Mức độ: {level}</span>
            </div>

            <div className="basic-info__item">
              <span>Chế độ ăn: {diet}</span>
            </div>

            <div className="basic-info__item">
              <span>{favourites} lượt yêu thích</span>
            </div>
          </div>
        </div>
        <ToastContainer />
      </div>
    </>
  );
};

export default BasicInfo;
