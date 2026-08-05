// src/components/Auth/RegistrationPage/useRegistrationForm.js
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { register } from "../../api/authApi";
import { setAccessToken } from "../../api/api";
import { useNotification } from "../../components/NotificationProvider";
import { useAuth } from "../../pages/Auth/AuthContext";

/* ---------------- Helpers ---------------- */
export const normalizePhone = (phone) => {
  if (!phone) return "";
  let digits = phone.replace(/\D/g, "");
  if (digits.startsWith("0")) digits = "254" + digits.substring(1);
  return digits.startsWith("254") ? "+" + digits : "+254" + digits;
};

export const validateRequired = (value, fieldName) => {
  if (!value || !value.trim()) return `${fieldName} is required`;
  return null;
};

export const validatePhoneNumber = (value) => {
  if (!value) return "Phone number is required";
  const digits = value.replace(/\D/g, "");
  if (!/^(7|1)\d{8}$/.test(digits)) return "Enter a valid phone number";
  return null;
};

export const validateEmail = (value) => {
  if (!value) return "Email is required";
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(value)) return "Enter a valid email address";
  return null;
};

export const validatePassword = (value) => {
  if (!value) return "Password is required";
  if (value.length < 8) return "Password must be at least 8 characters";
  return null;
};

export function useRegistrationForm(onSuccess) {
  const navigate = useNavigate();
  const { notify } = useNotification();
  const { loginAs, redirectAfterAuth, setRedirectAfterAuth } = useAuth();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phoneNumber: "",
    email: "",
    password: "",
    role: "",
  });

  const [touched, setTouched] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const errors = {
    firstName: validateRequired(formData.firstName, "First name"),
    lastName: validateRequired(formData.lastName, "Last name"),
    phoneNumber: validatePhoneNumber(formData.phoneNumber),
    email: validateEmail(formData.email),
    password: validatePassword(formData.password),
    role: validateRequired(formData.role, "Role"),
  };

  const hasErrors = Object.values(errors).some((err) => err !== null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleBlur = (field) => () =>
    setTouched((prev) => ({ ...prev, [field]: true }));

  const togglePasswordVisibility = () => setShowPassword((prev) => !prev);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (hasErrors) {
      const allTouched = Object.keys(formData).reduce(
        (acc, key) => ({ ...acc, [key]: true }),
        {}
      );
      setTouched(allTouched);
      return;
    }

    setLoading(true);
    try {
      const payload = {
        firstName: formData.firstName,
        lastName: formData.lastName,
        phoneNumber: normalizePhone(formData.phoneNumber),
        email: formData.email,
        password: formData.password,
        roles: [formData.role],
      };

      const res = await register(payload);

      // Support both raw payloads and Axios wrapped response objects
      const responseData = res?.data || res;
      const { accessToken, principal } = responseData;

      if (!accessToken || !principal) {
        throw new Error("Invalid registration response from server");
      }

      // Store in memory strictly
      setAccessToken(accessToken);

      const roles = Array.isArray(principal.roles)
        ? principal.roles
        : principal.role
        ? [principal.role]
        : [formData.role];

      const permissions = Array.isArray(principal.permissions)
        ? principal.permissions
        : [];

      const user = {
        id: principal.id,
        name: principal.firstName || principal.firstname || formData.firstName,
        roles,
        permissions,
        defaultRoute: "/dashboard",
      };

      if (loginAs) loginAs(user);

      notify("Account created successfully! Welcome.", "success", 3000);
      if (onSuccess) onSuccess();

      window.scrollTo(0, 0);

      if (redirectAfterAuth && redirectAfterAuth !== "rent-request") {
        navigate(redirectAfterAuth, { replace: true });
        setRedirectAfterAuth(null);
      } else if (redirectAfterAuth !== "rent-request") {
        navigate("/dashboard", { replace: true });
      }
    } catch (err) {
      console.error("Registration error:", err);
      const message =
        err?.response?.data?.message || err.message || "Registration failed.";
      notify(message, "error", 4000);
    } finally {
      setLoading(false);
    }
  };

  return {
    formData,
    touched,
    errors,
    showPassword,
    loading,
    handleChange,
    handleBlur,
    togglePasswordVisibility,
    handleSubmit,
  };
}