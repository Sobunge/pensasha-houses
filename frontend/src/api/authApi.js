// src/api/authApi.js
import api, { setAccessToken } from "./api";

// Use api.js's native token-aware login, or proxy it directly:
export const login = (credentials) => api.post("/auth/login", credentials);

export const register = (user) => api.post("/auth/register", user);

export const refresh = () => api.post("/auth/refresh");

export const logout = async () => {
  try {
    return await api.post("/auth/logout");
  } finally {
    setAccessToken(null); // Instantly drop token from memory on logout
  }
};