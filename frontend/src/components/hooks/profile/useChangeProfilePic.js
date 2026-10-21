// src/components/hooks/useChangeProfilePic.js
import { useState, useEffect } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../../../api/api";
import { useNotification } from "../../NotificationProvider";

const MAX_FILE_SIZE_MB = 2;
const MAX_FILE_SIZE_BYTES = MAX_FILE_SIZE_MB * 1024 * 1024;

export default function useChangeProfilePic({ user, onSave, handleClose, refreshProfile }) {
  const { notify } = useNotification();
  const queryClient = useQueryClient();

  const [selectedFile, setSelectedFile] = useState(null);
  const [preview, setPreview] = useState("");

  // Manage memory-safe object URL for image preview
  useEffect(() => {
    if (!selectedFile) {
      setPreview("");
      return;
    }
    const objectUrl = URL.createObjectURL(selectedFile);
    setPreview(objectUrl);
    return () => URL.revokeObjectURL(objectUrl);
  }, [selectedFile]);

  // Handle file selection with validation
  const handleFileChange = (e) => {
    if (!e.target.files || e.target.files.length === 0) return;

    const file = e.target.files[0];

    // Client-side file size validation (2 MB)
    if (file.size > MAX_FILE_SIZE_BYTES) {
      notify(`File size exceeds the maximum limit of ${MAX_FILE_SIZE_MB} MB.`, "error");
      e.target.value = "";
      return;
    }

    // Client-side image type validation
    if (!file.type.startsWith("image/")) {
      notify("Please select a valid image file (JPG, PNG, or WEBP).", "error");
      e.target.value = "";
      return;
    }

    setSelectedFile(file);
  };

  // TanStack Mutation for Profile Picture Upload
  const uploadMutation = useMutation({
    mutationFn: async (fileToUpload) => {
      // If external onSave callback is provided, invoke it
      if (onSave) {
        return await onSave(fileToUpload);
      }

      // Default endpoint for profile avatar upload
      const formData = new FormData();
      formData.append("file", fileToUpload);

      const res = await api.post("/users/me/profile-picture", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      return res.data;
    },
    onSuccess: async () => {
      notify("Profile picture updated successfully!", "success");
      
      // Invalidate profile query in cache
      await queryClient.invalidateQueries({ queryKey: ["profile"] });

      if (refreshProfile) {
        await refreshProfile();
      }

      resetAndClose();
    },
    onError: (err) => {
      console.error("Profile picture upload failed:", err);
      const errorMessage =
        err.response?.data?.message || err.message || "Failed to update profile picture.";
      notify(errorMessage, "error");
    },
  });

  const handleSave = () => {
    if (!selectedFile) {
      notify("Please select an image file first.", "warning");
      return;
    }
    uploadMutation.mutate(selectedFile);
  };

  const resetAndClose = () => {
    setSelectedFile(null);
    setPreview("");
    handleClose();
  };

  // Fallback initial
  const avatarInitial =
    user?.firstName?.charAt(0) ||
    user?.middleName?.charAt(0) ||
    user?.lastName?.charAt(0) ||
    "U";

  const currentPicture = preview || user?.profilePicture || user?.avatar || "";

  return {
    selectedFile,
    currentPicture,
    avatarInitial,
    uploading: uploadMutation.isPending,
    handleFileChange,
    handleSave,
    resetAndClose,
  };
}