import React, { useState, useEffect } from "react";
import "../../css/workout_details/Right.css";
import NoHeart from "../../img/dish_details/icon-no-heart.png";
import FullHeart from "../../img/nutritional_regimen/icon-heart.png";
import StarVoted from "../../img/nutritional_regimen/star-voted.png";
import Star from "../../img/nutritional_regimen/star.png";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, A11y } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import Clock from "./Clock";
import { useNavigate } from "react-router-dom";
import CardRecommend from "./CardRecommend";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Right = ({
  exerciseId,
  type,
  name,
  rating,
  images,
  met,
  time,
  calo,
  limitation,
  link,
  recommend,
  challengeData,
  liked,
}) => {
  console.log(liked);
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
      const url = `http://localhost:8080/exercise/likeExcercise`;
      const token = getCookie("jwtToken");
      try {
        const response = await fetch(url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify([exerciseId]),
          credentials: "include",
        });
        if (!response.ok) {
          const text = await response.text();
          console.log(text);
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        if (data.code === 1000) {
          toast.success("Đã thêm bài tập vào yêu thích", {
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
  const handleClick = (id) => {
    navigate(`/workout/${id}`, { state: { challengeData: null } });
  };
  return (
    <>
      <div className="workout-details__right">
        {challengeData ? (
          <div className="w-full flex justify-center gap-4 mt-4 text-center">
            <div className="flex flex-col items-center">
              <span className="text-xl font-bold text-[[#1445FE]">
                {challengeData.point}
              </span>
              <span className="text-sm text-gray-500">Điểm</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-xl font-bold text-[#1445FE]">
                {challengeData.soLanTap}
              </span>
              <span className="text-sm text-gray-500">Số lần tập</span>
            </div>
          </div>
        ) : (
          <>
            <div className="heart-corner">
              <img
                src={heart}
                alt="Heart Icon"
                onClick={liked === 0 ? handleClickHeart : null}
                style={{ cursor: liked === 0 ? "pointer" : "default" }}
              />
            </div>
          </>
        )}

        <div className="workout-details__right-main">
          <div className="workout-details__right-type">
            Bài tập / <span style={{ color: "#1445fe" }}>{type}</span>
          </div>

          <div className="workout-details__right-rating">
            {renderRating(rating)}
            <span>{rating}</span>
          </div>

          <div className="workout-details__right-name">
            <span>{name}</span>
          </div>

          <div className="workout-details__right-image">
            <Swiper
              modules={[Pagination, A11y]}
              spaceBetween={50}
              slidesPerView={3}
              pagination={{ clickable: true }}
            >
              {images?.map((item, index) => (
                <SwiperSlide key={index}>
                  <div className="workout-details__image-container">
                    <img src={item} alt="" />
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>

          <div className="workout-details__right-info">
            <div
              className="workout-details__info-item"
              style={{ alignSelf: "flex-start" }}
            >
              <span className="workout-details__info-amount">{met}</span>
              <span className="workout-details__info-name">Met</span>
            </div>

            <div className="workout-details__info-item">
              <span className="workout-details__info-amount">{time}s</span>
              <span className="workout-details__info-name">Thời gian</span>
            </div>

            <div className="workout-details__info-item">
              <span className="workout-details__info-amount">
                {calo} calo / set
              </span>
              <span className="workout-details__info-name">Calories</span>
            </div>
          </div>

          <div className="workout-details__right-limitation">
            Hạn chế: <span style={{ color: "red" }}>{limitation}</span>
          </div>

          <div className="workout-details__right-link">
            <a href={link}>Video hướng dẫn luyện tập</a>
          </div>

          <div className="workout-details__right-clock">
            <Clock
              time={time}
              exerciseId={exerciseId}
              challengeData={challengeData}
            />
          </div>

          <div className="workout-details__right-recommend">
            <div className="label">
              <div className="blue-point"></div>
              <span>Bài tập liên quan</span>
            </div>
            <div className="workout-details__recommend-list">
              <Swiper
                modules={[Pagination, A11y]}
                spaceBetween={15}
                slidesPerView={3}
                pagination={{ clickable: true }}
              >
                {recommend?.map((item) => (
                  <SwiperSlide key={item.id}>
                    <CardRecommend
                      name={item.name}
                      image={item.image}
                      time={item.time}
                      calo={item.calo}
                      rating={item.rating}
                      onClick={() => handleClick(item.id)}
                    />
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

export default Right;
