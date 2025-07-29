"use client";

import LeaveTable from "@/app/components/LeaveTable";
import { useSearchParams } from "next/navigation";
import { useState, useEffect, useRef } from "react";

export default function LeaveHistoryContent() {
  const searchParams = useSearchParams();
  const employeeId = searchParams.get("employeeId");
  const name = searchParams.get("name");

  const isMountedRef = useRef(false);

  useEffect(() => {
    isMountedRef.current = true;
    return () => {
      isMountedRef.current = false;
    };
  }, []);

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
  ]);

  const handleAction = (requestId, status) => {
    if (!isMountedRef.current) return;
    setLeaveRequests((prev) =>
      prev.map((req) =>
        req.requestId === requestId ? { ...req, status } : req
      )
    );
  };

  const filteredLeaves = leaveRequests.filter((req) => req.id === employeeId);

  return (
    <div className="p-6 space-y-4">
      <h1 className="text-[20px] font-medium leading-[30px] font-outfit text-gray-900 border-gray-200 pb-2">
        Leave History for {name}
      </h1>

      <LeaveTable rows={filteredLeaves} onAction={handleAction} />
    </div>
  );
}
