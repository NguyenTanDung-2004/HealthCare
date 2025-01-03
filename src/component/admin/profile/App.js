import React, { useState, useEffect } from "react";
import Layout from "../Layout";
import AvatarDefault from "../../../img/profile/default-avatar.png";
import ChangePasswordModal from "./ChangePasswordModal";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  const [avatar, setAvatar] = useState(AvatarDefault);
  const [isFirstNameEditable, setIsFirstNameEditable] = useState(false);
  const [isLastNameEditable, setIsLastNameEditable] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [userId, setUserId] = useState(null);
  const [userData, setUserData] = useState({});
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [nameChange, setNameChange] = useState(false);
  const [weightChange, setWeightChange] = useState(0);
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
        setUserId(data.id);
        setUserData(data);

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

  const handleEditFirstName = () => {
    setIsFirstNameEditable(true);
  };

  const handleFirstNameBlur = () => {
    setNameChange(true);
    setIsFirstNameEditable(false);
  };

  const handleFirstNameChange = (e) => {
    setFirstName(e.target.value);
  };

  const handleEditLastName = () => {
    setIsLastNameEditable(true);
  };

  const handleLastNameBlur = () => {
    setNameChange(true);
    setIsLastNameEditable(false);
  };

  const handleLastNameChange = (e) => {
    setLastName(e.target.value);
  };

  const handleAvatarUpload = async (e) => {
    const file = e.target.files[0];
    if (file) {
      setWeightChange(1);
      const newAvatarUrl = URL.createObjectURL(file);
      setAvatar(newAvatarUrl); // Hiển thị ảnh ngay lập tức

      try {
        const formData = new FormData();
        formData.append("file", file);
        const response = await fetch(`${apiUrl}/user/uploadUserImage`, {
          method: "POST",
          body: formData,
          credentials: "include",
        });
        if (!response.ok) {
          const text = await response.text();
          console.log(text);
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const responseData = await response.json();
        if (responseData.code === 1000) {
          toast.success("Cập nhật avatar thành công!", {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
          });
          // Sau khi upload thành công, kiểm tra và set lại avatar nếu cần
          const avatarUrl = `${apiUrl}/UserImages/${userData.id}.png`;
          const imageExists = await checkImageExists(avatarUrl);
          setAvatar(imageExists ? avatarUrl : AvatarDefault);
        } else {
          toast.error(`Cập nhật avatar thất bại! ${responseData.message}`, {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
          });
        }
      } catch (error) {
        console.error("Error uploading avatar:", error);
        toast.error("Cập nhật avatar thất bại!", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
      }
    }
  };

  const handleSave = async () => {
    setWeightChange(0);
    setNameChange(false);

    try {
      const response = await fetch(`${apiUrl}/user/updateUserInfo`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          firstName: firstName,
          lastName: lastName,
          gender: userData.gender,
          dob: userData.dob,
          height: userData.height,
          weight: userData.weight,
          flagBloodPressure: userData.flagBloodPressure,
          flagHeartBeat: userData.flagHeartBeat,
          flagGluco: userData.flagGluco,
          heSoHoatDong: userData.heSoHoatDong,
        }),
      });
      if (!response.ok) {
        const text = await response.text();
        console.log(text);
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const responseData = await response.json();
      if (responseData.code === 1000) {
        toast.success("Cập nhật thông tin thành công!", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
      } else {
        toast.error(`Cập nhật thông tin thất bại! ${responseData.message}`, {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
      }
    } catch (error) {
      toast.error("Cập nhật thông tin thất bại!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      console.error("Error updating user info:", error);
    }
  };

  const handleShowPasswordModal = () => {
    setShowPasswordModal(true);
  };

  const handleHidePasswordModal = () => {
    setShowPasswordModal(false);
    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
  };

  const handleCurrentPasswordChange = (e) => {
    setCurrentPassword(e.target.value);
  };
  const handleNewPasswordChange = (e) => {
    setNewPassword(e.target.value);
  };
  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
  };

  return (
    <Layout>
      <div className="bg-white px-4 pt-4 flex flex-col items-center overflow-hidden">
        <div className="flex flex-col w-full max-w-[800px]">
          <h2 className="text-2xl font-semibold text-gray-800 text-center">
            Thông tin cá nhân
          </h2>
          <div className="p-6 bg-[#F4F7F9] rounded-lg mt-16 flex gap-[100px] justify-center">
            <div className="w-[300px] flex-shrink-0 px-8  overflow-y-auto">
              <div className="mb-8">
                <h3 className="text-lg font-semibold text-gray-700 mb-2 text-center">
                  Ảnh đại diện
                </h3>
                <div className="w-60 h-60 rounded-full bg-gray-200 mx-auto mb-6 flex items-center justify-center">
                  <img
                    src={avatar}
                    alt="Avatar"
                    className="w-full h-full rounded-full object-cover"
                  />
                </div>

                <label
                  htmlFor="avatarUpload"
                  className="block text-center text-[#1445FE] cursor-pointer"
                >
                  Upload
                  <input
                    id="avatarUpload"
                    type="file"
                    accept="image/*"
                    onChange={handleAvatarUpload}
                    className="hidden"
                  />
                </label>
              </div>
            </div>

            <div className="flex-1 px-8 max-h-screen overflow-y-auto">
              <div className="mb-4 flex items-center gap-2">
                <label className="text-gray-700 font-semibold text-base">
                  Tên:
                </label>
                {isFirstNameEditable ? (
                  <input
                    type="text"
                    value={firstName}
                    onChange={handleFirstNameChange}
                    onBlur={handleFirstNameBlur}
                    className=" border border-gray-300 rounded px-3 py-2 flex-1 focus:outline-none"
                  />
                ) : (
                  <div className="flex items-center gap-2 flex-1">
                    <span className=" text-gray-800  text-base">
                      {firstName}
                    </span>
                    <i
                      onClick={handleEditFirstName}
                      className="fa-solid fa-pen text-gray-700  cursor-pointer"
                    ></i>
                  </div>
                )}
              </div>

              <div className="mb-4 flex items-center gap-2">
                <label className="text-gray-700 font-semibold text-base">
                  Họ:
                </label>
                {isLastNameEditable ? (
                  <input
                    type="text"
                    value={lastName}
                    onChange={handleLastNameChange}
                    onBlur={handleLastNameBlur}
                    className=" border border-gray-300 rounded px-3 py-2 flex-1 focus:outline-none"
                  />
                ) : (
                  <div className="flex items-center gap-2 flex-1">
                    <span className=" text-gray-800  text-base">
                      {lastName}
                    </span>
                    <i
                      onClick={handleEditLastName}
                      className="fa-solid fa-pen text-gray-700  cursor-pointer"
                    ></i>
                  </div>
                )}
              </div>
              <div className="mb-4">
                <button
                  onClick={handleShowPasswordModal}
                  className="px-6 py-2 bg-[#C3CFFD] text-[#022094] hover:bg-opacity-80 text-xs rounded-lg font-semibold"
                >
                  Đổi mật khẩu
                </button>
              </div>
            </div>
          </div>

          <div className="flex justify-center mt-[30px]">
            <button
              onClick={handleSave}
              disabled={!nameChange}
              className={`py-2 px-4 rounded font-semibold text-white ${
                nameChange
                  ? "bg-[#1445FE] hover:bg-opacity-80"
                  : "bg-gray-400 cursor-not-allowed"
              }`}
            >
              LƯU
            </button>
          </div>
          <ChangePasswordModal
            isOpen={showPasswordModal}
            onClose={handleHidePasswordModal}
            currentPassword={currentPassword}
            newPassword={newPassword}
            confirmPassword={confirmPassword}
            onCurrentPasswordChange={handleCurrentPasswordChange}
            onNewPasswordChange={handleNewPasswordChange}
            onConfirmPasswordChange={handleConfirmPasswordChange}
            email={userData.email}
          />
        </div>

        <ToastContainer />
      </div>
    </Layout>
  );
};

export default App;
