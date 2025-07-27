"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Input, Spinner } from "@material-tailwind/react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import Link from "next/link";
import Image from "next/image";

import { useMockAuth } from "@/app/hooks/useMockAuth";
import { useAlert } from "@/app/context/AlertContext";
import { useShowPassword } from "@/app/hooks/useShowPassword";
import BackButton from "@/app/components/BackButton";

export default function Login() {
  const router = useRouter();
  const { login, loading } = useMockAuth();
  const { showAlert } = useAlert();
  const { showPassword, handleShowPassword } = useShowPassword();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),
      password: Yup.string()
        .min(6, "Password must be at least 6 characters")
        .required("Password is required"),
    }),
    onSubmit: async (values) => {
      try {
        await login(values);
        showAlert("Login Successful!", "success");
        router.push("/overview");
      } catch (err) {
        showAlert("Login failed. Try again.", "error");
      }
    },
  });

  return (
    <div className="p-2 md:p-0">
      {/* Mobile Logo */}
      <div className="p-4 lg:hidden">
        <Link href="/" className="cursor-pointer">
          <Image
            src="/logo.png"
            alt="Logo"
            width={120}
            height={40}
            className="object-contain"
          />
        </Link>
      </div>

      {/* Main Layout */}
      <div className="h-screen lg:flex lg:items-center justify-center lg:justify-normal">
        {/* Left Side (Logo) */}
        <div className="h-full bg-blue-50 hidden lg:basis-1/2 lg:flex items-center justify-center">
          <Link href={"/"}>
            <Image
              src="/logo.png"
              alt="ERP Solution"
              width={620}
              height={150}
              className="object-contain"
            />
          </Link>
        </div>

        {/* Right Side (Form) */}
        <div className="lg:basis-1/2">
          <div className="max-w-md mx-auto py-24 lg:mt-14 lg:py-20">
            <BackButton />
            <div className="mb-8">
              <h1 className="text-4xl mb-1 text-center">Welcome Back</h1>
              <p className="text-md text-center text-gray-500">
                Login to your account below
              </p>
            </div>

            <form onSubmit={formik.handleSubmit}>
              {/* Email Field */}
              <div className="mb-6">
                <Input
                  label="Email"
                  id="email"
                  name="email"
                  type="email"
                  placeholder="Enter your email"
                  className="w-full p-2 border rounded"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.email}
                />
                {formik.touched.email && formik.errors.email && (
                  <div className="text-red-500 text-sm mt-1">
                    {formik.errors.email}
                  </div>
                )}
              </div>

              {/* Password Field */}
              <div className="mb-4 relative">
                <Input
                  label="Password"
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  className="w-full p-2 border rounded"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.password}
                />
                <span className="absolute top-[10px] right-[25px] cursor-pointer">
                  {showPassword ? (
                    <FaEye
                      color="gray"
                      size={20}
                      onClick={handleShowPassword}
                    />
                  ) : (
                    <FaEyeSlash
                      color="gray"
                      size={20}
                      onClick={handleShowPassword}
                    />
                  )}
                </span>
                <Link href={"/auth/forgot-password"}>
                  <p className="text-gray-800 text-sm text-right capitalize mt-2">
                    Forgot password?
                  </p>
                </Link>
                {formik.touched.password && formik.errors.password && (
                  <div className="text-red-500 text-sm mt-1">
                    {formik.errors.password}
                  </div>
                )}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full bg-blue-600 text-white px-2 py-3 rounded mt-4 hover:bg-blue-700 transition"
                disabled={loading}
              >
                {loading ? <Spinner /> : "Login"}
              </button>

              {/* Footer */}
              <p className="mt-6 text-gray-600 text-center">
                Don&apos;t have an account?{" "}
                <Link href={"/plans"}>
                  <span className="text-blue-600 hover:underline">Get started</span>
                </Link>
              </p>
            </form>
          </div>

          {/* Optional Footer Section */}
         
        </div>
      </div>
    </div>
  );
}
