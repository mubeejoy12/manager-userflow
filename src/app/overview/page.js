"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import DashboardLayout from "../components/DashboardLayout";

export default function OverviewPage() {
  const [showID, setShowID] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (!user) {
      router.push("/login");
    }
  }, []);

  const toggleID = () => setShowID((prev) => !prev);
  // 👉 Work Details Data
  const workDetails = [
    { label: "Department", value: "HR Department" },
    { label: "Phone", value: "+234 9045674567" },
    { label: "Email", value: "johnsmith@gmail.com" },
    { label: "Nationality", value: "Nigeria" },
    { label: "Date of Birth", value: "02-05-1999" },
    { label: "Marital Status", value: "Single" },
    { label: "Gender", value: "Male" },
    { label: "City", value: "Ibadan" },
    { label: "State", value: "Oyo" },
    { label: "Work Mode", value: "Remote" },
    { label: "Address", value: "123 Main Street, Cityville" },
    { label: "Earnings", value: "₦650,000" },
  ];

  // 👉 Activity Logs
  const activityLogs = [
    {
      title: "Check Out",
      time: "May 23, 6:30pm",
      description: "You have successfully checked out.",
      type: "checkout",
    },
    {
      title: "Approved",
      time: "May 23, 6:30pm",
      description: "This is a verified completed task.",
      type: "approved",
    },
    {
      title: "Check In",
      time: "May 23, 8:50am",
      description: "You have successfully checked in.",
      type: "checkin",
    },
  ];

  const getTitleColor = (type) => {
    switch (type) {
      case "checkout":
        return "text-red-600";
      case "approved":
        return "text-yellow-600";
      case "checkin":
        return "text-green-600";
      default:
        return "text-gray-800";
    }
  };

  return (
    <DashboardLayout>
      {/* 👉 Profile Header */}
      <div className="flex items-center justify-between rounded-lg p-4">
        <div className="flex items-center gap-6">
          <Image
            src="/Ellipse586.png"
            alt="User"
            width={45}
            height={45}
            className="rounded-full object-cover"
          />
          <div className="w-px h-6 bg-gray-300" />
          <div>
            <h2 className="text-xl font-semibold text-gray-900">
              Blessing Awoyemi
            </h2>
            <p className="text-sm text-gray-500 font-light">HR Director</p>
          </div>
        </div>
        <button className="border border-orange-400 text-orange-500 px-4 py-1 rounded-full text-sm font-medium">
          Employee
        </button>
      </div>

      {/* 👉 Overview Section */}
      <div className="p-4 w-full ml-1">
        <div>
          <h2 className="text-xl font-semibold text-gray-900">Overview</h2>
          <p className="text-sm text-gray-500">Date Joined: 13 May 2021</p>
        </div>

        <div className="rounded-lg p-4 space-y-3 w-full flex flex-row justify-between border-b border-gray-200">
          <div>
            <h3 className="text-base font-medium text-gray-700">Attendance</h3>
            <p className="text-xl font-semibold text-gray-900">14/16</p>
            <p className="text-sm text-green-600 font-light">
              +2 since last month ↑ 8%
            </p>
          </div>

          <div className="flex items-center gap-4">
            <div className="w-px h-20 bg-gray-300" />
            <div>
              <h3 className="text-base font-medium text-gray-700">
                Working Hours
              </h3>
              <p className="text-xl font-semibold text-gray-900">2,780 H</p>
              <p className="text-sm text-green-600 font-light">
                +1 since last month ↑ 2%
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="w-px h-20 bg-gray-300" />
            <div>
              <h3 className="text-base font-medium text-gray-700">Appraisal</h3>
              <p className="text-xl font-semibold text-gray-900">210</p>
              <p className="text-sm text-red-500 font-light">
                –2 since last month ✗ 1%
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* 👉 Work Details */}
      <div className="w-full p-2 bg-white rounded-lg space-y-4">
        <div className="flex items-center justify-between border-b border-gray-200 p-4">
          <div className="flex items-center gap-2">
            <h2 className="text-[20px] leading-[30px] font-medium font-outfit">
              Work Details
            </h2>
            <button className="text-green-600 bg-green-50 border border-green-200 text-sm rounded-md px-3 py-0 font-medium">
              Confirmed
            </button>
          </div>
          <div className="flex items-center gap-6 mt-2">
            <span className="text-sm text-gray-600 font-medium">
              Employee ID:{" "}
              <span className="font-semibold">
                {showID ? "EMP-4721XA" : "**********"}
              </span>
            </span>

            <button
              onClick={toggleID}
              className="text-sm text-gray-500 border border-gray-300 rounded-md px-3 py-1 hover:bg-gray-100 transition"
            >
              {showID ? "Hide" : "Show"}
            </button>
          </div>
        </div>

        {/* 👉 Work Details Grid */}
        <div className="divide-gray-200 border-gray-200 border-b p-2">
          <div className="grid grid-cols-3 gap-6 py-3">
            {workDetails.map((item, index) => (
              <div key={index}>
                <p className="text-sm text-gray-500">{item.label}</p>
                <p className="text-sm font-medium text-gray-900">
                  {item.value}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 👉 Employee Activity */}
      <div className="w-full p-6 bg-white space-y-6 border-b border-gray-200">
        <h2 className="text-[20px] font-medium text-gray-900 leading-[30px] font-outfit border-b border-gray-200 pb-2">
          Employee Activity
        </h2>

        <div className="space-y-6">
          {activityLogs.map((log, index) => (
            <div key={index} className="space-y-1 border-b border-gray-200 p-2">
              <p className={`text-sm font-semibold ${getTitleColor(log.type)}`}>
                {log.title}{" "}
                <span className="text-gray-500 font-normal">{log.time}</span>
              </p>

              <p className="text-sm text-gray-600">{log.description}</p>
            </div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}
