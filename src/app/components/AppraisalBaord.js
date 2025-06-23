"use client";

import { useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import DashboardLayout from "./DashboardLayout";

export default function AppraisalBoard() {
  const [data, setData] = useState([]);
  const [filteredObjective, setFilteredObjective] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const urlData = new URLSearchParams(window.location.search).get("data");
    if (urlData) {
      try {
        const parsedData = JSON.parse(decodeURIComponent(urlData));
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
      }
    }
  }, []);

  const objectives = [
    "Customer Service/Compliance with Road Safety",
    "Administrative Functions",
    "Vehicle Maintenance",
  ];

  // Group KPI by objective
  const rows = data
    ? data
        .filter(
          (item) =>
            filteredObjective === "All" || item.objective === filteredObjective
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
        <h1 className="mb-6 text-3xl font-semibold font-outfit">Appraisal</h1>

        <div className="mb-4">
          <h2 className="text-lg font-medium mb-2">Board</h2>
          <div className="flex flex-wrap justify-end items-center gap-2">
            <select
              value={filteredObjective}
              onChange={(e) => setFilteredObjective(e.target.value)}
              className="border p-2 rounded w-40"
            >
              <option value="All">Members</option>
              {objectives.map((obj) => (
                <option key={obj} value={obj}>
                  {obj}
                </option>
              ))}
            </select>
            <input
              type="text"
              placeholder="Filter members"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="border p-2 rounded w-64"
            />
            <button
              onClick={() => {
                setFilteredObjective("All");
                setSearchTerm("");
                localStorage.removeItem("appraisalDataList");
                setData([]);
              }}
              className="bg-red-500 text-white px-4 py-2 rounded"
            >
              Clean
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
      </div>
    </DashboardLayout>
  );
}
