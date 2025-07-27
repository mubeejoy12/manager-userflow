"use client";

import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
// import {
//   loginAdmin,
//   registerCompany,
//   forgotPassword,
//   verifyOtp,
//   resetPassword,
//   hrInvite,
//   activateHrAccount,
// } from "../services/authServices";
import { useAuth } from "../context/AuthContext";
import {
  loginAdmin,
  registerCompany,
  forgotPassword,
  verifyOtp,
  resetPassword,
  hrInvite,
  activateHrAccount,
} from "../services/AuthServices";

export function useAuthActions() {
  const { user, setUser, setEmail } = useAuth();
  const router = useRouter();

  // 🔐 Login Mutation
  const login = useMutation(loginAdmin, {
    onSuccess: (response) => {
      if (!response || !response.token) {
        console.error("Invalid login response:", response);
        return;
      }

      const { token, user: loggedInUser } = response;
      localStorage.setItem("token", token);

      console.log("Login successful. Token stored:", token);

      setUser(
        loggedInUser || {
          name: "Demo User",
          email: "demo@example.com",
        }
      );

      router.push("/overview");
    },
    onError: (error) => {
      console.error("Login failed:", error.response?.data?.message || error);
    },
  });

  // 📝 Signup Mutation
  const signUp = useMutation(registerCompany, {
    onSuccess: (response) => {
      const { token, company } = response;
      localStorage.setItem("token", token);
      setUser(company);
      console.log("Signup successful, company:", company);
    },
    onError: (error) => {
      console.error("Signup failed:", error.response?.data?.message || error);
    },
  });

  // 🔐 Forgot Password
  const requestPasswordReset = useMutation(forgotPassword, {
    onSuccess: (response) => {
      console.log("Password reset email sent:", response.message);
    },
    onError: (error) => {
      console.error(
        "Forgot Password failed:",
        error.response?.data?.message || error
      );
    },
  });

  // ✅ OTP Verification
  const verifyOtpMutation = useMutation(verifyOtp, {
    onSuccess: (response) => {
      console.log("OTP verified successfully:", response.message);
    },
    onError: (error) => {
      console.error(
        "OTP verification failed:",
        error.response?.data?.message || error
      );
    },
  });

  // 🔁 Reset Password
  const resetPasswordMutation = useMutation(resetPassword, {
    onSuccess: (response) => {
      console.log("Password reset successful:", response.message);
    },
    onError: (error) => {
      console.error(
        "Password reset failed:",
        error.response?.data?.message || error
      );
    },
  });

  // 👥 HR Invite
  const hrInviteMutation = useMutation(hrInvite, {
    onSuccess: (response) => {
      console.log("HR invited successfully:", response.message);
    },
    onError: (error) => {
      console.error(
        "HR invite failed:",
        error.response?.data?.message || error
      );
    },
  });

  // ✅ Activate HR Account
  const activateHrAccountMutation = useMutation(activateHrAccount, {
    onSuccess: (response) => {
      console.log("HR account activated successfully:", response.message);
    },
    onError: (error) => {
      console.error(
        "HR account activation failed:",
        error.response?.data?.message || error
      );
    },
  });

  // 🌀 Global Loading State
  const loading =
    login.isLoading ||
    signUp.isLoading ||
    requestPasswordReset.isLoading ||
    verifyOtpMutation.isLoading ||
    resetPasswordMutation.isLoading ||
    hrInviteMutation.isLoading ||
    activateHrAccountMutation.isLoading;

  return {
    user,
    login,
    signUp,
    requestPasswordReset,
    verifyOtpMutation,
    resetPasswordMutation,
    hrInviteMutation,
    activateHrAccountMutation,
    loading,
  };
}
