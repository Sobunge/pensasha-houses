import { useEffect, useState, useCallback, useRef } from "react";
import { useAuth } from "../../pages/Auth/AuthContext";
import api from "../../api/api";

export default function useProfile() {
  const { user: authUser, activeRole } = useAuth();
  
  // Destructure ID here to satisfy ESLint and prevent unnecessary re-renders
  const authUserId = authUser?.id;

  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Use a ref to prevent race conditions or double-firing in Strict Mode
  const isFetching = useRef(false);

  const fetchProfile = useCallback(async () => {
    // If no user is logged in, reset profile and exit
    if (!authUserId) {
      setProfile(null);
      setLoading(false);
      return;
    }

    if (isFetching.current) return;
    isFetching.current = true;
    setLoading(true);

    try {
      // 1. Fetch Base User Data
      const res = await api.get("/users/me");
      const baseProfile = res.data?.content || res.data;

      let extraData = {};

      // 2. Map role to specific endpoints if baseProfile is valid
      if (baseProfile?.id) {
        const roleEndpoints = {
          tenant: `/tenants/${baseProfile.id}`,
          landlord: `/landlords/by-id/${baseProfile.id}`,
          caretaker: `/caretakers/${baseProfile.id}`
        };

        const normalizedRole = activeRole?.toLowerCase();
        const endpoint = roleEndpoints[normalizedRole];

        // 3. Fetch Role-Specific Data (Emergency contacts, leases, etc.)
        if (endpoint) {
          try {
            const roleRes = await api.get(endpoint);
            const rawRoleData = roleRes.data?.content || roleRes.data;

            // Prevent TenantProfile.id or the nested user object from overwriting base data
            // (Crucial for the recursion fix we applied earlier)
            const { id, user, ...rest } = rawRoleData;
            extraData = rest;
          } catch (roleErr) {
            console.warn(`Role data fetch failed for: ${activeRole}`, roleErr);
          }
        }
      }

      // 4. Merge Data for the application to consume as a single object
      setProfile({
        ...baseProfile,
        ...extraData,
        activeRole,
      });
      setError(null);
    } catch (err) {
      console.error("Profile fetch error:", err);
      setError(err);
      setProfile(null);
    } finally {
      setLoading(false);
      isFetching.current = false;
    }
  }, [authUserId, activeRole]); // Dependencies are now primitives (stable)

  useEffect(() => {
    fetchProfile();
  }, [fetchProfile]);

  return { profile, loading, error, refreshProfile: fetchProfile };
}