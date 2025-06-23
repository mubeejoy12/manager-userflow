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
          fontSize: "14px",
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: "#F3F4F6",
            fontWeight: 600,
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "1px solid #E5E7EB",
          },
          "& .MuiDataGrid-row:nth-of-type(even)": {
            backgroundColor: "#F9FAFB",
          },
        }}
      />
    </div>
  );
}
