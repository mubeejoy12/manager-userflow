import { Suspense } from "react";
import AppraisalForm from "../components/AppraisalForm";
// import AppraisalForm from "@/components/AppraisalForm"; // adjust path as needed

export default function Page() {
  return (
    <Suspense fallback={<div>Loading appraisal form...</div>}>
      <AppraisalForm />
    </Suspense>
  );
}
