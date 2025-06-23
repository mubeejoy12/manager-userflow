"use client";

import React, { useState } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  MenuItem,
  Grid,
  InputAdornment,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import DashboardLayout from "./DashboardLayout";

// Placeholder for CalendarIcon (replace with actual icon)
function CalendarIcon() {
  return <span>📅</span>; // Temporary placeholder
}

export default function QueryForm({ onSubmit, onCancel, tab }) {
  const [formData, setFormData] = useState({
    empId: "",
    name: "",
    role: "",
    dept: "",
    type: "",
    status: "",
    suspensionReason: "",
    fromDate: null,
    toDate: null,
    note: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleDateChange = (field) => (date) => {
    setFormData((prev) => ({ ...prev, [field]: date }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const submissionData = {
      empId: formData.empId,
      name: formData.name,
      role: formData.role,
      dept: formData.dept,
      status: formData.status,
      ...(tab === 0
        ? { type: formData.type, note: formData.note }
        : {
            suspensionReason: formData.suspensionReason,
            fromDate: formData.fromDate?.toISOString().split("T")[0] || "",
            toDate: formData.toDate?.toISOString().split("T")[0] || "",
          }),
    };
    onSubmit(submissionData);
  };

  const inputStyle = {
    height: 56,
    borderRadius: 4,
    borderWidth: 1,
    paddingTop: 16,
    paddingRight: 14,
    paddingBottom: 16,
    paddingLeft: 14,
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderWidth: 1,
      },
    },
  };

  return (
    <DashboardLayout>
      <Box p={2}> 
        <Typography variant="h4" className="font-bold" gutterBottom>
          {tab === 0 ? "Add New Query" : "Add New Suspension"}
        </Typography>
        <Box py={4}>
          <form onSubmit={handleSubmit}>
            {/* Employee ID and Name */}
            <div className="flex flex-row gap-8 mb-8">
              <TextField
                sx={{ width: "381px" }}
                name="empId"
                label="Employee ID"
                value={formData.empId}
                onChange={handleChange}
                required
              />
              <TextField
                sx={{ width: "381px" }}
                name="name"
                label="Employee Name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>

            {/* Role and Department */}
            <div className="flex flex-row gap-8 mb-8">
              <TextField
                sx={{ width: "381px" }}
                name="role"
                label="Role"
                value={formData.role}
                onChange={handleChange}
                required
              />
              <TextField
                sx={{ width: "381px" }}
                name="dept"
                label="Department"
                value={formData.dept}
                onChange={handleChange}
                select
                required
                SelectProps={{ displayEmpty: true }}
              >
                <MenuItem value="" disabled></MenuItem>
                <MenuItem value="IT Department">IT Department</MenuItem>
                <MenuItem value="Service Department">
                  Service Department
                </MenuItem>
                <MenuItem value="Freelance Department">
                  Freelance Department
                </MenuItem>
                <MenuItem value="Specialist Department">
                  Specialist Department
                </MenuItem>
              </TextField>
            </div>

            {/* Query Type/Suspension Reason and Status */}
            <div className="flex flex-row gap-8 mb-8">
              {tab === 0 ? (
                <TextField
                  sx={{ width: "381px" }}
                  name="type"
                  label="Query Type"
                  value={formData.type}
                  onChange={handleChange}
                  select
                  required
                  SelectProps={{ displayEmpty: true }}
                >
                  <MenuItem value="" disabled></MenuItem>
                  <MenuItem value="Performance-Related">
                    Performance-Related
                  </MenuItem>
                  <MenuItem value="Compliance-Related">
                    Compliance-Related
                  </MenuItem>
                  <MenuItem value="Financial">Financial</MenuItem>
                  <MenuItem value="Operational">Operational</MenuItem>
                  <MenuItem value="Workplace Incident">
                    Workplace Incident
                  </MenuItem>
                </TextField>
              ) : (
                <TextField
                  sx={{ width: "381px" }}
                  name="suspensionReason"
                  label="Suspension Reason"
                  value={formData.suspensionReason}
                  onChange={handleChange}
                  select
                  required
                  SelectProps={{ displayEmpty: true }}
                >
                  <MenuItem value="" disabled></MenuItem>
                  <MenuItem value="Misconduct">Misconduct</MenuItem>
                  <MenuItem value="Policy Violation">Policy Violation</MenuItem>
                  <MenuItem value="Repeated Tardiness">
                    Repeated Tardiness
                  </MenuItem>
                  <MenuItem value="Unauthorized Absence">
                    Unauthorized Absence
                  </MenuItem>
                  <MenuItem value="Equipment Damage">Equipment Damage</MenuItem>
                </TextField>
              )}
              <TextField
                sx={{ width: "381px" }}
                name="status"
                label="Status"
                value={formData.status}
                onChange={handleChange}
                select
                required
                SelectProps={{ displayEmpty: true }}
              >
                <MenuItem value="" disabled></MenuItem>
                <MenuItem value="Open">Open</MenuItem>
                <MenuItem value="In Progress">In Progress</MenuItem>
                <MenuItem value="Resolved">Resolved</MenuItem>
                <MenuItem value="Active">Active</MenuItem>
                <MenuItem value="Lifted">Lifted</MenuItem>
              </TextField>
            </div>

            {/* From and To Dates (only for Suspension) */}
            {tab === 1 && (
              <div className="flex flex-row gap-8 mb-8">
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <DatePicker
                    label="From"
                    value={formData.fromDate}
                    onChange={handleDateChange("fromDate")}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        sx={{ ...inputStyle, width: "381px" }}
                        InputProps={{
                          endAdornment: (
                            <InputAdornment position="end">
                              <CalendarIcon />
                            </InputAdornment>
                          ),
                        }}
                      />
                    )}
                  />
                </LocalizationProvider>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <DatePicker
                    label="To"
                    value={formData.toDate}
                    onChange={handleDateChange("toDate")}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        sx={{ ...inputStyle, width: "381px" }}
                        InputProps={{
                          endAdornment: (
                            <InputAdornment position="end">
                              <CalendarIcon />
                            </InputAdornment>
                          ),
                        }}
                      />
                    )}
                  />
                </LocalizationProvider>
              </div>
            )}

            {/* Add Note (only for Query) */}
            {tab === 0 && (
              <Grid item xs={12} mb={8}>
                <TextField
                  sx={{ width: "381px" }}
                  name="note"
                  label="Add Note"
                  value={formData.note}
                  onChange={handleChange}
                  required
                />
              </Grid>
            )}

            {/* Buttons */}
            <Box mt={16} display="flex" justifyContent="flex-end" gap={2}>
              <Button variant="outlined" onClick={onCancel}>
                Cancel
              </Button>
              <Button variant="contained" color="primary" type="submit">
                Save
              </Button>
            </Box>
          </form>
        </Box>
      </Box>
    </DashboardLayout>
  );
}
