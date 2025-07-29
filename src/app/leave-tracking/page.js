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
  const [leaveRequests, setLeaveRequests] = useState([
    {
      requestId: "REQ001",
      id: "E005946",
      name: "Lauren Carter",
      type: "Sick Leave",
      from: "03.05.2025",
      to: "04.05.2025",
      remaining: 1,
      status: "Pending",
    },
    {
      requestId: "REQ002",
      id: "E005946",
      name: "Lauren Carter",
      type: "Annual Leave",
      from: "10.04.2025",
      to: "15.04.2025",
      remaining: 5,
      status: "Approved",
    },
    {
      requestId: "REQ003",
      id: "E005946",
      name: "Lauren Carter",
      type: "Casual Leave",
      from: "20.06.2025",
      to: "22.06.2025",
      remaining: 3,
      status: "Rejected",
    },
    {
      requestId: "REQ004",
      id: "E005947",
      name: "William King",
      type: "Annual Leave",
      from: "05.05.2025",
      to: "10.05.2025",
      remaining: 5,
      status: "Approved",
    },
  ]);
  

  useEffect(() => {
    const leaveType = searchParams.get("leaveType");
    const from = searchParams.get("from");
    const to = searchParams.get("to");
    const remaining = searchParams.get("remaining");

    if (leaveType && from && to && remaining) {
      const newRequest = {
        id: `003546AE-${leaveRequests.length}`,
        name: "Current User",
        type: leaveType,
        from,
        to,
        remaining: parseInt(remaining),
        status: "Pending",
      };
      setLeaveRequests((prev) => [...prev, newRequest]);
    }
  }, [searchParams, leaveRequests]);

  const employeeId = searchParams.get("employeeId");
  const employeeName = searchParams.get("name");

  const filteredRequests = employeeId
    ? (leaveRequests || []).filter((req) => req.id === employeeId)
    : (leaveRequests || []).filter((req) =>
        req.name.toLowerCase().includes(search.toLowerCase())
      );

      const handleApprove = (requestId) => {
        if (!isMountedRef.current) return;
        setLeaveRequests((prev) =>
          prev.map((req) =>
            req.requestId === requestId ? { ...req, status: "Approved" } : req
          )
        );
      };
      
      const handleReject = (requestId) => {
        if (!isMountedRef.current) return;
        setLeaveRequests((prev) =>
          prev.map((req) =>
            req.requestId === requestId ? { ...req, status: "Rejected" } : req
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
