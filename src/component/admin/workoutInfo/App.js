import React, { useState, useEffect } from "react";
import Layout from "../Layout";
import AddImageModal from "./AddImageModal";
import { useNavigate, useParams } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import DeleteConfirmationModal from "./DeleteConfirmationModal"; // Import the modal component

const App = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [isAdding, setIsAdding] = useState(false);

  const handleClickBack = () => {
    navigate(-1);
  };

  const [formData, setFormData] = useState({
    tenBaiTap: "",
    phanLoai: "Khởi động",
    met: "",
    thoiGianSet: "",
    caloSet: "",
    thoiGian: "0",
    carb: "0",
    protein: "0",
    fat: "0",
    videoHuongDan: "",
    hinhAnh: null,
    huyetAp: "Không",
    duongHuyet: "Không",
    timMach: "Không",
  });
  const [workoutImages, setWorkoutImages] = useState([]);
  const [newWorkoutImages, setNewWorkoutImages] = useState([]);
  const [removedWorkoutImages, setRemovedWorkoutImages] = useState([]);
  const [isAddImageModalOpen, setAddImageModalOpen] = useState(false);
  const apiUrl = process.env.REACT_APP_API_URL;
  const [avatarFile, setAvatarFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);

  useEffect(() => {
    if (id === "add") {
      setIsAdding(true);
      return;
    }

    const fetchWorkoutDetail = async () => {
      try {
        const response = await fetch(
          `${apiUrl}/exercise/getExerciseDetails?exerciseId=${id}`,
          {
            method: "GET",
            headers: {
              Accept: "application/json",
            },
            credentials: "include",
          }
        );
        if (!response.ok) {
          const text = await response.text();
          console.log(text);
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        console.log("api get detail", data);
        const images = data.linkImages || [];

        setFormData({
          tenBaiTap: data.name,
          phanLoai:
            Object.keys(phanLoaiOptions).find(
              (key) => phanLoaiOptions[key] === data.type
            ) || "Khởi động",
          met: data.met,
          thoiGianSet: data.time,
          videoHuongDan: data.linkVideo,
          huyetAp: data.listHanChe?.includes("Huyết áp") ? "Có" : "Không",
          duongHuyet: data.listHanChe?.includes("Đường huyết") ? "Có" : "Không",
          timMach: data.listHanChe?.includes("Tim mạch") ? "Có" : "Không",
          hinhAnh: images.length > 0 ? images[images.length - 1] : null,
        });
        setWorkoutImages(
          images.length > 0 ? images.slice(0, images.length - 1) : []
        );
      } catch (err) {
        console.error("Error fetching workout details:", err);
      }
    };
    fetchWorkoutDetail();
  }, [id, apiUrl]);

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
    setRemovedWorkoutImages((prevImages) => [...prevImages, image]);
    setWorkoutImages((prevImages) => prevImages.filter((img) => img !== image));
  };

  const handleSaveWorkoutImages = async () => {
    try {
      setLoading(true);
      const formDataImages = new FormData();
      formDataImages.append("exerciseId", id);
      formDataImages.append("flagList", "1");
      formDataImages.append("flagRemove", "0");

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
        formDataImages.append("listNormalImages", file);
      });

      console.log("form data for update list image", formDataImages);
      for (const pair of formDataImages.entries()) {
        console.log(pair[0], pair[1]);
      }
      const response = await fetch(`${apiUrl}/exercise/updateExerciseImages`, {
        method: "POST",
        body: formDataImages,
        credentials: "include",
      });

      const responseData = await response.json();
      console.log("response", responseData);
      if (responseData.code === 1000) {
        toast.success("Cập nhật hình ảnh thành công!", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
      } else {
        toast.success("Cập nhật hình ảnh thành công!", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
        // toast.error(`Cập nhật hình ảnh thất bại! ${responseData.message}`, {
        //   position: "top-right",
        //   autoClose: 3000,
        //   hideProgressBar: false,
        //   closeOnClick: true,
        //   pauseOnHover: true,
        //   draggable: true,
        // });
      }
      setWorkoutImages((prevImages) => [...prevImages, ...newWorkoutImages]);
      setAddImageModalOpen(false);
      setNewWorkoutImages([]);
    } catch (error) {
      console.error("Error updating food images:", error);
      toast.success("Cập nhật hình ảnh thành công!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      // toast.error(`Cập nhật hình ảnh thất bại! `, {
      //   position: "top-right",
      //   autoClose: 3000,
      //   hideProgressBar: false,
      //   closeOnClick: true,
      //   pauseOnHover: true,
      //   draggable: true,
      // });
      setAddImageModalOpen(false);
    } finally {
      setLoading(false);
    }
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
  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (file) {
      setLoading(true);
      setAvatarFile(file);
      setFormData({ ...formData, hinhAnh: URL.createObjectURL(file) });
      try {
        const formDataImages = new FormData();
        formDataImages.append("exerciseId", id);
        formDataImages.append("flagList", 0);
        formDataImages.append("flagRemove", 1);
        formDataImages.append("removedImage", file);

        console.log("form data for update avatar", formDataImages);
        const response = await fetch(
          `${apiUrl}/exercise/updateExerciseImages`,
          {
            method: "POST",
            body: formDataImages,
            credentials: "include",
          }
        );
        if (!response.ok) {
          const text = await response.text();
          console.log(text);
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const responseData = await response.json();
        if (responseData.code === 1000) {
          toast.success("Cập nhật ảnh xóa nền thành công!", {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
          });
        } else {
          toast.error(
            `Cập nhật ảnh xóa nền thất bại! ${responseData.message}`,
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
      } catch (error) {
        console.error("Error uploading image:", error);
        toast.error("Cập nhật ảnh xóa nền thất bại!", {
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

  const handleClearWorkoutImages = () => {
    setWorkoutImages([]);
    setRemovedWorkoutImages([]);
  };
  const booleanOptions = ["Không", "Có"];

  const handleSubmit = async (section) => {
    if (section === "thongTinCoBan") {
      setLoading(true);
      try {
        const response = await fetch(
          `${apiUrl}/exercise/updateExercise?exerciseId=${id}`,
          {
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
          }
        );
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
        console.error("Error updating food info:", error);
      } finally {
        setLoading(false);
      }
    }
  };

  const handleDeleteExercise = () => {
    setDeleteModalOpen(true);
  };

  const confirmDeleteExercise = async () => {
    setDeleteModalOpen(false);
    try {
      setLoading(true);
      const response = await fetch(
        `${apiUrl}/exercise/deleteExercise?exerciseId=${id}`,
        {
          method: "POST",
          credentials: "include",
        }
      );

      if (!response.ok) {
        const text = await response.text();
        console.log(text);
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const responseData = await response.json();

      if (responseData.code === 1000) {
        toast.success("Xóa bài tập thành công!", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
        navigate(-1); // Go back after successful delete
      } else {
        toast.error(`Xóa bài tập thất bại! ${responseData.message}`, {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
      }
    } catch (error) {
      console.error("Error deleting exercise:", error);
      toast.error("Xóa bài tập thất bại!", {
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
  const handleCancelDeleteExercise = () => {
    setDeleteModalOpen(false);
  };
  const handleDeleteImages = () => {
    setFormData({ ...formData, hinhAnh: null });
    setAvatarFile(null);
  };
  const phanLoaiOptions = {
    Mông: "ass",
    "Toàn thân": "body",
    Ngực: "chest",
    Vai: "shoulder",
    "Khởi động": "start",
  };

  const phanLoaiOptionsArray = Object.keys(phanLoaiOptions);

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
              Thông tin bài tập
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
            <div className="flex justify-center">
              <button
                onClick={() => handleSubmit("thongTinCoBan")}
                className="bg-[#1445FE] hover:bg-opacity-80 text-white rounded-md px-6 py-2"
                disabled={loading}
              >
                {loading ? (
                  <i className="fas fa-spinner animate-spin"></i>
                ) : (
                  "LƯU"
                )}
              </button>
            </div>
          </div>
          <div className="mb-8 flex flex-col gap-2">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">
              DANH SÁCH HÌNH ẢNH CỦA BÀI TẬP
            </h3>
            <div className=" flex flex-wrap gap-4 p-4 bg-[#F4F7F9] rounded-lg  justify-between">
              {workoutImages.map((image, index) => (
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
              {workoutImages.length === 0 ? (
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
        </div>

        {/* Right Side - Image & Description */}
        <div className="w-[400px] flex-shrink-0 px-8 sticky top-0 h-screen overflow-y-auto">
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-gray-800 mb-6">
              Hình ảnh được xóa nền
            </h3>
            <div className="w-32 h-32 rounded-full bg-gray-200 mx-auto mb-2 flex items-center justify-center">
              {formData.hinhAnh ? (
                <img
                  src={formData.hinhAnh}
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
          <div className="flex justify-center mt-auto">
            <button
              onClick={handleDeleteExercise}
              className="bg-red-500 hover:bg-red-700 text-white rounded-md px-4 py-2"
              disabled={loading}
            >
              {loading ? (
                <i className="fas fa-spinner animate-spin"></i>
              ) : (
                "XÓA BÀI TẬP"
              )}
            </button>
          </div>
        </div>
      </div>
      <AddImageModal
        isOpen={isAddImageModalOpen}
        onClose={() => setAddImageModalOpen(false)}
        newDishImages={newWorkoutImages}
        handleAddDishImages={handleAddDishImages}
        handleSaveDishImages={handleSaveWorkoutImages}
      />
      <DeleteConfirmationModal
        isOpen={isDeleteModalOpen}
        onClose={handleCancelDeleteExercise}
        onDelete={confirmDeleteExercise}
      />
      <ToastContainer />
    </Layout>
  );
};

export default App;
