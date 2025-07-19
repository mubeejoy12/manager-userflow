import "./globals.css";
import { Geist, Geist_Mono } from "next/font/google";
// app/components/DashboardLayout.tsx
import ClientLayout from "./ClientLayout";
import { Outfit } from "next/font/google";
// import { useState } from "react";
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});
export const metadata = {
  title: "Sinkronis",
  description: "Signup to get started",
};
const outfit = Outfit({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"], // Customize as needed
  variable: "--font-outfit",
});

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={outfit.variable}>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ClientLayout>
          <div>
            {/* Add dashboard-specific styles */}
            {children}
          </div>
        </ClientLayout>
      </body>
    </html>
  );
}
