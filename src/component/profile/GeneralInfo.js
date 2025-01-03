import React, { useEffect, useState } from "react";

const GeneralInfo = ({ userData }) => {
  const [healthData, setHealthData] = useState({
    bmi: 0,
    height: 0,
    weight: 0,
    glucoseLevel: "0",
    glucoseLevel1: "0",
    bloodPressure: "0",
    bloodPressure1: "0",
    heartRate: "0",
    activityIndex: 0,
  });

  const [healthStatus, setHealthStatus] = useState({
    statusBMI: "",
    statusGluco: "",
    statusPressure: "",
    statusHeartBeat: "",
  });

  useEffect(() => {
    if (userData) {
      setHealthData({
        bmi: userData.bmi || 0,
        height: userData.height || 0,
        weight: userData.weight || 0,
        glucoseLevel: userData.gluco || "0",
        glucoseLevel1: userData.gluco1 || "0",
        bloodPressure: userData.pressure || "0",
        bloodPressure1: userData.pressure1 || "0",
        heartRate: userData.beat || "0",
        activityIndex: userData.heSoHoatDong || 0,
      });
      setHealthStatus({
        statusBMI: userData.statusBMI || "",
        statusGluco: userData.statusGluco || "",
        statusPressure: userData.statusPressure || "",
        statusHeartBeat: userData.statusHeartBeat || "",
      });
    }
  }, [userData]);

  return (
    <div className="w-full h-auto flex flex-col gap-5">
      <div className="flex flex-wrap items-center bg-white rounded-lg p-4 px-10 gap-10 justify-center lg:gap-8 md:gap-6 sm:gap-4">
        <div className="flex flex-col items-center">
          <div className="text-black font-semibold">BMI</div>
          <div className="text-4xl font-bold text-[#1445FE]">
            {parseFloat(healthData.bmi.toFixed(2))}
          </div>
        </div>

        <div className="flex-1 flex gap-20 lg:gap-16 md:gap-12 sm:gap-6 flex-wrap">
          <div className="flex items-center gap-3 sm:gap-2">
            <label className="text-[#ABABAB] font-semibold text-sm">
              Chiều cao (cm)
            </label>
            <input
              type="text"
              value={healthData.height}
              readOnly
              className="border h-9 w-24 border-gray-300 rounded px-3 py-1 text-center text-[#595858] font-semibold outline-none"
            />
          </div>

          <div className="flex items-center gap-3 sm:gap-2">
            <label className="text-[#ABABAB] font-semibold text-sm">
              Cân nặng (kg)
            </label>
            <input
              type="text"
              value={healthData.weight}
              readOnly
              className="border h-9 w-24 border-gray-300 rounded px-3 py-1 text-center text-[#595858] font-semibold outline-none"
            />
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-4">
        {/* Glucose Level */}
        <div className="flex justify-between">
          <div className="bg-white rounded-lg p-4 flex flex-col h-[140px] w-[340px]">
            <div className="text-black text-base font-semibold mb-2">
              Đường huyết (trước khi ăn)
            </div>
            <div className="text-3xl font-bold text-[#1445FE] self-center ">
              {healthData.glucoseLevel}
            </div>
            <div className="text-gray-400 text-sm self-center">mg/dl</div>
          </div>

          <div className="bg-white rounded-lg p-4 flex flex-col h-[140px] w-[340px]">
            <div className="text-black text-base font-semibold mb-2">
              Đường huyết (sau khi ăn)
            </div>
            <div className="text-3xl font-bold text-[#1445FE] self-center ">
              {healthData.glucoseLevel1}
            </div>
            <div className="text-gray-400 text-sm self-center">mg/dl</div>
          </div>
        </div>

        {/* Blood Pressure */}
        <div className="flex justify-between">
          <div className="bg-white rounded-lg p-4 flex flex-col  h-[140px] w-[340px]">
            <div className="text-black text-base font-semibold mb-2">
              Huyết áp (trước khi ăn)
            </div>
            <div className="text-3xl font-bold text-[#1445FE] self-center">
              {healthData.bloodPressure}
            </div>
            <div className="text-gray-400 text-sm self-center">mmHg</div>
          </div>

          <div className="bg-white rounded-lg p-4 flex flex-col  h-[140px] w-[340px]">
            <div className="text-black text-base font-semibold mb-2">
              Huyết áp (sau khi ăn)
            </div>
            <div className="text-3xl font-bold text-[#1445FE] self-center">
              {healthData.bloodPressure1}
            </div>
            <div className="text-gray-400 text-sm self-center">mmHg</div>
          </div>
        </div>

        <div className="flex justify-between">
          <div className="bg-white rounded-lg p-4 flex flex-col  h-[140px] w-[340px]">
            <div className="text-black text-base font-semibold mb-2">
              Nhịp tim
            </div>
            <div className="text-3xl font-bold text-[#1445FE] self-center">
              {healthData.heartRate}
            </div>
            <div className="text-gray-400 text-sm self-center">nhịp/phút</div>
          </div>

          <div className="bg-white rounded-lg p-4 flex flex-col h-[140px] w-[340px]">
            <div className="text-black text-base font-semibold">
              Hệ số hoạt động
            </div>
            <div className="flex-1 flex justify-center items-center">
              <div className="text-3xl font-bold text-[#1445FE]">
                {healthData.activityIndex}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg p-4">
        <div className="text-base font-semibold text-black">
          Tình trạng sức khỏe tổng quát
        </div>
        <div className="px-10 lg:px-8 md:px-6 sm:px-4 text-sm">
          <p className="mt-2"> • Chỉ số BMI: {healthStatus.statusBMI}</p>
          <p className="mt-2">
            • Chỉ số đường huyết: {healthStatus.statusGluco}
          </p>
          <p className="mt-2">
            • Chỉ số huyết áp: {healthStatus.statusPressure}
          </p>
          <p className="mt-2">
            • Chỉ số tim mạch: {healthStatus.statusHeartBeat}
          </p>
        </div>
      </div>
    </div>
  );
};

export default GeneralInfo;
