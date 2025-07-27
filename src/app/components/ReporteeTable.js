"use client";

import { DataGrid } from "@mui/x-data-grid";
import EditIcon from "@mui/icons-material/Edit";
import IconButton from "@mui/material/IconButton";

export default function ReporteeTable({ rows, onEdit }) {
  const columns = [
    { field: "id", headerName: "Employee ID", flex: 1 },
    { field: "name", headerName: "Name", flex: 1 },
    { field: "role", headerName: "Role", flex: 1 },
    { field: "contact", headerName: "Contact", flex: 1 },
    { field: "joined", headerName: "Joined", flex: 1 },
    {
      field: "edit",
      headerName: "",
      sortable: false,
      width: 60,
      renderCell: (params) => (
        <IconButton onClick={(event) => onEdit(event, params.row)}>
          <EditIcon className="text-gray-500 hover:text-blue-600" />
        </IconButton>
      ),
    },
  ];

  return (
    <div style={{ width: "100%" }}>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={7}
        rowsPerPageOptions={[7]}
        pagination
        disableSelectionOnClick
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
  );
}
