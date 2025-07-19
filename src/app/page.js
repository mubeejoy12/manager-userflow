"use client"; 


import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      router.push("/overview");
    } else {
      router.push("/login");
    }
  }, []);

  return null;
}


