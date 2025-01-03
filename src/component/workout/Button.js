import React from "react";
import "../../css/workout/Button.css";
const Button = ({ label, isActive, onClick }) => {
  return (
    <button
      className={`workout-button ${isActive ? "clicked" : ""}`}
      onClick={onClick}
    >
      {label}
    </button>
  );
};

export default Button;
