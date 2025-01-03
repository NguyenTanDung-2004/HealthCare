import React, { useState } from "react";
import "../../css/workout_details/Left.css";
import StarVoted from "../../img/nutritional_regimen/star-voted.png";
import Star from "../../img/nutritional_regimen/star.png";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Left = ({ image, exerciseId, vote }) => {
  const [rating, setRating] = useState(vote);
  const navigate = useNavigate();
  let currentResponse = null;

  const getCookie = (name) => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(";").shift();
    return null;
  };

  const handleStarClick = async (index) => {
    setRating(index);
    const url = `http://localhost:8080/exercise/voteExercise`;
    const token = getCookie("jwtToken");
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify([{ id: exerciseId, stars: index }]),
        credentials: "include",
      });
      if (!response.ok) {
        const text = await response.text();
        console.log(text);
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      if (data.code === 1000) {
        toast.success("Cảm ơn bạn đã vote cho bài tập này!", {
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
      console.error("Error like exercise:", err);
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

  const handleClickBack = () => {
    navigate(-1);
  };

  return (
    <>
      <div className="workout-details__left">
        <button className="btn-back" onClick={() => handleClickBack()}>
          <i class="fa-solid fa-arrow-left-long"></i>
        </button>

        <div className="workout-details__remove-bg">
          <img src={image} alt="" />
        </div>

        <div className="workout-details__text">
          <span>
            “You will have everything you need to reach your personal fitness
            goals”
          </span>

          <div className="workout-details__rating">{renderRating()}</div>
        </div>
        {/* Toast container  */}
        <ToastContainer />
      </div>
    </>
  );
};

export default Left;
