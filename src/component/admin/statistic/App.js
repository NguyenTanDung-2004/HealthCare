import React, { useEffect, useState } from "react";
import Layout from "../Layout";
import AdminVerticalBarChart from "../../chart/AdminVerticalBarChart";
import DishList from "./DishList";
import WorkoutList from "./WorkoutList";
import InfoCard from "./InfoCard";
import AdminPieChart from "../../chart/AdminPieChart";

const App = () => {
  const [top3Food, setTop3Food] = useState([]);
  const [listFood, setListFood] = useState([]);
  const [listExercise, setListExercise] = useState([]);
  const [top3Exercise, setTop3Exercise] = useState([]);
  const [userStats, setUserStats] = useState({});

  useEffect(() => {
    const fetchFoodStats = async () => {
      try {
        const response = await fetch(
          "http://localhost:8080/food/getFoodStatistic",
          {
            method: "GET",
            headers: {
              Accept: "application/json",
            },
            credentials: "include",
          }
        );
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        const transformedData = data.map((item, index) => ({
          name: item.name,
          avatar: item.linkImage,
          score: item.numberOfLikes,
        }));
        const transformedData1 = data.map((item, index) => ({
          stt: String(index + 1).padStart(2, "0"),
          name: item.name,
          calories: item.calories,
          vote: item.vote,
          likes: item.numberOfLikes,
        }));
        setTop3Food(transformedData);
        setListFood(transformedData1);
      } catch (error) {
        console.error("Error fetching top 3 food:", error);
      }
    };

    const fetchExerciseStats = async () => {
      try {
        const response = await fetch(
          "http://localhost:8080/exercise/getExerciseStatistic",
          {
            method: "GET",
            headers: {
              Accept: "application/json",
            },
            credentials: "include",
          }
        );
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        const transformedData = data.map((item, index) => ({
          name: item.name,
          avatar: item.linkImage,
          score: item.numberOfLikes,
        }));
        const transformedData1 = data.map((item, index) => ({
          stt: String(index + 1).padStart(2, "0"),
          name: item.name,
          time: item.time,
          met: item.met,
          vote: item.vote,
          likes: item.numberOfLikes,
        }));
        setTop3Exercise(transformedData);
        setListExercise(transformedData1);
      } catch (error) {
        console.error("Error fetching top 3 exercise:", error);
      }
    };

    const fetchUserStats = async () => {
      try {
        const response = await fetch(
          "http://localhost:8080/user/getUserStatistic",
          {
            method: "GET",
            headers: {
              Accept: "application/json",
            },
            credentials: "include",
          }
        );
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setUserStats(data);
      } catch (error) {
        console.error("Error fetching user statistics:", error);
      }
    };

    fetchFoodStats();
    fetchExerciseStats();
    fetchUserStats();
  }, []);

  const calculatePercentage = (value, total) => {
    if (total === 0) return 0;
    return parseFloat(((value / total) * 100).toFixed(1));
  };

  const infoData1 = [
    {
      dataInfo: userStats.totalUsers || 0,
      urliconInfo: "/images/iconUsers.svg",
      percentageChangeInfo: -1,
      titleInfo: "số người dùng hệ thống",
    },
    {
      dataInfo: userStats.userUnder35 || 0,
      urliconInfo: "/images/youngUsers.svg",
      percentageChangeInfo: calculatePercentage(
        userStats.userUnder35,
        userStats.totalUsers
      ),
      titleInfo: "Nhỏ hơn 35 tuổi",
    },

    {
      dataInfo: userStats.userOver35 || 0,
      urliconInfo: "/images/middleUsers.svg",
      percentageChangeInfo: calculatePercentage(
        userStats.userOver35,
        userStats.totalUsers
      ),
      titleInfo: "35 - 55 tuổi",
    },
    {
      dataInfo: userStats.userOver55 || 0,
      urliconInfo: "/images/oldUsers.svg",
      percentageChangeInfo: calculatePercentage(
        userStats.userOver55,
        userStats.totalUsers
      ),
      titleInfo: "Lớn hơn 55 tuổi",
    },
  ];

  const infoData2 = [
    {
      dataInfo: userStats.userThieuCan || 0,
      urliconInfo: "/images/iconUsers.svg",
      percentageChangeInfo: calculatePercentage(
        userStats.userThieuCan,
        userStats.totalUsers
      ),
      titleInfo: "Thiếu cân: BMI < 18.5",
    },
    {
      dataInfo: userStats.userBinhThuong || 0,
      urliconInfo: "/images/youngUsers.svg",
      percentageChangeInfo: calculatePercentage(
        userStats.userBinhThuong,
        userStats.totalUsers
      ),
      titleInfo: "Bình thường: BMI 18.5 - 24.9",
    },

    {
      dataInfo: userStats.userThuaCan || 0,
      urliconInfo: "/images/middleUsers.svg",
      percentageChangeInfo: calculatePercentage(
        userStats.userThuaCan,
        userStats.totalUsers
      ),
      titleInfo: "Thừa cân: BMI 25 - 29.9",
    },
    {
      dataInfo: userStats.userBeoPhi || 0,
      urliconInfo: "/images/oldUsers.svg",
      percentageChangeInfo: calculatePercentage(
        userStats.userBeoPhi,
        userStats.totalUsers
      ),
      titleInfo: "Béo phì: BMI >= 30",
    },
  ];

  const bad = userStats.bad || 0;
  const normal = userStats.good || 0;
  const satisfied = userStats.satisfied || 0;

  const pieLabels = ["Tệ", "Bình thường", "Hài lòng"];

  return (
    <Layout>
      <div className="flex flex-col gap-4">
        <div className="flex flex-wrap justify-between gap-3">
          <div className="w-full sm:w-[580px] bg-white p-6 rounded-2xl shadow-md mb-10">
            <h1 className="text-base font-bold mb-4 text-[#202224]">
              TOP3 MÓN ĂN ĐƯỢC YÊU THÍCH
            </h1>

            <div className="w-full flex flex-wrap gap-10 justify-between items-center sm:px-4 md:px-8 lg:px-10">
              <AdminVerticalBarChart data={top3Food} unit="yêu thích" />
            </div>

            <div className="flex mt-4 justify-center items-center ">
              <span className="block w-10 h-1 bg-[#1445FE] mr-2 rounded-sm"></span>
              <span className="text-xs font-medium text-[#202224] text-opacity-80">
                Số lượt thích
              </span>
            </div>
          </div>

          <div className="w-full sm:w-[580px] bg-white p-6 rounded-2xl shadow-md mb-10">
            <h1 className="text-base font-bold mb-4 text-[#202224]">
              TOP 3 BÀI TẬP ĐƯỢC YÊU THÍCH NHẤT
            </h1>

            <div className="w-full flex flex-wrap gap-10 justify-between items-center sm:px-4 md:px-8 lg:px-10">
              <AdminVerticalBarChart data={top3Exercise} unit="yêu thích" />
            </div>

            <div className="flex mt-4 justify-center items-center">
              <span className="block w-10 h-1 bg-[#1445FE] mr-2 rounded-sm"></span>
              <span className="text-xs font-medium text-[#202224] text-opacity-80">
                Số lượt thích
              </span>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row justify-between w-full bg-white p-6 rounded-2xl shadow-md mb-10 gap-16">
          <DishList data={listFood} />
          <WorkoutList data={listExercise} />
        </div>

        <div className="flex flex-col gap-3 h-full w-full">
          <h1 className="text-base font-bold text-[#202224]">
            SỐ LƯỢNG NGƯỜI DÙNG CỦA HỆ THỐNG
          </h1>
          <div className="flex justify-between h-fit flex-wrap gap-4">
            {infoData1.map((chart) => (
              <InfoCard key={chart.titleInfo} {...chart} />
            ))}
          </div>
        </div>

        <div className="mt-6 flex flex-col gap-3 h-full w-full">
          <h1 className="text-base font-bold text-[#202224]">
            SỐ LƯỢNG NGƯỜI DÙNG THEO CHỈ SỐ BMI
          </h1>
          <div className="flex justify-between h-fit flex-wrap gap-4">
            {infoData2.map((chart) => (
              <InfoCard key={chart.titleInfo} {...chart} />
            ))}
          </div>
        </div>

        <div className="mt-6 flex flex-col gap- h-full w-full">
          <h1 className="text-base font-bold text-[#202224]">
            CHỈ SỐ HÀI LÒNG CỦA NGƯỜI DÙNG
          </h1>
          <div className="bg-white flex justify-center items-center h-fit flex-wrap gap-20 rounded-lg p-4 mb-2">
            <AdminPieChart
              bad={bad}
              normal={normal}
              satisfied={satisfied}
              labels={pieLabels}
            />

            <div className=" flex flex-col gap-3">
              <div className="flex items-center gap-2">
                <div className="w-[20px] h-[20px] bg-[#baaead] rounded-full"></div>
                <span>Tệ</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-[20px] h-[20px] bg-[#36C5E2] rounded-full"></div>
                <span>Bình thường</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-[20px] h-[20px] bg-[#9188FC] rounded-full"></div>
                <span>Hài lòng</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default App;
