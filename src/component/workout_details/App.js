import React, { useEffect, useState } from "react";
import "../../css/workout_details/App.css";
import Header from "../header/Header";
import NavigationBar from "../navigationBar/NavigationBar";
import Footer from "../footer/Footer";
import { useLocation } from "react-router-dom";
import Left from "./Left";
import Right from "./Right";

const App = () => {
  const { pathname, state } = useLocation();
  const challengeData = state?.challengeData;
  const [exerciseDetails, setExerciseDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const exerciseId = pathname.split("/").pop();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  const apiUrl = process.env.REACT_APP_API_URL;
  useEffect(() => {
    const fetchExerciseDetails = async () => {
      setLoading(true);
      setError(null);
      try {
        const url = `${apiUrl}/exercise/getExerciseDetails?exerciseId=${exerciseId}`;
        const response = await fetch(url, {
          method: "GET",
          headers: {
            Accept: "application/json",
          },
          credentials: "include",
        });
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const contentType = response.headers.get("content-type");
        if (!contentType || !contentType.includes("application/json")) {
          await response.text().then((text) => {
            throw new Error("Response is not in JSON format!");
          });
        }
        const data = await response.json();
        let lastImage = null;
        let remainingImages = [];
        if (data?.linkImages && data.linkImages.length > 0) {
          lastImage = data.linkImages.pop();
          remainingImages = data.linkImages;
        }
        setExerciseDetails({ ...data, lastImage, remainingImages });
      } catch (err) {
        setError(err);
        console.error("Error fetching exercise details:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchExerciseDetails();
  }, [pathname, apiUrl, exerciseId]);

  if (loading) return <p>Loading workout details...</p>;
  if (error) return <p>Error: {error.message}</p>;
  if (!exerciseDetails) return null;

  const transformRelatedExercises = (listRelatedExercises) => {
    if (Array.isArray(listRelatedExercises)) {
      return listRelatedExercises.map((item) => ({
        id: item.exerciseId,
        name: item.name,
        image: item.linkImage,
        time: item.time,
        calo: item.calories,
        rating: item.stars,
      }));
    } else {
      console.log("Data is not an array:", listRelatedExercises);
      return [];
    }
  };

  return (
    <>
      <div className="workout-details">
        <Header
          username="Phan Giang"
          text="May this website help you achieve your health goals."
          notifications={10}
        ></Header>

        <NavigationBar itemClicked="Workout"></NavigationBar>
      </div>

      <div className="workout-details__main">
        <Left
          image={exerciseDetails?.lastImage}
          exerciseId={exerciseId}
          vote={exerciseDetails?.stars}
        />
        <Right
          exerciseId={exerciseId}
          type={exerciseDetails?.type}
          name={exerciseDetails?.name}
          rating={exerciseDetails?.stars}
          liked={exerciseDetails?.flagLiked}
          images={exerciseDetails?.remainingImages}
          met={exerciseDetails?.met}
          time={exerciseDetails?.time}
          calo={exerciseDetails?.calories}
          limitation={exerciseDetails?.listHanChe || "Không có"}
          link={exerciseDetails?.linkVideo}
          recommend={transformRelatedExercises(
            exerciseDetails?.listRelatedExercises
          )}
          challengeData={challengeData}
        />
      </div>

      <Footer></Footer>
    </>
  );
};

export default App;
