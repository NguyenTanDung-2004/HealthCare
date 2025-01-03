import React from "react";
import listNavigation from "./DataNavigation";
import "../../css/home_in/NavigationBar.css";
import { useNavigate } from "react-router-dom";

const NavigationBar = ({ itemClicked }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    document.cookie = `jwtToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
    navigate("/home_out");
  };

  const handleItemClick = (item, e) => {
    if (item.label === "Logout") {
      e.preventDefault();
      handleLogout();
    }
  };

  return (
    <div className="navigation-list">
      {listNavigation.map((item, index) => (
        <a
          href={item.link || "#"}
          key={index}
          className={`navigation-item ${
            itemClicked === item.label ? "active" : ""
          }`}
          onClick={(e) => handleItemClick(item, e)}
        >
          <i className={item.icon}></i>
          <span className="tooltip">{item.name}</span>
        </a>
      ))}
    </div>
  );
};

export default NavigationBar;
