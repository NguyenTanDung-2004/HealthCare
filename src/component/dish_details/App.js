import React, { useEffect, useState } from "react";
import "../../css/dish_details/App.css";
import Header from "../header/Header";
import NavigationBar from "../navigationBar/NavigationBar";
import Footer from "../footer/Footer";
import { useLocation } from "react-router-dom";
import DishOverview from "./DishOverview";
import BasicInfo from "./BasicInfo";
import NutritionDetails from "./NutritionDetails";
import CookingInstructions from "./CookingInstructions";
import RecommendDish from "./RecommendDish";
import UserReviews from "./UserReviews";
import NavigationDishDetail from "./NavigationDishDetail";

const App = () => {
  const { pathname } = useLocation();
  const [dishDetails, setDishDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const foodId = pathname.split("/").pop();
  const types = [
    "Món chính",
    "Món phụ",
    "Món ăn vặt",
    "Món ăn sáng",
    "Đồ uống",
  ];
  const methods = [
    "nước uống",
    "xào",
    "rang",
    "nướng",
    "canh",
    "kho",
    "hấp",
    "hầm",
    "chiên dầu",
    "chiên không dầu",
    "pha chế",
    "luộc",
  ];
  const diets = [
    "Ít tinh bột",
    "Ít chất béo",
    "Nhiều đạm",
    "Thuần chay",
    "Ăn chay (trứng, sữa)",
    "Healthy",
    "Bình thường",
  ];
  const levels = ["Dễ", "Trung bình", "Khó"];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  useEffect(() => {
    const fetchDishDetails = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(
          `http://localhost:8080/food/getFoodDetail?foodId=${foodId}`,
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
          await response.text();
          throw new Error("Response is not in JSON format!");
        }

        const data = await response.json();
        setDishDetails({
          ...data,
          type: types[data.type - 1] || "N/A",
          method: methods[data.method - 1] || "N/A",
          diet: diets[data.diet - 1] || "N/A",
          level: levels[data.level - 1] || "N/A",
          listIngredient:
            data.listIngredient?.map(
              (item, index) =>
                `${item}: ${data.listWeightIngredient?.[index]}g, ${data.listCaloriesIngredient?.[index]} calo`
            ) || [],
          listStep: data.listStep || [],
          linkImage:
            data?.listLinkImage?.length > 0
              ? data.listLinkImage[data.listLinkImage.length - 1]
              : null,
          img1:
            data?.listLinkImage?.[1] ||
            "https://i.ibb.co/QkXghSy/basic-info.png",
          img2:
            data?.listLinkImage?.[2] ||
            "https://i.ibb.co/QkXghSy/basic-info.png",
          realType: data?.type,
          flagLiked: data?.flagLiked,
          stars: data?.stars,
          flagBloodPressure: data.flagBloodPressure === 1 ? "huyết áp" : "",
          flagBloodGlucose: data.flagBloodGlucose === 1 ? "đường huyết" : "",
          flagHeart: data.flagHeart === 1 ? "tim mạch" : "",
        });
      } catch (err) {
        setError(err);
        console.error("Error fetching dish details:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchDishDetails();
  }, [pathname]);

  const reviews = [
    {
      avatar: "https://avatar.iran.liara.run/public",
      name: "Hồng Thắm",
      rating: 5,
      dateCreation: "2024-10-09",
      content: "Món ăn tuyệt vời, rất hợp khẩu vị của tôi!",
    },
    {
      avatar: "https://avatar.iran.liara.run/public",
      name: "Kim Nhung",
      rating: 4,
      dateCreation: "2024-10-08",
      content: "Ngon, nhưng hơi ít calo so với nhu cầu của mình.",
    },
    {
      avatar: "https://avatar.iran.liara.run/public",
      name: "Ngọc Anh",
      rating: 3.5,
      dateCreation: "2024-10-07",
      content: "Tôi thấy món ăn khá ổn, nhưng còn có thể cải thiện thêm.",
    },
    {
      avatar: "https://avatar.iran.liara.run/public",
      name: "Trà Giang",
      rating: 1,
      dateCreation: "2024-10-07",
      content: "Khó làm vãi",
    },
    {
      avatar: "https://avatar.iran.liara.run/public",
      name: "Dũng Tấn",
      rating: 2,
      dateCreation: "2024-10-07",
      content: "Mắc mệt, lỗi nhiều, nấu dở",
    },
    {
      avatar: "https://avatar.iran.liara.run/public",
      name: "Giang Phan",
      rating: 4,
      dateCreation: "2024-10-07",
      content: "Ùm cũng được á",
    },
  ];

  if (loading) return <p>Loading dish detail...</p>;
  if (error) return <p>Error: {error.message}</p>;
  if (!dishDetails) return null;

  return (
    <>
      <div className="dish-details">
        <div className="px-6 md:px-[100px] pt-[30px]">
          <Header
            username="Phan Giang"
            text="May this website help you achieve your health goals."
            notifications={10}
          />

          <NavigationBar
            itemClicked="Nutritional regimen"
            className="relative z-20"
          />
        </div>

        <div className="first">
          <DishOverview
            type={dishDetails?.type}
            name={dishDetails?.name}
            img={dishDetails?.linkImage}
            desc={dishDetails?.description || "Chưa có"}
            calo={dishDetails?.calories}
            protein={dishDetails?.protein}
            fat={dishDetails?.fat}
            carb={dishDetails?.carb}
            rating={dishDetails?.stars}
            liked={dishDetails?.flagLiked}
            foodId={foodId}
          />

          <NavigationDishDetail />
        </div>

        <BasicInfo
          img={dishDetails?.listLinkImage?.[0]}
          method={dishDetails?.method}
          time={dishDetails?.time}
          type={dishDetails?.type}
          level={dishDetails?.level}
          diet={dishDetails?.diet}
          favourites={dishDetails?.numberOfLikes}
          vote={dishDetails?.stars}
          foodId={foodId}
        />

        <NutritionDetails
          img={dishDetails?.img1}
          array={dishDetails?.listIngredient || ["Chưa có"]}
          totalCalo={dishDetails?.calories}
        />

        <CookingInstructions
          first={["Chưa có"]}
          second={dishDetails.listStep || ["Chưa có"]}
          video={dishDetails?.linkVideo || "Chưa có"}
          img1={dishDetails?.img2}
          flagBloodPressure={dishDetails.flagBloodPressure}
          flagBloodGlucose={dishDetails.flagBloodGlucose}
          flagHeart={dishDetails.flagHeart}
        />

        <RecommendDish type={dishDetails.realType} />

        <UserReviews reviews={reviews} />

        <Footer />
      </div>
    </>
  );
};

export default App;
