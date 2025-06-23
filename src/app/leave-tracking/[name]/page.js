"use client";

import LeaveHistoryTable from "@/app/components/ LeaveHistoryTable";
// import LeaveHistoryTable from "@/app/components/LeaveHistoryTable";
import DashboardLayout from "@/app/components/DashboardLayout";
import { useRouter } from "next/navigation";
import { use } from "react";

const allLeaveData = [
  // your mock/fetched records here
];

export default function LeaveHistoryPage({ params }) {
  const { name } = use(params); // ✅ unwrap promised param
  const router = useRouter();
  const decodedName = decodeURIComponent(name);

  const records = allLeaveData.filter(
    (entry) => entry.name.toLowerCase() === decodedName.toLowerCase()
  );

  return (
    <DashboardLayout>
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-4">
          Leave History: {decodedName}
        </h1>

        {/* Table */}
        <LeaveHistoryTable records={records} />

        {/* Buttons */}
        <div className="flex justify-end gap-4 mt-6">
          <button
            onClick={() => router.push("/leave-approval")}
            className="px-5 py-2 rounded border border-gray-300 text-gray-700 bg-white"
          >
            Cancel
          </button>
          <button
            onClick={() => router.push("/leave-tracking/apply-leave")}
            className="px-5 py-2 rounded bg-blue-600 text-white hover:bg-blue-700"
          >
            Next
          </button>
        </div>
      </div>
    </DashboardLayout>
  );
}
