import React, { useState, useEffect, useRef } from "react";
import Layout from "../Layout";
import AddImageModal from "./AddImageModal";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AddExercise = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    tenBaiTap: "",
    phanLoai: "Khởi động",
    met: "",
    thoiGianSet: "",
    videoHuongDan: "",
    huyetAp: "Không",
    duongHuyet: "Không",
    timMach: "Không",
  });
  const [workoutImages, setWorkoutImages] = useState([]);
  const [newWorkoutImages, setNewWorkoutImages] = useState([]);
  const [isAddImageModalOpen, setAddImageModalOpen] = useState(false);
  const apiUrl = process.env.REACT_APP_API_URL;
  const [avatarFile, setAvatarFile] = useState(null);
  const [avatarPreview, setAvatarPreview] = useState(null);
  const [newExerciseId, setNewExerciseId] = useState(null);
  const [isSaveButtonDisabled, setIsSaveButtonDisabled] = useState(true);
  const [loading, setLoading] = useState(false);

  const handleClickBack = () => {
    navigate(-1);
  };

  const handleAddDishImages = (e) => {
    const files = Array.from(e.target.files);
    if (files.length > 3) {
      alert("Bạn chỉ có thể chọn tối đa 3 ảnh");
      return;
    }
    const newImages = files.map((file) => {
      return URL.createObjectURL(file);
    });
    setNewWorkoutImages(newImages);
  };

  const handleRemoveWorkoutImage = (image) => {
    setNewWorkoutImages((prevImages) =>
      prevImages.filter((img) => img !== image)
    );
  };

  const handleAddImageModal = () => {
    setAddImageModalOpen(true);
  };
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setAvatarFile(file);
      setAvatarPreview(URL.createObjectURL(file));
    }
  };
  const handleClearWorkoutImages = () => {
    setNewWorkoutImages([]);
  };
  const booleanOptions = ["Không", "Có"];

  const handleSubmit = async () => {
    if (isSaveButtonDisabled) {
      return;
    }
    setLoading(true);
    try {
      // 1. Call createExercise API
      const response = await fetch(`${apiUrl}/exercise/createExercise`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          name: formData.tenBaiTap,
          time: parseInt(formData.thoiGianSet, 10),
          met: parseFloat(formData.met),
          linkVideo: formData.videoHuongDan,
          type: phanLoaiOptions[formData.phanLoai],
          listHanChe: [
            formData.huyetAp === "Có" ? "Huyết áp" : "",
            formData.duongHuyet === "Có" ? "Đường huyết" : "",
            formData.timMach === "Có" ? "Tim mạch" : "",
          ].filter(Boolean),
        }),
      });

      if (!response.ok) {
        const text = await response.text();
        console.log(text);
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const responseData = await response.text();
      console.log("response info", responseData);
      setNewExerciseId(responseData);

      toast.success("Tạo bài tập thành công!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });

      // 2. Call createExerciseImages API
      if (newWorkoutImages.length > 0 || avatarFile) {
        const formDataImages = new FormData();
        formDataImages.append("id", responseData);

        // Append listImages
        if (newWorkoutImages.length > 0) {
          const filePromises = newWorkoutImages.map(async (image) => {
            const res = await fetch(image);
            const blob = await res.blob();
            const file = new File([blob], "image.png", {
              type: "image/png",
            });
            return file;
          });
          const files = await Promise.all(filePromises);

          files.forEach((file) => {
            formDataImages.append("listImages", file);
          });
        }
        // Append remove (avatar) image
        if (avatarFile) {
          formDataImages.append("remove", avatarFile);
        }
        for (const pair of formDataImages.entries()) {
          console.log(pair[0], pair[1]);
        }

        const responseImage = await fetch(
          `${apiUrl}/exercise/createExerciseImages`,
          {
            method: "POST",
            body: formDataImages,
            credentials: "include",
          }
        );

        const responseImageData = await responseImage.json();
        console.log("response image", responseImageData);
        if (responseImageData.code !== 1000) {
          toast.error(
            `Tạo hình ảnh cho bài tập thất bại! ${responseImageData.message}`,
            {
              position: "top-right",
              autoClose: 3000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
            }
          );
        }

        setWorkoutImages(newWorkoutImages);
        setNewWorkoutImages([]);
        setAvatarFile(null);
        setAvatarPreview(null);
      }

      setTimeout(() => {
        navigate(-1);
      }, 3000);
    } catch (error) {
      console.error("Error updating data:", error);
      toast.error("Tạo bài tập thất bại!", {
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
  };

  const phanLoaiOptions = {
    Mông: "ass",
    "Toàn thân": "body",
    Ngực: "chest",
    Vai: "shoulder",
    "Khởi động": "start",
  };
  const phanLoaiOptionsArray = Object.keys(phanLoaiOptions);

  useEffect(() => {
    const isFormValid =
      formData.tenBaiTap &&
      formData.met &&
      formData.thoiGianSet &&
      formData.videoHuongDan;

    setIsSaveButtonDisabled(!isFormValid);
  }, [formData]);

  const handleSaveDishImages = () => {
    setAddImageModalOpen(false);
  };

  return (
    <Layout>
      <div className="flex bg-white p-4 overflow-hidden">
        {/* Left Side - Form */}
        <div className="flex-1 pr-8 max-h-screen overflow-y-auto">
          <div className="items-center mb-8 flex ">
            <button
              className="ml-6 mr-8 text-[#4F6071]"
              onClick={handleClickBack}
            >
              <i className="fa-solid fa-arrow-left "></i>
            </button>
            <h2 className="text-2xl font-semibold text-gray-800">
              Thêm bài tập
            </h2>
          </div>
          <div className="mt-3 mb-8 flex flex-col gap-2">
            <h3 className=" text-lg font-semibold text-gray-800 mb-2">
              THÔNG TIN CƠ BẢN
            </h3>

            <div className=" flex flex-col p-4 bg-[#F4F7F9] rounded-lg ">
              <div className="mb-4">
                <label className="block text-[#9FA7B0] mb-1 text-sm font-semibold">
                  TÊN BÀI TẬP
                </label>
                <input
                  type="text"
                  name="tenBaiTap"
                  value={formData.tenBaiTap}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded px-3 py-2"
                />
              </div>
              <div className="flex gap-4 mb-4">
                <div className="flex-1">
                  <label className="block text-[#9FA7B0] mb-1 text-sm font-semibold">
                    PHÂN LOẠI
                  </label>
                  <select
                    name="phanLoai"
                    value={formData.phanLoai}
                    onChange={handleInputChange}
                    className="w-full border border-gray-300 rounded px-3 py-2"
                  >
                    {phanLoaiOptionsArray.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="flex-1">
                  <label className="block text-[#9FA7B0] mb-1 text-sm font-semibold">
                    MET
                  </label>
                  <input
                    type="text"
                    name="met"
                    value={formData.met}
                    onChange={handleInputChange}
                    className="w-full border border-gray-300 rounded px-3 py-2"
                  />
                </div>
                <div className="flex-1">
                  <label className="block text-[#9FA7B0] mb-1 text-sm font-semibold">
                    THỜI GIAN / SET
                  </label>
                  <input
                    type="text"
                    name="thoiGianSet"
                    value={formData.thoiGianSet}
                    onChange={handleInputChange}
                    className="w-full border border-gray-300 rounded px-3 py-2"
                  />
                </div>
              </div>

              <div className="mb-4">
                <label className="block text-[#FA7E7E] mb-1 text-sm font-semibold">
                  CÓ HẠN CHẾ CHO NGƯỜI BỊ CÁC BỆNH LÝ VỀ HUYẾT ÁP KHÔNG ?
                </label>
                <select
                  name="huyetAp"
                  value={formData.huyetAp}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded px-3 py-2"
                >
                  {booleanOptions.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </div>

              <div className="mb-4">
                <label className="block text-[#FA7E7E] mb-1 text-sm font-semibold">
                  CÓ HẠN CHẾ CHO NGƯỜI BỊ CÁC BỆNH LÝ VỀ ĐƯỜNG HUYẾT KHÔNG ?
                </label>
                <select
                  name="duongHuyet"
                  value={formData.duongHuyet}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded px-3 py-2"
                >
                  {booleanOptions.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </div>

              <div className="mb-4">
                <label className="block text-[#FA7E7E] mb-1 text-sm font-semibold">
                  CÓ HẠN CHẾ CHO NGƯỜI BỊ CÁC BỆNH LÝ VỀ TIM MẠCH KHÔNG ?
                </label>
                <select
                  name="timMach"
                  value={formData.timMach}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded px-3 py-2"
                >
                  {booleanOptions.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </div>

              <div className="mb-4">
                <label className="block text-[#9FA7B0] mb-1 text-sm font-semibold">
                  LINK VIDEO HƯỚNG DẪN
                </label>
                <input
                  type="text"
                  name="videoHuongDan"
                  value={formData.videoHuongDan}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded px-3 py-2"
                />
              </div>
            </div>
          </div>
          <div className="mb-8 flex flex-col gap-2">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">
              DANH SÁCH HÌNH ẢNH CỦA BÀI TẬP
            </h3>
            <div className=" flex flex-wrap gap-4 p-4 bg-[#F4F7F9] rounded-lg  justify-between">
              {newWorkoutImages.map((image, index) => (
                <div className="w-[200px]" key={index}>
                  <img
                    src={image}
                    alt={`exercise ${index + 1}`}
                    className="rounded-lg object-cover w-full h-[150px]"
                    onClick={() => handleRemoveWorkoutImage(image)}
                    style={{ cursor: "pointer" }}
                  />
                </div>
              ))}
            </div>
            <div className="text-center mt-4">
              {newWorkoutImages.length === 0 ? (
                <button
                  onClick={handleAddImageModal}
                  className="text-blue-500 hover:text-blue-700 font-semibold"
                >
                  <i className="fa-solid fa-plus mr-1"></i>
                  Thêm ảnh
                </button>
              ) : (
                <button
                  onClick={handleClearWorkoutImages}
                  className="text-red-500 hover:text-red-700 font-semibold"
                >
                  <i className="fa-solid fa-trash mr-1"></i>
                  Xóa tất cả ảnh
                </button>
              )}
            </div>
          </div>
          <div className="flex justify-center">
            <button
              onClick={handleSubmit}
              disabled={isSaveButtonDisabled || loading}
              className={`bg-[#1445FE] hover:bg-opacity-80 text-white rounded-md px-6 py-2 ${
                isSaveButtonDisabled || loading
                  ? "opacity-50 cursor-not-allowed"
                  : ""
              }`}
            >
              {loading ? (
                <i className="fas fa-spinner animate-spin"></i>
              ) : (
                "LƯU"
              )}
            </button>
          </div>
        </div>

        {/* Right Side - Image & Description */}
        <div className="w-[400px] flex-shrink-0 px-8 sticky top-0 h-screen overflow-y-auto">
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-gray-800 mb-6">
              Hình ảnh được xóa nền
            </h3>
            <div className="w-32 h-32 rounded-full bg-gray-200 mx-auto mb-2 flex items-center justify-center">
              {avatarPreview ? (
                <img
                  src={avatarPreview}
                  alt="Uploaded"
                  className="w-full h-full rounded-full object-cover"
                />
              ) : (
                <i className="fa-solid fa-person-skating text-4xl text-gray-500"></i>
              )}
            </div>

            <label
              htmlFor="imageUpload"
              className="block text-center text-blue-500 cursor-pointer"
            >
              Upload
              <input
                id="imageUpload"
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
              />
            </label>
          </div>
        </div>
      </div>
      <AddImageModal
        isOpen={isAddImageModalOpen}
        onClose={() => setAddImageModalOpen(false)}
        newDishImages={newWorkoutImages}
        handleAddDishImages={handleAddDishImages}
        handleSaveDishImages={handleSaveDishImages}
      />
      <ToastContainer />
    </Layout>
  );
};

export default AddExercise;
