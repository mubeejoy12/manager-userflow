"use client";

import { TextField, Button, Typography } from "@mui/material";
import Link from "next/link";

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-sm bg-white p-6 rounded-lg shadow-md">
        <Typography variant="h5" className="mb-8  font-semibold">
          Welcome Back
        </Typography>

        <form className="space-y-4 mt-4 flex flex-col gap-4">
          <TextField label="Email" type="email" fullWidth variant="outlined" />
          <TextField
            label="Password"
            type="password"
            fullWidth
            variant="outlined"
          />
          <Button variant="contained" fullWidth color="primary">
            Login
          </Button>
        </form>

        <Typography className="text-sm mt-4 ">
          Don’t have an account?{" "}
          <Link href="/signup" className="text-blue-600 hover:underline">
            Sign up
          </Link>
        </Typography>
      </div>
    </div>
  );
}
