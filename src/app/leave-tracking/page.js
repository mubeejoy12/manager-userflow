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
    <div className="p-6">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold">Leave History</h1>
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
