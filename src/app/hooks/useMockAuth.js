// src/app/hooks/useMockAuth.js
import { useState } from "react";

const mockUser = {
  name: "Mubeejoy",
  email: "mubeejoy@example.com",
  token: "mock-token-123",
};

export const useMockAuth = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const login = async (loginData) => {
    setLoading(true);
    setError(null);

    // Simulate network delay
    await new Promise((res) => setTimeout(res, 1000));

    if (loginData.email === "test@example.com" && loginData.password === "password") {
      setUser(mockUser);
    } else {
      setError("Invalid credentials");
    }

    setLoading(false);
  };

  const logout = () => {
    setUser(null);
  };

  return {
    user,
    loading,
    error,
    login,
    logout,
  };
};
