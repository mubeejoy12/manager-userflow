"use client";

import ClientLayout from "./ClientLayout";
import { AuthProvider } from "./context/AuthContext";
import { AlertProvider } from "./context/AlertContext";
import { usePathname } from "next/navigation";

export default function ClientShell({ children }) {
  const pathname = usePathname();
  const isAuthRoute = pathname.startsWith("/auth");

  return (
    <AuthProvider>
      <AlertProvider>
        {isAuthRoute ? children : <ClientLayout>{children}</ClientLayout>}
      </AlertProvider>
    </AuthProvider>
  );
}
