"use client";

import { Suspense } from "react";
import dynamic from "next/dynamic";

const LeaveHistoryContent = dynamic(() => import("./LeaveHistoryContent"), {
  ssr: false,
});

export default function LeaveHistoryPage() {
  return (
    <Suspense fallback={<div>Loading leave history...</div>}>
      <LeaveHistoryContent />
    </Suspense>
  );
}