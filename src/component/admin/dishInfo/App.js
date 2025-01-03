import React, { useState, useEffect } from "react";
import Layout from "../Layout";
import Table from "../../table/Table";
import AddIngredientModal from "./AddIngredientModal";
import AddImageModal from "./AddImageModal";
import DeleteConfirmationModal from "./DeleteConfirmationModal";
import DeleteFoodConfirmationModal from "./DeleteFoodConfirmationModal";
import EditIngredientModal from "./EditIngredientModal";
import { useNavigate, useParams } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const handleClickBack = () => {
    navigate(-1);
  };

  const [formData, setFormData] = useState({
    name: "",
    level: "Trung bình",
    method: "Nước uống",
    diet: "Ăn chay (trứng, sữa)",
    time: "0",
    carb: "0",
    protein: "0",
    fat: "0",
    flagBloodPressure: "Không",
    flagBloodGlucose: "Không",
    flagHeart: "Không",
    linkVideo: "https://www.youtube.com/watch?v=fG7dJ6A3l7w",
    description: "",
    hinhAnh: null,
    type: 5,
  });

  const [ingredients, setIngredients] = useState([]);
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  const [ingredientToDelete, setIngredientToDelete] = useState(null);
  const [isAddIngredientModalOpen, setAddIngredientModalOpen] = useState(false);
  const [newIngredient, setNewIngredient] = useState({
    name: "",
    weight: "",
    energy: "",
  });
  const [isAddImageModalOpen, setAddImageModalOpen] = useState(false);
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [ingredientToEdit, setIngredientToEdit] = useState(null);
  const [isDescriptionEditable, setIsDescriptionEditable] = useState(false);
  const [dishImages, setDishImages] = useState([]);
  const [newDishImages, setNewDishImages] = useState([]);
  const [steps, setSteps] = useState([]);
  const [isStepsEditable, setIsStepsEditable] = useState(false);
  const [isDeleteFoodModalOpen, setDeleteFoodModalOpen] = useState(false);

  // Các mảng options
  const types = [
    "Món chính",
    "Món phụ",
    "Món ăn vặt",
    "Món ăn sáng",
    "Đồ uống",
  ];
  const methods = [
    "Nước uống",
    "Xào",
    "Rang",
    "Nướng",
    "Canh",
    "Kho",
    "Hấp",
    "Hầm",
    "Chiên dầu",
    "Chiên không dầu",
    "Pha chế",
    "Luộc",
  ];
  const diets = [
    "Ít tinh bột",
    "Ít chất béo",
    "Nhiều đạm",
    "Thuần chay",
    "Ăn chay (trứng, sữa)",
    "Healthy",
    "Bình thường",
  ];
  const levels = ["Dễ", "Trung bình", "Khó"];
  const booleanOptions = ["Không", "Có"];
  const apiUrl = process.env.REACT_APP_API_URL;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `${apiUrl}/food/getFoodDetail?foodId=${id}`,
          {
            method: "GET",
            headers: {
              Accept: "application/json",
            },
            credentials: "include",
          }
        );
        const data = await response.json();
        console.log("API Response:", data);

        setFormData({
          name: data.name || "",
          level: data.level ? levels[data.level - 1] : "Trung bình",
          method: data.method ? methods[data.method - 1] : "Nước uống",
          diet: data.diet ? diets[data.diet - 1] : "Ăn chay (trứng, sữa)",
          time: String(data.time || "0"),
          carb: String(data.carb || "0"),
          protein: String(data.protein || "0"),
          fat: String(data.fat || "0"),
          flagBloodPressure: data.flagBloodPressure === 1 ? "Có" : "Không",
          flagBloodGlucose: data.flagBloodGlucose === 1 ? "Có" : "Không",
          flagHeart: data.flagHeart === 1 ? "Có" : "Không",
          linkVideo: data.linkVideo || "",
          description: data.description || "",
          hinhAnh: data.listLinkImage
            ? data.listLinkImage[data.listLinkImage.length - 1]
            : null,
          type: data.type || 5,
        });

        const mappedIngredients = (data.listIngredient || []).map(
          (name, index) => ({
            id: index + 1,
            name: name,
            weight: (data.listWeightIngredient || [])[index] || 0,
            energy: (data.listCaloriesIngredient || [])[index] || 0,
          })
        );
        setIngredients(mappedIngredients);
        setSteps(data.listStep || []);

        setDishImages(
          data.listLinkImage
            ? data.listLinkImage.slice(0, data.listLinkImage.length - 1)
            : []
        );
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [id]);

  const handleAddIngredient = () => {
    setIngredients([
      ...ingredients,
      { id: ingredients.length + 1, ...newIngredient },
    ]);
    setAddIngredientModalOpen(false);
    setNewIngredient({
      name: "",
      weight: "",
      energy: "",
    });
  };

  const handleDeleteConfirmation = (ingredientId) => {
    setIngredientToDelete(ingredientId);
    setDeleteModalOpen(true);
  };

  const handleEditIngredient = (ingredient) => {
    setIngredientToEdit(ingredient);
    setNewIngredient({
      name: ingredient.name,
      weight: ingredient.weight,
      energy: ingredient.energy,
    });
    setEditModalOpen(true);
  };

  const handleDelete = () => {
    setIngredients(
      ingredients.filter((ingredient) => ingredient.id !== ingredientToDelete)
    );
    setDeleteModalOpen(false);
    setIngredientToDelete(null);
  };
  const handleSaveEditIngredient = () => {
    setIngredients(
      ingredients.map((ingredient) =>
        ingredient.id === ingredientToEdit.id
          ? {
              ...ingredient,
              name: newIngredient.name,
              weight: newIngredient.weight,
              energy: newIngredient.energy,
            }
          : ingredient
      )
    );
    setEditModalOpen(false);
    setNewIngredient({ name: "", weight: "", energy: "" });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    // Allow only numbers and dots for numeric fields
    if (
      name === "time" ||
      name === "carb" ||
      name === "protein" ||
      name === "fat"
    ) {
      setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: value.replace(/[^0-9.]/g, ""), // Allow only digits and decimal point
      }));
    } else {
      setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: value,
      }));
    }
  };
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({ ...formData, hinhAnh: URL.createObjectURL(file) });
    }
  };

  const handleSubmit = async () => {
    try {
      const url = `${apiUrl}/food/updateFood?foodId=${id}`;
      // Calculate total calories
      const totalCalories = ingredients.reduce(
        (sum, item) => sum + Number(item.energy),
        0
      );

      const requestBody = JSON.stringify({
        name: formData.name,
        level: levels.indexOf(formData.level) + 1,
        method: methods.indexOf(formData.method) + 1,
        diet: diets.indexOf(formData.diet) + 1,
        calories: totalCalories, // Add the calculated total calories
        time: Number(formData.time),
        type: formData.type,
        carb: Number(formData.carb),
        protein: Number(formData.protein),
        fat: Number(formData.fat),
        description: formData.description,
        linkVideo: formData.linkVideo,
        listIngredient: ingredients.map((item) => item.name),
        listWeightIngredient: ingredients.map((item) => item.weight),
        listCaloriesIngredient: ingredients.map((item) => item.energy),
        listStep: steps,
        flagBloodPressure: formData.flagBloodPressure === "Có" ? 1 : 0,
        flagBloodGlucose: formData.flagBloodGlucose === "Có" ? 1 : 0,
        flagHeart: formData.flagHeart === "Có" ? 1 : 0,
      });

      console.log("API URL:", url);
      console.log("Request Body update info text:", requestBody);

      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        credentials: "include",
        body: requestBody,
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
      console.error("Error updating food info:", error);
    }
  };

  const handleDeleteImages = () => {
    setDishImages([]);
    setNewDishImages([]);
  };

  const handleAddDishImages = (e) => {
    const files = Array.from(e.target.files);

    if (files.length > 3) {
      toast.warn("Bạn chỉ có thể chọn tối đa 3 ảnh", {
        position: toast.POSITION.TOP_RIGHT,
      });
      return;
    }
    const newImages = files.map((file) => URL.createObjectURL(file));
    setNewDishImages(newImages);
  };

  const handleSaveDishImages = async () => {
    setDishImages([...newDishImages]);
    setAddImageModalOpen(false);
    setNewDishImages([]);

    try {
      const formDataImg = new FormData();

      if (formData.hinhAnh) {
        if (typeof formData.hinhAnh === "string") {
          const response = await fetch(formData.hinhAnh);
          const blob = await response.blob();
          const file = new File([blob], "image.jpg", { type: blob.type });
          formDataImg.append("removedImage", file);
        } else {
          formDataImg.append(
            "removedImage",
            new File([formData.hinhAnh], "image.jpg")
          );
        }
        formDataImg.append("flagRemove", "1");
      } else {
        formDataImg.append("flagRemove", "0");
      }

      if (newDishImages.length > 0) {
        formDataImg.append("flagList", "1");
        for (let i = 0; i < newDishImages.length; i++) {
          const response = await fetch(newDishImages[i]);
          const blob = await response.blob();
          const file = new File([blob], `image${i}.jpg`, { type: blob.type });
          formDataImg.append("listNormalImages", file);
        }
      } else {
        formDataImg.append("flagList", "0");
      }

      const response = await fetch(
        `${apiUrl}/food/updateFoodImage?foodId=${id}`,
        {
          method: "POST",
          credentials: "include",
          body: formDataImg,
        }
      );
      if (!response.ok) {
        const text = await response.text();
        console.log(text);
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const responseData = await response.json();
      if (responseData.code === 1000) {
        setFormData({ ...formData, hinhAnh: newDishImages[0] });
        toast.success("Cập nhật hình ảnh món ăn thành công!", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
        window.location.reload();
      } else {
        toast.error(
          `Cập nhật hình ảnh món ăn thất bại! ${responseData.message}`,
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
      console.error("Error updating food images:", error);
      toast.error("Có lỗi xảy ra khi cập nhật hình ảnh món ăn.", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    }
  };
  const handleAddIngredientModal = () => {
    setAddIngredientModalOpen(true);
    setNewIngredient({
      name: "",
      weight: "",
      energy: "",
    });
  };
  const handleAddImageModal = () => {
    setAddImageModalOpen(true);
  };

  const handleToggleDescriptionEdit = () => {
    setIsDescriptionEditable(true);
  };
  const handleDescriptionBlur = () => {
    setIsDescriptionEditable(false);
  };

  const handleToggleStepsEdit = () => {
    setIsStepsEditable(true);
  };

  const handleStepChange = (index, value) => {
    const newSteps = [...steps];
    newSteps[index] = value;
    setSteps(newSteps);
  };
  const handleAddStep = () => {
    setSteps([...steps, ""]);
  };
  const handleRemoveStep = (index) => {
    const newSteps = [...steps];
    newSteps.splice(index, 1);
    setSteps(newSteps);
  };

  const handleStepsBlur = () => {
    setIsStepsEditable(false);
  };

  const handleDeleteFood = () => {
    setDeleteFoodModalOpen(true);
  };
  const handleCancelDeleteFood = () => {
    setDeleteFoodModalOpen(false);
  };
  const confirmDeleteFood = async () => {
    setDeleteFoodModalOpen(false);
    try {
      // setLoading(true); // If you have a loading state, set it here
      const response = await fetch(`${apiUrl}/food/deleteFood?foodId=${id}`, {
        method: "POST",
        credentials: "include",
      });

      if (!response.ok) {
        const text = await response.text();
        console.log(text);
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const responseData = await response.json();
      if (responseData.code === 1000) {
        toast.success("Xóa món ăn thành công!", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
        navigate(-1);
      } else {
        toast.error(`Xóa món ăn thất bại! ${responseData.message}`, {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
      }
    } catch (error) {
      console.error("Error deleting food:", error);
      toast.error("Xóa món ăn thất bại!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    } finally {
      // setLoading(false);
    }
  };

  const columns = [
    {
      header: "Tên nguyên liệu",
      accessor: "name",
      className: "w-[20%]",
    },
    {
      header: "Trọng lượng",
      accessor: "weight",
      className: "text-center w-[20%]",
    },
    {
      header: "Năng lượng",
      accessor: "energy",
      className: "text-center w-[20%]",
    },
    { header: "", accessor: "actions", className: "text-right w-[20%]" },
  ];

  const renderRow = (item, index) => (
    <tr
      key={index}
      className="text-[#202224] text-opacity-80 text-sm border-t bg-white"
    >
      <td className="px-4 py-5">{item.name}</td>
      <td className="px-4 py-5 text-center">{item.weight}g</td>
      <td className="px-4 py-5 text-center ">{item.energy} calo</td>
      <td className="px-4 py-5 text-center flex justify-end gap-2">
        <i
          className="fa-solid fa-pen text-black cursor-pointer"
          onClick={() => handleEditIngredient(item)}
        ></i>
        <i
          className="fa-solid fa-trash text-red-500 cursor-pointer"
          onClick={() => handleDeleteConfirmation(item.id)}
        ></i>
      </td>
    </tr>
  );

  return (
    <Layout>
      <div className="flex bg-white px-4 pt-4 overflow-hidden">
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
              Thông tin món ăn
            </h2>
          </div>
          <div className="mt-3 mb-8 flex flex-col gap-2">
            <h3 className=" text-lg font-semibold text-gray-800 mb-2">
              THÔNG TIN CƠ BẢN
            </h3>

            <div className=" flex flex-col p-4 bg-[#F4F7F9] rounded-lg ">
              <div className="mb-4">
                <label className="block text-[#9FA7B0] mb-1 text-sm font-semibold">
                  TÊN MÓN ĂN
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded px-3 py-2"
                />
              </div>

              <div className="flex gap-4 mb-4">
                <div className="flex-1">
                  <label className="block text-[#9FA7B0] mb-1 text-sm font-semibold">
                    LEVEL
                  </label>
                  <select
                    name="level"
                    value={formData.level}
                    onChange={handleInputChange}
                    className="w-full border border-gray-300 rounded px-3 py-2"
                  >
                    {levels.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="flex-1">
                  <label className="block text-[#9FA7B0] mb-1 text-sm font-semibold">
                    PHƯƠNG PHÁP NẤU
                  </label>
                  <select
                    name="method"
                    value={formData.method}
                    onChange={handleInputChange}
                    className="w-full border border-gray-300 rounded px-3 py-2"
                  >
                    {methods.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="flex-1">
                  <label className="block text-[#9FA7B0] mb-1 text-sm font-semibold">
                    CHẾ ĐỘ ĂN
                  </label>
                  <select
                    name="diet"
                    value={formData.diet}
                    onChange={handleInputChange}
                    className="w-full border border-gray-300 rounded px-3 py-2"
                  >
                    {diets.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="flex gap-4 mb-4">
                <div className="flex-1">
                  <label className="block text-[#9FA7B0] mb-1 text-sm font-semibold">
                    THỜI GIAN
                  </label>
                  <div className="flex items-center border border-gray-300 rounded px-3 py-2">
                    <input
                      type="text"
                      name="time"
                      value={formData.time}
                      onChange={handleInputChange}
                      className="w-full  focus:outline-none bg-transparent"
                    />
                    <span className="ml-2 text-[#9FA7B0]">phút</span>
                  </div>
                </div>
                <div className="flex-1">
                  <label className="block text-[#9FA7B0] mb-1 text-sm font-semibold">
                    CARB
                  </label>
                  <div className="flex items-center border border-gray-300 rounded px-3 py-2">
                    <input
                      type="text"
                      name="carb"
                      value={formData.carb}
                      onChange={handleInputChange}
                      className="w-full  focus:outline-none bg-transparent"
                    />
                    <span className="ml-2 text-[#9FA7B0]">g</span>
                  </div>
                </div>
                <div className="flex-1">
                  <label className="block text-[#9FA7B0] mb-1 text-sm font-semibold">
                    PROTEIN
                  </label>
                  <div className="flex items-center border border-gray-300 rounded px-3 py-2">
                    <input
                      type="text"
                      name="protein"
                      value={formData.protein}
                      onChange={handleInputChange}
                      className="w-full  focus:outline-non bg-transparent"
                    />
                    <span className="ml-2 text-[#9FA7B0]">g</span>
                  </div>
                </div>
                <div className="flex-1">
                  <label className="block text-[#9FA7B0] mb-1 text-sm font-semibold">
                    FAT
                  </label>
                  <div className="flex items-center border border-gray-300 rounded px-3 py-2">
                    <input
                      type="text"
                      name="fat"
                      value={formData.fat}
                      onChange={handleInputChange}
                      className="w-full  focus:outline-none bg-transparent"
                    />
                    <span className="ml-2 text-[#9FA7B0]">g</span>
                  </div>
                </div>
              </div>

              <div className="mb-4">
                <label className="block text-[#FA7E7E] mb-1 text-sm font-semibold">
                  CÓ HẠN CHẾ CHO NGƯỜI BỊ CÁC BỆNH LÝ VỀ HUYẾT ÁP KHÔNG ?
                </label>
                <select
                  name="flagBloodPressure"
                  value={formData.flagBloodPressure}
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
                  name="flagBloodGlucose"
                  value={formData.flagBloodGlucose}
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
                  name="flagHeart"
                  value={formData.flagHeart}
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
                  name="linkVideo"
                  value={formData.linkVideo}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded px-3 py-2"
                />
              </div>
            </div>
          </div>

          <div className="mb-8 flex flex-col gap-2">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">
              DANH SÁCH THÀNH PHẦN
            </h3>
            <div className=" flex flex-col p-4 bg-[#F4F7F9] rounded-lg ">
              <Table
                columns={columns}
                renderRow={renderRow}
                data={ingredients}
              />
              <div className="text-center mt-4">
                <button
                  onClick={handleAddIngredientModal}
                  className="text-blue-500 hover:text-blue-700 font-semibold"
                >
                  <i className="fa-solid fa-plus mr-1"></i>
                  Thêm thành phần
                </button>
              </div>
            </div>
          </div>

          <div className="mb-8 flex flex-col gap-2">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">
              DANH SÁCH HÌNH ẢNH CỦA MÓN ĂN
            </h3>
            <div className=" flex flex-wrap gap-4 p-4 bg-[#F4F7F9] rounded-lg ">
              {dishImages.map((image, index) => (
                <div className="w-[200px]" key={index}>
                  <img
                    src={image}
                    alt={`Dish ${index + 1}`}
                    className="rounded-lg object-cover w-full h-[150px]"
                  />
                </div>
              ))}
            </div>
            <div className="text-center mt-4">
              {dishImages.length === 0 ? (
                <button
                  onClick={handleAddImageModal}
                  className="text-blue-500 hover:text-blue-700 font-semibold"
                >
                  <i className="fa-solid fa-plus mr-1"></i>
                  Thêm ảnh
                </button>
              ) : (
                <button
                  onClick={handleDeleteImages}
                  className="text-red-500 hover:text-red-700 font-semibold"
                >
                  <i className="fa-solid fa-trash mr-1"></i>
                  Xóa ảnh
                </button>
              )}
            </div>
          </div>
          <div className="mb-8 flex flex-col gap-2">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">
              CÁC BƯỚC THỰC HIỆN
            </h3>
            <div className=" flex flex-col p-4 bg-[#F4F7F9] rounded-lg ">
              {isStepsEditable ? (
                <ol className="list-decimal list-inside text-[#202224] text-opacity-80 text-sm">
                  {steps.map((step, index) => (
                    <li key={index} className="mb-2 flex items-center">
                      <input
                        type="text"
                        value={step}
                        onChange={(e) =>
                          handleStepChange(index, e.target.value)
                        }
                        className="w-[90%]  focus:outline-none bg-transparent border border-gray-300 rounded px-3 py-1 mr-2"
                      />
                      <button
                        onClick={() => handleRemoveStep(index)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <i className="fa-solid fa-trash"></i>
                      </button>
                    </li>
                  ))}
                  <button
                    onClick={handleAddStep}
                    className="text-blue-500 hover:text-blue-700 mt-2 font-semibold"
                  >
                    <i className="fa-solid fa-plus mr-1"></i>
                    Thêm bước
                  </button>
                </ol>
              ) : (
                <ol className="list-decimal list-inside text-[#202224] text-opacity-80 text-sm">
                  {steps.map((step, index) => (
                    <li key={index} className="mb-2">
                      {step}
                    </li>
                  ))}
                </ol>
              )}
            </div>
            <div className="text-right mt-2">
              {isStepsEditable ? (
                <button
                  onClick={handleStepsBlur}
                  className="text-green-500 hover:text-green-700 font-semibold"
                >
                  Lưu bước
                </button>
              ) : (
                <i
                  onClick={handleToggleStepsEdit}
                  className="fa-solid fa-pen text-black cursor-pointer"
                ></i>
              )}
            </div>
          </div>
          <div className="flex justify-center">
            <button
              onClick={handleSubmit}
              className="bg-[#1445FE] hover:bg-opacity-80 text-white rounded-md px-6 py-2"
            >
              LƯU
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
              {formData.hinhAnh ? (
                <img
                  src={formData.hinhAnh}
                  alt="Uploaded"
                  className="w-full h-full rounded-full object-cover"
                />
              ) : (
                <i className="fa-solid fa-bowl-food text-4xl text-gray-500"></i>
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

          <div className="mb-8">
            <div className="flex justify-between mb-4">
              <h3 className="text-base font-semibold text-gray-800 ">
                GIỚI THIỆU MÓN ĂN
              </h3>
              <i
                onClick={handleToggleDescriptionEdit}
                className="fa-solid fa-pen text-black cursor-pointer"
              ></i>
            </div>
            {isDescriptionEditable ? (
              <textarea
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                onBlur={handleDescriptionBlur}
                className="w-full h-[150px] bg-gray-100 rounded p-3 text-[#9FA7B0] border border-gray-200 focus:border-[#1445FE] focus:outline-none "
              />
            ) : (
              <div className="bg-gray-100 rounded p-3 text-[#9FA7B0]">
                {formData.description}
              </div>
            )}
          </div>
          <div className="flex justify-center">
            <button
              onClick={handleSaveDishImages}
              className="bg-[#1445FE] hover:bg-opacity-60  text-white rounded-md px-4 py-2 min-w-[150px]"
            >
              LƯU ẢNH
            </button>
          </div>

          <div className="flex justify-center mt-4">
            <button
              onClick={handleDeleteFood}
              className="bg-red-500 hover:bg-red-700 text-white rounded-md px-4 py-2 min-w-[150px]"
            >
              XÓA MÓN ĂN
            </button>
          </div>
        </div>

        <ToastContainer />
      </div>
      {/* Modal */}

      <AddIngredientModal
        isOpen={isAddIngredientModalOpen}
        onClose={() => setAddIngredientModalOpen(false)}
        newIngredient={newIngredient}
        setNewIngredient={setNewIngredient}
        onAddIngredient={handleAddIngredient}
      />

      <AddImageModal
        isOpen={isAddImageModalOpen}
        onClose={() => setAddImageModalOpen(false)}
        newDishImages={newDishImages}
        handleAddDishImages={handleAddDishImages}
        handleSaveDishImages={handleSaveDishImages}
      />
      <DeleteConfirmationModal
        isOpen={isDeleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        onDelete={handleDelete}
      />
      <EditIngredientModal
        isOpen={isEditModalOpen}
        onClose={() => setEditModalOpen(false)}
        newIngredient={newIngredient}
        setNewIngredient={setNewIngredient}
        onSaveEditIngredient={handleSaveEditIngredient}
      />

      <DeleteFoodConfirmationModal
        isOpen={isDeleteFoodModalOpen}
        onClose={handleCancelDeleteFood}
        onDelete={confirmDeleteFood}
      />
    </Layout>
  );
};

export default App;
