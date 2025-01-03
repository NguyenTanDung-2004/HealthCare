import React from "react";
import Header from "./Header";
import HomeLeft from "./HomeLeft";
import RectangleButton from "./RectangleButton";
import DivStatistic from "./DivStatistic";
import BgUrl from "../../img/home_out/bg-img.png";

const Main1 = () => {
  return (
    <div
      id="main1"
      style={{ backgroundImage: `url(${BgUrl})` }}
      className="bg-cover bg-center bg-fixed h-screen rounded-lg z-0"
    >
      <Header />
      <div className="main1-content pt-[120px] pl-[180px]">
        <HomeLeft />
        <div className="main1-btn mt-[30px] flex flex-row gap-[30px]">
          <RectangleButton name="Learn More" />
          <RectangleButton name="Get Started" />
        </div>
      </div>
      <DivStatistic feedback="100%" service="5" />
    </div>
  );
};

export default Main1;
