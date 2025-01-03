import React from "react";
import BodyImg from "../../img/home_in/body.png";
import "../../css/home_in/DivLeft.css";

const DivLeft = () => {
  return (
    <div className="divLeft__home">
      <span>TỔNG QUAN</span>
      <div className="container-img">
        <img src={BodyImg} alt="" />
      </div>
    </div>
  );
};

export default DivLeft;
