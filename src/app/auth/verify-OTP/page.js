// "use client";

// import { useState, useEffect } from "react";
// import { useAuthActions } from "@/app/hooks/useAuth";
// import { useAlert } from "@/app/context/AlertContext";
// import { useRouter } from "next/navigation";
// import dynamic from "next/dynamic";
// import Link from "next/link";
// import BackButton from "@/app/components/BackButton";
// import { useAuth } from "@/app/context/AuthContext";
// import Image from "next/image";

// const OtpForm = dynamic(() => import("@/app/components/OtpForm"), { ssr: false });

// export default function VerifyOTP() {
//   const { showAlert } = useAlert();
//   const { verifyOtpMutation } = useAuthActions();
//   const router = useRouter();
//   const { email } = useAuth;

//   const handleOtpSubmit = (otpCode) => {
//     console.log("OTP Submitted:", otpCode);

//     if (!otpCode.trim()) {
//       showAlert("Please enter the OTP", "error");
//       return;
//     }
//     if (!verifyOtpMutation || !verifyOtpMutation.mutate) {
//       console.error("verifyOtp is undefined or does not have mutate()");
//       return;
//     }

//     verifyOtpMutation.mutate(
//       { email, otp: otpCode },
//       {
//         onSuccess: () => {
//           console.log("OTP Verified! Navigating to reset-password...");
//           showAlert("OTP verified successfully!", "success");
//           router.push("/auth/reset-password");
//         },
//         onError: (error) => {
//           console.error("OTP verification failed:", error);
//           showAlert(error.response?.data?.message || "Invalid OTP", "error");
//         },
//       }
//     );
//   };

//   return (
//     <div>
//       <div className="p-4">
//         <Link href="/" className="cursor-pointer">
//           <Image
//             src="/logo.png"
//             alt="Logo"
//             width={120}
//             height={40}
//             className="object-contain"
//           />
//         </Link>
//       </div>

//       <div className="max-w-xl mx-auto px-4 py-20">
//         <BackButton />

//         <h1 className="text-4xl font-bold text-center mb-1">
//           OTP Verification
//         </h1>
//         <p className="text-md text-gray-600 text-center">
//           Please enter the 6-digit code sent to your mail
//         </p>

//         {/* OTP Form */}
//         <OtpForm length={6} onVerify={handleOtpSubmit} />

//         <p className="mt-1 text-gray-600 text-center">
//           Didn&apos;t get a code?{" "}
//           <span className="text-red-500 cursor-pointer">Click to resend</span>
//         </p>
//       </div>
//     </div>
//   );
// }