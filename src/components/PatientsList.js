import React from "react";
import SearchIcon from "../assets/SearchIcon.svg";
import HorizontalThreeDots from "../assets/HorizontalThreeDots.svg";

const PatientsList = ({ patients, loading, error, activePatient, onPatientSelect }) => {
  return (
    <div className="w-[367px] h-[1054px] bg-white rounded-[16px] opacity-100">
      <div className="flex justify-between items-center p-4">
        <div className="text-[24px] text-[#072635] font-bold leading-[33px] tracking-[0px]">
          Patients
        </div>
        <div>
          <img src={SearchIcon} alt="search" className="cursor-pointer" />
        </div>
      </div>

      {loading && <p className="text-center mt-4 text-gray-500">Loading...</p>}
      {error && <p className="text-center mt-4 text-red-500">Error: {error}</p>}

      <div className="p-4 overflow-y-auto max-h-[960px] patients-list">
        {!loading &&
          !error &&
          patients.map((patient) => (
            <div
              key={patient.name}
              onClick={() => onPatientSelect(patient)}
              className={`p-4 mb-2 rounded-lg cursor-pointer transition-all duration-200 ${
                activePatient && activePatient.name === patient.name
                  ? "bg-[#D8FCF7]" // Active patient background color
                  : "hover:bg-[#D8FCF7]" // Hover effect for other patients
              }`}
            >
              <div className="flex justify-between items-center">
                <div className="flex items-center justify-between gap-2">
                  <div>
                    <img
                      src={patient.profile_picture}
                      alt=""
                      className="w-[48px] h-[48px]"
                    />
                  </div>
                  <div className="text-[14px]">
                    <div className="text-[#072635] font-bold">
                      {patient.name}
                    </div>
                    <div className="text-[#707070]">
                      {patient.gender}, {patient.age}
                    </div>
                  </div>
                </div>
                <div>
                  <img src={HorizontalThreeDots} alt="dots" />
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default PatientsList;
