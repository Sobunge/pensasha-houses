import axios from "axios";

// Memory + sessionStorage token management
let accessToken = sessionStorage.getItem("accessToken") || null;

/**
 * Set access token in memory and sessionStorage
 * @param {string|null} token
 */
export const setAccessToken = (token) => {
  accessToken = token;
  if (token) sessionStorage.setItem("accessToken", token);
  else sessionStorage.removeItem("accessToken");
};

// Axios instance
const api = axios.create({
  baseURL: "http://localhost:8080/api",
  withCredentials: true, // include HttpOnly refresh token cookies
});

// Request interceptor: attach access token
api.interceptors.request.use((config) => {
  if (accessToken) {
    config.headers["Authorization"] = `Bearer ${accessToken}`;
  }
  return config;
});

// Response interceptor: handle 401 and refresh token
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Only retry once
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        // Refresh token request
        const refreshRes = await axios.post(
          "/auth/refresh",
          {},
          { baseURL: api.defaults.baseURL, withCredentials: true }
        );

        const newToken = refreshRes.data.accessToken;
        setAccessToken(newToken);

        // Retry original request with new token
        originalRequest.headers["Authorization"] = `Bearer ${newToken}`;
        return api(originalRequest);
      } catch (refreshError) {
        // Failed to refresh, clear token
        setAccessToken(null);
        sessionStorage.removeItem("user"); // optional: clear user
        window.location.href = "/login"; // force login
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default api;
