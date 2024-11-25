import React from "react";
import BloodPressureChart from "./BloodPressureChart";

const DiagnosisHistory = ({ data }) => {
  return (
    <div className="w-[766px] h-[673px] bg-white rounded-[16px] opacity-100">
      <div className="text-[#072635] font-bold p-8 text-[24px]">
        Diagnosis History
      </div>
      <div className="w-[730px] h-[300px] rounded-[12px] mx-auto">
        <BloodPressureChart data={data} />
      </div>
    </div>
  );
};

export default DiagnosisHistory;
