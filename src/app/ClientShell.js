"use client";

import ClientLayout from "./ClientLayout";
import { AuthProvider } from "./context/AuthContext";
import { AlertProvider } from "./context/AlertContext";
import { usePathname } from "next/navigation";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React from "react";

export default function ClientShell({ children }) {
  const pathname = usePathname();
  const isAuthRoute = pathname.startsWith("/auth");

  // Initialize QueryClient using useRef for stability across renders
  const queryClientRef = React.useRef();
  if (!queryClientRef.current) {
    queryClientRef.current = new QueryClient();
  }

  return (
    <QueryClientProvider client={queryClientRef.current}>
      <AuthProvider>
        <AlertProvider>
          {isAuthRoute ? children : <ClientLayout>{children}</ClientLayout>}
        </AlertProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}