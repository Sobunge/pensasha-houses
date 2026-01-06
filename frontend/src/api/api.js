import axios from "axios";

// ================= TOKEN MANAGEMENT =================
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

// ================= LOGOUT HANDLER =================
let logoutHandler = null;
export const setLogoutHandler = (fn) => {
  logoutHandler = fn;
};

// ================= AXIOS INSTANCE =================
const api = axios.create({
  baseURL: "http://localhost:8080/api",
  withCredentials: true,
});

// Attach access token
api.interceptors.request.use((config) => {
  if (accessToken) config.headers["Authorization"] = `Bearer ${accessToken}`;
  return config;
});

// Response interceptor: refresh token + auto logout
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const refreshRes = await axios.post(
          "/auth/refresh",
          {},
          { baseURL: api.defaults.baseURL, withCredentials: true }
        );

        const newToken = refreshRes.data.accessToken;
        setAccessToken(newToken);
        originalRequest.headers["Authorization"] = `Bearer ${newToken}`;
        return api(originalRequest);
      } catch (refreshError) {
        // Failed to refresh → call AuthContext logout
        setAccessToken(null);
        if (logoutHandler) logoutHandler();
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default api;
