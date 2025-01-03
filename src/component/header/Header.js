import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../../css/home_in/Header.css";
import LogoImg from "../../img/home_out/logo.png";
import AvatarDefault from "../../img/profile/default-avatar.png";

const Header = (props) => {
  const navigate = useNavigate();
  const [userName, setUserName] = useState("");
  const [avatar, setAvatar] = useState(AvatarDefault);
  const apiUrl = process.env.REACT_APP_API_URL;

  const checkImageExists = (url) => {
    return new Promise((resolve) => {
      const img = new Image();
      img.src = url;
      img.onload = () => resolve(true);
      img.onerror = () => resolve(false);
    });
  };

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch(`${apiUrl}/user/userInfo`, {
          method: "GET",
          headers: {
            Accept: "application/json",
          },
          credentials: "include",
        });
        if (!response.ok) {
          const text = await response.text();
          console.log(text);
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        console.log("API User Info response:", data);
        setUserName(data.firstName || "");
        const avatarUrl = data.id
          ? `${apiUrl}/UserImages/${data.id}.png`
          : null;
        if (avatarUrl) {
          const imageExists = await checkImageExists(avatarUrl);
          setAvatar(imageExists ? avatarUrl : AvatarDefault);
        } else {
          setAvatar(AvatarDefault);
        }
      } catch (err) {
        console.error("Error fetching user info:", err);
      }
    };
    fetchUserData();
  }, [apiUrl]);

  const handleAvatarClick = () => {
    navigate("/profile");
  };

  return (
    <div className="header-in">
      <div className="circle-container">
        <img className="logo" src={LogoImg} alt="Logo" />
      </div>
      <div className="sliding-text-container">
        <div className="sliding-text">
          Xin chào, {userName}. Chúc bạn tập luyện vui vẻ!
        </div>
      </div>
      <div className="header-in-right">
        <div className="circle-container notify">
          <i className="fa-regular fa-bell"></i>
          {props.notifications > 0 && (
            <span className="notification-count">{props.notifications}</span>
          )}
        </div>
        <div
          className="circle-container avatar cursor-pointer"
          onClick={handleAvatarClick}
        >
          <img className="avatar" src={avatar} alt="Avatar" />
        </div>
      </div>
    </div>
  );
};

export default Header;
