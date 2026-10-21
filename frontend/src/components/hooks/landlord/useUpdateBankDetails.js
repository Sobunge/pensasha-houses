// src/components/hooks/profile/useUpdateBankDetails.js
import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../../../api/api";

export default function useUpdateBankDetails(landlordId) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (bankData) => {
      // Adjust endpoint to match your landlord bank details endpoint
      const res = await api.put(`/landlords/${landlordId}/bank-details`, bankData);
      return res.data;
    },
    onSuccess: () => {
      // Invalidate profile query to re-fetch and re-render fresh data
      queryClient.invalidateQueries({ queryKey: ["profile"] });
    },
  });
}