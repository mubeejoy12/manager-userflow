"use client";

import { useState, useRef, useEffect } from "react";
import { MdOutlineFileUpload } from "react-icons/md";
import { Box } from "@mui/material";
import { useRouter } from "next/navigation";
// import { Dashboard } from "@mui/icons-material";
import DashboardLayout from "../components/DashboardLayout";
import { useSearchParams } from "next/navigation";

const ratings = [
  { label: "10/10", value: 10 },
  { label: "9/10", value: 9 },
  { label: "8/10", value: 8 },
  { label: "7/10", value: 7 },
  { label: "6/10", value: 6 },
  { label: "5/10", value: 5 },
  { label: "4/10", value: 4 },
  { label: "3/10", value: 3 },
  { label: "2/10", value: 2 },
  { label: "1/10", value: 1 },
];

function getColor(value) {
  if (value >= 8) return "bg-green-500";
  if (value >= 5) return "bg-orange-500";
  return "bg-red-500";
}

function ColoredRatingSelect({ label, selectedValue, onChange }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (ref.current && !ref.current.contains(event.target)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const selected = ratings.find((r) => r.value === selectedValue) || ratings[0];

  return (
    <div className="relative w-full mb-4" ref={ref}>
      <label className="block font-medium mb-2">{label}</label>
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="w-full border p-2 rounded flex items-center gap-2 justify-between"
      >
        <span className="flex items-center gap-2">
          <span
            className={`inline-block w-2 h-2 rounded-full ${getColor(
              selected.value
            )}`}
            style={{ width: 8, height: 8, borderRadius: 50 }}
          ></span>
          {selected.label}
        </span>
        <svg
          className={`w-4 h-4 transform transition-transform ${
            open ? "rotate-180" : "rotate-0"
          }`}
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M19 9l-7 7-7-7"
          ></path>
        </svg>
      </button>
      {open && (
        <ul className="absolute z-10 mt-1 max-h-48 w-full overflow-auto rounded border bg-white shadow-lg">
          {ratings.map(({ label, value }) => (
            <li
              key={value}
              onClick={() => {
                onChange(value);
                setOpen(false);
              }}
              className="cursor-pointer px-3 py-2 flex items-center gap-2 hover:bg-gray-100"
            >
              <span
                className={`inline-block ${getColor(value)}`}
                style={{ width: 8, height: 8, borderRadius: 50 }}
              ></span>
              {label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default function AppraisalPage() {
  const [kpis, setKpis] = useState([]);
  const [newKpi, setNewKpi] = useState("");
  const [objective, setObjective] = useState(
    "Customer Service/Compliance with Road Safety"
  );
  const [employeeRating, setEmployeeRating] = useState(10);
  const [employeeComments, setEmployeeComments] = useState("");
  const [lineManagerGrade, setLineManagerGrade] = useState(7);
  const [lineManagerComments, setLineManagerComments] = useState("");
  const [file, setFile] = useState(null);
  const router = useRouter();
  const [appraisals, setAppraisals] = useState([]);
  const searchParams = useSearchParams();
  const employeeId = searchParams.get("employeeId");
  const employeeName = searchParams.get("name");

  const handleAddKpi = () => {
    if (newKpi.trim()) {
      setKpis([...kpis, newKpi]);
      setNewKpi("");
    }
  };

  const handleRemoveKpi = (index) => {
    const updated = [...kpis];
    updated.splice(index, 1);
    setKpis(updated);
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
    }
  };

  const handleSubmit = () => {
    const appraisalData = {
      objective,
      kpis,
      employeeRating,
      employeeComments,
      lineManagerGrade,
      lineManagerComments,
      fileName: file ? file.name : null,
    };

    try {
      // Safely retrieve existing data
      const existingDataRaw = localStorage.getItem("appraisalDataList");
      const existingData = Array.isArray(JSON.parse(existingDataRaw))
        ? JSON.parse(existingDataRaw)
        : [];

      // Save updated data
      const updatedData = [...existingData, ...appraisals];
      localStorage.setItem("appraisalDataList", JSON.stringify(updatedData));

      // Navigate to the board page
      router.push("/appraisal/appraisal-board");
    } catch (error) {
      console.error("Failed to submit appraisal:", error);
    }
  };

  const handleAddNew = () => {
    const entry = {
      employeeId,
      employeeName,
      objective,
      kpis,
      employeeRating,
      employeeComments,
      lineManagerGrade,
      lineManagerComments,
      fileName: file ? file.name : null,
    };

    try {
      const existingDataRaw = localStorage.getItem("appraisalDataList");
      const existingData = Array.isArray(JSON.parse(existingDataRaw))
        ? JSON.parse(existingDataRaw)
        : [];

      const updatedData = [...existingData, entry];
      localStorage.setItem("appraisalDataList", JSON.stringify(updatedData));
      alert("Appraisal added successfully!");
    } catch (error) {
      console.error("Failed to add appraisal:", error);
    }

    // Clear form
    setObjective("");
    setKpis([]);
    setNewKpi("");
    setEmployeeRating(10);
    setEmployeeComments("");
    setLineManagerGrade(7);
    setLineManagerComments("");
    setFile(null);
  };

  return (
    <DashboardLayout>
      {" "}
      <Box
        sx={{
          height: "calc(80vh - 64px)",
          overflowY: "auto",
          padding: "1.5rem",
        }}
      >
        <div className="w-[781px]">
          <h1
            className="mb-6"
            style={{
              fontFamily: "'Outfit', sans-serif",
              fontWeight: 600,
              fontSize: "38px",
              lineHeight: "57px",
            }}
          >
            Appraisal
          </h1>

          <div className="space-y-6">
            {/* Objective */}
            <div>
              <label className="block font-medium mb-2">Objective</label>
              <input
                type="text"
                value={objective}
                onChange={(e) => setObjective(e.target.value)}
                placeholder="Enter your performance objective"
                className="w-full p-3 border rounded-md"
              />
            </div>

            {/* Monthly KPIs */}
            <div>
              <label className="block font-medium mb-2">
                Monthly Key Performance Indicators
              </label>
              <div className="flex gap-2 mb-2">
                <input
                  type="text"
                  value={newKpi}
                  onChange={(e) => setNewKpi(e.target.value)}
                  placeholder="Add task"
                  className="flex-grow p-2 border rounded"
                />
                <button
                  type="button"
                  onClick={handleAddKpi}
                  className="bg-blue-500 text-white px-4 py-2 rounded"
                >
                  Add
                </button>
              </div>
              <ul className="list-disc pl-5 space-y-1">
                {kpis.map((kpi, index) => (
                  <li
                    key={index}
                    className="flex justify-between items-center border-b pb-1"
                  >
                    <span className="text-xl leading-none mr-2">•</span>
                    <span className="flex-grow text-left">{kpi}</span>
                    <button
                      onClick={() => handleRemoveKpi(index)}
                      className="text-black text-sm font-bold"
                      title="Remove KPI"
                    >
                      ✕
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            <ColoredRatingSelect
              label="Employee Rating"
              selectedValue={employeeRating}
              onChange={setEmployeeRating}
            />

            <div>
              <label className="block font-medium mb-2">
                Employee Comments
              </label>
              <textarea
                className="w-full p-3 border rounded-md"
                rows={3}
                placeholder="Notes"
                value={employeeComments}
                onChange={(e) => setEmployeeComments(e.target.value)}
              ></textarea>
            </div>

            <ColoredRatingSelect
              label="Line Manager’s Grade"
              selectedValue={lineManagerGrade}
              onChange={setLineManagerGrade}
            />

            <div>
              <label className="block font-medium mb-2">
                Line Manager’s Comments
              </label>
              <textarea
                className="w-full p-3 border rounded-md"
                rows={3}
                placeholder="Notes"
                value={lineManagerComments}
                onChange={(e) => setLineManagerComments(e.target.value)}
              ></textarea>
            </div>

            <div className="w-1/2">
              <label className="block font-medium mb-2">Attach File</label>
              <div className="border-dashed border-2 border-gray-300 p-4 rounded flex items-center gap-4">
                <MdOutlineFileUpload size={50} className="text-blue-500" />
                <div>
                  <p className="text-gray-700 font-medium">Attach File</p>
                  <p className="text-sm text-gray-500">
                    Max Size: 20MB | .png, .jpeg, .pdf, .csv
                  </p>
                </div>
                <input
                  type="file"
                  className="hidden"
                  id="fileUpload"
                  onChange={handleFileChange}
                />
                <label
                  htmlFor="fileUpload"
                  className="text-blue-500 cursor-pointer"
                >
                  Browse
                </label>
              </div>
            </div>

            <div className="flex gap-4 justify-end mt-6">
              <button
                className="bg-gray-100 border border-gray-300 text-gray-800 px-6 py-2 rounded"
                onClick={handleAddNew}
              >
                Add New Appraisal
              </button>
              <button
                className="bg-blue-500 text-white px-6 py-2 rounded"
                onClick={handleSubmit}
              >
                Create Appraisal
              </button>
            </div>
          </div>
        </div>
      </Box>
    </DashboardLayout>
  );
}
