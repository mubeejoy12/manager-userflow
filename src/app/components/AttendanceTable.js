"use client";

import { useState } from "react";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import SearchIcon from "@mui/icons-material/Search";
import GetAppIcon from "@mui/icons-material/GetApp";
import { DataGrid } from "@mui/x-data-grid";

export default function AttendanceTable() {
  const [searchTerm, setSearchTerm] = useState("");
  const [department, setDepartment] = useState("All Departments");

  const tableData = [
    {
      name: "Jayesimi Darasimi",
      clock: "10:02AM -- 8h 5m -- 07:00PM",
      dept: "Marketing Department",
      note: "She's doing some great work...",
      status: "Present",
      workMode: "Remote",
      dayOff: "None",
    },
    {
      name: "Durotola Gray",
      clock: "00",
      dept: "Marketing Department",
      note: "-",
      status: "Absent",
      workMode: "Remote",
      dayOff: "None",
    },
    {
      name: "Babarinnde Damilola",
      clock: "09:00AM -- 9h 1m -- 06:00PM",
      dept: "Sales Department",
      note: "Lined up for some few details...",
      status: "Present",
      workMode: "Onsite",
      dayOff: "None",
    },
    {
      name: "Ademola Bolajoko",
      clock: "09:00AM -- 9h 1m -- 06:00PM",
      dept: "Specialist Department",
      note: "He's quite opportuned to work...",
      status: "Present",
      workMode: "Onsite",
      dayOff: "None",
    },
    {
      name: "Jayesimi Darasimi",
      clock: "10:02AM -- 8h 5m -- 07:00PM",
      dept: "HR Department",
      note: "She's doing some great work...",
      status: "Present",
      workMode: "Onsite",
      dayOff: "None",
    },
    {
      name: "Durotola Gray",
      clock: "10:02AM -- 8h 5m -- 07:00PM",
      dept: "IT Department",
      note: "She's doing some great work...",
      status: "Present",
      workMode: "Onsite",
      dayOff: "None",
    },
    {
      name: "Ademola Bolajoko",
      clock: "10:02AM -- 8h 5m -- 07:00PM",
      dept: "Sales Department",
      note: "She's doing some great work...",
      status: "Present",
      workMode: "Onsite",
      dayOff: "None",
    },
    {
      name: "Babarinnde Damilola",
      clock: "00",
      dept: "HR Department",
      note: "She's doing some great work...",
      status: "Absent",
      workMode: "Remote",
      dayOff: "Day off",
    },
    {
      name: "Jayesimi Darasimi",
      clock: "10:02AM -- 8h 5m -- 07:00PM",
      dept: "IT Department",
      note: "She's doing some great work...",
      status: "Present",
      workMode: "Onsite",
      dayOff: "None",
    },
    {
      name: "Durotola Gray",
      clock: "00",
      dept: "Marketing Department",
      note: "She's doing some great work...",
      status: "Absent",
      workMode: "Onsite",
      dayOff: "None",
    },
  ];

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const filteredData = tableData.filter(
    (item) =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.dept.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  const columns = [
    { field: "name", headerName: "Name", width: 150, sortable: true },
    {
      field: "clock",
      headerName: "Clock-in & Out",
      width: 180,
      sortable: true,
    },
    { field: "dept", headerName: "Department", width: 180, sortable: true },
    { field: "note", headerName: "Note", width: 200, sortable: true },
    {
      field: "status",
      headerName: "Status",
      width: 120,
      sortable: true,
      renderCell: (params) => (
        <span
          style={{
            color: params.value === "Present" ? "#22C55E" : "#EF4444",
          }}
        >
          {params.value}
        </span>
      ),
    },
    { field: "workMode", headerName: "Work mode", width: 120, sortable: true },
    { field: "dayOff", headerName: "Day off", width: 120, sortable: true },
  ];

  const rows = filteredData.map((item, index) => ({
    ...item,
    id: item.id || index + 1,
  }));

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <div className="relative w-[328px]">
          <SearchIcon
            className="absolute  top-1/2 transform -translate-y-1/2 text-gray-400"
            style={{ fontSize: "28px" }}
          />
          <input
            type="text"
            placeholder="Search by name, role, department..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="border border-gray-300 rounded-[12px] px-6 py-4 w-full h-[56px]"
          />
        </div>
        <div className="flex items-center gap-3">
          {/* <select
            value={department}
            onChange={(e) => setDepartment(e.target.value)}
            className="border border-gray-300 rounded-[12px] px-2 py-4 w-full h-[56px]"
            // style={{ paddingRight: "40px" }}
          >
            <option>All Departments</option>
            <option>Marketing Department</option>
            <option>Sales Department</option>
            <option>Specialist Department</option>
            <option>HR Department</option>
            <option>IT Department</option>
          </select> */}
          <button className="flex items-center justify-center gap-1 border border-gray-300 rounded-[12px] px-4 py-2 w-[90%] h-[40px] text-sm text-gray-700">
            Export CSV
            <GetAppIcon
              className="text-gray-500"
              style={{ fontSize: "16px" }}
            />
          </button>
        </div>
      </div>

      <div style={{ height: 400, width: "100%" }}>
        <DataGrid
          rows={rows}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
          pagination
          disableSelectionOnClick
          getRowClassName={(params) =>
            params.indexRelativeToCurrentPage % 2 === 0 ? "even" : "odd"
          }
          sx={{
            fontFamily: "Outfit",
            fontSize: 14,
            "& .even": { backgroundColor: "#F9FAFB" },
            "& .odd": { backgroundColor: "white" },

            // 🚫 Kill ALL outer borders
            border: "none",

            // 🚫 Remove column header underline + background
            "& .MuiDataGrid-columnHeaders": {
              backgroundColor: "#F9FAFB",
              borderBottom: "none",
            },

            // 🚫 Hide vertical column lines
            "& .MuiDataGrid-columnSeparator": {
              visibility: "hidden",
            },

            // 🚫 Remove cell borders
            "& .MuiDataGrid-cell": {
              borderBottom: "none",
            },

            // 🚫 Remove footer border
            "& .MuiDataGrid-footerContainer": {
              borderTop: "none",
            },

            // 🚫 Remove row borders
            "& .MuiDataGrid-row": {
              border: "none",
            },

            // ✨ Optional: Soft hover effect
            "& .MuiDataGrid-row:hover": {
              backgroundColor: "#F3F4F6",
              outline: "none",
            },
          }}
        />
      </div>

      <div className="mt-4 text-sm text-gray-600">
        Showing {indexOfFirstItem + 1} to{" "}
        {Math.min(indexOfLastItem, filteredData.length)} of{" "}
        {filteredData.length} employees
      </div>
    </div>
  );
}
