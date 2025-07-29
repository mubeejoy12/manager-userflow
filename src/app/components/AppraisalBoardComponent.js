"use client";

import { useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import DashboardLayout from "./DashboardLayout";
import { useRouter, useSearchParams } from "next/navigation";

export default function AppraisalBoardComponent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const userId = searchParams.get("id");

  const [data, setData] = useState([]);
  const [filteredObjective, setFilteredObjective] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [userName, setUserName] = useState("");

  useEffect(() => {
    // Mock data for a specific user
    const mockData = [
      {
        objective: "Customer Service/Compliance with Road Safety",
        kpis: ["Achieve 95% customer satisfaction rating", "Maintain a zero-accident record"],
        employeeRating: 9,
        employeeComments: "Exceeded expectations in customer service.",
        lineManagerGrade: null,
        lineManagerComments: "",
        status: "Pending",
      },
      {
        objective: "Administrative Functions",
        kpis: ["Submit all reports on time", "Organize team meetings effectively"],
        employeeRating: 8,
        employeeComments: "All reports were submitted ahead of schedule.",
        lineManagerGrade: null,
        lineManagerComments: "",
        status: "Pending",
      },
    ];
    setData(mockData);
    // Mock user name
    setUserName("John Doe");
  }, [userId]);

  const handleRowClick = (params) => {
    router.push(`/reportee/appraisal/form?id=${userId}&appraisal=${JSON.stringify(params.row)}`);
  };

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
            status: entry.status,
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
          {params.value ? `${params.value}/10` : "N/A"}
        </span>
      ),
    },
    {
      field: "lineManagerComment",
      headerName: "Manager Comment",
      flex: 1,
      minWidth: 160,
    },
    {
      field: "status",
      headerName: "Status",
      flex: 1,
      minWidth: 160,
      renderCell: (params) => (
        <span
          className={`px-2 py-1 rounded-full text-xs font-medium ${
            params.value === "Completed"
              ? "bg-green-100 text-green-800"
              : params.value === "In Review"
              ? "bg-yellow-100 text-yellow-800"
              : "bg-gray-100 text-gray-800"
          }`}
        >
          {params.value}
        </span>
      ),
    },
  ];

  return (
    <DashboardLayout>
      <div className="p-6 w-full max-w-full overflow-x-hidden">
                <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-semibold font-outfit">Appraisal for {userName}</h1>
          
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
            onRowClick={handleRowClick}
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
              "& .MuiDataGrid-row": {
                cursor: "pointer",
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
