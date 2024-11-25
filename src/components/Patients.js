import React, { useState, useEffect } from "react";
import PatientsList from "./PatientsList";
import DiagnosisHistory from "./DiagnosisHistory";
import DiagnosticList from "./DiagnosticList";
import PatientDetails from "./PatientDetails";
import LabResult from "./LabResult";

const Patients = () => {
  const [patients, setPatients] = useState([]);
  const [activePatient, setActivePatient] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const username = "coalition";
        const password = "skills-test";
        const encodedAuth = btoa(`${username}:${password}`);

        const response = await fetch(
          "https://fedskillstest.coalitiontechnologies.workers.dev",
          {
            headers: {
              Authorization: `Basic ${encodedAuth}`,
              "Content-Type": "application/json",
            },
          }
        );

        if (!response.ok) {
          throw new Error(`Error ${response.status}: ${response.statusText}`);
        }

        const data = await response.json();
        setPatients(data);

        // Set the default active patient (e.g., Jessica Taylor)
        const defaultActivePatient = data.find(
          (patient) => patient.name === "Jessica Taylor"
        );
        if (defaultActivePatient) {
          setActivePatient(defaultActivePatient);
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPatients();
  }, []);

  const handlePatientSelect = (patient) => {
    setActivePatient(patient);
  };
  return (
    <div className="w-full max-w-[1564px] flex justify-between items-center gap-8 mt-8">
      {/* Left Column: Patients List */}
      <div>
        <PatientsList
          patients={patients}
          loading={loading}
          error={error}
          activePatient={activePatient}
          onPatientSelect={handlePatientSelect}
        />
      </div>

      {/* Middle Column: Diagnosis and Diagnostic */}
      <div>
        <DiagnosisHistory data={activePatient?.diagnosis_history} />
        <DiagnosticList data={activePatient?.diagnostic_list} />
      </div>

      {/* Right Column: Patient Details and Lab Results */}
      <div>
        <PatientDetails />
        <LabResult data={activePatient?.lab_results} />
      </div>
    </div>
  );
};

export default Patients;
