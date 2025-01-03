import React from "react";
import "../../css/home_out/ServiceCard.css";

const ServiceCard = (props) => {
  return (
    <div>
      <div className="card-container">
        <img src={props.image} alt="" />
        <div className="card-content">
          <span className="card-title">{props.title}</span>
          <span className="card-desc">{props.desc}</span>
        </div>
      </div>
    </div>
  );
};

export default ServiceCard;
