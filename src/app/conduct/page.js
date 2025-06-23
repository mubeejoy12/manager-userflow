"use client";

import React, { useState } from "react";
import {
  Box,
  Tabs,
  Tab,
  TextField,
  Button,
  InputAdornment,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { DataGrid } from "@mui/x-data-grid";
import { AiOutlineEdit } from "react-icons/ai";
import QueryForm from "@/app/components/QueryForm";
import QueryDetailsDrawer from "../components/QueryDetailsDrawer";
import DashboardLayout from "../components/DashboardLayout";

// Sample table data
const queryRows = [
  {
    id: 1,
    empId: "0035464E",
    name: "Chloe Davis",
    role: "IT Manager",
    dept: "IT Department",
    type: "Performance-Related",
    status: "Open",
    email: "chloe.davis@gmail.com",
    queryHistory: [
      { date: "12.02.2025", type: "Performance-Related" },
      { date: "15.01.2025", type: "Financial" },
      { date: "09.01.2025", type: "Workplace Incident" },
    ],
    notes: [
      {
        date: "09.01.2025 12:00pm",
        text: "New Query: Performance Related: You failed to finish your tasks twice in a row",
        author: "HR",
      },
      {
        date: "09.01.2025 12:10pm",
        text: "The instructions weren't clear and my system was slow",
        author: "Michael Young",
      },
    ],
  },
  // ... (other queryRows remain the same)
];

const suspensionRows = [
  {
    id: 1,
    empId: "0035464E",
    name: "Chloe Davis",
    role: "IT Manager",
    dept: "IT Department",
    suspensionReason: "Misconduct",
    status: "Active",
    fromDate: "2025-06-01",
    toDate: "2025-06-15",
  },
  // ... (other suspensionRows remain the same)
];

// Status color function
const getStatusColor = (status) => {
  switch (status) {
    case "Open":
    case "Active":
      return "#FF3B30";
    case "In Progress":
      return "#FFD60A";
    case "Resolved":
    case "Lifted":
      return "#34C759";
    default:
      return "gray";
  }
};

export default function ConductPage() {
  const [tab, setTab] = useState(0);
  const [search, setSearch] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const [queryData, setQueryData] = useState([...queryRows]);
  const [suspensionData, setSuspensionData] = useState([...suspensionRows]);

  const handleNewEntry = () => {
    setShowForm(true);
  };

  const handleFormSubmit = (newEntry) => {
    const newId = tab === 0 ? queryData.length + 1 : suspensionData.length + 1;
    if (tab === 0) {
      setQueryData([
        ...queryData,
        {
          ...newEntry,
          id: newId,
          type: newEntry.type,
          email: "example@email.com",
          queryHistory: [],
          notes: newEntry.note
            ? [
                {
                  date: new Date().toLocaleString("en-US", {
                    timeZone: "Africa/Lagos",
                  }),
                  text: newEntry.note,
                  author: "User",
                },
              ]
            : [],
        },
      ]);
    } else {
      setSuspensionData([
        ...suspensionData,
        {
          ...newEntry,
          id: newId,
          fromDate: newEntry.fromDate || "",
          toDate: newEntry.toDate || "",
        },
      ]);
    }
    setShowForm(false);
  };

  const handleEditClick = (row) => {
    setSelectedRow(row);
    setShowDetails(true);
  };

  const handleCloseDetails = () => {
    setShowDetails(false);
    setSelectedRow(null);
  };

  const rows = tab === 0 ? queryData : suspensionData;
  const filteredRows = rows.filter((row) =>
    Object.values(row).some((value) =>
      value.toString().toLowerCase().includes(search.toLowerCase())
    )
  );

  const columns = (mode) =>
    mode === "Query"
      ? [
          { field: "empId", headerName: "Employee ID", flex: 1 },
          { field: "name", headerName: "Name", flex: 1 },
          { field: "role", headerName: "Role", flex: 1 },
          { field: "dept", headerName: "Department", flex: 1 },
          { field: "type", headerName: "Query Type", flex: 1 },
          {
            field: "status",
            headerName: "Status",
            flex: 1,
            renderCell: (params) => (
              <span
                style={{
                  color: getStatusColor(params.value),
                  fontWeight: 500,
                  padding: "4px 8px",
                  borderRadius: "12px",
                  backgroundColor: getStatusColor(params.value) + "29",
                }}
              >
                {params.value}
              </span>
            ),
          },
          {
            field: "actions",
            headerName: "",
            flex: 0.5,
            minWidth: 50,
            renderCell: (params) => (
              <div className="flex justify-center items-center w-full h-full">
                <button
                  onClick={() => handleEditClick(params.row)}
                  className="text-blue-600 hover:text-blue-800"
                >
                  <AiOutlineEdit size={16} />
                </button>
              </div>
            ),
          },
        ]
      : [
          { field: "empId", headerName: "Employee ID", flex: 1 },
          { field: "name", headerName: "Name", flex: 1 },
          { field: "role", headerName: "Role", flex: 1 },
          { field: "dept", headerName: "Department", flex: 1 },
          {
            field: "suspensionReason",
            headerName: "Suspension Reason",
            flex: 1,
          },
          { field: "fromDate", headerName: "From", flex: 1 },
          { field: "toDate", headerName: "To", flex: 1 },
          {
            field: "status",
            headerName: "Status",
            flex: 1,
            renderCell: (params) => (
              <span
                style={{
                  color: getStatusColor(params.value),
                  fontWeight: 500,
                  padding: "4px 8px",
                  borderRadius: "12px",
                  backgroundColor: getStatusColor(params.value) + "29",
                }}
              >
                {params.value}
              </span>
            ),
          },
          {
            field: "actions",
            headerName: "",
            flex: 0.5,
            minWidth: 50,
            renderCell: (params) => (
              <div className="flex justify-center items-center w-full h-full">
                <button
                  onClick={() => handleEditClick(params.row)}
                  className="text-blue-600 hover:text-blue-800"
                >
                  <AiOutlineEdit size={16} />
                </button>
              </div>
            ),
          },
        ];

  if (showForm) {
    return (
      <QueryForm
        onSubmit={handleFormSubmit}
        onCancel={() => setShowForm(false)}
        tab={tab}
      />
    );
  }

  return (
    <DashboardLayout>
      <Box p={2}>
        {/* Tabs */}
        <div className="flex justify-between items-center mb-4">
          <Tabs
            value={tab}
            onChange={(e, newValue) => setTab(newValue)}
            sx={{ mb: 2 }}
          >
            <Tab label="Query" />
            <Tab label="Suspension" />
          </Tabs>

          <Box display="flex" gap={1} flexWrap="wrap">
            <Button variant="outlined">Export CSV</Button>
            <Button
              variant="contained"
              color="primary"
              onClick={handleNewEntry}
            >
              {tab === 0 ? "+ New Query" : "+ New Suspension"}
            </Button>
          </Box>
        </div>

        {/* Top Bar */}
        <Box
          mb={2}
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          flexWrap="wrap"
          gap={2}
        >
          <TextField
            placeholder="Search Employee"
            variant="standard"
            size="small"
            onChange={(e) => setSearch(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon fontSize="small" />
                </InputAdornment>
              ),
            }}
          />
        </Box>

        {/* Table */}
        <Box
          sx={{
            height: 420,
            "& .MuiDataGrid-row:nth-of-type(even)": {
              backgroundColor: "#FAFAFB",
            },
            "& .MuiDataGrid-columnHeaders": {
              backgroundColor: "#F5F5F5",
              fontWeight: "bold",
            },
            border: "none",
          }}
        >
          <DataGrid
            rows={filteredRows}
            columns={columns(tab === 0 ? "Query" : "Suspension")}
            getRowId={(row) => row.id}
            disableRowSelectionOnClick
            hideFooter
            sx={{ border: "none" }}
          />
        </Box>

        {/* Details Drawer */}
        <QueryDetailsDrawer
          open={showDetails}
          onClose={handleCloseDetails}
          selectedRow={selectedRow}
          tab={tab}
        />
      </Box>
    </DashboardLayout>
  );
}