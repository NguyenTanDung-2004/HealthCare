import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../../css/workout/Main.css";
import Header from "../header/Header";
import NavigationBar from "../navigationBar/NavigationBar";
import Footer from "../footer/Footer";
import Card from "./Card";
import AddGoalModal from "./AddGoalModal";
import { toast } from "react-toastify";

const App = () => {
  const navigate = useNavigate();
  const [isAddActive, setIsAddActive] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [goals, setGoals] = useState([]);
  const [loading, setLoading] = useState(true); // Thêm loading state
  const [hasError500, setHasError500] = useState(false); // State để check lỗi 500
  const apiUrl = process.env.REACT_APP_API_URL;

  // Hàm tính số ngày giữa 2 ngày
  const dateDiffInDays = (date1, date2) => {
    const _MS_PER_DAY = 1000 * 60 * 60 * 24;
    const utc1 = Date.UTC(
      date1.getFullYear(),
      date1.getMonth(),
      date1.getDate()
    );
    const utc2 = Date.UTC(
      date2.getFullYear(),
      date2.getMonth(),
      date2.getDate()
    );

    return Math.floor((utc2 - utc1) / _MS_PER_DAY);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const transformData = (data) => {
    if (data && data.listUserTarget) {
      return data.listUserTarget.map((item) => {
        const startDate = new Date(item.userTargetId.start);
        const endDate = new Date(item.end);
        const today = new Date();

        const isEnded = endDate < today;
        const totalDays = dateDiffInDays(startDate, endDate) + 1;
        const daysCompleted = isEnded
          ? totalDays
          : Math.max(
              0,
              Math.min(totalDays, dateDiffInDays(startDate, today) + 1)
            );
        const percentage =
          totalDays > 0 ? Math.round((daysCompleted / totalDays) * 100) : 0;

        return {
          id: `${item.userTargetId.userId}-${
            startDate.toISOString().split("T")[0]
          }`,
          target: `${item.flagIncrease === 1 ? "+" : "-"}${item.weight}`,
          name: item.name,
          percentage: percentage,
          daysCompleted: daysCompleted,
          totalDays: totalDays,
          startDate: formatDate(startDate),
          endDate: formatDate(endDate),
          type: item.flagIncrease === 1 ? "Tăng cân" : "Giảm cân",
          status: isEnded ? "Đã kết thúc" : "Đang thực hiện",
        };
      });
    }
    return [];
  };

  const handleOpenModal = () => {
    setIsAddModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsAddModalOpen(false);
  };

  const handleCardClick = (goal) => {
    navigate(`/goals/${goal.id}`, { state: { goal } });
  };

  useEffect(() => {
    const fetchGoals = async () => {
      setLoading(true); // Set loading to true before fetch
      setHasError500(false); // Reset error 500 state
      try {
        const response = await fetch(`${apiUrl}/userTarget/getListUserTarget`, {
          method: "GET",
          headers: {
            Accept: "application/json",
          },
          credentials: "include",
        });
        if (!response.ok) {
          const text = await response.text();
          console.log(text);
          if (response.status === 500) {
            setHasError500(true);
            return;
          }
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const contentType = response.headers.get("content-type");
        if (!contentType || !contentType.includes("application/json")) {
          throw new Error("Response is not in JSON format!");
        }
        const data = await response.json();
        const transformedGoals = transformData(data);
        setGoals(transformedGoals);
        // Check if all goals are completed or the transformedGoals is empty

        setIsAddActive(
          transformedGoals.length === 0 ||
            transformedGoals.every((goal) => goal.status === "Đã kết thúc")
        );
      } catch (err) {
        console.error("Error fetching list user target:", err);
        toast.error("Lỗi khi tải mục tiêu!", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
      } finally {
        setLoading(false); // Set loading to false after fetch
      }
    };

    fetchGoals();
  }, [apiUrl]);

  const sortedGoals = [...goals].sort((a, b) => {
    if (a.status === "Đang thực hiện" && b.status !== "Đang thực hiện") {
      return -1;
    }
    if (a.status !== "Đang thực hiện" && b.status === "Đang thực hiện") {
      return 1;
    }
    return 0;
  });

  if (loading) {
    return <div className="text-center">Loading...</div>;
  }

  return (
    <div className="bg-[#F3F2F7]">
      <div className="px-6 md:px-[100px] pt-[30px]">
        <Header
          username="Phan Giang"
          text="May this website help you achieve your health goals."
          notifications={10}
        />
        <NavigationBar itemClicked="Goals" />
      </div>

      <div className="mx-6 md:mx-[200px] mt-10 flex flex-col gap-5">
        <div className="w-full flex justify-between items-center">
          <div className="flex flex-col gap-1.5 mt-5">
            <div className="text-2xl text-black font-bold">
              Mục tiêu cá nhân
            </div>
            <div className="text-base text-[#787878] font-semibold">
              Cho phép bạn đặt ra những mục tiêu sức khỏe và dinh dưỡng rõ ràng,
              cụ thể và dễ thực hiện.
            </div>
          </div>
          <button
            onClick={handleOpenModal}
            disabled={!isAddActive && !hasError500}
            className={`w-11 h-11 rounded-full text-white flex items-center justify-center shadow-[0px_4px_7px_0px_rgba(0,0,0,0.3)] ${
              isAddActive || hasError500
                ? "bg-[#1445FE] cursor-pointer"
                : "bg-[#ABABAB] cursor-not-allowed"
            }`}
          >
            <i className="fa-solid fa-plus text-xl"></i>
          </button>
        </div>

        <div className="flex flex-col gap-4">
          {sortedGoals.map((goal, index) => (
            <Card
              key={goal.id}
              target={goal.target}
              name={goal.name}
              percentage={goal.percentage}
              daysCompleted={goal.daysCompleted}
              totalDays={goal.totalDays}
              startDate={goal.startDate}
              endDate={goal.endDate}
              type={goal.type}
              status={goal.status}
              onClick={() => handleCardClick(goal)} // Truyền goal vào
            />
          ))}
        </div>
      </div>
      {isAddModalOpen && <AddGoalModal onClose={handleCloseModal} />}
      <Footer />
    </div>
  );
};

export default App;
