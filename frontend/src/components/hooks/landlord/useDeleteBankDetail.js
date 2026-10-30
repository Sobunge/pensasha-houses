// src/components/hooks/landlord/useDeleteBankDetail.js
import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../../../api/api";

export const useDeleteBankDetail = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ userId, bankId }) => {
      if (!userId || !bankId) throw new Error("User ID and Bank ID are required");
      const { data } = await api.delete(`/landlords/${userId}/bank-details/${bankId}`);
      return data;
    },
    onSuccess: () => {
      // ✅ Invalidate all queries starting with "profile" to catch ["profile", authUserId, activeRole]
      queryClient.invalidateQueries({ queryKey: ["profile"] });

      window.dispatchEvent(
        new CustomEvent("app-notification", {
          detail: {
            message: "Bank account deleted successfully.",
            severity: "success",
            duration: 4000,
          },
        })
      );
    },
    onError: (error) => {
      console.error("Failed to delete bank detail:", error);
      window.dispatchEvent(
        new CustomEvent("app-notification", {
          detail: {
            message: error?.message || "Failed to delete bank account. Please try again.",
            severity: "error",
            duration: 5000,
          },
        })
      );
    },
  });
};