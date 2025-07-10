import Image from "next/image";
import "./globals.css";
// app/components/DashboardLayout.tsx
import ClientLayout from "./ClientLayout";
// import { useState } from "react";

export const metadata = {
  title: "Sinkronis",
  description: "Signup to get started",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <ClientLayout>
          <div >
       
            {/* Add dashboard-specific styles */}
            {children}
          </div>
        </ClientLayout>
      </body>
    </html>
  );
}
