"use client";

import { useState } from "react";
import {
  TextField,
  Button,
  Typography,
  IconButton,
  InputAdornment,
} from "@mui/material";
import { Visibility, VisibilityOff, ArrowBack } from "@mui/icons-material";
import Link from "next/link";

export default function CreatePassword() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const toggleVisibility = () => setShowPassword((prev) => !prev);
  const toggleConfirmVisibility = () => setShowConfirm((prev) => !prev);

  return (
    <div className="w-[592px] h-[558px] p-[40px] gap-[30px] rounded-[8px] bg-white mt-27 mx-auto">
      <div className="w-full max-w-md">
        {/* Back Button */}
        <Link href="/signup">
          <IconButton>
            <ArrowBack />
          </IconButton>
          Back
        </Link>

        {/* Heading */}
        <Typography
          variant="h5"
          className="font-semibold mt-5 mb-4  "
        >
          Create Password
        </Typography>

        {/* Password instructions */}
        <Typography
          variant="body2"
          className="text-sm text-gray-600 mb-4 "
        >
          Password must be at least 8 characters long, contain at least one
          uppercase letter, one lowercase letter, one digit, and one special
          character.
        </Typography>

        {/* Form */}
        <form className="space-y-4 flex flex-col gap-5 mt-3">
          <TextField
            label="Password"
            variant="outlined"
            type={showPassword ? "text" : "password"}
            fullWidth
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={toggleVisibility} edge="end">
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />

          <TextField
            label="Confirm Password"
            variant="outlined"
            type={showConfirm ? "text" : "password"}
            fullWidth
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={toggleConfirmVisibility} edge="end">
                    {showConfirm ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />

          <Button variant="contained" fullWidth color="primary">
            Continue
          </Button>
        </form>

        {/* Footer */}
        <Typography variant="body2" className=" text-sm mt-6">
          Already have an account?{" "}
          <Link href="/login" className="text-blue-600 hover:underline">
            Login
          </Link>
        </Typography>
      </div>
    </div>
  );
}
