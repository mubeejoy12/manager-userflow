// app/components/ProfileModal.js
"use client";
import { FaPlusCircle } from "react-icons/fa";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function ProfileModal({ isOpen, onClose, user }) {
  const router = useRouter();

  if (!isOpen) return null;

  const handleContainerClick = (e) => {
    e.stopPropagation();
    console.log("Modal container clicked, stopping propagation");
  };

  const name = user ? user.name : "Guest User";
  const email = user ? user.email : "guest@example.com";

  return (
    <div
      className="fixed inset-0 z-50 p-2 bg-black/10 flex justify-center items-start sm:justify-end sm:items-start"
      onClick={() => {
        console.log("Background clicked, closing modal");
        onClose();
      }}
    >
      <div
        className="relative w-full max-w-xs sm:max-w-sm md:max-w-md p-6 bg-white rounded-xl shadow-lg"
        onClick={handleContainerClick}
      >
        {/* Sign Out Button */}
        <div className="flex justify-end mb-8">
          <button
            className="text-sm font-semibold text-red-500 hover:underline"
            onClick={() => console.log("Sign out clicked")}
          >
            Sign out
          </button>
        </div>

        {/* User Info */}
        <div className="flex items-center gap-3 mb-4">
          <Image
            // src="/nav-img.avif"
            src="/Vector.png"
            alt={`${name}'s profile`}
            className="w-16 h-16 rounded-full object-cover"
            width={64}
            height={64}
          />
          <div>
            <h2 className="text-base sm:text-lg font-semibold">{name}</h2>
            <p className="text-sm text-gray-500">{email}</p>
          </div>
        </div>

        <hr className="mb-4" />

        {/* Menu Options */}
        <nav className="space-y-4 text-sm text-gray-700">
          {[
            { label: "View profile", href: "/overview" },

            { label: "Settings", href: "/settings/plan" },
          ].map(({ label, href }) => (
            <p
              key={label}
              className="cursor-pointer hover:text-black transition-colors"
              onClick={() => {
                console.log(`Navigating to ${href}`);
                router.push(href);
              }}
            >
              {label}
            </p>
          ))}
        </nav>

        <hr className="my-4" />

        {/* Sign in with another account */}
        <div
          className="flex items-center gap-2 text-blue-600 cursor-pointer hover:underline"
          onClick={() => {
            localStorage.removeItem("user");
            router.push("/auth/login");
          }}
        >
          <FaPlusCircle />
          <p>Sign in with a different account</p>
        </div>
      </div>
    </div>
  );
}
