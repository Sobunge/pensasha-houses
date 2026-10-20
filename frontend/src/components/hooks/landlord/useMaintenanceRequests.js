// src/hooks/useMaintenanceRequests.js
import { useQuery } from "@tanstack/react-query";
import api from "../../../api/api";

export const useMaintenanceRequests = (userId, limit = 5) => {
  return useQuery({
    queryKey: ["maintenanceRequests", userId, limit],
    queryFn: async () => {
      if (!userId) {
        throw new Error("User ID is required to fetch maintenance requests");
      }
      const { data } = await api.get(
        `/api/landlords/${userId}/maintenance-requests?limit=${limit}`
      );
      return data;
    },
    enabled: !!userId,
    staleTime: 1000 * 60 * 5, // Cache for 5 minutes
  });
};