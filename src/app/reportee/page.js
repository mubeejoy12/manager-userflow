"use client";

import { useState } from "react";
import DashboardLayout from "../components/DashboardLayout";
import ReporteeTable from "../components/ReporteeTable";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { useRouter } from "next/navigation";

export default function ReporteePage() {
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedRow, setSelectedRow] = useState(null);

  const handleOpenMenu = (event, row) => {
    setAnchorEl(event.currentTarget);
    setSelectedRow(row);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
    setSelectedRow(null);
  };
  const router = useRouter();

  const handleMenuClick = (type, employee) => {
    const employeeId = employee.id;
    const employeeName = employee.name;
    const role = "manager"; // or "employee"
    

    let path = "";

    switch (type) {
      case "leave":
        path = `/reportee/leave?employeeId=${employeeId}&name=${employeeName}`;
        break;
      case "appraisal":
        path = `/appraisal?employeeId=${employeeId}&name=${employeeName}&role=${role}&mode=view`;
        break;
      case "query":
        path = `/query?employeeId=${employeeId}&name=${employeeName}`;
        break;
      default:
        path = "/";
    }

    router.push(path);
  };

  const open = Boolean(anchorEl);

  const rows = [
    {
      id: "E005946",
      name: "Lauren Carter",
      role: "Office Manager",
      contact: "+123 456 789 546",
      joined: "12.05.2021",
    },
    {
      id: "E005947",
      name: "William King",
      role: "Curator Member",
      contact: "+123 456 789 546",
      joined: "12.05.2021",
    },
    // More rows...
  ];

  return (
    <DashboardLayout>
      <div className="p-6 space-y-4">
        {/* Title */}
        <h1 className="text-[20px] font-medium leading-[30px] font-outfit text-gray-900  border-gray-200 pb-2">
          Reportee
        </h1>

        {/* Search + Filter */}
        <div className="flex justify-between items-center mb-4">
          <div className="relative w-1/3">
            <span className="absolute left-0 top-1/2 -translate-y-1/2 pl-2 text-gray-400">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 21l-4.35-4.35m1.6-5.15a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </span>
            <input
              type="text"
              placeholder="Search Reportees"
              className="w-full pl-8 pb-1 border-b border-gray-300 text-sm focus:outline-none focus:border-blue-500 placeholder-gray-400"
            />
          </div>

          <button className="text-sm px-4 py-2 rounded-md border border-gray-300 text-gray-700 hover:bg-gray-100 transition">
            Filter
          </button>
        </div>

        {/* Table */}
        <ReporteeTable rows={rows} onEdit={handleOpenMenu} />

        {/* Dropdown Modal */}
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleCloseMenu}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "right", // Stick to the right edge of the button
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "right", // Opens aligned from the right
          }}
          PaperProps={{
            sx: {
              width: 243,
              height: 205,
              padding: "25px 10px",
              borderRadius: "8px",
              display: "flex",
              flexDirection: "column",
              gap: 0,
              "& .MuiMenuItem-root": {
                justifyContent: "center",
                textAlign: "center",
                paddingY: "10px",
                borderBottom: "1px solid #E5E7EB",
                "&:last-of-type": {
                  borderBottom: "none", // removes line after last item
                },
              },
            },
          }}
        >
          <MenuItem onClick={() => handleMenuClick("leave", selectedRow)}>
            View Leave
          </MenuItem>
          <MenuItem onClick={() => handleMenuClick("appraisal")}>
            View Appraisal
          </MenuItem>
          <MenuItem onClick={() => handleMenuClick("query")}>
            View Query
          </MenuItem>
        </Menu>
      </div>
    </DashboardLayout>
  );
}
