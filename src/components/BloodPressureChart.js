import React, { useState, useMemo } from "react";
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

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const BloodPressureChart = ({ data }) => {
  const [timeRange, setTimeRange] = useState("Last 6 months");

  // Helper function to filter data based on the selected range
  const filterDataByRange = (range) => {
    const currentDate = new Date();
    const filteredData = data?.filter((item) => {
      const itemDate = new Date(`${item.month} 1, ${item.year}`); // Assuming the month and year are available
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

  const latestSystolic =
    filteredData?.[filteredData.length - 1]?.blood_pressure?.systolic?.value;
  const latestDiastolic =
    filteredData?.[filteredData.length - 1]?.blood_pressure?.diastolic?.value;

  // Format month names as abbreviations
  const formatMonth = (month, year) => {
    const date = new Date(`${month} 1, ${year}`);
    return new Intl.DateTimeFormat("en", { month: "short" }).format(date) + ",";
  };

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
          <div className="text-sm">Systolic</div>
          <div className="text-lg font-semibold text-purple-600">
            {latestSystolic}
          </div>

          <div className="text-xs bg-red-100 text-red-800 px-2 py-0.5 rounded">
            <span></span>Higher than Average
          </div>
        </div>

        <div className="p-4 rounded-lg shadow-sm mb-4 flex flex-col items-start gap-2">
          <div className="text-sm">Dystolic</div>
          <div className="text-lg font-semibold text-purple-600">
            {latestSystolic}
          </div>

          <div className="text-xs bg-red-100 text-red-800 px-2 py-0.5 rounded">
            Higher than Average
          </div>
        </div>
      </div>
    </div>
  );
};

export default BloodPressureChart;
