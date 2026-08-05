// api/api.js
import axios from "axios";

// ================= TOKEN MANAGEMENT (STRICTLY IN-MEMORY) =================
let inMemoryAccessToken = null;

export const setAccessToken = (token) => {
  inMemoryAccessToken = token;
};

export const getAccessToken = () => inMemoryAccessToken;

// ================= LOGOUT HANDLER =================
let logoutHandler = null;
export const setLogoutHandler = (fn) => {
  logoutHandler = fn;
};

const handleAuthFailure = () => {
  setAccessToken(null);
  if (logoutHandler) {
    logoutHandler();
  } else {
    window.location.href = "/";
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
    if (inMemoryAccessToken) {
      config.headers.set("Authorization", `Bearer ${inMemoryAccessToken}`);
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

    // Handle Network Errors / Server Unreachable cleanly
    if (!error.response) {
      error.code = "NETWORK_ERROR";
      error.message = error.message || "Unable to reach server. Check your connection.";
      return Promise.reject(error);
    }

    const status = error.response.status;

    // Skip auth endpoints to avoid infinite refresh loops on failed logins/registers
    const isAuthEndpoint =
      originalRequest.url?.includes("/auth/login") ||
      originalRequest.url?.includes("/auth/refresh") ||
      originalRequest.url?.includes("/auth/register");

    if (status === 401 && !isAuthEndpoint) {
      if (!originalRequest._retry) {
        originalRequest._retry = true;

        if (isRefreshing) {
          return new Promise((resolve, reject) => {
            failedQueue.push({ resolve, reject });
          })
            .then((token) => {
              originalRequest.headers.set("Authorization", `Bearer ${token}`);
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

          const newToken = refreshRes.data?.accessToken;
          if (!newToken) throw new Error("No access token in refresh response");

          setAccessToken(newToken);
          processQueue(null, newToken);

          originalRequest.headers.set("Authorization", `Bearer ${newToken}`);
          return api(originalRequest);
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

    // Attach human-readable fallback message while preserving response context
    error.message =
      error.response.data?.message ||
      error.response.data?.error ||
      error.message ||
      "Request failed";

    return Promise.reject(error);
  }
);

// ================= LOGIN HELPER =================
export const login = async (credentials) => {
  const res = await api.post("/auth/login", credentials);
  if (res.data?.accessToken) {
    setAccessToken(res.data.accessToken);
  }
  return res.data;
};

export default api;