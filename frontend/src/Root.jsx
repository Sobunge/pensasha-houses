// src/Root.jsx
import React, { useState, useEffect } from "react";
import { initAuth } from "./auth";
import App from "./App";
import { NotificationProvider } from "./components/NotificationProvider";
import { AuthProvider } from "./pages/Auth/AuthContext";
import "./loading.css"; // CSS file for loader

function RootContent() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const bootstrapAuth = async () => {
      try {
        await initAuth(); // restore access token if refresh cookie exists
      } finally {
        setLoading(false); // hide loader once done
      }
    };
    bootstrapAuth();
  }, []);

  if (loading) {
    return (
      <div className="loading-screen">
        <div className="spinner"></div>
        <div className="loading-text">Preparing your dashboard...</div>
      </div>
    );
  }

  return <App />;
}

export default function Root() {
  return (
    <NotificationProvider>
      <AuthProvider>
        <RootContent />
      </AuthProvider>
    </NotificationProvider>
  );
}
