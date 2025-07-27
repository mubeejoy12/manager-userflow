"use client";

import { useState } from "react";

import BackButton from "@/app/components/BackButton";
import { Input } from "@material-tailwind/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useAuth } from "@/app/context/AuthContext";
import { useAuthActions } from "@/app/hooks/useAuth";
import { useAlert } from "@/app/context/AlertContext";
export default function ForgotPassword() {
    const [emailInput, setEmailInput] = useState("");
    const {showAlert } = useAlert();
    const { requestPasswordReset } = useAuthActions();
    const router = useRouter();
    const { setEmail } = useAuth();

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!emailInput) {
            showAlert("Please enter your email", "error")
            return;
        }

        setEmail(emailInput);
        

        requestPasswordReset.mutate({ email:emailInput }, {
            onSuccess: (response) => {
                showAlert("OTP sent to your email",  "success" );
                router.push('/auth/verify-OTP');
                
            },
            onError: (error) => {
                showAlert(error.response?.data?.message || "Failed to send OTP",  "error" );
            },
        });
    };

    return (
        <div className="">
            <div className="p-4">
                <Link href="/" className="cursor-pointer">
                    <Image src="/logo.png" alt="Logo" width={120} height={40} className="object-contain" />
                </Link>
            </div>

            <div className="max-w-xl mx-auto px-4 py-20">
                <BackButton />
                <h1 className="text-4xl font-bold text-center mb-1">Forgot Password</h1>
                <p className="text-md text-gray-600 text-center">Enter your registered email to reset your password</p>


                <form onSubmit={handleSubmit}>
                    <div className="mt-8">
                        <div className="my-4">
                            <Input
                                label="Email"
                                className="w-full h-[52px]"
                                value={emailInput}
                                onChange={(e) => setEmailInput(e.target.value)}
                            />
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-primary text-white px-2 py-4 rounded mt-6"
                            disabled={requestPasswordReset.isLoading}
                        >
                            {requestPasswordReset.isLoading ? "Sending..." : "Send OTP"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
