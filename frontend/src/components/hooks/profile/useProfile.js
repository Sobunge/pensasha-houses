// src/components/hooks/useProfile.jsx
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useAuth } from "../../../pages/Auth/AuthContext";
import api from "../../../api/api";

const fetchProfileData = async (authUserId, activeRole) => {
  if (!authUserId) return null;

  // 1. Fetch Base User Data
  const res = await api.get("/users/me");
  const baseProfile = res.data?.content || res.data;

  let extraData = {};

  // 2. Map role to specific endpoints if baseProfile is valid
  if (baseProfile?.id) {
    const roleEndpoints = {
      tenant: `/tenants/${baseProfile.id}`,
      landlord: `/landlords/by-id/${baseProfile.id}`,
      caretaker: `/caretakers/${baseProfile.id}`,
    };

    const normalizedRole = activeRole?.toLowerCase();
    const endpoint = roleEndpoints[normalizedRole];

    // 3. Fetch Role-Specific Data
    if (endpoint) {
      try {
        const roleRes = await api.get(endpoint);
        const rawRoleData = roleRes.data?.content || roleRes.data;

        // Prevent nested id/user objects from overwriting base data
        const { id, user, ...rest } = rawRoleData;
        extraData = rest;
      } catch (roleErr) {
        console.warn(`Role data fetch failed for: ${activeRole}`, roleErr);
      }
    }
  }

  // 4. Merge Data
  return {
    ...baseProfile,
    ...extraData,
    activeRole,
  };
};

export default function useProfile() {
  const { user: authUser, activeRole } = useAuth();
  const authUserId = authUser?.id;
  const queryClient = useQueryClient();

  const {
    data: profile = null,
    isLoading: loading,
    error,
  } = useQuery({
    queryKey: ["profile", authUserId, activeRole],
    queryFn: () => fetchProfileData(authUserId, activeRole),
    enabled: Boolean(authUserId), // Only runs query if authUserId exists
    staleTime: 1000 * 60 * 5, // Cache profile for 5 minutes
    retry: 1,
  });

  // Refresh helper function maintaining exact backwards compatibility with your code
  const refreshProfile = async () => {
    await queryClient.invalidateQueries({ queryKey: ["profile", authUserId, activeRole] });
  };

  return { profile, loading, error, refreshProfile };
}