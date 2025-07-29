"use client";

import DashboardLayout from "@/app/components/DashboardLayout";
import { Suspense } from "react";
import LeaveHistoryContent from "./LeaveHistoryContent";

export default function LeaveHistoryPage() {
  return (
    <DashboardLayout>
      <Suspense fallback={<div>Loading leave history...</div>}>
        <LeaveHistoryContent />
      </Suspense>
    </DashboardLayout>
  );
}