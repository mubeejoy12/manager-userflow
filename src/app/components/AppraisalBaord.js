"use client";

import { useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import DashboardLayout from "./DashboardLayout";
import { useRouter } from "next/navigation";

export default function AppraisalBoard() {
  const [data, setData] = useState([]);
  const [filteredObjective, setFilteredObjective] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedQuarter, setSelectedQuarter] = useState("All");

  const handleQuarterFilter = (quarter) => {
    setSelectedQuarter(quarter);
  };

  useEffect(() => {
    const urlData = new URLSearchParams(window.location.search).get("data");
    if (urlData) {
      try {
        const parsedData = JSON.parse(decodeURIComponent(urlData));
        // Add a date to the parsed data for filtering purposes
        parsedData.date = new Date().toISOString(); 
        const storedData =
          JSON.parse(localStorage.getItem("appraisalDataList")) || [];
        const updatedData = [...storedData, parsedData];
        localStorage.setItem("appraisalDataList", JSON.stringify(updatedData));
        setData(updatedData);
      } catch (error) {
        console.error("Failed to parse data from URL:", error);
      }
    } else {
      const saved = localStorage.getItem("appraisalDataList");
      if (saved) {
        setData(JSON.parse(saved));
      } else {
        // Mock data with dates for demonstration
        const mockData = [
          {
            objective: "Customer Service/Compliance with Road Safety",
            kpis: ["Achieve 95% customer satisfaction rating", "Maintain a zero-accident record"],
            employeeRating: 9,
            employeeComments: "Exceeded expectations in customer service.",
            lineManagerGrade: 8,
            lineManagerComments: "Good performance, but can improve in punctuality.",
            date: "2024-01-15T10:00:00Z", // Q1
          },
          {
            objective: "Administrative Functions",
            kpis: ["Submit all reports on time", "Organize team meetings effectively"],
            employeeRating: 8,
            employeeComments: "All reports were submitted ahead of schedule.",
            lineManagerGrade: 8,
            lineManagerComments: "Well-organized and efficient.",
            date: "2024-02-20T10:00:00Z", // Q1
          },
          {
            objective: "Vehicle Maintenance",
            kpis: ["Ensure all vehicles are serviced regularly", "Maintain vehicle logs"],
            employeeRating: 7,
            employeeComments: "Vehicles are well-maintained.",
            lineManagerGrade: 7,
            lineManagerComments: "Consistent effort in vehicle maintenance.",
            date: "2024-05-10T10:00:00Z", // Q2
          },
          {
            objective: "Customer Service/Compliance with Road Safety",
            kpis: ["Handle customer complaints efficiently", "Ensure road safety compliance"],
            employeeRating: 8,
            employeeComments: "Handled all complaints professionally.",
            lineManagerGrade: 9,
            lineManagerComments: "Excellent customer service.",
            date: "2024-07-01T10:00:00Z", // Q3
          },
        ];
        localStorage.setItem("appraisalDataList", JSON.stringify(mockData));
        setData(mockData);
      }
    }
  }, []);

  const objectives = [
    "Customer Service/Compliance with Road Safety",
    "Administrative Functions",
    "Vehicle Maintenance",
  ];

  // Group KPI by objective
  const getQuarter = (dateString) => {
    const date = new Date(dateString);
    const month = date.getMonth(); // 0-indexed
    if (month >= 0 && month <= 2) return "Q1";
    if (month >= 3 && month <= 5) return "Q2";
    if (month >= 6 && month <= 8) return "Q3";
    return "";
  };

  const rows = data
    ? data
        .filter(
          (item) =>
            (filteredObjective === "All" || item.objective === filteredObjective) &&
            (selectedQuarter === "All" || getQuarter(item.date) === selectedQuarter)
        )
        .map((entry, index) => ({
            id: index + 1,
            objective: entry.objective,
            kpis: entry.kpis, // keep it an array
            employeeRating: entry.employeeRating,
            employeeComment: entry.employeeComments,
            lineManagerGrade: entry.lineManagerGrade,
            lineManagerComment: entry.lineManagerComments,
          }))
        .filter((row) =>
            row.kpis.join(' ').toLowerCase().includes(searchTerm.toLowerCase())

        )
    : [];

  const columns = [
    {
      field: "objective",
      headerName: "Objective",
      flex: 1,
      minWidth: 160,
    },
    {
      field: "kpis",
      headerName: "Monthly Key Performance",
      flex: 2,
      minWidth: 240,
      renderCell: (params) => (
        <div className="whitespace-pre-line text-sm leading-6">
          {params.value.map((kpi, idx) => (
            <div key={idx}>• {kpi}</div>
          ))}
        </div>
      ),
    },
    {
      field: "employeeRating",
      headerName: "Employee Rating",
      flex: 0.8,
      minWidth: 120,
      renderCell: (params) => (
        <span className="flex items-center gap-2">
          <span
            className={`inline-block w-2 h-2 rounded-full ${
              params.value >= 8
                ? "bg-green-500"
                : params.value >= 5
                ? "bg-orange-500"
                : "bg-red-500"
            }`}
          ></span>
          {`${params.value}/10`}
        </span>
      ),
    },
    {
      field: "employeeComment",
      headerName: "Employee Comment",
      flex: 1,
      minWidth: 160,
    },
    {
      field: "lineManagerGrade",
      headerName: "Manager Grade",
      flex: 0.8,
      minWidth: 120,
      renderCell: (params) => (
        <span className="flex items-center gap-2">
          <span
            className={`inline-block w-2 h-2 rounded-full ${
              params.value >= 8
                ? "bg-green-500"
                : params.value >= 5
                ? "bg-orange-500"
                : "bg-red-500"
            }`}
          ></span>
          {`${params.value}/10`}
        </span>
      ),
    },
    {
      field: "lineManagerComment",
      headerName: "Manager Comment",
      flex: 1,
      minWidth: 160,
    },
  ];

  return (
    <DashboardLayout>
      <div className="p-6 w-full max-w-full overflow-x-hidden">
                <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-semibold font-outfit">Appraisal</h1>
          <button
            onClick={() => router.push("/appraisal/form")}
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            New Appraisal
          </button>
        </div>

        <div className="mb-4">
          {/* <h2 className="text-lg font-medium mb-2">Board</h2> */}
          <div className="flex flex-wrap justify-end items-center gap-2">
            <input
              type="text"
              placeholder="Filter members"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="border p-2 rounded w-64"
            />
            <select
              // value={statusFilter}
              // onChange={(e) => setStatusFilter(e.target.value)}
              className="border p-2 rounded w-40"
            >
              <option value="all">All</option>
              <option value="pending">Pending</option>
              <option value="in-review">In-Review</option>
              <option value="completed">Completed</option>
            </select>
            <button
              onClick={() => handleQuarterFilter('Q1')}
              className="bg-blue-500 text-white px-4 py-2 rounded"
            >
              Q1
            </button>
            <button
              onClick={() => handleQuarterFilter('Q2')}
              className="bg-blue-500 text-white px-4 py-2 rounded"
            >
              Q2
            </button>
            <button
              onClick={() => handleQuarterFilter('Q3')}
              className="bg-blue-500 text-white px-4 py-2 rounded"
            >
              Q3
            </button>
            <button
              onClick={() => handleQuarterFilter('All')}
              className="bg-blue-500 text-white px-4 py-2 rounded"
            >
              All
            </button>
            <button
              onClick={() => console.log("Search clicked")}
              className="bg-blue-500 text-white px-4 py-2 rounded"
            >
              Search
            </button>
          </div>
        </div>

        <div className="w-full">
          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={5}
            rowsPerPageOptions={[5]}
            pagination
            disableSelectionOnClick
            autoHeight
            sx={{
              width: "100%",
              "& .MuiDataGrid-columnHeader": {
                backgroundColor: "#F3F4F6",
                whiteSpace: "normal",
                wordWrap: "break-word",
              },
              "& .MuiDataGrid-cell": {
                borderBottom: "1px solid #E5E7EB",
                whiteSpace: "pre-line",
                wordWrap: "break-word",
              },
            }}
          />
        </div>
        <div className="mt-6">
          <h3 className="text-lg font-medium mb-2">Line Manager Feedback</h3>
          <textarea
            className="w-full p-2 border rounded"
            rows="2"
            placeholder="Enter your feedback here..."
          ></textarea>
        </div>
      </div>
    </DashboardLayout>
  );
}
