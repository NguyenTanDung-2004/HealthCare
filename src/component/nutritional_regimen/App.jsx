import React, { useEffect, useState } from "react";
import "../../css/nutritional_regimen/App.css";
import "../../css/nutritional_regimen/FirstMain.css";
import Header from "../header/Header";
import Footer from "../footer/Footer";
import MainDish from "./MainDish";
import NavigationBar from "../navigationBar/NavigationBar";
import BunBoImg from "../../img/nutritional_regimen/bunbo.png";
import Button from "./Button";

const App = () => {
  const [dishesData, setDishesData] = useState([]);
  const [activeButton, setActiveButton] = useState("FOR YOU");
  let currentResponse = null;
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
        type: types[item.type - 1] || "",
        img: item.removeImage,
        name: item.name,
        time: item.time,
        calo: item.calories,
        likes: item.numberOfLikes,
        rating: item.stars,
        level: item.level,
        diet: item.diet,
      }));
    } else {
      console.log("Data is not an array:", data);
      return [];
    }
  };

  const fetchForYouData = async () => {
    console.log("Fetching 'for you' data...");
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
      console.log(
        "Transformed data (for you):",
        JSON.stringify(transformData(data))
      );
      setDishesData(transformData(data));
    } catch (err) {
      console.error("Error fetch for you dishes:", err);
    }
  };

  const fetchAllData = async () => {
    console.log("Fetching 'All' data...");
    try {
      const response = await fetch("http://localhost:8080/food/getAllFoods", {
        method: "GET",
        headers: {
          Accept: "application/json",
        },
        credentials: "include",
      });
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
      console.log(
        "Transformed data (all):",
        JSON.stringify(transformData(data))
      );
      setDishesData(transformData(data));
    } catch (err) {
      console.error("Error fetch all dishes:", err);
    }
  };

  const handleButtonClick = (label) => {
    setActiveButton(label);

    if (label === "FOR YOU") {
      fetchForYouData();
    } else if (label === "ALL") {
      fetchAllData();
    }
  };

  useEffect(() => {
    fetchForYouData();
  }, []);

  return (
    <>
      <div className="nutritional_regiment">
        <Header
          username="Phan Giang"
          text="May this website help you achieve your health goals."
          notifications={10}
        />
        <div className="first-main">
          <NavigationBar itemClicked="Nutritional regimen" />
          <div className="main">
            <div className="body">
              <div className="left">
                <span>NUTRITRIONAL REGIMEN</span>

                <div className="button-filter">
                  <Button
                    label="DÀNH CHO BẠN"
                    onClick={() => handleButtonClick("FOR YOU")}
                    isActive={activeButton === "FOR YOU"}
                  />

                  <Button
                    label="TẤT CẢ"
                    onClick={() => handleButtonClick("ALL")}
                    isActive={activeButton === "ALL"}
                  />
                </div>

                <a href="#discover" className="link-to-discover">
                  Khám phá
                </a>
              </div>
              <div className="right">
                <img src={BunBoImg} alt="" />
              </div>
            </div>
          </div>
        </div>
      </div>
      <MainDish dishesData={dishesData} />
      <Footer />
    </>
  );
};

export default App;
