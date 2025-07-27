"use client";

import { createContext, useState, useContext } from "react";

// Create the context
const AlertContext = createContext();

// Provider component
export const AlertProvider = ({ children }) => {
  const [alert, setAlert] = useState({ message: "", type: "" });

  const showAlert = (message, type = "info") => {
    setAlert({ message, type });

    // Auto-clear after 2 seconds
    setTimeout(() => {
      setAlert({ message: "", type: "" });
    }, 2000);
  };

  return (
    <AlertContext.Provider value={{ alert, showAlert }}>
      {children}
    </AlertContext.Provider>
  );
};

// Custom hook to use the alert context
export const useAlert = () => {
  const context = useContext(AlertContext);
  if (!context) {
    throw new Error("useAlert must be used within an AlertProvider");
  }
  return context;
};
