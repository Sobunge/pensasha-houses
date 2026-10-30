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
    onSuccess: (data, variables) => {
      // Invalidate profile query to re-fetch and render fresh bank details set
      queryClient.invalidateQueries({ queryKey: ["profile"] });

      // Determine if it was an update or create based on whether an id exists in the payload
      const isEditing = Boolean(variables?.id);

      window.dispatchEvent(
        new CustomEvent("app-notification", {
          detail: {
            message: isEditing
              ? "Bank account updated successfully."
              : "Bank account added successfully.",
            severity: "success",
            duration: 4000,
          },
        })
      );
    },
    onError: (error) => {
      console.error("Failed to save bank details:", error);
      const errorMsg =
        error?.response?.data?.message || "Failed to save bank details. Please try again.";

      window.dispatchEvent(
        new CustomEvent("app-notification", {
          detail: {
            message: errorMsg,
            severity: "error",
            duration: 5000,
          },
        })
      );
    },
  });
}