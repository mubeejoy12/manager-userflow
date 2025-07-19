// app/leave-tracking/page.js (second site)
"use client";
import DashboardLayout from "../components/DashboardLayout";
import { useState, useEffect, Suspense } from "react";
import LeaveTable from "../components/LeaveTable";
import { useRouter, useSearchParams } from "next/navigation";

function LeaveTrackingContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [search, setSearch] = useState("");
  const [requests, setRequests] = useState([
    {
      id: "E005946",
      name: "Lauren Carter",
      type: "Sick Leave",
      from: "03.05.2025",
      to: "04.05.2025",
      remaining: 1,
      status: "Pending",
    },
    {
      id: "E005947",
      name: "William King",
      type: "Annual Leave",
      from: "05.05.2025",
      to: "10.05.2025",
      remaining: 5,
      status: "Approved",
    },
    {
      id: "E005947",
      name: "William King",
      type: "Sick Leave",
      from: "12.05.2025",
      to: "13.05.2025",
      remaining: 2,
      status: "Pending",
    },
    {
      id: "E005946",
      name: "Lauren Carter",
      type: "Annual Leave",
      from: "15.05.2025",
      to: "20.05.2025",
      remaining: 5,
      status: "Approved",
    },
    // Add more entries as needed
  ]);

  useEffect(() => {
    const leaveType = searchParams.get("leaveType");
    const from = searchParams.get("from");
    const to = searchParams.get("to");
    const remaining = searchParams.get("remaining");

    if (leaveType && from && to && remaining) {
      const newRequest = {
        id: `003546AE-${requests.length}`,
        name: "Current User",
        type: leaveType,
        from,
        to,
        remaining: parseInt(remaining),
        status: "Pending",
      };
      setRequests((prev) => [...prev, newRequest]);
    }
  }, [searchParams]);

  const employeeId = searchParams.get("employeeId");
  const employeeName = searchParams.get("name");

  const filteredRequests = employeeId
    ? requests.filter((req) => req.id === employeeId)
    : requests.filter((req) =>
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
    <div className="p-6">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold">
          Leave History {employeeName ? `for ${employeeName}` : ""}
        </h1>
        <button
          onClick={() => router.push("/leave-tracking/apply-leave")}
          className="bg-blue-600 text-white text-sm font-medium px-4 py-2 rounded-md hover:bg-blue-700 transition"
        >
          + Apply Leave
        </button>
      </div>
      <LeaveTable
        rows={filteredRequests.map((req, index) => ({
          ...req,
          id: req.id + index,
        }))}
        onApprove={handleApprove}
        onReject={handleReject}
      />
      <div className="flex justify-end mt-4">
        <button
          onClick={() => router.back()}
          className="bg-white border rounded px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}

export default function LeaveTrackingPage() {
  return (
    <DashboardLayout>
      <Suspense fallback={<div>Loading leave tracking...</div>}>
        <LeaveTrackingContent />
      </Suspense>
    </DashboardLayout>
  );
}
