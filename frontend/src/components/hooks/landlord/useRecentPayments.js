// src/hooks/useRecentPayments.js
import { useQuery } from "@tanstack/react-query";
import api from "../../../api/api";

export const useRecentPayments = (userId, limit = 5) => {
  return useQuery({
    queryKey: ["recentPayments", userId, limit],
    queryFn: async () => {
      if (!userId) throw new Error("User ID is required to fetch recent payments");
      const { data } = await api.get(`/api/landlords/${userId}/recent-payments?limit=${limit}`);
      return data;
    },
    enabled: !!userId,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
};