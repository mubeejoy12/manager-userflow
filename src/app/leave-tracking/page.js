"use client";

import DashboardLayout from "../components/DashboardLayout";
// import LeaveTable from '../components/LeaveTable'; ← if you're reusing the one you built earlier
import { useState } from "react";
import LeaveTable from "../components/LeaveTable";

export default function LeavePage() {
  const [search, setSearch] = useState("");
  const leaveRequests = [
    {
      id: "003546AE",
      name: "Chloe Davis",
      type: "Sick Leave",
      from: "03.05.2025",
      to: "04.05.2025",
      remaining: 1,
      status: "Pending",
    },
    {
      id: "003546AE",
      name: "Michael Young",
      type: "Sick Leave",
      from: "05.05.2025",
      to: "10.05.2025",
      remaining: 5,
      status: "Pending",
    },
    {
      id: "003546AE",
      name: "Sophie Adams",
      type: "Maternity Leave",
      from: "04.05.2025",
      to: "06.05.2025",
      remaining: 2,
      status: "Pending",
    },
    {
      id: "003546AE",
      name: "Emily Johnson",
      type: "Sick Leave",
      from: "05.05.2025",
      to: "10.05.2025",
      remaining: 5,
      status: "Rejected",
    },
    {
      id: "003546AE",
      name: "Sophie Adams",
      type: "Maternity Leave",
      from: "04.05.2025",
      to: "06.05.2025",
      remaining: 2,
      status: "Pending",
    },
    {
      id: "003546AE",
      name: "Emily Johnson",
      type: "Sick Leave",
      from: "05.05.2025",
      to: "10.05.2025",
      remaining: 5,
      status: "Rejected",
    },
    {
      id: "003546AE",
      name: "Aidan Robinson",
      type: "Sick Leave",
      from: "08.05.2025",
      to: "09.05.2025",
      remaining: 1,
      status: "Approved",
    },
    {
      id: "003546AE",
      name: "Michael Young",
      type: "Sick Leave",
      from: "05.05.2025",
      to: "10.05.2025",
      remaining: 5,
      status: "Pending",
    },
  ];

  const [requests, setRequests] = useState(leaveRequests);

  const filteredRequests = requests.filter((req) =>
    req.name.toLowerCase().includes(search.toLowerCase())
  );

  const handleApprove = (id) => {
    setRequests(
      requests.map((req) =>
        req.id === id ? { ...req, status: "Approved" } : req
      )
    );
  };

  const handleReject = (id) => {
    setRequests(
      requests.map((req) =>
        req.id === id ? { ...req, status: "Rejected" } : req
      )
    );
  };

  return (
    <DashboardLayout>
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-4">Leave Approval</h1>

        <LeaveTable
          rows={filteredRequests.map((req, index) => ({
            ...req,
            id: req.id + index,
          }))}
          onApprove={handleApprove}
          onReject={handleReject}
        />
        <div className="flex justify-end mt-4">
          <button className="bg-white border rounded px-4 py-2">Cancel</button>
        </div>
      </div>
    </DashboardLayout>
  );
}
