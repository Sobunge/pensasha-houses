import { useEffect, useState, useCallback } from "react";
import { useAuth } from "../../pages/Auth/AuthContext";
import api from "../../api/api";

export default function useProfile() {
  const { user: authUser } = useAuth();

  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Function to fetch profile based on role
  const fetchProfile = useCallback(async () => {
    if (!authUser) {
      setProfile(null);
      setLoading(false);
      return;
    }

    setLoading(true);
    try {
      // Fetch base user profile
      const res = await api.get("/users/me");
      const baseProfile = res.data;

      let fullProfile = baseProfile;

      // Fetch role-specific data if needed
      switch (baseProfile.role) {
        case "TENANT":
          if (baseProfile.id) {
            const tenantRes = await api.get(`/tenants/${baseProfile.id}`);
            fullProfile = { ...baseProfile, ...tenantRes.data };
          }
          break;

        case "LANDLORD":
          if (baseProfile.id) {
            const landlordRes = await api.get(`/landlords/${baseProfile.id}`);
            fullProfile = { ...baseProfile, ...landlordRes.data };
          }
          break;

        case "CARETAKER":
          if (baseProfile.id) {
            const caretakerRes = await api.get(`/caretakers/${baseProfile.id}`);
            fullProfile = { ...baseProfile, ...caretakerRes.data };
          }
          break;

        case "ADMIN":
          // Admin may not need extra fetch, keep base profile
          break;

        default:
          console.warn("Unknown user role:", baseProfile.role);
      }

      setProfile(fullProfile);
      setError(null);
    } catch (err) {
      console.error("Failed to fetch profile:", err);
      setProfile(null);
      setError(err);
    } finally {
      setLoading(false);
    }
  }, [authUser]);

  // Fetch profile on authUser change
  useEffect(() => {
    fetchProfile();
  }, [fetchProfile]);

  return {
    profile,
    role: profile?.role,
    loading,
    error,
    refreshProfile: fetchProfile,
  };
}
