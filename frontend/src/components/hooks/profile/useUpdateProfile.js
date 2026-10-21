// src/components/hooks/profile/useUpdateProfile.js
import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../../../api/api";
import { useNotification } from "../../../components/NotificationProvider";

// Map role to endpoint
const getProfileEndpoint = (role, id) => {
  const cleanRole = role?.replace(/^ROLE_/, "").toUpperCase();
  const roleMap = {
    TENANT: `/tenants/${id}`,
    LANDLORD: `/landlords/${id}`,
    CARETAKER: `/caretakers/${id}`,
    ADMIN: `/admins/${id}`,
  };
  return roleMap[cleanRole] || `/users/${id}`;
};

export default function useUpdateProfile({ profile, activeRole, refreshProfile, handleClose }) {
  const { notify } = useNotification();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (payload) => {
      if (!profile?.id || !activeRole) {
        throw new Error("Missing user or active role information.");
      }

      const endpoint = getProfileEndpoint(activeRole, profile.id);
      if (!endpoint) {
        throw new Error("Could not resolve update endpoint for role.");
      }

      const res = await api.put(endpoint, payload);
      return res.data;
    },
    onSuccess: async () => {
      notify("Profile updated successfully!", "success");

      // Invalidate profile cache so queries refetch latest data
      await queryClient.invalidateQueries({ queryKey: ["profile"] });

      if (refreshProfile) {
        await refreshProfile();
      }

      handleClose();
    },
    onError: (err) => {
      console.error("Failed to update profile:", err);
      const errorMessage =
        err.response?.data?.message ||
        err.message ||
        "Failed to update profile. Please try again.";
      notify(errorMessage, "error");
    },
  });

  const handleSave = (handleSubmitForm) => {
    if (!profile?.id || !activeRole) {
      notify("Missing user or active role information.", "warning");
      return;
    }

    const payload = handleSubmitForm();
    if (!payload) {
      notify("Please resolve validation errors before saving.", "error");
      return;
    }

    mutation.mutate(payload);
  };

  return {
    handleSave,
    loading: mutation.isPending,
  };
}