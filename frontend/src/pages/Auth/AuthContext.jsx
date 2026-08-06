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
  // Purely in-memory state initialization
  const [user, setUser] = useState(null);
  const [roles, setRoles] = useState([]);
  const [activeRole, setActiveRole] = useState(null);
  const [redirectAfterAuth, setRedirectAfterAuth] = useState(null);
  const [loading, setLoading] = useState(true);

  /**
   * LOGIN / SET SESSION IN MEMORY ONLY
   */
  const loginAs = (userObj) => {
    setUser(userObj);

    const roleList = (userObj?.roles || []).map(normalizeRole);
    setRoles(roleList);

    const defaultRole = roleList[0] || null;
    setActiveRole(defaultRole);
  };

  /**
   * SWITCH ROLE
   */
  const switchRole = (role) => {
    const normalizedRole = normalizeRole(role);
    setActiveRole(normalizedRole);
  };

  /**
   * LOGOUT
   */
  const logout = async () => {
    try {
      await api.post("/auth/logout").catch(() => {});
    } finally {
      setAccessToken(null);
      setUser(null);
      setRoles([]);
      setActiveRole(null);
    }
  };

  /**
   * RESTORE IN-MEMORY SESSION ON PAGE RELOAD
   */
  useEffect(() => {
    setLogoutHandler(logout);

    const restoreSession = async () => {
      try {
        const res = await api.post("/auth/refresh");
        
        if (res.data?.accessToken) {
          setAccessToken(res.data.accessToken);

          // Maps your Spring Boot principal or user object into React memory
          const principalData = res.data?.principal || res.data?.user;
          if (principalData) {
            const rolesList = Array.isArray(principalData.roles)
              ? principalData.roles
              : principalData.role
              ? [principalData.role]
              : [];

            const userObj = {
              id: principalData.id,
              name: principalData.firstName || principalData.firstname || principalData.name,
              roles: rolesList,
              permissions: principalData.permissions || [],
              defaultRoute: "/dashboard",
            };

            loginAs(userObj);
          }
        }
      } catch (err) {
        setUser(null);
        setRoles([]);
        setActiveRole(null);
      } finally {
        setLoading(false);
      }
    };

    restoreSession();
  }, []);

  if (loading) {
    return null; // Prevents flashing protected routes before restoration completes
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