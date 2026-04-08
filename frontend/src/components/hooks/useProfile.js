import { useEffect, useState, useCallback } from "react";
import { useAuth } from "../../pages/Auth/AuthContext";
import api from "../../api/api";

export default function useProfile() {
  const { user: authUser, activeRole } = useAuth();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchProfile = useCallback(async () => {
    // If no user, reset and exit
    if (!authUser) {
      setProfile(null);
      setLoading(false);
      return;
    }

    setLoading(true);
    try {
      const res = await api.get("/users/me");
      const baseProfile = res.data?.content || res.data;

      // Map role to specific endpoints
      const roleEndpoints = {
        tenant: `/tenants/${baseProfile.id}`,
        landlord: `/landlords/by-id/${baseProfile.id}`,
        caretaker: `/caretakers/${baseProfile.id}`
      };

      let extraData = {};
      const endpoint = roleEndpoints[activeRole?.toLowerCase()];

      if (endpoint && baseProfile.id) {
        try {
          const roleRes = await api.get(endpoint);
          extraData = roleRes.data?.content || roleRes.data;
        } catch (roleErr) {
          console.warn(`Could not fetch extra info for role: ${activeRole}`, roleErr);
          // We don't throw here so the user can still see their base profile
        }
      }

      setProfile({
        ...baseProfile,
        ...extraData,
        activeRole, 
      });
      setError(null);
    } catch (err) {
      setError(err);
      setProfile(null);
    } finally {
      setLoading(false);
    }
  }, [authUser?.id, activeRole]); // Depend on ID rather than the whole object

  useEffect(() => {
    fetchProfile();
  }, [fetchProfile]);

  return { profile, loading, error, refreshProfile: fetchProfile };
}