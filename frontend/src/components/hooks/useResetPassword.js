// src/components/hooks/useResetPassword.js
import { useState } from "react";
import api from "../../api/api";
import { useNotification } from "../NotificationProvider";

export default function useResetPassword() {
  const { notify } = useNotification();

  const [passwords, setPasswords] = useState({
    current: "",
    newPassword: "",
    confirm: "",
  });

  const [loading, setLoading] = useState(false);

  /* ---------------- Handlers ---------------- */
  const handleChange = (e) => {
    const { name, value } = e.target;
    setPasswords((prev) => ({ ...prev, [name]: value }));
  };

  /* ---------------- Validation ---------------- */
  const validate = () => {
    if (!passwords.current) return "Current password is required";
    if (!passwords.newPassword) return "New password is required";
    if (passwords.newPassword.length < 8)
      return "New password must be at least 8 characters";
    if (passwords.newPassword !== passwords.confirm)
      return "Passwords do not match";
    return null;
  };

  /* ---------------- Submit ---------------- */
  const resetPassword = async () => {
    const error = validate();
    if (error) {
      notify(error, "error");
      return false;
    }

    setLoading(true);
    try {
      await api.post("/auth/reset-password", {
        currentPassword: passwords.current,
        newPassword: passwords.newPassword,
      });
      notify("Password updated successfully!", "success");
      setPasswords({ current: "", newPassword: "", confirm: "" });
      return true;
    } catch (err) {
      notify(err.response?.data?.error || "Failed to reset password", "error");
      return false;
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => setPasswords({ current: "", newPassword: "", confirm: "" });

  return {
    passwords,
    loading,
    handleChange,
    resetPassword,
    resetForm,
  };
}
