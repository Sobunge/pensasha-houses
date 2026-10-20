// src/hooks/useTenantSummary.js
import { useQuery } from "@tanstack/react-query";
import api from "../../../api/api";

export const useTenantSummary = (userId) => {
  return useQuery({
    queryKey: ["tenantSummary", userId],
    queryFn: async () => {
      if (!userId) {
        throw new Error("User ID is required to fetch tenant summary");
      }
      const { data } = await api.get(`/api/landlords/${userId}/tenant-summary`);
      return data;
    },
    enabled: !!userId,
    staleTime: 1000 * 60 * 5, // Cache for 5 minutes
  });
};