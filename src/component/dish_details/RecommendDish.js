import React, { useState, useEffect } from "react";
import "../../css/dish_details/RecommendDish.css";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, A11y } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import CardDish from "../nutritional_regimen/CardDish";
import { useNavigate } from "react-router-dom";

const RecommendDish = ({ type }) => {
  const navigate = useNavigate();
  const [dishes, setDishes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const types = [
    "Món chính",
    "Món phụ",
    "Món ăn vặt",
    "Món ăn sáng",
    "Đồ uống",
  ];

  const transformData = (data) => {
    if (Array.isArray(data)) {
      return data.map((item) => ({
        id: item.id,
        type: item.type,
        img: item.removeImage,
        name: item.name,
        time: item.time,
        calo: item.calories,
        likes: item.numberOfLikes,
        rating: item.stars,
      }));
    } else {
      return [];
    }
  };
  useEffect(() => {
    const fetchAllFoods = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(
          "http://localhost:8080/statusFoodExcercise/getFoodRecommendation",
          {
            method: "GET",
            headers: {
              Accept: "application/json",
            },
            credentials: "include",
          }
        );
        if (!response.ok) {
          const text = await response.text();
          console.log(text);
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const contentType = response.headers.get("content-type");
        if (!contentType || !contentType.includes("application/json")) {
          throw new Error("Response is not in JSON format!");
        }
        const data = await response.json();
        console.log("Data all food in RecommendDish: " + JSON.stringify(data));
        const filteredData = transformData(data).filter(
          (item) => item.type === type
        );
        setDishes(filteredData);
      } catch (err) {
        setError(err);
        console.error("Error fetching all dishes:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchAllFoods();
  }, [type]);

  const handleClick = (id) => {
    navigate(`/nutritional_regimen/${id}`);
  };

  if (loading) return <p>Loading related foods...</p>;
  if (error) return <p>Error: {error.message}</p>;
  return (
    <div id="section-5" className="recommend-dish">
      <div className="recommend-dish__title">
        <div className="blue-point"></div>
        <span>Món ăn liên quan</span>
      </div>
      <div className="recommend-dish__main">
        {dishes && dishes.length > 0 ? (
          <Swiper
            modules={[Pagination, A11y]}
            spaceBetween={15}
            slidesPerView={3}
            pagination={{ clickable: true }}
          >
            {dishes?.map((dish) => (
              <SwiperSlide key={dish.id}>
                <CardDish
                  type={types[dish.type - 1] || ""}
                  img={dish.img}
                  name={dish.name}
                  time={dish.time}
                  calo={dish.calo}
                  likes={dish.likes}
                  rating={dish.rating}
                  onClick={() => handleClick(dish.id)}
                />
              </SwiperSlide>
            ))}
          </Swiper>
        ) : (
          <span className="text-center block text-gray-500">
            Không có món ăn liên quan.
          </span>
        )}
      </div>
    </div>
  );
};

export default RecommendDish;
