import React, { useState, useEffect } from "react";
import "../../css/workout_details/Clock.css";
import audioSrc from "../../img/workout_details/sound.mp3";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Clock = ({ time, exerciseId, challengeData }) => {
  const [timeLeft, setTimeLeft] = useState(time);
  const [isRunning, setIsRunning] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  const audio = new Audio(audioSrc);
  const apiUrl = process.env.REACT_APP_API_URL;
  let currentResponse = null;

  const getCookie = (name) => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(";").shift();
    return null;
  };

  const recordExercise = async () => {
    const url = challengeData
      ? `${apiUrl}/challenge/doExerciseChallenge?exerciseId=${exerciseId}`
      : `${apiUrl}/userHistory/recordExercise?exerciseId=${exerciseId}`;

    const token = getCookie("jwtToken");
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
        credentials: "include",
      });
      if (response.ok) {
        const data = await response.json();
        if (data.code === 1000) {
          toast.success(
            challengeData
              ? "Chúc mừng bạn đã thực hiện thử thách 1 lần!"
              : "Chúc mừng bạn đã tập được 1 lần!",
            {
              position: "top-right",
              autoClose: 2000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
            }
          );
        }
        console.log("Record Exercise Success!", data);
      } else {
        const text = await response.text();
        console.log(text);
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
        throw new Error(`HTTP error! status: ${response.status}`);
      }
    } catch (err) {
      console.error("Error record workout data:", err);
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

  useEffect(() => {
    let timer;
    if (isRunning && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0 && !isFinished) {
      handleFinish();
    }

    return () => clearInterval(timer);
  }, [isRunning, timeLeft, exerciseId, isFinished, challengeData]);

  const handleStartStop = () => {
    if (isRunning) {
      setIsRunning(false);
    } else {
      setIsRunning(true);
      setIsFinished(false);
    }
  };

  const handleFinish = () => {
    setIsFinished(true);
    setIsRunning(false);

    recordExercise();
    // Phát âm thanh khi kết thúc
    audio.play().catch((error) => {
      console.error("Error playing sound:", error);
    });

    // Rung qua rung lại
    const clockContainer = document.querySelector(".clock-container");
    let count = 0;

    const shakeInterval = setInterval(() => {
      clockContainer.style.transform =
        count % 2 === 0 ? "translateX(10px)" : "translateX(-10px)";
      count++;

      if (count === 6) {
        clearInterval(shakeInterval);
        clockContainer.style.transform = "translateX(0)";
        clockContainer.style.transform = "translateX(0)";
        resetClock();
      }
    }, 500);
  };

  const resetClock = () => {
    setTimeLeft(time);
    audio.pause();
    audio.currentTime = 0;
  };

  const formatTime = (seconds) => {
    const hours = String(Math.floor(seconds / 3600)).padStart(2, "0");
    const minutes = String(Math.floor((seconds % 3600) / 60)).padStart(2, "0");
    const secs = String(seconds % 60).padStart(2, "0");
    return `${hours}:${minutes}:${secs}`;
  };

  return (
    <>
      <div className="clock">
        <div className="clock-container">
          <span>{isRunning ? formatTime(timeLeft) : `${timeLeft}s`}</span>
        </div>
        <button
          onClick={handleStartStop}
          style={{
            backgroundColor: isRunning ? "#C8CAD1" : "var(--color-health-care)",
            color: isRunning ? "#9D9C9C" : "white",
            boxShadow: isRunning ? "none" : "2px 2px 4px rgba(0, 0, 0, 0.25)",
          }}
        >
          {isRunning ? "Kết thúc" : "Bắt đầu"}
        </button>
      </div>
      {/* Toast container  */}
      <ToastContainer />
    </>
  );
};

export default Clock;
