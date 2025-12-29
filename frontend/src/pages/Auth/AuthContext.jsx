// src/pages/Auth/AuthContext.jsx
import React, { createContext, useContext, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  // Initialize from sessionStorage instead of localStorage
  const [user, setUser] = useState(() => {
    const savedUser = sessionStorage.getItem("user");
    return savedUser ? JSON.parse(savedUser) : null;
  });

  // Store redirect path (optional)
  const [redirectAfterAuth, setRedirectAfterAuth] = useState(null);

  const loginAs = (userObj) => {
    setUser(userObj);
    sessionStorage.setItem("user", JSON.stringify(userObj));
  };

  const logout = () => {
    setUser(null);
    sessionStorage.removeItem("user");
    sessionStorage.removeItem("accessToken");
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
