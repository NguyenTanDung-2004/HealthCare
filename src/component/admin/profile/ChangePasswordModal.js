import React, { useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

const ChangePasswordModal = ({
  email,
  isOpen,
  onClose,
  currentPassword,
  newPassword,
  confirmPassword,
  onCurrentPasswordChange,
  onNewPasswordChange,
  onConfirmPasswordChange,
}) => {
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [code, setCode] = useState("");
  const [isCodeSent, setIsCodeSent] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const apiUrl = process.env.REACT_APP_API_URL;
  const navigate = useNavigate();

  const toggleCurrentPasswordVisibility = () => {
    setShowCurrentPassword(!showCurrentPassword);
  };

  const toggleNewPasswordVisibility = () => {
    setShowNewPassword(!showNewPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const handleCodeChange = (e) => {
    setCode(e.target.value);
  };

  const handleSendCode = async () => {
    setIsSaving(true);
    try {
      const responseCode = await fetch(
        `${apiUrl}/user/SendCodeUpdatePassword?email=${email}`,
        {
          method: "POST",
          credentials: "include",
        }
      );
      if (!responseCode.ok) {
        const text = await responseCode.text();
        console.log(text);
        throw new Error(`HTTP error! status: ${responseCode.status}`);
      }
      toast.success("Mã xác nhận đã được gửi đến email của bạn", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      setIsCodeSent(true);
    } catch (error) {
      toast.error("Gửi mã xác nhận thất bại, vui lòng thử lại!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    }
    setIsSaving(false);
  };

  const handleSavePassword = async () => {
    setIsSaving(true);

    if (newPassword !== confirmPassword) {
      toast.error("Mật khẩu mới và xác nhận không khớp!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      setIsSaving(false);
      return;
    }
    try {
      const response = await fetch(`${apiUrl}/user/UpdatePassword`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          email: `${email}`,
          password: newPassword,
          code: code,
        }),
      });
      if (!response.ok) {
        const text = await response.text();
        console.log(text);
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const responseData = await response.json();
      if (responseData.code === 1000) {
        toast.success("Đổi mật khẩu thành công!", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
        navigate("/home_out");
      } else {
        toast.error(`Đổi mật khẩu thất bại! ${responseData.message}`, {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
      }
    } catch (error) {
      toast.error("Đổi mật khẩu thất bại!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      console.error("Error updating user info:", error);
    }
    setIsSaving(false);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg w-[500px] shadow-xl relative">
        <div className="flex justify-between items-center mb-6">
          <div className="text-lg font-semibold  text-gray-700">
            Đổi mật khẩu
          </div>

          <button
            onClick={onClose}
            className=" text-gray-500 hover:text-gray-700 text-xl h-full"
          >
            <i className="fa-solid fa-xmark"></i>
          </button>
        </div>
        {!isCodeSent ? (
          <>
            <div className="mb-4 text-center">
              <label className="block text-gray-700 mb-1">
                Vui lòng xác nhận đổi mật khẩu, mã xác nhận sẽ được gửi đến
                email của bạn
              </label>
            </div>
            <div className="flex justify-end">
              <button
                onClick={handleSendCode}
                disabled={isSaving}
                className={`bg-[#1445FE] hover:bg-opacity-80 text-white rounded-md px-6 py-2 text-sm ${
                  isSaving ? "opacity-50 cursor-not-allowed" : ""
                }`}
              >
                Gửi mã
              </button>
            </div>
          </>
        ) : (
          <>
            <div className="mb-4">
              <label className="block text-gray-700 mb-1">
                Mật khẩu hiện tại
              </label>
              <div className="flex items-center border border-gray-300 rounded px-3 py-2">
                <input
                  type={showCurrentPassword ? "text" : "password"}
                  value={currentPassword}
                  onChange={onCurrentPasswordChange}
                  disabled={isSaving}
                  className="w-full  focus:outline-none bg-transparent"
                />
                <i
                  className={`fa-solid ${
                    showCurrentPassword ? "fa-eye" : "fa-eye-slash"
                  } text-gray-500 cursor-pointer`}
                  onClick={toggleCurrentPasswordVisibility}
                ></i>
              </div>
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 mb-1">Mật khẩu mới</label>
              <div className="flex items-center border border-gray-300 rounded px-3 py-2">
                <input
                  type={showNewPassword ? "text" : "password"}
                  value={newPassword}
                  onChange={onNewPasswordChange}
                  disabled={isSaving}
                  className="w-full  focus:outline-none bg-transparent"
                />
                <i
                  className={`fa-solid ${
                    showNewPassword ? "fa-eye" : "fa-eye-slash"
                  } text-gray-500 cursor-pointer`}
                  onClick={toggleNewPasswordVisibility}
                ></i>
              </div>
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 mb-1">
                Lặp lại mật khẩu mới
              </label>
              <div className="flex items-center border border-gray-300 rounded px-3 py-2">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  value={confirmPassword}
                  onChange={onConfirmPasswordChange}
                  disabled={isSaving}
                  className="w-full  focus:outline-none bg-transparent"
                />
                <i
                  className={`fa-solid ${
                    showConfirmPassword ? "fa-eye" : "fa-eye-slash"
                  } text-gray-500 cursor-pointer`}
                  onClick={toggleConfirmPasswordVisibility}
                ></i>
              </div>
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 mb-1">
                Nhập mã xác nhận
              </label>
              <div className="flex items-center border border-gray-300 rounded px-3 py-2">
                <input
                  type="text"
                  value={code}
                  onChange={handleCodeChange}
                  className="w-full  focus:outline-none bg-transparent"
                  disabled={isSaving}
                />
              </div>
            </div>
            <div className="flex justify-end">
              <button
                onClick={handleSavePassword}
                disabled={isSaving}
                className={`bg-[#1445FE] hover:bg-opacity-80 text-white rounded-md px-6 py-2 text-sm ${
                  isSaving ? "opacity-50 cursor-not-allowed" : ""
                }`}
              >
                {isSaving ? "Đang lưu" : "LƯU MẬT KHẨU"}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ChangePasswordModal;
