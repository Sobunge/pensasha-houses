// src/components/hooks/useResetPassword.js
import { useState } from "react";
import api from "../../api/api";
import { useNotification } from "../NotificationProvider";

const INITIAL_STATE = {
  currentPassword: "",
  newPassword: "",
  confirmNewPassword: "",
};

export default function useResetPassword() {
  const { notify } = useNotification();

  const [values, setValues] = useState(INITIAL_STATE);
  const [loading, setLoading] = useState(false);

  /* ---------------- Change handler ---------------- */
  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues((prev) => ({ ...prev, [name]: value }));
  };

  /* ---------------- Validation ---------------- */
  const validate = () => {
    const errors = {};

    if (!values.currentPassword) {
      errors.currentPassword = "Current password is required";
    }

    if (!values.newPassword) {
      errors.newPassword = "New password is required";
    } else if (values.newPassword.length < 8) {
      errors.newPassword = "Password must be at least 8 characters";
    }

    if (!values.confirmNewPassword) {
      errors.confirmNewPassword = "Please confirm your new password";
    } else if (values.newPassword !== values.confirmNewPassword) {
      errors.confirmNewPassword = "Passwords do not match";
    }

    return errors;
  };

  /* ---------------- Submit ---------------- */
  const resetPassword = async ({ setFieldErrors } = {}) => {
    const errors = validate();

    if (Object.keys(errors).length > 0) {
      if (setFieldErrors) {
        setFieldErrors(errors);
      } else {
        notify(Object.values(errors)[0], "error");
      }
      return false;
    }

    setLoading(true);
    try {
      await api.put("/users/me/changePassword", values);

      notify("Password updated successfully", "success");
      setValues(INITIAL_STATE);
      return true;
    } catch (err) {
      const message =
        err.response?.data?.message ||
        err.response?.data?.error ||
        "Failed to change password";

      if (setFieldErrors) {
        setFieldErrors({ currentPassword: message });
      } else {
        notify(message, "error");
      }
      return false;
    } finally {
      setLoading(false);
    }
  };

  /* ---------------- Reset ---------------- */
  const resetForm = () => setValues(INITIAL_STATE);

  return {
    values,
    loading,
    handleChange,
    resetPassword,
    resetForm,
  };
}
