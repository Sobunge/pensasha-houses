// src/context/AuthContext.jsx
import React, { createContext, useContext, useState, useEffect } from "react";
import api, { setAccessToken, setLogoutHandler } from "../../api/api";

export const AuthContext = createContext();

/* ===================== ROLE NORMALIZER ===================== */
const normalizeRole = (role) => {
  if (!role) return null;
  return role.startsWith("ROLE_") ? role : `ROLE_${role}`;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const savedUser = sessionStorage.getItem("user");
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const [roles, setRoles] = useState(() => {
    const savedRoles = sessionStorage.getItem("roles");
    return savedRoles ? JSON.parse(savedRoles) : [];
  });

  const [activeRole, setActiveRole] = useState(() => {
    return sessionStorage.getItem("activeRole") || null;
  });

  const [redirectAfterAuth, setRedirectAfterAuth] = useState(null);
  const [loading, setLoading] = useState(true);

  /**
   * LOGIN / SAVE SESSION DATA
   */
  const loginAs = (userObj) => {
    setUser(userObj);

    const roleList = (userObj?.roles || []).map(normalizeRole);
    setRoles(roleList);

    const defaultRole = roleList[0] || null;
    setActiveRole(defaultRole);

    sessionStorage.setItem("user", JSON.stringify(userObj));
    sessionStorage.setItem("roles", JSON.stringify(roleList));
    sessionStorage.setItem("activeRole", defaultRole || "");
  };

  /**
   * SWITCH ROLE
   */
  const switchRole = (role) => {
    const normalizedRole = normalizeRole(role);
    setActiveRole(normalizedRole);
    sessionStorage.setItem("activeRole", normalizedRole);
  };

  /**
   * LOGOUT
   */
  const logout = async () => {
    try {
      // Optional: Inform Spring Boot to invalidate/clear the HttpOnly refresh cookie
      await api.post("/auth/logout").catch(() => {});
    } finally {
      setAccessToken(null);
      setUser(null);
      setRoles([]);
      setActiveRole(null);
      sessionStorage.clear();
    }
  };

  /**
   * RESTORE IN-MEMORY SESSION ON PAGE RELOAD
   */
  useEffect(() => {
    // Attach the API interceptor logout handler
    setLogoutHandler(logout);

    const restoreSession = async () => {
      try {
        // Attempt to fetch a fresh Access Token using the HttpOnly cookie
        const res = await api.post("/auth/refresh");
        if (res.data?.accessToken) {
          setAccessToken(res.data.accessToken);

          // Update user info if returned in refresh payload
          if (res.data?.user) {
            loginAs(res.data.user);
          }
        }
      } catch (err) {
        // Refresh token expired or invalid: clear session state
        setUser(null);
        setRoles([]);
        setActiveRole(null);
        sessionStorage.clear();
      } finally {
        setLoading(false);
      }
    };

    restoreSession();
  }, []);

  // Avoid rendering protected routes/UI until initial token restoration finishes
  if (loading) {
    return null; // Or render your app-level loading spinner here
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        roles,
        activeRole,
        switchRole,
        loginAs,
        logout,
        redirectAfterAuth,
        setRedirectAfterAuth,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);