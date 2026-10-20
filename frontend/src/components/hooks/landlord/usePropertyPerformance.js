// src/hooks/landlord/usePropertyPerformance.js
import { useQuery } from "@tanstack/react-query";
import api from "../api/api";

export const usePropertyPerformance = (userId) => {
  return useQuery({
    queryKey: ["propertyPerformance", userId],
    queryFn: async () => {
      if (!userId) throw new Error("User ID is required to fetch property performance");
      const { data } = await api.get(`/api/landlords/${userId}/properties/performance`);
      return data;
    },
    enabled: !!userId, // Only trigger query if userId is present
    staleTime: 1000 * 60 * 5, // Cache for 5 minutes
  });
};