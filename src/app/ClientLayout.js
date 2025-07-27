// app/components/ClientLayout.js
"use client";

import { useState } from "react";
import Header from "./components/Header";
import ProfileModal from "./components/ProfileModal";
// import Header from "./Header"; // ✅ Uncommented and corrected import
// import ProfileModal from "./ProfileModal"; // ✅ Correct path

export default function ClientLayout({ children }) {
  const [showProfileModal, setShowProfileModal] = useState(false);

  const handleProfileClick = () => {
    console.log("Opening profile modal");
    setShowProfileModal(true);
  };

  const handleCloseModal = () => {
    console.log("Closing profile modal");
    setShowProfileModal(false);
  };

  return (
    <>
      <Header onProfileClick={handleProfileClick} />
      <main>{children}</main>
      <ProfileModal
        isOpen={showProfileModal}
        onClose={handleCloseModal}
        user={{ name: "Chloe Davis", email: "chloe@example.com" }}
      />
    </>
  );
}
