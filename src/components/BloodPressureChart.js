import React, { useState, useMemo, useEffect } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import ArrowUp from "../assets/ArrowUp.svg";
import ArrowDown from "../assets/ArrowDown.svg";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const BloodPressureChart = ({ data, setActiveMonth, handleMonthSelect }) => {
  const [timeRange, setTimeRange] = useState("Last 6 months");
  const [hoveredData, setHoveredData] = useState({
    systolic: null,
    diastolic: null,
    month: null,
  });

  const [prevHoveredData, setPrevHoveredData] = useState(hoveredData);

  // Move setActiveMonth inside useEffect to avoid infinite updates
  useEffect(() => {
    if (hoveredData.month && hoveredData.month !== prevHoveredData.month) {
      setActiveMonth(hoveredData.month);
      setPrevHoveredData(hoveredData); // Update the prevHoveredData after the change
    }
  }, [hoveredData.month, prevHoveredData.month, setActiveMonth]);

  // Helper function to filter data based on the selected range
  const filterDataByRange = (range) => {
    const currentDate = new Date();
    const filteredData = data?.filter((item) => {
      const itemDate = new Date(`${item.month} 1, ${item.year}`);
      const diffInMonths =
        (currentDate.getFullYear() - itemDate.getFullYear()) * 12 +
        currentDate.getMonth() -
        itemDate.getMonth();

      switch (range) {
        case "Last 6 months":
          return diffInMonths <= 6;
        case "Last 12 months":
          return diffInMonths <= 12;
        case "Last 18 months":
          return diffInMonths <= 18;
        case "All Time":
          return true;
        default:
          return true;
      }
    });
    return filteredData;
  };

  // Filtered data based on selected time range
  const filteredData = useMemo(
    () => filterDataByRange(timeRange),
    [data, timeRange]
  );

  // Format month names as abbreviations
  const formatMonth = (month, year) => {
    const date = new Date(`${month} 1, ${year}`);
    return new Intl.DateTimeFormat("en", { month: "short" }).format(date) + ",";
  };

  // Get the latest systolic and diastolic values by default
  const latestData = filteredData?.[filteredData?.length - 1];
  const latestSystolic = hoveredData.systolic
    ? hoveredData.systolic
    : latestData?.blood_pressure?.systolic?.value || "N/A";
  const latestDiastolic = hoveredData.diastolic
    ? hoveredData.diastolic
    : latestData?.blood_pressure?.diastolic?.value || "N/A";

  const averageSystolic =
    filteredData?.reduce(
      (acc, item) => acc + item.blood_pressure.systolic.value,
      0
    ) / filteredData?.length;
  const averageDiastolic =
    filteredData?.reduce(
      (acc, item) => acc + item.blood_pressure.diastolic.value,
      0
    ) / filteredData?.length;

  const getSystolicStatus = () => {
    if (latestSystolic > averageSystolic) {
      return "Higher than Average";
    } else if (latestSystolic < averageSystolic) {
      return "Lower than Average";
    } else {
      return "Normal";
    }
  };

  const getDiastolicStatus = () => {
    if (latestDiastolic > averageDiastolic) {
      return "Higher than Average";
    } else if (latestDiastolic < averageDiastolic) {
      return "Lower than Average";
    } else {
      return "Normal";
    }
  };

  // Chart data
  const chartData = {
    labels: filteredData?.map(
      (item) => `${formatMonth(item.month, item.year)} ${item.year}`
    ),
    datasets: [
      {
        label: "Systolic",
        data: filteredData?.map((item) => item.blood_pressure.systolic.value),
        borderColor: "#D946EF",
        backgroundColor: "rgba(217, 70, 239, 0.2)",
        fill: true,
        tension: 0.4,
        borderWidth: 2,
        pointBackgroundColor: "#D946EF",
      },
      {
        label: "Diastolic",
        data: filteredData?.map((item) => item.blood_pressure.diastolic.value),
        borderColor: "#A855F7",
        backgroundColor: "rgba(168, 85, 247, 0.2)",
        fill: true,
        tension: 0.4,
        borderWidth: 2,
        pointBackgroundColor: "#A855F7",
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false, // Hide the legend
      },
      tooltip: {
        mode: "index",
        intersect: false,
      },
    },
    scales: {
      x: {
        beginAtZero: true,
      },
      y: {
        beginAtZero: true,
        min: 60,
        max: 200,
      },
    },
    onHover: (e, chartElement) => {
      if (chartElement?.length > 0) {
        const index = chartElement[0].index;
        const hoveredItem = filteredData[index];
        // Only update if the data is different from the current state

        const newMonthYear = `${hoveredItem.month} ${hoveredItem.year}`;
        if (
          hoveredItem.blood_pressure.systolic.value !== hoveredData.systolic ||
          hoveredItem.blood_pressure.diastolic.value !==
            hoveredData.diastolic ||
          newMonthYear !== hoveredData.month
        ) {
          setHoveredData({
            systolic: hoveredItem.blood_pressure.systolic.value,
            diastolic: hoveredItem.blood_pressure.diastolic.value,
            month: newMonthYear,
          });
          handleMonthSelect(newMonthYear);
        }
      }
    },
  };

  return (
    <div className="w-full h-auto p-6 bg-[#F4F0FE] rounded-lg shadow-md flex flex-col lg:flex-row justify-between">
      <div className="lg:w-[400px] mb-4 flex flex-col justify-between items-center lg:items-start">
        <div className="flex items-center justify-between gap-2 w-full">
          <h2 className="text-xl font-semibold text-[#072635]">
            Blood Pressure
          </h2>
          <select
            className="border rounded-md px-2 py-1 text-sm"
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
          >
            <option>Last 6 months</option>
            <option>Last 12 months</option>
            <option>Last 18 months</option>
            <option>All Time</option>
          </select>
        </div>

        <div className="w-full mt-4">
          <Line data={chartData} options={options} />
        </div>
      </div>

      {/* Info cards on the right side */}
      <div className="lg:w-[200px] flex flex-col justify-start mt-4 lg:mt-0">
        <div className="p-4 rounded-lg shadow-sm mb-4 flex flex-col items-start gap-2">
          <div className="text-sm flex items-center gap-2">
            <span className="w-[14px] h-[14px] bg-[#E66FD2] border border-white rounded-full inline-block"></span>
            Systolic
          </div>
          <div className="text-lg font-semibold ">
            {hoveredData.systolic || latestSystolic}
          </div>

          <div
            className={`text-xs px-2 py-0.5 flex items-center gap-2 rounded ${
              getSystolicStatus() === "Higher than Average"
                ? "bg-red-100 text-red-800"
                : getSystolicStatus() === "Lower than Average"
                ? "bg-green-100 text-green-800"
                : "bg-yellow-100 text-yellow-800"
            }`}
          >
            <div>
              {getSystolicStatus() === "Higher than Average" ? (
                <img src={ArrowUp} alt="" />
              ) : getSystolicStatus() === "Lower than Average" ? (
                <img src={ArrowDown} alt="" />
              ) : (
                ""
              )}
            </div>
            <div>{getSystolicStatus()}</div>
          </div>
        </div>

        <div className="p-4 rounded-lg shadow-sm mb-4 flex flex-col items-start gap-2">
          <div className="text-sm flex items-center gap-2">
            <span className="w-[14px] h-[14px] bg-[#8C6FE6] border border-white rounded-full inline-block"></span>
            Diastolic
          </div>
          <div className="text-lg font-semibold">
            {hoveredData.diastolic || latestDiastolic}
          </div>

          <div
            className={`text-xs px-2 py-0.5 flex items-center gap-2 rounded ${
              getDiastolicStatus() === "Higher than Average"
                ? "bg-red-100 text-red-800"
                : getDiastolicStatus() === "Lower than Average"
                ? "bg-green-100 text-green-800"
                : "bg-yellow-100 text-yellow-800"
            }`}
          >
            <div>
              {getDiastolicStatus() === "Higher than Average" ? (
                <img src={ArrowUp} alt="" />
              ) : getDiastolicStatus() === "Lower than Average" ? (
                <img src={ArrowDown} alt="" />
              ) : (
                ""
              )}
            </div>
            <div>{getDiastolicStatus()}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BloodPressureChart;
