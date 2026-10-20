// src/hooks/landlord/useLandlordStats.js
import { useQuery } from "@tanstack/react-query";
import api from "../api/api";

export const useLandlordStats = (userId) => {
  return useQuery({
    queryKey: ["landlordStats", userId],
    queryFn: async () => {
      if (!userId) throw new Error("User ID is required to fetch stats");
      const { data } = await api.get(`/api/landlords/${userId}/stats`);
      return data;
    },
    enabled: !!userId, // Only fetch if userId is available
    staleTime: 1000 * 60 * 5, // Cache for 5 minutes
  });
};