"use client";

import { useState } from "react";
import { TextField, Button, Typography } from "@mui/material";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleLogin = (e) => {
    e.preventDefault();

    // ✨ Hardcoded credentials
    const defaultEmail = "testuser@example.com";
    const defaultPassword = "password123";

    if (email === defaultEmail && password === defaultPassword) {
      // Simulate storing a session
      localStorage.setItem("user", JSON.stringify({ email }));
      router.push("/overview");
    } else {
      alert("Invalid credentials. Try using testuser@example.com / password123");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-sm bg-white p-6 rounded-lg shadow-md">
        <Typography variant="h5" className="mb-8 font-semibold">
          Welcome Back
        </Typography>

        <form onSubmit={handleLogin} className="space-y-4 mt-4 flex flex-col gap-4">
          <TextField
            label="Email"
            type="email"
            fullWidth
            variant="outlined"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            label="Password"
            type="password"
            fullWidth
            variant="outlined"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button type="submit" variant="contained" fullWidth color="primary">
            Login
          </Button>
        </form>

        <Typography className="text-sm mt-4">
          Try <strong>testuser@example.com</strong> / <strong>password123</strong>
        </Typography>

        <Typography className="text-sm mt-4">
          Don’t have an account?{" "}
          <Link href="/signup" className="text-blue-600 hover:underline">
            Sign up
          </Link>
        </Typography>
      </div>
    </div>
  );
}
