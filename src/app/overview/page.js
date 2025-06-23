import Image from "next/image";
import DashboardLayout from "../components/DashboardLayout";
import { Button } from "@mui/material";
// import DashboardLayout from '../../components/DashboardLayout';

export default function OverviewPage() {
  return (
    <DashboardLayout>
      {/* 👉 Top profile section here */}
      <div className="flex items-center justify-between  rounded-lg p-2  ">
        {/* Left: Profile Info */}
        <div className="flex items-center gap-6">
          {/* Profile Image */}
          <Image
            src="/Ellipse586.png"
            alt="User"
            width={45}
            height={45}
            className="rounded-full object-cover"
          />

          {/* Vertical Divider */}
          <div className="w-px h-6 bg-gray-300" />

          {/* Name & Title */}
          <div>
            <h2 className="text-xl font-semibold text-gray-900">
              Blessing Awoyemi
            </h2>
            <p className="text-sm text-gray-500 font-light">HR Director</p>
          </div>
        </div>

        {/* Right: Employee Button */}
        <button className="border border-orange-400 text-orange-500 px-4 py-1 rounded-full text-sm font-medium">
          Employee
        </button>
      </div>
      {/* end */}
      {/* start */}

      <div className="p-2 w-full">
        {/* Overview + Date */}
        <div>
          <h2 className="text-xl font-semibold text-gray-900">Overview</h2>
          <p className="text-sm text-gray-500">Date Joined: 13 May 2021</p>
        </div>

        {/* Metrics Stack */}
        <div className="rounded-lg p-4 space-y-3 w-full flex flex-row justify-between border-b border-gray-200">
          {/* Attendance */}
          <div>
            <h3 className="text-base font-medium text-gray-700">Attendance</h3>
            <p className="text-xl font-semibold text-gray-900">14/16</p>
            <p className="text-sm text-green-600 font-light">
              +2 since last month ↑ 8%
            </p>
          </div>

          {/* Working Hours */}
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

          {/* Appraisal */}
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
      {/* end  */}
      {/* start */}
      <div className="w-full p-2 bg-white rounded-lg  space-y-4">
        {/* Top Bar: Confirm + Employee ID */}
        <div className="flex items-center justify-between border-b-1 border-gray-200 p-4">
          {/* Left: Confirm Label */}
          <div className="flex items-center gap-2">
            <h2 className="text-[20px] leading-[30px] font-medium text-center font-outfit">
              Work Details
            </h2>
            <button className="text-green-600 bg-green-50 border border-green-200 text-sm rounded-md px-3 py-0 font-medium">
              Confirmed
            </button>
          </div>

          {/* Right: Employee ID and Hide Button */}
          <div className="flex items-center gap-6">
            <span className="text-sm text-gray-600 font-medium">
              Employee ID: <span className="font-semibold">EMP-4721XA</span>
            </span>
            <button className="text-sm text-gray-500 border border-gray-300 rounded-md px-3 py-1 hover:bg-gray-100 transition">
              Hide
            </button>
          </div>
        </div>

        {/* Table Rows */}
      </div>

      <div className="w-full p-4 bg-white rounded-lg space-y-4">
        {/* Top Bar: Confirmed + Employee ID + Hide */}

        {/* Data Grid */}
        <div className=" divide-gray-200 border-gray-200 border-b-1 p-2">
          {/* Row 1 */}
          <div className="grid grid-cols-3 gap-6 py-3">
            <div>
              <p className="text-sm text-gray-500">Department</p>
              <p className="text-sm font-medium text-gray-900">HR Department</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Phone</p>
              <p className="text-sm font-medium text-gray-900">
                +234 9045674567
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Email</p>
              <p className="text-sm font-medium text-gray-900">
                johnsmith@gmail.com
              </p>
            </div>
          </div>

          {/* Row 2 */}
          <div className="grid grid-cols-3 gap-6 py-3">
            <div>
              <p className="text-sm text-gray-500">Nationality</p>
              <p className="text-sm font-medium text-gray-900">Nigeria</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Date of Birth</p>
              <p className="text-sm font-medium text-gray-900">02-05-1999</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Marital Status</p>
              <p className="text-sm font-medium text-gray-900">Single</p>
            </div>
          </div>

          {/* Row 3 */}
          <div className="grid grid-cols-3 gap-6 py-3">
            <div>
              <p className="text-sm text-gray-500">Gender</p>
              <p className="text-sm font-medium text-gray-900">Male</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">City</p>
              <p className="text-sm font-medium text-gray-900">Ibadan</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">State</p>
              <p className="text-sm font-medium text-gray-900">Oyo</p>
            </div>
          </div>

          {/* Row 4 */}
          <div className="grid grid-cols-3 gap-6 py-3">
            <div>
              <p className="text-sm text-gray-500">Work Mode</p>
              <p className="text-sm font-medium text-gray-900">Remote</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Address</p>
              <p className="text-sm font-medium text-gray-900">
                123 Main Street, Cityville
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Earnings</p>
              <p className="text-sm font-medium text-gray-900">₦650,000</p>
            </div>
          </div>
        </div>
      </div>

      {/* end */}
      {/* start */}
      <div className="w-full p-6 bg-white space-y-6  border-b-1 border-gray-200">
        <h2 className="text-[20px] font-medium  text-gray-900 leading-[30px] font-outfit border-b border-gray-200 pb-2">
          Employee Activity
        </h2>

        {/* Activity List */}
        <div className="space-y-6  ">
          {/* Item 1 – Check Out */}
          <div className="space-y-1  border-b-1 border-gray-200  p-2">
            <p className="text-sm font-semibold text-gray-800">
              Check Out{" "}
              <span className="text-gray-500 font-normal">May 23, 6:30pm</span>
            </p>
            <p className="text-sm text-gray-600">
              You have successfully checked out.
            </p>
          </div>

          {/* Item 2 – Approved */}
          <div className="space-y-1  border-b-1 p-2 border-gray-200">
            <p className="text-sm font-semibold text-gray-800">
              Approved{" "}
              <span className="text-gray-500 font-normal">May 23, 6:30pm</span>
            </p>
            <p className="text-sm text-gray-600">
              This is a verified completed task.
            </p>
          </div>

          {/* Item 3 – Check In */}
          <div className="space-y-1">
            <p className="text-sm font-semibold text-gray-800">
              Check In{" "}
              <span className="text-gray-500 font-normal">May 23, 8:50am</span>
            </p>
            <p className="text-sm text-gray-600">
              You have successfully checked in.
            </p>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
