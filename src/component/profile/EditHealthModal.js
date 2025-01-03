import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const EditHealthModal = ({ onClose, userData }) => {
  const [inputMode, setInputMode] = useState("precise");
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [glucoseLevelPreciseBefore, setGlucoseLevelPreciseBefore] =
    useState("");
  const [glucoseLevelPreciseAfter, setGlucoseLevelPreciseAfter] = useState("");
  const [glucoseLevelRange, setGlucoseLevelRange] = useState("< 99");
  const [bloodPressurePreciseSystolic, setBloodPressurePreciseSystolic] =
    useState("");
  const [bloodPressurePreciseDiastolic, setBloodPressurePreciseDiastolic] =
    useState("");
  const [bloodPressureRange, setBloodPressureRange] = useState("< 99");
  const [heartRatePrecise, setHeartRatePrecise] = useState("");
  const [heartRateRange, setHeartRateRange] = useState("< 60");
  const [activityIndex, setActivityIndex] = useState("");
  const [loading, setLoading] = useState(false);
  const apiUrl = process.env.REACT_APP_API_URL;
  const [isSaveDisabled, setIsSaveDisabled] = useState(true);

  const glucoseOptions = [
    { value: "< 99", label: "< 99" },
    { value: "99 - < 125", label: "99 - < 125" },
    { value: ">= 125", label: ">= 125" },
  ];

  const bloodPressureOptions = [
    { value: "< 99", label: "< 99" },
    { value: "99 - < 129", label: "99 - < 129" },
    { value: "129 - < 139", label: "129 - < 139" },
    { value: "139 - 179", label: "139 - 179" },
    { value: "> 180", label: "> 180" },
  ];

  const heartRateOptions = [
    { value: "< 60", label: "< 60" },
    { value: "60 - < 100", label: "60 - < 100" },
    { value: ">= 100", label: ">= 100" },
  ];

  useEffect(() => {
    const isFormValid = () => {
      if (inputMode === "precise") {
        return (
          height !== "" &&
          weight !== "" &&
          glucoseLevelPreciseBefore !== "" &&
          glucoseLevelPreciseAfter !== "" &&
          bloodPressurePreciseSystolic !== "" &&
          bloodPressurePreciseDiastolic !== "" &&
          heartRatePrecise !== "" &&
          activityIndex !== ""
        );
      }
      return (
        height !== "" &&
        weight !== "" &&
        glucoseLevelRange !== "" &&
        bloodPressureRange !== "" &&
        heartRateRange !== "" &&
        activityIndex !== ""
      );
    };
    setIsSaveDisabled(!isFormValid());
  }, [
    inputMode,
    height,
    weight,
    glucoseLevelPreciseBefore,
    glucoseLevelPreciseAfter,
    glucoseLevelRange,
    bloodPressurePreciseSystolic,
    bloodPressurePreciseDiastolic,
    bloodPressureRange,
    heartRatePrecise,
    heartRateRange,
    activityIndex,
  ]);

  const handleSave = async () => {
    setLoading(true);
    let healthData = {
      height: height,
      weight: weight,
      heSoHoatDong: activityIndex,
    };
    let flagGluco = 0;
    let flagPressure = 0;
    let flagBeat = 0;

    if (inputMode === "precise") {
      try {
        const response = await fetch(`${apiUrl}/user/updateExactData`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          credentials: "include",
          body: JSON.stringify({
            firstName: userData.firstName,
            lastName: userData.lastName,
            gender: userData.gender,
            dob: userData.dob,
            height: healthData.height,
            weight: healthData.weight,
            bloodPressure: bloodPressurePreciseSystolic,
            heartBeat: heartRatePrecise,
            gluco: glucoseLevelPreciseBefore,
            bloodPressure1: bloodPressurePreciseDiastolic,
            gluco1: glucoseLevelPreciseAfter,
            heSoHoatDong: healthData.heSoHoatDong,
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
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
          });
          setTimeout(() => {
            onClose();
            window.location.reload();
          }, 1400);
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
      } finally {
        setLoading(false);
      }
    } else {
      //handle save range
      if (glucoseLevelRange === "< 99") {
        flagGluco = 1;
      } else if (glucoseLevelRange === "99 - < 125") {
        flagGluco = 2;
      } else {
        flagGluco = 3;
      }

      if (bloodPressureRange === "< 99") {
        flagPressure = 1;
      } else if (bloodPressureRange === "99 - < 129") {
        flagPressure = 2;
      } else if (bloodPressureRange === "129 - < 139") {
        flagPressure = 3;
      } else if (bloodPressureRange === "139 - 179") {
        flagPressure = 4;
      } else {
        flagPressure = 5;
      }

      if (heartRateRange === "< 60") {
        flagBeat = 1;
      } else if (heartRateRange === "60 - < 100") {
        flagBeat = 2;
      } else {
        flagBeat = 3;
      }

      healthData = {
        ...healthData,
        flagGluco: flagGluco,
        flagBloodPressure: flagPressure,
        flagHeartBeat: flagBeat,
      };

      try {
        const response = await fetch(`${apiUrl}/user/updateUserInfo`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          credentials: "include",
          body: JSON.stringify({
            firstName: userData.firstName,
            lastName: userData.lastName,
            gender: userData.gender,
            dob: userData.dob,
            height: healthData.height, // Giữ nguyên giá trị cũ
            weight: healthData.weight, // Giữ nguyên giá trị cũ
            flagBloodPressure: healthData.flagBloodPressure,
            flagHeartBeat: healthData.flagHeartBeat,
            flagGluco: healthData.flagGluco,
            heSoHoatDong: healthData.heSoHoatDong,
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
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
          });
          setTimeout(() => {
            onClose();
            window.location.reload();
          }, 1400);
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
      } finally {
        setLoading(false);
      }
    }
  };

  const handleInputChange = (e, setter, name) => {
    const value = e.target.value;
    if (name === "activityIndex") {
      if (value === "" || Number(value) > 0) {
        setter(value);
      }
    } else {
      setter(value);
    }
  };

  const handleRangeChange = (e, setter) => {
    setter(e.target.value);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg w-11/12 max-w-lg p-6 shadow-lg relative">
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-gray-700 text-center mb-4">
            Chỉnh sửa thông tin sức khỏe
          </h2>
          <div className="flex gap-4 justify-center items-center">
            <div className="flex items-center">
              <input
                type="radio"
                id="precise"
                name="inputMode"
                value="precise"
                checked={inputMode === "precise"}
                onChange={() => setInputMode("precise")}
                className="mr-2"
              />
              <label
                htmlFor="precise"
                className="text-sm font-medium text-gray-700"
              >
                Chính xác
              </label>
            </div>
            <div className="flex items-center">
              <input
                type="radio"
                id="range"
                name="inputMode"
                value="range"
                checked={inputMode === "range"}
                onChange={() => setInputMode("range")}
                className="mr-2"
              />
              <label
                htmlFor="range"
                className="text-sm font-medium text-gray-700"
              >
                Ước lượng
              </label>
            </div>
          </div>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Chiều cao (cm)
          </label>
          <input
            type="number"
            value={height}
            onChange={(e) => handleInputChange(e, setHeight)}
            className="mt-1 p-2 w-full border rounded-md shadow-sm focus:ring-[#1445FE] focus:border-[#1445FE]"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Cân nặng (kg)
          </label>
          <input
            type="number"
            value={weight}
            onChange={(e) => handleInputChange(e, setWeight)}
            className="mt-1 p-2 w-full border rounded-md shadow-sm focus:ring-[#1445FE] focus:border-[#1445FE]"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Hệ số hoạt động
          </label>
          <input
            type="number"
            value={activityIndex}
            onChange={(e) =>
              handleInputChange(e, setActivityIndex, "activityIndex")
            }
            className="mt-1 p-2 w-full border rounded-md shadow-sm focus:ring-[#1445FE] focus:border-[#1445FE]"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Đường huyết (mg/dl)
          </label>
          {inputMode === "precise" ? (
            <div className="flex gap-4">
              <input
                type="text"
                value={glucoseLevelPreciseBefore}
                placeholder="Trước khi ăn"
                onChange={(e) =>
                  handleInputChange(e, setGlucoseLevelPreciseBefore)
                }
                className="mt-1 p-2 w-full border rounded-md shadow-sm focus:ring-[#1445FE] focus:border-[#1445FE]"
              />
              <input
                type="text"
                value={glucoseLevelPreciseAfter}
                placeholder="Sau khi ăn"
                onChange={(e) =>
                  handleInputChange(e, setGlucoseLevelPreciseAfter)
                }
                className="mt-1 p-2 w-full border rounded-md shadow-sm focus:ring-[#1445FE] focus:border-[#1445FE]"
              />
            </div>
          ) : (
            <select
              value={glucoseLevelRange}
              onChange={(e) => handleRangeChange(e, setGlucoseLevelRange)}
              className="mt-1 p-2 w-full border rounded-md shadow-sm focus:ring-[#1445FE] focus:border-[#1445FE]"
            >
              {glucoseOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          )}
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Huyết áp (mmHg)
          </label>
          {inputMode === "precise" ? (
            <div className="flex gap-4">
              <input
                type="text"
                value={bloodPressurePreciseSystolic}
                placeholder="Trước khi ăn"
                onChange={(e) =>
                  handleInputChange(e, setBloodPressurePreciseSystolic)
                }
                className="mt-1 p-2 w-full border rounded-md shadow-sm focus:ring-[#1445FE] focus:border-[#1445FE]"
              />
              <input
                type="text"
                value={bloodPressurePreciseDiastolic}
                placeholder="Sau khi ăn"
                onChange={(e) =>
                  handleInputChange(e, setBloodPressurePreciseDiastolic)
                }
                className="mt-1 p-2 w-full border rounded-md shadow-sm focus:ring-[#1445FE] focus:border-[#1445FE]"
              />
            </div>
          ) : (
            <select
              value={bloodPressureRange}
              onChange={(e) => handleRangeChange(e, setBloodPressureRange)}
              className="mt-1 p-2 w-full border rounded-md shadow-sm focus:ring-[#1445FE] focus:border-[#1445FE]"
            >
              {bloodPressureOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          )}
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Nhịp tim (nhịp/phút)
          </label>
          {inputMode === "precise" ? (
            <input
              type="text"
              value={heartRatePrecise}
              onChange={(e) => handleInputChange(e, setHeartRatePrecise)}
              className="mt-1 p-2 w-full border rounded-md shadow-sm focus:ring-[#1445FE] focus:border-[#1445FE]"
            />
          ) : (
            <select
              value={heartRateRange}
              onChange={(e) => handleRangeChange(e, setHeartRateRange)}
              className="mt-1 p-2 w-full border rounded-md shadow-sm focus:ring-[#1445FE] focus:border-[#1445FE]"
            >
              {heartRateOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          )}
        </div>

        <div className="flex justify-end gap-4">
          <button
            onClick={onClose}
            className="bg-gray-300 hover:bg-gray-400 text-gray-700 font-semibold py-2 px-4 rounded"
          >
            Hủy bỏ
          </button>
          <button
            onClick={handleSave}
            disabled={isSaveDisabled || loading}
            className={`${
              isSaveDisabled || loading
                ? "bg-gray-300 cursor-not-allowed"
                : "bg-[#1445FE] hover:bg-opacity-80"
            } text-white font-semibold py-2 px-4 rounded`}
          >
            {loading ? "Đang lưu..." : "Lưu"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditHealthModal;
