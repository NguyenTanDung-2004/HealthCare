import React, { useState, useEffect } from "react";
import Header from "../header/Header";
import NavigationBar from "../navigationBar/NavigationBar";
import Footer from "../footer/Footer";
import GeneralInfo from "./GeneralInfo";
import NutritionalInfo from "./NutritionalInfo";
import AccountInfo from "./AccountInfo";
import EditHealthModal from "./EditHealthModal";

const Profile = () => {
  const [activeTab, setActiveTab] = useState("general");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const apiUrl = process.env.REACT_APP_API_URL;

  useEffect(() => {
    const fetchUserData = async () => {
      setLoading(true);
      setError(null);
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
        setUserData(data);
      } catch (err) {
        setError(err.message);
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [apiUrl]);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };
  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <>
      <div className="px-6 md:px-[100px] pt-[30px]">
        <Header
          username={
            userData
              ? userData.lastName + " " + userData.firstName
              : "Loading..."
          }
          text="May this website help you achieve your health goals."
          notifications={10}
        />
        <NavigationBar itemClicked="Profile" />
      </div>

      <div className="mx-6 md:mx-[200px] mt-12 flex flex-col lg:flex-row  gap-12">
        <div className="flex-1 basis-full lg:basis-1/3 ">
          <AccountInfo userData={userData} />
        </div>

        {/* Phần Tab và Nội dung */}
        <div className="flex-1 basis-full lg:basis-2/3">
          <div className="flex gap-4 mb-4 w-full bg-white opacity-100 rounded-[8px] items-center">
            <button
              onClick={() => setActiveTab("general")}
              className={`px-4 py-2 rounded font-semibold ${
                activeTab === "general"
                  ? " text-[#1445FE]"
                  : " text-black hover:text-[#1445FE]"
              }`}
            >
              Tổng quát
            </button>
            <button
              onClick={() => setActiveTab("nutritional")}
              className={` py-2 rounded font-semibold ${
                activeTab === "nutritional"
                  ? " text-[#1445FE]"
                  : " text-black hover:text-[#1445FE]"
              }`}
            >
              Dinh dưỡng
            </button>

            {activeTab === "general" && (
              <button
                onClick={() => handleOpenModal()}
                className="ml-auto h-9 w-9 hover:text-[#1445FE] text-black  rounded-lg mr-"
              >
                <i className="fa-solid fa-pen"></i>
              </button>
            )}
          </div>

          {/* Nội dung hiển thị */}
          {activeTab === "general" ? (
            <GeneralInfo userData={userData} />
          ) : (
            <NutritionalInfo userData={userData} />
          )}
        </div>
      </div>

      {isModalOpen && (
        <EditHealthModal onClose={handleCloseModal} userData={userData} />
      )}

      <Footer />
    </>
  );
};

export default Profile;
