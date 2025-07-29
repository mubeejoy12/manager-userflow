"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useMockAuth } from "./hooks/useMockAuth";
// import { useAuth } from "./context/AuthContext";

export default function Home() {
  const router = useRouter();
  const { user, loading } = useMockAuth();

  useEffect(() => {
    if (loading) return; // wait until auth is ready

    if (user) {
      router.push("/overview");
    } else {
      router.push("/auth/login");
    }
  }, [user, loading, router]);

  return null;
}



