// src/hooks/useFinancialOverview.js
import { useQuery } from "@tanstack/react-query";
import api from "../../../api/api";

export const useFinancialOverview = (userId) => {
  return useQuery({
    queryKey: ["financialOverview", userId],
    queryFn: async () => {
      if (!userId) throw new Error("User ID is required");
      const { data } = await api.get(`/api/landlords/${userId}/financial-overview`);
      return data;
    },
    enabled: !!userId,
    staleTime: 1000 * 60 * 5,
  });
};