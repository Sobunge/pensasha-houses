// src/components/hooks/profile/useUpdateBankDetails.js
import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../../../api/api";

export default function useUpdateBankDetails(landlordId) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (bankData) => {
      // Sends payload { id, bankName, accountName, accountNumber, branchName }
      // Hits PUT /api/landlords/{userId}/bank-details
      const res = await api.put(`/landlords/${landlordId}/bank-details`, bankData);
      return res.data;
    },
    onSuccess: () => {
      // Invalidates profile query to re-fetch and render fresh bank details set
      queryClient.invalidateQueries({ queryKey: ["profile"] });
    },
  });
}