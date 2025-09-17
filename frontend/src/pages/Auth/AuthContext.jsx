// src/context/AuthContext.jsx
import React, { createContext, useContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // ✅ track loading

  // 🔄 Load user from localStorage when app starts
  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setLoading(false); // ✅ done loading
  }, []);

  // ✅ store full user object
  const loginAs = (userObj) => {
    setUser(userObj);
    localStorage.setItem("user", JSON.stringify(userObj)); // save in storage
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user"); // clear on logout
  };

  return (
    <AuthContext.Provider value={{ user, loginAs, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

// easy hook to use in components
export const useAuth = () => useContext(AuthContext);
