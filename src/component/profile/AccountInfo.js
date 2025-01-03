import React, { useState, useEffect, useRef } from "react";
import DefaultAvatar from "../../img/profile/default-avatar.png";
import ChangePasswordModal from "./ChangePasswordModal";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AccountInfo = ({ userData }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [formAccount, setFormAccount] = useState({
    lastName: "",
    firstName: "",
    email: "",
    gender: "",
    dob: "",
    avatar: "",
  });
  const apiUrl = process.env.REACT_APP_API_URL;
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const avatarInputRef = useRef(null);

  const checkImageExists = (url) => {
    return new Promise((resolve) => {
      const img = new Image();
      img.src = url;
      img.onload = () => resolve(true);
      img.onerror = () => resolve(false);
    });
  };

  useEffect(() => {
    if (userData) {
      const initialAvatar = userData.id
        ? `${apiUrl}/UserImages/${userData.id}.png`
        : null;

      const setInitialAvatar = async () => {
        if (initialAvatar) {
          const imageExists = await checkImageExists(initialAvatar);
          setFormAccount((prevFormAccount) => ({
            ...prevFormAccount,
            lastName: userData.lastName || "",
            firstName: userData.firstName || "",
            email: userData.email || "",
            gender: userData.gender || "Other",
            dob: userData.dob ? userData.dob.split("T")[0] : "",
            avatar: imageExists ? initialAvatar : DefaultAvatar,
          }));
        } else {
          setFormAccount((prevFormAccount) => ({
            ...prevFormAccount,
            lastName: userData.lastName || "",
            firstName: userData.firstName || "",
            email: userData.email || "",
            gender: "Other",
            dob: userData.dob ? userData.dob.split("T")[0] : "",
            avatar: DefaultAvatar,
          }));
        }
      };
      setInitialAvatar();
    }
  }, [userData, apiUrl]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormAccount({ ...formAccount, [name]: value });
  };

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
  };

  const handleSaveChange = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${apiUrl}/user/updateUserInfo`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          firstName: formAccount.firstName,
          lastName: formAccount.lastName,
          gender: formAccount.gender,
          dob: formAccount.dob,
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
      setIsEditing(false);
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
    } finally {
      setLoading(false);
    }
  };

  const handleAvatarClick = () => {
    if (isEditing) {
      avatarInputRef.current.click();
    }
  };

  const handleAvatarChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      setLoading(true);
      const newAvatarUrl = URL.createObjectURL(file);
      setFormAccount({ ...formAccount, avatar: newAvatarUrl });
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
          const avatarUrl = `${apiUrl}/UserImages/${userData.id}.png`;
          const imageExists = await checkImageExists(avatarUrl);
          setFormAccount((prevFormAccount) => ({
            ...prevFormAccount,
            avatar: imageExists ? avatarUrl : DefaultAvatar,
          }));
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
      } finally {
        setLoading(false);
      }
    }
  };

  // Đổi mật khẩu
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
    <div
      className="w-full max-w-md mx-auto p-6 bg-white rounded-2xl"
      style={{
        boxShadow: "2px 4px 30px 0px rgba(20, 69, 254, 0.3)",
      }}
    >
      <div className="flex flex-col items-center">
        <label className="cursor-pointer" onClick={handleAvatarClick}>
          <img
            src={formAccount.avatar ? formAccount.avatar : DefaultAvatar}
            alt="Avatar"
            className="w-[200px] h-[200px] rounded-full object-cover mb-4"
          />
          <input
            type="file"
            accept="image/*"
            onChange={handleAvatarChange}
            className="hidden"
            ref={avatarInputRef}
          />
        </label>
        <h2 className="text-lg font-semibold">
          {formAccount.lastName + " " + formAccount.firstName}
        </h2>

        {isEditing ? (
          <button
            onClick={handleSaveChange}
            disabled={loading}
            className="mt-2 w-full py-2 bg-[#1445FE] hover:bg-opacity-80 text-white rounded-lg flex items-center gap-2 text-sm justify-center"
          >
            {loading ? "Đang lưu..." : "Lưu"}
          </button>
        ) : (
          <button
            className="mt-2 w-full py-2 bg-[#1445FE] hover:bg-opacity-80 text-white rounded-lg flex items-center gap-2 text-sm justify-center"
            onClick={handleEditToggle}
          >
            <span>Chỉnh sửa</span>
            <i className="fa-solid fa-pen"></i>
          </button>
        )}
      </div>

      {/* Thông tin cơ bản */}
      <div className="mt-6">
        <h3 className="text-base font-semibold mb-4 text-black">
          Thông tin cơ bản
        </h3>

        <div className="flex flex-col">
          <div className="text-sm text-gray-600">
            <div className="mb-2 flex items-center">
              <span className="w-1/3 font-medium text-[#ABABAB]">Họ:</span>
              <input
                type="text"
                name="lastName"
                value={formAccount.lastName}
                onChange={handleInputChange}
                disabled={!isEditing}
                className={`w-2/3 bg-transparent text-[#595858] font-semibold focus:outline-none ${
                  isEditing ? "border-b-2 border-gray-300" : ""
                }`}
              />
            </div>
          </div>

          <div className="text-sm text-gray-600">
            <div className="mb-2 flex items-center">
              <span className="w-1/3 font-medium text-[#ABABAB]">Tên:</span>
              <input
                type="text"
                name="firstName"
                value={formAccount.firstName}
                onChange={handleInputChange}
                disabled={!isEditing}
                className={`w-2/3 bg-transparent text-[#595858] font-semibold focus:outline-none ${
                  isEditing ? "border-b-2 border-gray-300" : ""
                }`}
              />
            </div>
          </div>

          <div className="text-sm text-gray-600">
            <div className="mb-2 flex items-center">
              <span className="w-1/3 font-medium text-[#ABABAB]">Email:</span>
              <input
                type="text"
                name="email"
                value={formAccount.email}
                readOnly
                className={`w-2/3 bg-transparent text-[#595858] font-semibold focus:outline-none `}
              />
            </div>
          </div>

          <div className="text-sm text-gray-600">
            <div className="mb-2 flex items-center">
              <span className="w-1/3 font-medium text-[#ABABAB]">
                Giới tính:
              </span>
              <select
                name="gender"
                value={formAccount.gender}
                onChange={handleInputChange}
                disabled={!isEditing}
                className={`w-2/3 bg-transparent text-[#595858] font-semibold focus:outline-none ${
                  isEditing ? "border-b-2 border-gray-300" : ""
                }`}
              >
                <option value="Female">Female</option>
                <option value="Male">Male</option>
                <option value="Other">Other</option>
              </select>
            </div>
          </div>

          <div className="text-sm text-gray-600">
            <div className="mb-2 flex items-center">
              <span className="w-1/3 font-medium text-[#ABABAB]">
                Ngày sinh:
              </span>
              <input
                type="date"
                name="dob"
                value={formAccount.dob}
                onChange={handleInputChange}
                disabled={!isEditing}
                className={`w-2/3 bg-transparent text-[#595858] font-semibold focus:outline-none ${
                  isEditing ? "border-b-2 border-gray-300" : ""
                }`}
              />
            </div>
          </div>

          <div className="text-sm text-gray-600 mt-1">
            <div className="mb-2 flex items-center">
              <span className="w-1/3 font-medium text-[#ABABAB]">
                Mật khẩu:
              </span>
              <button
                onClick={handleShowPasswordModal}
                className="px-6 py-1 bg-[#C3CFFD] text-[#022094] hover:bg-opacity-80 text-xs rounded-lg font-semibold"
              >
                Đổi mật khẩu
              </button>
            </div>
          </div>
        </div>
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
      <ToastContainer />
    </div>
  );
};

export default AccountInfo;
