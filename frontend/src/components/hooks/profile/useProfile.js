// src/components/hooks/useProfile.jsx
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useAuth } from "../../../pages/Auth/AuthContext";
import api from "../../../api/api";

const fetchProfileData = async (authUserId, activeRole) => {
  if (!authUserId) return null;

  // 1. Fetch Base User Data
  const userRes = await api.get("/users/me");
  const baseProfile = userRes.data?.content || userRes.data;

  let roleProfileData = {};

  // 2. Map role to specific endpoints if baseProfile is valid
  if (baseProfile?.id) {
    const roleEndpoints = {
      tenant: `/tenants/${baseProfile.id}`,
      landlord: `/landlords/by-id/${baseProfile.id}`,
      caretaker: `/caretakers/${baseProfile.id}`,
    };

    // Normalize role by converting to lower case and stripping any "role_" prefix
    const normalizedRole = activeRole?.toLowerCase().replace("role_", "");
    const endpoint = roleEndpoints[normalizedRole];

    // 3. Fetch Role-Specific Data
  if (endpoint) {
      try {
        const roleRes = await api.get(endpoint);
        const rawRoleData = roleRes.data?.content || roleRes.data;

        // Safely extract role-specific properties while retaining sets/arrays like bankDetails
        const { id, user, ...rest } = rawRoleData;
        roleProfileData = {
          ...rest,
          bankDetails: rawRoleData.bankDetails || [],
          properties: rawRoleData.properties || rawRoleData.propertyIds || [],
          acceptedPaymentMethods: rawRoleData.acceptedPaymentMethods || [],
        };
      } catch (roleErr) {
        console.warn(`Role data fetch failed for: ${activeRole}`, roleErr);
      }
    }
  }

  // 4. Merge Data cleanly
  return {
    ...baseProfile,
    ...roleProfileData,
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
    enabled: Boolean(authUserId),
    staleTime: 1000 * 60 * 5,
    retry: 1,
  });

  const refreshProfile = async () => {
    await queryClient.invalidateQueries({ queryKey: ["profile", authUserId, activeRole] });
  };

  return { profile, loading, error, refreshProfile };
}