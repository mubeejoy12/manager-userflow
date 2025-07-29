"use client";

import { Suspense } from 'react';
import AppraisalFormComponent from "../../../components/AppraisalFormComponent";
import Loading from "./loading";

export default function AppraisalFormPage() {
  return (
    <Suspense fallback={<Loading />}>
      <AppraisalFormComponent />
    </Suspense>
  );
}