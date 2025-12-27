// api.js
import axios from "axios";

/**
 * In-memory access token (cleared on reload by design)
 */
let accessToken = null;

/**
 * Refresh control
 */
let isRefreshing = false;
let refreshSubscribers = [];

/**
 * Token setters/getters
 */
export const setAccessToken = (token) => {
  accessToken = token;
};

export const clearAccessToken = () => {
  accessToken = null;
};

/**
 * Notify queued requests once refresh completes
 */
const onRefreshed = (token) => {
  refreshSubscribers.forEach((callback) => callback(token));
  refreshSubscribers = [];
};

const subscribeToRefresh = (callback) => {
  refreshSubscribers.push(callback);
};

/**
 * Axios instance for normal API calls
 */
const api = axios.create({
  baseURL: "http://localhost:8080/api",
  withCredentials: true, // sends HttpOnly refresh cookies
});

/**
 * Axios instance ONLY for refresh (no interceptors, no Authorization)
 */
const refreshClient = axios.create({
  baseURL: "http://localhost:8080/api",
  withCredentials: true,
});

/**
 * Attach access token to outgoing requests
 */
api.interceptors.request.use(
  (config) => {
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

/**
 * Handle 401 responses and refresh tokens
 */
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Only retry once
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      if (!isRefreshing) {
        isRefreshing = true;

        try {
          const refreshResponse = await refreshClient.post("/auth/refresh");
          const newAccessToken = refreshResponse.data.accessToken;

          if (!newAccessToken) throw new Error("Refresh failed: no access token");

          setAccessToken(newAccessToken);
          onRefreshed(newAccessToken);

        } catch (refreshError) {
          onRefreshed(null);
          clearAccessToken();
          window.location.href = "/login";
          return Promise.reject(refreshError);

        } finally {
          isRefreshing = false;
        }
      }

      // Queue the request until refresh completes
      return new Promise((resolve, reject) => {
        subscribeToRefresh((token) => {
          if (!token) return reject(error);
          originalRequest.headers["Authorization"] = `Bearer ${token}`;
          resolve(api(originalRequest));
        });
      });
    }

    return Promise.reject(error);
  }
);

export default api;
