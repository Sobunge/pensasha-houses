import React, { createContext, useContext, useState, useEffect } from "react";
import { setLogoutHandler } from "../../api/api";

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

  /**
   * LOGIN
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
  const logout = () => {
    setUser(null);
    setRoles([]);
    setActiveRole(null);

    sessionStorage.clear();
  };

  /**
   * Register logout handler with API
   */
  useEffect(() => {
    setLogoutHandler(logout);
  }, []);

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
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);