"use client";
import { DataGrid } from "@mui/x-data-grid";

export default function LeaveHistoryTable({ records }) {
  const columns = [
    { field: "employeeId", headerName: "Employee ID", flex: 1 },
    { field: "name", headerName: "Name", flex: 1 },
    { field: "type", headerName: "Leave Type", flex: 1 },
    { field: "from", headerName: "From", flex: 1 },
    { field: "to", headerName: "To", flex: 1 },
    { field: "remaining", headerName: "Remaining Leave", flex: 1 },
    {
      field: "status",
      headerName: "Status",
      flex: 1,
      renderCell: (params) => {
        const colors = {
          Approved: "bg-green-100 text-green-700",
          Pending: "bg-yellow-100 text-yellow-800",
          Rejected: "bg-red-100 text-red-700",
        };
        return (
          <span
            className={`px-3 py-1 rounded-full text-xs font-semibold ${
              colors[params.value]
            }`}
          >
            {params.value}
          </span>
        );
      },
    },
  ];

  const rows = records.map((rec, i) => ({ ...rec, id: `${rec.id}-${i}` }));

  return (
    <DataGrid
      autoHeight
      rows={rows}
      columns={columns}
      pageSize={5}
      rowsPerPageOptions={[5]}
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
  );
}
