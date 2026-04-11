// api/api.js
import axios from "axios";

// ================= TOKEN MANAGEMENT =================
let accessToken = sessionStorage.getItem("accessToken") || null;

export const setAccessToken = (token) => {
  accessToken = token;
  if (token) {
    sessionStorage.setItem("accessToken", token);
  } else {
    sessionStorage.removeItem("accessToken");
  }
};

// ================= LOGOUT HANDLER =================
let logoutHandler = null;
export const setLogoutHandler = (fn) => {
  logoutHandler = fn;
};

// Helper for total session cleanup and redirect
const handleAuthFailure = () => {
  setAccessToken(null);
  if (logoutHandler) logoutHandler();
  window.location.href = "/"; // Force redirect to home page
};

// ================= AXIOS INSTANCE =================
const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || "http://localhost:8080/api",
  withCredentials: true,
  timeout: 10000,
});

// ================= REQUEST INTERCEPTOR =================
api.interceptors.request.use(
  (config) => {
    if (accessToken) {
      config.headers["Authorization"] = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// ================= RESPONSE INTERCEPTOR =================
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // NETWORK ERROR (e.g., Server down or no internet)
    if (!error.response) {
      return Promise.reject({
        code: "NETWORK_ERROR",
        message: "Unable to reach server. Check your connection.",
      });
    }

    const status = error.response.status;

    // SKIP AUTH ENDPOINTS (Don't intercept errors during login/refresh)
    const isAuthEndpoint =
      originalRequest.url?.includes("/auth/login") ||
      originalRequest.url?.includes("/auth/refresh") ||
      originalRequest.url?.includes("/auth/register");

    if (status === 401 && !isAuthEndpoint) {
      // SCENARIO 1: We have a token, attempt refresh
      if (accessToken && !originalRequest._retry) {
        originalRequest._retry = true;

        try {
          const refreshRes = await axios.post(
            "/auth/refresh",
            {},
            {
              baseURL: api.defaults.baseURL,
              withCredentials: true,
            }
          );

          const newToken = refreshRes.data.accessToken;
          setAccessToken(newToken);
          
          originalRequest.headers["Authorization"] = `Bearer ${newToken}`;
          return api(originalRequest); // Retry the original request
        } catch (refreshError) {
          // Refresh failed (7-day token likely expired)
          handleAuthFailure();
          return Promise.reject({
            code: "SESSION_EXPIRED",
            message: "Session expired. Please log in again.",
          });
        }
      } 
      
      // SCENARIO 2: No token at all or already retried
      handleAuthFailure();
    }

    // NORMAL ERRORS (400, 404, 500, etc.)
    return Promise.reject({
      code: status,
      message:
        error.response.data?.error ||
        error.response.data?.message ||
        "Request failed",
    });
  }
);

// ================= LOGIN HELPER =================
export const login = async (username, password) => {
  try {
    const res = await api.post("/auth/login", { username, password });
    if (res.data?.accessToken) {
      setAccessToken(res.data.accessToken);
    }
    return res.data;
  } catch (err) {
    throw err;
  }
};

export default api;