import { useEffect, useState, useCallback } from "react";
import { useAuth } from "../../pages/Auth/AuthContext";
import api from "../../api/api";

export default function useProfile() {
  const { user: authUser, activeRole } = useAuth();

  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchProfile = useCallback(async () => {
    if (!authUser) {
      setProfile(null);
      setLoading(false);
      return;
    }

    setLoading(true);

    try {
      // Get base user
      const res = await api.get("/users/me");

      // IMPORTANT — Spring HATEOAS response
      const baseProfile = res.data?.content || res.data;

      let fullProfile = baseProfile;

      switch (activeRole) {
        case "TENANT":
          if (baseProfile.id) {
            const tenantRes = await api.get(`/tenants/${baseProfile.id}`);
            fullProfile = {
              ...baseProfile,
              ...(tenantRes.data?.content || tenantRes.data),
            };
          }
          break;

        case "LANDLORD":
          if (baseProfile.id) {
            const landlordRes = await api.get(
              `/landlords/by-id/${baseProfile.id}`
            );
            fullProfile = {
              ...baseProfile,
              ...(landlordRes.data?.content || landlordRes.data),
            };
          }
          break;

        case "CARETAKER":
          if (baseProfile.id) {
            const caretakerRes = await api.get(`/caretakers/${baseProfile.id}`);
            fullProfile = {
              ...baseProfile,
              ...(caretakerRes.data?.content || caretakerRes.data),
            };
          }
          break;

        case "ADMIN":
          // No extra fetch needed
          break;

        default:
          console.warn("Unknown active role:", activeRole);
      }

      setProfile({
        ...fullProfile,
        activeRole, // attach role for UI
      });

      setError(null);
    } catch (err) {
      console.error("Failed to fetch profile:", err);
      setProfile(null);
      setError(err);
    } finally {
      setLoading(false);
    }
  }, [authUser, activeRole]);

  useEffect(() => {
    fetchProfile();
  }, [fetchProfile]);

  return {
    profile,
    role: activeRole,
    loading,
    error,
    refreshProfile: fetchProfile,
  };
}