import React, { useState } from "react";
import LogoImg from "../../img/home_out/logo.png";
import "../../css/home_out/Header.css";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const [activeItem, setActiveItem] = useState("category-home");

  const handleItemClick = (id, event) => {
    event.preventDefault();
    setActiveItem(id);

    const toMain =
      id === "category-home"
        ? "main1"
        : id === "category-services"
        ? "main2"
        : "main3";
    const element = document.getElementById(toMain);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const navigate = useNavigate();

  const handleClickLogin = () => {
    navigate("/account");
  };

  return (
    <div className="header">
      <div className="container">
        <div className="header-logo">
          <img src={LogoImg} alt="" />
          <span>Health Care</span>
        </div>
        <div className="header-line"></div>
        <div className="category">
          <a
            href="#main1"
            id="category-home"
            className={` category-item home__category-item ${
              activeItem === "category-home" ? "active" : ""
            }`}
            onClick={(e) => handleItemClick("category-home", e)}
          >
            Home
          </a>
          <a
            href="#main2"
            id="category-services"
            className={`category-item home__category-item ${
              activeItem === "category-services" ? "active" : ""
            }`}
            onClick={(e) => handleItemClick("category-services", e)}
          >
            Services
          </a>
          <a
            href="#main3"
            id="category-contact"
            className={`category-item home__category-item ${
              activeItem === "category-contact" ? "active" : ""
            }`}
            onClick={(e) => handleItemClick("category-contact", e)}
          >
            Contact
          </a>
        </div>
        <div>
          <div className="btn-started" onClick={handleClickLogin}>
            <span>Get started</span>
            <i class="fa-solid fa-arrow-right"></i>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
