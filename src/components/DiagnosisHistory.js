import React, { useState, useEffect } from "react";
import BloodPressureChart from "./BloodPressureChart";
import HeartBPM from "../assets/HeartBPM.svg";
import respiratory from "../assets/respiratory.svg";
import temperature from "../assets/temperature.svg";
import ArrowUp from "../assets/ArrowUp.svg";
import ArrowDown from "../assets/ArrowDown.svg";

const DiagnosisHistory = ({ data }) => {
  const [activeMonth, setActiveMonth] = useState(null);
  const [filteredData, setFilteredData] = useState({});

  const [month, year] = activeMonth?.split(" ") || ["", ""];
  console.log(month);
  console.log(year);

  useEffect(() => {
    if (month && year) {
      const filtered = data?.filter(
        (item) => item.month === month && item.year == year
      );

      setFilteredData(filtered[0] || {});
    }
  }, [activeMonth]);

  const handleMonthSelect = (month) => {
    setActiveMonth(month);
  };

  console.log("filteredData++++", filteredData);

  return (
    <div className="w-[766px] h-[673px] bg-white rounded-[16px] opacity-100">
      <div className="text-[#072635] font-bold p-8 text-[24px]">
        Diagnosis History
      </div>
      <div className="w-[730px] h-[300px] rounded-[12px] mx-auto">
        <BloodPressureChart
          data={data}
          setActiveMonth={setActiveMonth}
          handleMonthSelect={handleMonthSelect}
        />
      </div>

      <div className="w-[730px] flex justify-between items-center mt-8 mb-4 mx-auto">
        <div className="w-[230px] h-[220px] bg-[#E0F3FA] rounded-xl flex flex-col p-4 items-start gap-1">
          <img src={respiratory} alt="Respiratory Rate" />
          <div className="text-sm font-extralight">Respiratory Rate</div>
          <div className="font-extrabold text-[30px]">
            {filteredData?.respiratory_rate?.value !== undefined
              ? `${filteredData?.respiratory_rate?.value} bpm`
              : "N/A"}
          </div>
          <div className="text-sm font-extralight flex gap-2 items-center">
            {filteredData?.respiratory_rate?.levels ===
              "Higher than Average" && (
              <img src={ArrowUp} alt="Arrow Up" className="w-3 h-3" />
            )}
            {filteredData?.respiratory_rate?.levels ===
              "Lower than Average" && (
              <img src={ArrowDown} alt="Arrow Down" className="w-3 h-3" />
            )}
            {filteredData?.respiratory_rate?.levels}
          </div>
        </div>
        <div className="w-[230px] h-[220px] bg-[#FFE6E9] rounded-xl flex flex-col p-4 items-start gap-1">
          <img src={temperature} alt="Temperature" />
          <div className="text-sm font-extralight">Temperature</div>
          <div className="font-extrabold text-[30px]">
            {filteredData?.temperature?.value !== undefined
              ? `${filteredData?.temperature?.value} °F`
              : "N/A"}
          </div>
          <div className="text-sm font-extralight flex gap-2 items-center">
            {filteredData?.temperature?.levels === "Higher than Average" && (
              <img src={ArrowUp} alt="Arrow Up" className="w-3 h-3" />
            )}
            {filteredData?.temperature?.levels === "Lower than Average" && (
              <img src={ArrowDown} alt="Arrow Down" className="w-3 h-3" />
            )}
            {filteredData?.temperature?.levels}
          </div>
        </div>

        <div className="w-[230px] h-[220px] bg-[#FFE6F1] rounded-xl flex flex-col p-4 items-start gap-1">
          <img src={HeartBPM} alt="Heart Rate" />
          <div className="text-sm font-extralight">Heart Rate</div>
          <div className="font-extrabold text-[30px]">
            {filteredData?.heart_rate?.value !== undefined
              ? `${filteredData?.heart_rate?.value} bpm`
              : "N/A"}
          </div>
          <div className="text-sm font-extralight flex gap-2 items-center">
            {filteredData?.heart_rate?.levels === "Higher than Average" && (
              <img src={ArrowUp} alt="Arrow Up" className="w-3 h-3" />
            )}
            {filteredData?.heart_rate?.levels === "Lower than Average" && (
              <img src={ArrowDown} alt="Arrow Down" className="w-3 h-3" />
            )}
            {filteredData?.heart_rate?.levels}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DiagnosisHistory;
