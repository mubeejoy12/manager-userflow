"use client";

import { DataGrid } from "@mui/x-data-grid";
import { Button, Stack } from "@mui/material";

export default function LeaveTable({ rows = [], onAction }) {
  const columns = [
    { field: "id", headerName: "Employee ID", flex: 1 },
    { field: "name", headerName: "Name", flex: 1 },
    { field: "type", headerName: "Leave Type", flex: 1 },
    { field: "from", headerName: "From", flex: 1 },
    { field: "to", headerName: "To", flex: 1 },
    { field: "remaining", headerName: "Remaining", flex: 1 },
    {
      field: "status",
      headerName: "Status / Action",
      flex: 1.5,
      headerAlign: "center",
      align: "center",
      renderCell: (params) => {
        const { status, requestId } = params.row;

        if (status === "Pending") {
          return (
            <Stack direction="row" spacing={1}>
              <Button
                variant="contained"
                color="success"
                size="small"
                onClick={() => onAction(requestId, "Approved")}
              >
                Accept
              </Button>
              <Button
                variant="contained"
                color="error"
                size="small"
                onClick={() => onAction(requestId, "Rejected")}
              >
                Reject
              </Button>
            </Stack>
          );
        }

        if (status === "Approved") {
          return <span className="text-green-600 font-semibold">Accepted</span>;
        }

        if (status === "Rejected") {
          return <span className="text-red-600 font-semibold">Rejected</span>;
        }

        return null;
      },
    },
  ];

  return (
    <div style={{ width: "100%" }}>
      <DataGrid
        autoHeight
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
            backgroundColor: "#F9FAFB",
            borderBottom: "none",
          },
          "& .MuiDataGrid-columnSeparator": {
            visibility: "hidden",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
          },
          "& .MuiDataGrid-footerContainer": {
            borderTop: "none",
          },
          "& .MuiDataGrid-row": {
            border: "none",
          },
          "& .MuiDataGrid-row:hover": {
            backgroundColor: "#F3F4F6",
          },
        }}
      />
    </div>
  );
}