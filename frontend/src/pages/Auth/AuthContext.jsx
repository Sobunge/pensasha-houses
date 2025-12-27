// src/pages/Auth/AuthContext.jsx
import React, { createContext, useContext, useState } from "react";

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  // In-memory user state only; no localStorage
  const [user, setUser] = useState(null);

  // Store redirect path after login
  const [redirectAfterAuth, setRedirectAfterAuth] = useState(null);

  // Set user after login or refresh
  const loginAs = (userObj) => {
    setUser(userObj);
  };

  // Logout: clear user state and optionally notify backend
  const logout = async () => {
    try {
      // Optional: call backend to invalidate refresh token
      await fetch("/api/auth/logout", { credentials: "include" });
    } catch {
      // Ignore network errors
    } finally {
      setUser(null);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loginAs,
        logout,
        redirectAfterAuth,
        setRedirectAfterAuth,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
