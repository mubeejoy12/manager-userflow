"use client";

import DatePicker from "react-datepicker";
import AttendanceTable from "../components/AttendanceTable";
import DashboardLayout from "../components/DashboardLayout";
import { useState, useRef } from "react";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

export default function AttendancePage() {
  const [selectedDate, setSelectedDate] = useState(
    new Date("2025-06-16T11:50:00")
  ); // Updated to current time
  const datePickerRef = useRef(null);

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const handleIconClick = (e) => {
    e.preventDefault();
    datePickerRef.current.setOpen(true); // Open the date picker
  };

  // Data for Present Summary and Total Summary
  const summaryData = {
    present: [
      {
        label: "On time",
        value: 200,
        delta: "+12 vs Yesterday",
        color: "green",
      },
      {
        label: "Late clock-in",
        value: 45,
        delta: "-12 vs Yesterday",
        color: "red",
      },
      {
        label: "Early clock-in",
        value: 220,
        delta: "+10 vs Yesterday",
        color: "green",
      },
      { label: "Absent", value: 65, delta: "+9 vs Yesterday", color: "red" },
      {
        label: "No clock-in",
        value: 34,
        delta: "-1 vs Yesterday",
        color: "red",
      },
      {
        label: "No clock-out",
        value: 0,
        delta: "0 vs Yesterday",
        color: "green",
      },
    ],
    total: [
      {
        label: "Present",
        value: 2340,
        delta: "+30 vs last month",
        color: "green",
      },
      { label: "Absent", value: 230, delta: "-12 vs last month", color: "red" },
      {
        label: "Day off",
        value: 265,
        delta: "+12 vs last month",
        color: "green",
      },
    ],
  };
  return (
    <DashboardLayout>
      <header className="bg-white p-4 flex justify-between items-center mb-3 ">
        <h1
          className="text-gray-800"
          style={{
            fontFamily: "Outfit, sans-serif",
            fontWeight: 500,
            fontSize: "38px",
            lineHeight: "57px",
            letterSpacing: "0%",
          }}
        >
          Attendance
        </h1>
        <div className="relative">
          <DatePicker
            ref={datePickerRef}
            selected={selectedDate}
            onChange={handleDateChange}
            className="border rounded px-2 py-1 w-40 pr-8"
            customInput={<input />}
          />
          <ExpandMoreIcon
            className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-600 cursor-pointer"
            style={{ fontSize: "20px" }}
            onClick={handleIconClick}
          />
        </div>
      </header>

      {/* Summary Section */}
      <section className="bg-white p-2  mb-3">
        <div className="flex justify-between gap-6 ">
          <div className="p-2]">
            <h2
              className="text-gray-700"
              style={{
                fontFamily: "Outfit, sans-serif",
                fontWeight: 500,
                fontSize: "16px",
                lineHeight: "24px",
                letterSpacing: "0%",
              }}
            >
              Present Summary
            </h2>
            <div className="flex flex-row gap-2 mt-1">
              {summaryData.present.map((item, index) => (
                <div key={index} className="flex items-center">
                  <div className="text-center">
                    <p className="text-sm text-gray-600">{item.label}</p>
                    <p className="text-xl font-bold">{item.value}</p>
                    <p className={`text-sm text-${item.color}-600`}>
                      {item.delta}
                    </p>
                  </div>
                  {index < summaryData.present.length - 1 && (
                    <span className="text-gray-400 mx-2">|</span>
                  )}
                </div>
              ))}
            </div>
          </div>
          <div>
            <h2
              className="text-gray-700"
              style={{
                fontFamily: "Outfit, sans-serif",
                fontWeight: 500,
                fontSize: "16px",
                lineHeight: "24px",
                letterSpacing: "0%",
              }}
            >
              Total Summary
            </h2>
            <div className="flex flex-row items-center gap-2 mt-1">
              {summaryData.total.map((item, index) => (
                <div key={index} className="flex items-center">
                  <div className="text-center">
                    <p className="text-sm text-gray-600">{item.label}</p>
                    <p className="text-xl font-bold">{item.value}</p>
                    <p className={`text-sm text-${item.color}-600`}>
                      {item.delta}
                    </p>
                  </div>
                  {index < summaryData.total.length - 1 && (
                    <span className="text-gray-400 mx-2">|</span>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* <!-- Attendance Table Section --> */}
      <AttendanceTable />
    </DashboardLayout>
  );
}
