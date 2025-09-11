// src/context/AuthContext.jsx
import React, { createContext, useContext, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // ✅ store full user object
  const loginAs = (userObj) => {
    setUser(userObj);
  };

  const logout = () => setUser(null);

  return (
    <AuthContext.Provider value={{ user, loginAs, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// easy hook to use in components
export const useAuth = () => useContext(AuthContext);
