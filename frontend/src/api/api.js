// api.js
import axios from "axios";

let accessToken = null; // In-memory storage

// Function to set the access token after login or refresh
export const setAccessToken = (token) => {
  accessToken = token;
};

// Create Axios instance
const api = axios.create({
  baseURL: "http://localhost:8080/api",
  withCredentials: true, // Important to send HttpOnly refresh token cookies
});

// Request interceptor: attach access token to headers
api.interceptors.request.use((config) => {
  if (accessToken) {
    config.headers["Authorization"] = `Bearer ${accessToken}`;
  }
  return config;
});

// Response interceptor: handle 401 Unauthorized (access token expired)
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Prevent infinite loop
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        // Attempt to refresh token using HttpOnly cookie
        const refreshResponse = await axios.post(
          "/api/auth/refresh",
          {},
          { baseURL: "http://localhost:8080/api", withCredentials: true }
        );

        const newAccessToken = refreshResponse.data.accessToken;
        setAccessToken(newAccessToken);

        // Retry the original request with new token
        originalRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;
        return api(originalRequest);
      } catch (refreshError) {
        // Refresh failed: redirect to login
        window.location.href = "/login";
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default api;
