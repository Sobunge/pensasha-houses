// src/auth.js
import refreshClient from "./api/api";
import { setAccessToken, clearAccessToken } from "./api/api";

/**
 * Initializes authentication on app start.
 * Checks refresh token (HttpOnly cookie) and restores access token in memory.
 * @returns {Promise<boolean>} true if access token restored, false otherwise
 */
export async function initAuth() {
  try {
    const response = await refreshClient.post("/auth/refresh");
    const newAccessToken = response.data.accessToken;

    if (!newAccessToken) {
      console.warn("No access token returned from refresh");
      clearAccessToken();
      return false;
    }

    setAccessToken(newAccessToken);
    console.log("Access token restored from refresh cookie");
    return true;

  } catch (error) {
    console.warn("Failed to refresh access token:", error);
    clearAccessToken();
    return false;
  }
}
