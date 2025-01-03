import React from "react";
import "../../css/home_out/DivStatistic.css";

const DivStatistic = (props) => {
  return (
    <div className="home-statistic">
      <div className="div-statistic">
        <div className="item">
          <span className="data">{props.feedback}</span>
          <span className="desc">Positive Feedback</span>
        </div>
        <div className="statistic-line"></div>
        <div className="item">
          <span className="data">{props.service}</span>
          <span className="desc">Total Services</span>
        </div>
      </div>
    </div>
  );
};

export default DivStatistic;
