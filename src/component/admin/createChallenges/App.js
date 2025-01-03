import React, { useState, useEffect } from "react";
import Layout from "../Layout";
import { useNavigate } from "react-router-dom";
import WorkoutSelection from "./WorkoutSelection";
import WorkoutConfirmation from "./WorkoutConfirmation";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  const navigate = useNavigate();
  const [workouts, setWorkouts] = useState([]);
  const [selectedWorkouts, setSelectedWorkouts] = useState([]);
  const [isConfirmScreen, setIsConfirmScreen] = useState(false);
  const [workoutScores, setWorkoutScores] = useState({});
  const apiUrl = process.env.REACT_APP_API_URL;

  useEffect(() => {
    const fetchWorkouts = async () => {
      try {
        const response = await fetch(`${apiUrl}/exercise/getAllExercises`, {
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
        const data = await response.json();
        const transformedData = data.map((item, index) => ({
          id: String(index + 1).padStart(5, "0"), // display as STT
          exerciseId: item.exerciseId, // keep the exerciseId
          name: item.name,
        }));
        setWorkouts(transformedData);
      } catch (err) {
        console.error("Error fetching workouts:", err);
      }
    };
    fetchWorkouts();
  }, [apiUrl]);

  const handleClickBack = () => {
    navigate(-1);
  };

  const handleToggleWorkout = (workoutId) => {
    if (selectedWorkouts.includes(workoutId)) {
      setSelectedWorkouts(selectedWorkouts.filter((id) => id !== workoutId));
    } else {
      setSelectedWorkouts([...selectedWorkouts, workoutId]);
    }
  };

  const handleNext = () => {
    setIsConfirmScreen(true);
  };
  const handleConfirm = async () => {
    const selectedWithScore = selectedWorkouts.map((workoutId) => {
      const workout = workouts.find((item) => item.id === workoutId);
      return {
        exerciseId: workout.exerciseId,
        point: parseInt(workoutScores[workoutId] || "10", 10), // use 10 as default
      };
    });

    try {
      const response = await fetch(`${apiUrl}/challenge/createChallenges`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        credentials: "include",
        body: JSON.stringify(selectedWithScore),
      });

      if (!response.ok) {
        const text = await response.text();
        console.log(text);
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const responseData = await response.json();
      if (responseData.code === 1000) {
        toast.success("Thêm thử thách thành công!", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });

        setTimeout(() => {
          navigate("/dashboard/challenges");
        }, 1500);
      } else {
        toast.error(`Thêm thử thách thất bại! ${responseData.message}`, {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
      }
    } catch (error) {
      toast.error("Thêm thử thách thất bại!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      console.error("Error create challenge:", error);
    }
  };

  const handleScoreChange = (workoutId, score) => {
    setWorkoutScores((prevWorkoutScores) => ({
      ...prevWorkoutScores,
      [workoutId]: score,
    }));
  };
  return (
    <Layout>
      <div className="flex flex-col bg-white px-4 pt-4 min-h-screen">
        <div className="items-center mb-4 flex ">
          <button
            className="ml-6 mr-8 text-[#4F6071]"
            onClick={handleClickBack}
          >
            <i className="fa-solid fa-arrow-left "></i>
          </button>
          <h2 className="text-2xl font-semibold text-gray-800">
            {isConfirmScreen
              ? "Danh sách các bài tập vừa được chọn để thêm vào thử thách"
              : "Danh sách các bài tập của hệ thống"}
          </h2>
        </div>
        <div className="flex-1 overflow-y-auto">
          {isConfirmScreen ? (
            <WorkoutConfirmation
              selectedWorkouts={selectedWorkouts}
              workouts={workouts}
              workoutScores={workoutScores}
              handleScoreChange={handleScoreChange}
              handleConfirm={handleConfirm}
            />
          ) : (
            <WorkoutSelection
              workouts={workouts}
              selectedWorkouts={selectedWorkouts}
              onToggleWorkout={handleToggleWorkout}
              handleNext={handleNext}
            />
          )}
        </div>
        <div className="sticky bottom-0 left-0 w-full flex justify-between items-center  bg-white border-t p-4 shadow-[-2px_-2px_50px_0px_rgba(0,0,0,0.3)]">
          <span className="text-gray-500 text-sm">
            {isConfirmScreen
              ? `THÊM ${selectedWorkouts.length} THỬ THÁCH`
              : `Đã chọn ${selectedWorkouts.length} bài tập`}
          </span>
          {isConfirmScreen ? (
            <button
              onClick={handleConfirm}
              className="bg-[#1445FE] hover:bg-opacity-80 text-white rounded-md px-6 py-2"
            >
              XÁC NHẬN
            </button>
          ) : (
            <button
              onClick={handleNext}
              className="bg-[#1445FE] hover:bg-opacity-80 text-white rounded-md px-6 py-2"
            >
              Tiếp tục
            </button>
          )}
        </div>
        <ToastContainer />
      </div>
    </Layout>
  );
};

export default App;
