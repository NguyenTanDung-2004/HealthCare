import React from "react";
import "../../css/home_out/RectangleButton.css";
import { useNavigate } from "react-router-dom";

const RectangleButton = (props) => {
  const navigate = useNavigate();
  const className = `btn-${props.name.replace(/\s+/g, "-").toLowerCase()}`;

  const handleClick = () => {
    if (props.name === "Get Started") {
      navigate("/account");
    }
  };

  return (
    <div className={`btn-rectangle ${className}`} onClick={handleClick}>
      <span>{props.name}</span>
      <div className="icon">
        <i className="fa-solid fa-angle-right"></i>
      </div>
    </div>
  );
};

export default RectangleButton;
