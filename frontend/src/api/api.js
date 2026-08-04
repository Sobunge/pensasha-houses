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
  if (logoutHandler) {
    logoutHandler();
  } else {
    window.location.href = "/"; // Fallback redirect if handler not attached
  }
};

// ================= AXIOS INSTANCE =================
const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || "http://localhost:8080/api",
  withCredentials: true,
  timeout: 10000,
});

// Queue management for handling concurrent requests during token refresh
let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, token = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });
  failedQueue = [];
};

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
      if (!originalRequest._retry) {
        originalRequest._retry = true;

        if (isRefreshing) {
          // If a refresh is already in progress, queue this request
          return new Promise((resolve, reject) => {
            failedQueue.push({ resolve, reject });
          })
            .then((token) => {
              originalRequest.headers["Authorization"] = `Bearer ${token}`;
              return api(originalRequest);
            })
            .catch((err) => Promise.reject(err));
        }

        isRefreshing = true;

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
          processQueue(null, newToken);

          originalRequest.headers["Authorization"] = `Bearer ${newToken}`;
          return api(originalRequest); // Retry the original request
        } catch (refreshError) {
          processQueue(refreshError, null);
          handleAuthFailure();
          return Promise.reject({
            code: "SESSION_EXPIRED",
            message: "Session expired. Please log in again.",
          });
        } finally {
          isRefreshing = false;
        }
      }

      handleAuthFailure();
    }

    // NORMAL ERRORS (400, 404, 500, etc.)
    return Promise.reject({
      code: status,
      message:
        error.response.data?.message ||
        error.response.data?.error ||
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