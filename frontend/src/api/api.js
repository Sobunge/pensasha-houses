import axios from "axios";

// Initialize token from sessionStorage
let accessToken = sessionStorage.getItem("accessToken") || null;

// Function to set the access token after login or refresh
export const setAccessToken = (token) => {
  accessToken = token;
  sessionStorage.setItem("accessToken", token);
};

// Create Axios instance
const api = axios.create({
  baseURL: "http://localhost:8080/api",
  withCredentials: true, // Send HttpOnly refresh token cookies
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

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const refreshResponse = await axios.post(
          "/api/auth/refresh",
          {},
          { baseURL: "http://localhost:8080/api", withCredentials: true }
        );

        const newAccessToken = refreshResponse.data.accessToken;
        setAccessToken(newAccessToken);

        originalRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;
        return api(originalRequest);
      } catch (refreshError) {
        setAccessToken(null);
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default api;
