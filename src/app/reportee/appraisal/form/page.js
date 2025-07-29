"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import DashboardLayout from "../../../components/DashboardLayout";

export default function AppraisalForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const userId = searchParams.get("id");
  const appraisalDataString = searchParams.get("appraisal");
  const appraisalData = appraisalDataString ? JSON.parse(appraisalDataString) : null;

  const [formData, setFormData] = useState(appraisalData);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [file, setFile] = useState(null);

  useEffect(() => {
    if (!appraisalData) {
      // Handle case where there is no appraisal data
      router.back();
    }
  }, [appraisalData, router]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Update the status to "In Review"
    const updatedData = { ...formData, status: "In Review", file: file ? file.name : null };

    // In a real app, you would send this data to your backend
    console.log("Submitting appraisal:", updatedData);

    setIsSubmitting(false);

    // Redirect back to the appraisal board
    router.push(`/reportee/appraisal?id=${userId}`);
  };

  const handleComplete = async () => {
    setIsSubmitting(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Update the status to "Completed"
    const updatedData = { ...formData, status: "Completed", file: file ? file.name : null };

    // In a real app, you would send this data to your backend
    console.log("Completing appraisal:", updatedData);

    setIsSubmitting(false);

    // Redirect back to the appraisal board
    router.push(`/reportee/appraisal?id=${userId}`);
  };

  if (!formData) {
    return null; // Or a loading spinner
  }

  return (
    <DashboardLayout>
      <div className="p-6">
        <h1 className="text-2xl font-semibold mb-4">Appraisal Form</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Objective</label>
            <p className="mt-1 p-2 border rounded bg-gray-100">{formData.objective}</p>
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Monthly Key Performance</label>
            <ul className="mt-1 list-disc list-inside">
              {formData.kpis.map((kpi, index) => (
                <li key={index}>{kpi}</li>
              ))}
            </ul>
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Employee Rating</label>
            <p className="mt-1 p-2 border rounded bg-gray-100">{formData.employeeRating}/10</p>
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Employee Comment</label>
            <p className="mt-1 p-2 border rounded bg-gray-100">{formData.employeeComment}</p>
          </div>
          <div className="mb-4">
            <label htmlFor="lineManagerGrade" className="block text-sm font-medium text-gray-700">Line Manager Grade</label>
            <input
              type="number"
              id="lineManagerGrade"
              name="lineManagerGrade"
              value={formData.lineManagerGrade || ""}
              onChange={handleChange}
              className="mt-1 block w-full p-2 border rounded-md"
              min="0"
              max="10"
              disabled={formData.status === 'Completed'}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="lineManagerComment" className="block text-sm font-medium text-gray-700">Line Manager Comment</label>
            <textarea
              id="lineManagerComment"
              name="lineManagerComment"
              value={formData.lineManagerComment || ""}
              onChange={handleChange}
              className="mt-1 block w-full p-2 border rounded-md"
              rows="4"
              disabled={formData.status === 'Completed'}
            ></textarea>
          </div>
          <div className="mb-4">
            <label htmlFor="file" className="block text-sm font-medium text-gray-700">Attach File</label>
            <input
              type="file"
              id="file"
              name="file"
              onChange={handleFileChange}
              className="mt-1 block w-full p-2 border rounded-md"
              disabled={formData.status === 'Completed'}
            />
          </div>
          <div className="flex justify-end gap-4">
            {formData.status !== 'Completed' && (
              <>
                <button
                  type="submit"
                  className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Submitting..." : "Submit Feedback"}
                </button>
                <button
                  type="button"
                  onClick={handleComplete}
                  className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Completing..." : "Complete Appraisal"}
                </button>
              </>
            )}
            <button
              type="button"
              onClick={() => router.back()}
              className="bg-gray-300 text-gray-800 px-4 py-2 rounded-md hover:bg-gray-400"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </DashboardLayout>
  );
}
