import React, { useState } from "react";
import Header from "../header/Header";
import NavigationBar from "../navigationBar/NavigationBar";
import Footer from "../footer/Footer";
import DailyStatistics from "./day/DailyStatistics";
import MonthlyStatistics from "./month/MonthlyStatistics";
import WeeklyStatistics from "./week/WeeklyStatistics";

const App = () => {
  const [activeView, setActiveView] = useState("daily");

  return (
    <div className="bg-[#F3F2F7]">
      <div className="px-6 md:px-[100px] pt-[30px]">
        <Header
          username="Phan Giang"
          text="May this website help you achieve your health goals."
          notifications={10}
        />
        <NavigationBar itemClicked="History" />
      </div>

      <div className="mx-6 md:mx-[200px] mt-10 flex flex-col  gap-5">
        <div className="w-full flex justify-between mt-5">
          <div className="text-2xl text-black font-bold">
            Lịch sử và thống kê
          </div>

          <div className="flex rounded-md bg-white border-[#202224] border-[1px] ">
            <button
              className={`px-4 text-base border-r-[1px] border-[#202224]  hover:text-[#1445FE] ${
                activeView === "daily"
                  ? "text-[#1445FE] font-semibold"
                  : "text-[#202224] opacity-75"
              }`}
              onClick={() => setActiveView("daily")}
            >
              Ngày
            </button>
            <button
              className={`px-4 text-base border-r-[1px] border-[#202224]  hover:text-[#1445FE] ${
                activeView === "weekly"
                  ? "text-[#1445FE] font-semibold"
                  : "text-[#202224] opacity-75"
              }`}
              onClick={() => setActiveView("weekly")}
            >
              Tuần
            </button>
            <button
              className={`px-4 text-base  hover:text-[#1445FE] ${
                activeView === "monthly"
                  ? "text-[#1445FE] font-semibold"
                  : "text-[#202224] opacity-75"
              }`}
              onClick={() => setActiveView("monthly")}
            >
              Tháng
            </button>
          </div>
        </div>

        <div>
          {activeView === "daily" && <DailyStatistics />}
          {activeView === "monthly" && <MonthlyStatistics />}
          {activeView === "weekly" && <WeeklyStatistics />}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default App;
