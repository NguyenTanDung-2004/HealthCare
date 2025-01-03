import React from "react";
import "../../css/nutritional_regimen/Button.css";
const Button = ({ label, isActive, onClick }) => {
  return (
    <button
      className={`custom-button ${isActive ? "clicked" : ""}`}
      onClick={onClick}
    >
      {label}
    </button>
  );
};

export default Button;
