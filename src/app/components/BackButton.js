"use client";

import { FaArrowLeft } from "react-icons/fa";
import { useRouter } from "next/navigation";

export default function BackButton() {
  const router = useRouter();

  const handleGoBack = () => {
    if (window.history.length > 1) {
      router.back();
    } else {
      router.push("/");
    }
  };

  return (
    <button onClick={handleGoBack} className="w-20 mb-6">
      <div className="flex items-center gap-2 px-2 py-2">
        <FaArrowLeft className="text-primary" size={24} />
        <span className="text-md text-gray-700">Back</span>
      </div>
    </button>
  );
}
