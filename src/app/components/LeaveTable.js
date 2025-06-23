"use client";

import { DataGrid } from "@mui/x-data-grid";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import { useRouter } from "next/navigation";

export default function LeaveTable({ rows, onApprove, onReject }) {
  const router = useRouter();

  const handleRowClick = (params) => {
    const encodedName = encodeURIComponent(params.row.name);
    router.push(`/leave-tracking/${encodeURIComponent(params.row.name)}`);

  };
  const columns = [
    { field: "id", headerName: "Employee ID", flex: 1 },
    { field: "name", headerName: "Name", flex: 1 },
    { field: "type", headerName: "Leave Type", flex: 1 },
    { field: "from", headerName: "From", flex: 1 },
    { field: "to", headerName: "To", flex: 1 },
    { field: "remaining", headerName: "Remaining", flex: 1 },
    {
      field: "action",
      headerName: "",
      sortable: false,
      width: 130,
      renderCell: (params) => (
        <div className="flex gap-2">
          {/* <IconButton>
            <EditIcon className="text-gray-500 hover:text-blue-600" />
          </IconButton> */}
          <button
            className="text-green-600 text-sm"
            onClick={() => onApprove(params.row.id)}
          >
            ✔
          </button>
          <button
            className="text-red-600 text-sm"
            onClick={() => onReject(params.row.id)}
          >
            ❌
          </button>
        </div>
      ),
    },
  ];

  return (
    <div style={{ width: "100%" }}>
      <DataGrid
        autoHeight
        onRowClick={handleRowClick}
        rows={rows}
        columns={columns}
        pageSize={7}
        rowsPerPageOptions={[7]}
        pagination
        disableSelectionOnClick
        sx={{
          fontFamily: "Outfit",
          fontSize: 14,
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
