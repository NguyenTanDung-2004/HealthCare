import React, { useEffect, useState } from "react";
import "../../css/workout/Main.css";
import Button from "./Button";
import CategoryList, { categories } from "./CategoryList"; // Import categories
import ListWorkout from "./ListWorkout";

const Main = () => {
  const [activeButton, setActiveButton] = useState("FOR YOU");
  const [allWorkoutData, setAllWorkoutData] = useState([]);
  const [workoutData, setWorkoutData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  let currentResponse = null;
  const [selectedCategory, setSelectedCategory] = useState("Tất cả");

  const transformData = (data) => {
    if (Array.isArray(data)) {
      return data.map((item) => ({
        id: item.exerciseId,
        name: item.name,
        image: item.linkImage,
        time: item.time,
        calo: item.calories,
        rating: item.stars,
        type: item.type,
      }));
    } else {
      return [];
    }
  };

  const fetchForYouData = () => {
    setLoading(true);
    setError(null);

    const url =
      "http://localhost:8080/statusFoodExcercise/getExerciseRecommendation";

    fetch(url, {
      method: "GET",
      headers: {
        Accept: "application/json",
      },
      credentials: "include",
    })
      .then((response) => {
        currentResponse = response;
        const contentType = currentResponse.headers.get("content-type");
        if (!contentType || !contentType.includes("application/json")) {
          return currentResponse.text().then((text) => {
            throw new Error("Response is not in JSON format!");
          });
        }
        return currentResponse.json();
      })
      .then((data) => {
        const transformedData = transformData(data);
        setAllWorkoutData(transformedData);
        setWorkoutData(transformedData);
      })
      .catch((err) => {
        setError(err);
        console.error("Error fetching for you workout data:", err);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const fetchAllData = () => {
    setLoading(true);
    setError(null);
    const url = "http://localhost:8080/exercise/getAllExercises";

    fetch(url, {
      method: "GET",
      headers: {
        Accept: "application/json",
      },
      credentials: "include",
    })
      .then((response) => {
        currentResponse = response;
        const contentType = currentResponse.headers.get("content-type");
        if (!contentType || !contentType.includes("application/json")) {
          return currentResponse.text().then((text) => {
            throw new Error("Response is not in JSON format!");
          });
        }
        return currentResponse.json();
      })
      .then((data) => {
        const transformedData = transformData(data);
        setAllWorkoutData(transformedData);
        setWorkoutData(transformedData);
      })
      .catch((err) => {
        setError(err);
        console.error("Error fetching all workout data:", err);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    if (category === "Tất cả") {
      setWorkoutData(allWorkoutData);
      return;
    }
    const filteredData = allWorkoutData.filter(
      (item) => item.type === categories.find((c) => c.label === category)?.type
    );
    setWorkoutData(filteredData);
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
      <div className="main-workout">
        <div className="header">
          <span className="title">BÀI TẬP</span>
        </div>

        <div className="button-filter">
          <Button
            label="DÀNH CHO BẠN"
            onClick={() => handleButtonClick("FOR YOU")}
            isActive={activeButton === "FOR YOU"}
          ></Button>

          <Button
            label="TẤT CẢ"
            onClick={() => handleButtonClick("ALL")}
            isActive={activeButton === "ALL"}
          ></Button>
        </div>

        <CategoryList onCategoryChange={handleCategoryChange} />

        {loading && <p>Loading...</p>}
        {error && <p>Error: {error.message}</p>}
        {!loading && !error && <ListWorkout data={workoutData} />}
      </div>
    </>
  );
};

export default Main;
