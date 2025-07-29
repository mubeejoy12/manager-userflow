"use client";

import { Suspense } from 'react';
import AppraisalBoardComponent from "../../components/AppraisalBoardComponent";
import Loading from "./loading";

export default function AppraisalBoardPage() {
  return (
    <Suspense fallback={<Loading />}>
      <AppraisalBoardComponent />
    </Suspense>
  );
}