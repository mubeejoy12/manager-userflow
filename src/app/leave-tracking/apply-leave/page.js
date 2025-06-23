"use client";

import { useState } from "react";
import DashboardLayout from "@/app/components/DashboardLayout";
import { useRouter } from "next/navigation";

export default function ApplyLeavePage() {
  const router = useRouter();

  const [leaveType, setLeaveType] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [remaining, setRemaining] = useState(10);

  const handleApply = () => {
    const leaveApplication = {
      leaveType,
      from: fromDate,
      to: toDate,
      remaining,
    };

    console.log("Leave Applied:", leaveApplication);
    router.push("/leave-approval");
  };

  return (
    <DashboardLayout>
      <div className="p-6 max-w-3xl ">
        <h1 className="text-2xl font-bold mb-6">Apply Leave</h1>

        <div className="space-y-6">
          <div className="flex gap-4">
            <div className="flex-1">
              <label className="block mb-1 font-medium">From</label>
              <input
                type="date"
                className="w-full border rounded px-3 py-2"
                value={fromDate}
                onChange={(e) => setFromDate(e.target.value)}
              />
            </div>

            <div className="flex-1">
              <label className="block mb-1 font-medium">To</label>
              <input
                type="date"
                className="w-full border rounded px-3 py-2"
                value={toDate}
                onChange={(e) => setToDate(e.target.value)}
              />
            </div>
          </div>

          {/* Row 1: Leave Type + Remaining Leave */}
          <div className="flex gap-4">
            <div className="flex-1">
              <label className="block mb-1 font-medium">Leave Type</label>
              <select
                className="w-full border rounded px-3 py-2"
                value={leaveType}
                onChange={(e) => setLeaveType(e.target.value)}
              >
                <option value="">Select leave type</option>
                <option value="Sick Leave">Sick Leave</option>
                <option value="Annual Leave">Annual Leave</option>
                <option value="Maternity Leave">Maternity Leave</option>
              </select>
            </div>

            <div className="flex-1">
              <label className="block mb-1 font-medium">Remaining Leave</label>
              <input
                type="number"
                className="w-full border rounded px-3 py-2 bg-gray-100"
                value={remaining}
                readOnly
              />
            </div>
          </div>

          {/* Row 2: From + To */}
        </div>

        {/* Action Buttons */}
        <div className="flex justify-between mt-8">
          <button
            onClick={() => router.back()}
            className="px-5 py-2 rounded border border-gray-300 text-gray-700 bg-white"
          >
            Cancel
          </button>
          <button
            onClick={handleApply}
            className="px-5 py-2 rounded bg-blue-600 text-white hover:bg-blue-700"
          >
            Apply
          </button>
        </div>
      </div>
    </DashboardLayout>
  );
}
