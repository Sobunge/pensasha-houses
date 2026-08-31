// src/components/Auth/LoginPage/useLoginForm.js
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useNotification } from "../../components/NotificationProvider";
import { useAuth } from "../../pages/Auth/AuthContext";
import { login } from "../../api/authApi";
import { setAccessToken } from "../../api/api";

/* ---------------- Phone Helpers ---------------- */
export const normalizePhone = (value) => {
  if (!value) return "";
  let digits = value.replace(/\D/g, "");
  if (digits.startsWith("0")) digits = digits.substring(1);
  return "+254" + digits;
};

export const validatePhoneNumber = (value) => {
  if (!value) return "Phone number is required";
  const digits = value.replace(/\D/g, "");
  if (!/^(7|1)\d{8}$/.test(digits)) return "Enter a valid phone number";
  return null;
};

export const validatePassword = (value) => {
  if (!value) return "Password is required";
  if (value.length < 5) return "Password must be at least 5 characters";
  return null;
};

export function useLoginForm(onClose) {
  const [formData, setFormData] = useState({ phoneNumber: "", password: "" });
  const [touched, setTouched] = useState({ phoneNumber: false, password: false });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const { notify } = useNotification();
  const { loginAs, redirectAfterAuth, setRedirectAfterAuth } = useAuth();
  const navigate = useNavigate();

  const phoneError = validatePhoneNumber(formData.phoneNumber);
  const passwordError = validatePassword(formData.password);

  const showPhoneError = touched.phoneNumber && Boolean(phoneError);
  const showPasswordError = touched.password && Boolean(passwordError);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleBlur = (field) => () =>
    setTouched((prev) => ({ ...prev, [field]: true }));

  const togglePasswordVisibility = () => setShowPassword((prev) => !prev);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (phoneError || passwordError) {
      setTouched({ phoneNumber: true, password: true });
      return;
    }

    setLoading(true);
    try {
      const normalizedPhone = normalizePhone(formData.phoneNumber);

      const res = await login({
        phoneNumber: normalizedPhone,
        password: formData.password,
      });

      // Handle both unwrapped data objects and standard Axios response objects
      const payload = res?.data || res;
      const { accessToken, principal } = payload;

      if (!accessToken || !principal) {
        throw new Error("Invalid login response from server");
      }

      // Save token strictly in memory
      setAccessToken(accessToken);

      const roles = Array.isArray(principal.roles)
        ? principal.roles
        : principal.role
        ? [principal.role]
        : [];

      const permissions = Array.isArray(principal.permissions)
        ? principal.permissions
        : [];

      const user = {
        id: principal.id,
        name: principal.firstname || principal.name,
        roles,
        permissions,
        defaultRoute: "/dashboard",
      };

      // Delegate session persistence directly to AuthContext
      loginAs(user);
      notify("Login successful!", "success");

      if (onClose) onClose();
      window.scrollTo(0, 0);

      if (redirectAfterAuth && redirectAfterAuth !== "rent-request") {
        navigate(redirectAfterAuth, { replace: true });
        setRedirectAfterAuth(null);
      } else if (redirectAfterAuth !== "rent-request") {
        navigate("/dashboard", { replace: true });
      }
    } catch (err) {
      console.error("Login error:", err);
      const message =
        err?.response?.data?.message ||
        err?.message ||
        "Unable to login. Please check your credentials.";
      notify(message, "error");
    } finally {
      setLoading(false);
    }
  };

  return {
    formData,
    showPassword,
    loading,
    showPhoneError,
    phoneError,
    showPasswordError,
    passwordError,
    handleChange,
    handleBlur,
    togglePasswordVisibility,
    handleSubmit,
  };
}