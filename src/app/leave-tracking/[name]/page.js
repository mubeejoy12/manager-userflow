"use client";

import LeaveHistoryTable from "@/app/components/ LeaveHistoryTable";
import DashboardLayout from "@/app/components/DashboardLayout";
import { use } from "react";

// import DashboardLayout from '@/app/components/DashboardLayout';
// import LeaveHistoryTable from '@/app/components/LeaveHistoryTable';

const allLeaveData = [
  /* your mock/fetched leave records here */
];

export default function LeaveHistoryPage({ params }) {
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
        <LeaveHistoryTable records={records} />
      </div>
    </DashboardLayout>
  );
}
