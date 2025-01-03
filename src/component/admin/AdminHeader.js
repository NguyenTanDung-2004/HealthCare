import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import LogoImg from "../../img/home_out/logo.png";
import AvatarDefault from "../../img/profile/default-avatar.png";

const Header = ({ className }) => {
  const navigate = useNavigate();
  const [avatar, setAvatar] = useState(AvatarDefault);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
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
        setFirstName(data.firstName || "");
        setLastName(data.lastName || "");
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
    navigate("/dashboard/profile");
  };
  return (
    <>
      <header className="flex flex-wrap gap-10 justify-between items-center py-4 px-12 w-full bg-white min-h-[80px] max-md:pl-5">
        <div className="flex gap-4 items-center">
          <img
            onClick={handleAvatarClick}
            src={LogoImg}
            alt="Health Care Logo"
            className="w-[60px]"
          />
          <span className="text-black text-xl font-bold self-center">
            Health Care
          </span>
        </div>

        <div
          className="flex items-center gap-2 cursor-pointer"
          onClick={handleAvatarClick}
        >
          {/* Placeholder cho avatar */}
          <img
            src={avatar}
            alt="Admin Avatar"
            className="w-10 h-10 rounded-full object-cover "
          />
          <div className="flex flex-col">
            <span className="text-[#404040] text-sm font-semibold">
              {`${lastName} ${firstName}`}
            </span>
            <span className="text-[#565656] text-xs font-medium">Admin</span>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
