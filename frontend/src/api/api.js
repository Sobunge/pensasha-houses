// services/httpService.js
import axios from "axios";

// ================= TOKEN MANAGEMENT =================
let accessToken = sessionStorage.getItem("accessToken") || null;

export const setAccessToken = (token) => {
  accessToken = token;
  if (token) sessionStorage.setItem("accessToken", token);
  else sessionStorage.removeItem("accessToken");
};

// ================= LOGOUT HANDLER =================
let logoutHandler = null;
export const setLogoutHandler = (fn) => {
  logoutHandler = fn;
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

    // ================= NETWORK ERROR =================
    if (!error.response) {
      return Promise.reject({
        code: "NETWORK_ERROR",
        message: "Unable to reach server. Check your connection.",
      });
    }

    const status = error.response.status;

    // ================= SKIP AUTH ENDPOINTS =================
    const isAuthEndpoint =
      originalRequest.url?.includes("/auth/login") ||
      originalRequest.url?.includes("/auth/refresh");

    // ================= TOKEN EXPIRED → REFRESH =================
    if (
      status === 401 &&
      !originalRequest._retry &&
      !isAuthEndpoint &&
      accessToken // only if user had session
    ) {
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

        return api(originalRequest);
      } catch (refreshError) {
        // Refresh failed → logout
        setAccessToken(null);

        if (logoutHandler) logoutHandler();

        return Promise.reject({
          code: "SESSION_EXPIRED",
          message: "Session expired. Please log in again.",
        });
      }
    }

    // ================= NORMAL ERRORS =================
    return Promise.reject({
      code: status,
      message:
        error.response.data?.error ||
        error.response.data?.message ||
        "Request failed",
    });
  }
);

export default api;