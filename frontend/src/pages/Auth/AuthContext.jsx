import React, { createContext, useContext, useState, useEffect } from "react";
import { setLogoutHandler } from "../../api/api"; // <-- import api logout handler

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const savedUser = sessionStorage.getItem("user");
    return savedUser ? JSON.parse(savedUser) : null;
  });

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

  // ✅ Register logout handler with API on mount
  useEffect(() => {
    setLogoutHandler(logout);
  }, []);

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
