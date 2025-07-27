// import "./globals.css";
import ClientShell from "./ClientShell";
import "./globals.css";
import { Geist, Geist_Mono, Outfit } from "next/font/google";
// import ClientLayout from "./ClientLayout";
// import { AuthProvider } from "./context/AuthContext";
// import { AlertProvider } from "./context/AlertContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const outfit = Outfit({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-outfit",
});

export const metadata = {
  title: "Sinkronis",
  description: "Signup to get started",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={outfit.variable}>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ClientShell>{children}</ClientShell>
      </body>
    </html>
  );
}
