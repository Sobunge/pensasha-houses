import { useState, useEffect, useCallback } from "react";

/**
 * Hook for managing profile form state with validation and placeholders
 * @param {Object} profile - user profile
 */
export default function useProfileForm(profile) {
  const [formData, setFormData] = useState({});
  const [errors, setErrors] = useState({});
  const [role, setRole] = useState(profile?.roles?.[0] || "");

  const getFieldsByRole = useCallback(
    (r) => {
      const baseFields = [
        { key: "firstName", label: "First Name", required: true, placeholder: "Enter first name" },
        { key: "middleName", label: "Middle Name", placeholder: "Enter middle name (optional)" },
        { key: "lastName", label: "Last Name", required: true, placeholder: "Enter last name" },
        { key: "email", label: "Email", required: true, type: "email", placeholder: "Enter email address" },
        { key: "phoneNumber", label: "Phone", required: true, type: "phone", placeholder: "Enter phone number" },
      ];

      switch (r) {
        case "TENANT":
          return [
            ...baseFields,
            { key: "emergencyContact", label: "Emergency Contact", required: true, type: "phone", placeholder: "Enter emergency contact number" },
          ];
        case "LANDLORD":
          return [
            ...baseFields,
            {
              key: "bankDetails",
              label: "Bank Details",
              nested: [
                { key: "bankName", label: "Bank Name", required: true, placeholder: "Enter bank name" },
                { key: "accountName", label: "Account Name", required: true, placeholder: "Enter account name" },
              ],
            },
          ];
        case "CARETAKER":
          return [
            ...baseFields,
            {
              key: "assignedProperty",
              label: "Assigned Property",
              nested: [
                { key: "name", label: "Property Name", required: true, placeholder: "Enter property name" },
                { key: "location", label: "Location", required: true, placeholder: "Enter property location" },
              ],
            },
          ];
        default:
          return baseFields;
      }
    },
    []
  );

  // Populate form data whenever role changes or profile changes
  useEffect(() => {
    if (!profile || !role) return;

    const initialData = {};
    const populateData = (fields, source, target) => {
      fields.forEach((field) => {
        if (field.nested) {
          target[field.key] = {};
          populateData(field.nested, source[field.key] || {}, target[field.key]);
        } else {
          target[field.key] = source[field.key] || "";
        }
      });
    };

    populateData(getFieldsByRole(role), profile, initialData);
    setFormData(initialData);
    setErrors({});
  }, [profile, role, getFieldsByRole]);

  // Validation rules
  const validateField = (key, value, field) => {
    if (field.required && !value) return "This field is required";

    if (field.type === "email") {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (value && !emailRegex.test(value)) return "Invalid email address";
    }

    if (field.type === "phone") {
      const phoneRegex = /^[0-9+()\-\s]*$/;
      if (value && !phoneRegex.test(value)) return "Invalid phone number";
    }

    return "";
  };

  // Real-time validation on change
  const handleChange = (key, value, parentKey = null, fieldDef = null) => {
    setFormData((prev) => {
      const updated = { ...prev };
      if (parentKey) updated[parentKey] = { ...updated[parentKey], [key]: value };
      else updated[key] = value;
      return updated;
    });

    if (fieldDef) {
      const errorMsg = validateField(key, value, fieldDef);
      setErrors((prev) => {
        const updated = { ...prev };
        if (parentKey) {
          updated[parentKey] = { ...updated[parentKey], [key]: errorMsg };
        } else updated[key] = errorMsg;
        return updated;
      });
    }
  };

  // Validate all fields before submit
  const validateAll = (fields, data) => {
    let valid = true;
    const errs = {};

    fields.forEach((field) => {
      if (field.nested) {
        const nestedResult = validateAll(field.nested, data[field.key] || {});
        errs[field.key] = nestedResult.errors;
        if (!nestedResult.valid) valid = false;
      } else {
        const msg = validateField(field.key, data[field.key], field);
        errs[field.key] = msg;
        if (msg) valid = false;
      }
    });

    return { valid, errors: errs };
  };

  const handleSubmit = () => {
    const fields = getFieldsByRole(role);
    const validation = validateAll(fields, formData);
    setErrors(validation.errors);

    if (!validation.valid) return null;

    const processed = { ...formData };
    if (processed.properties) processed.properties = processed.properties.split(",").map((p) => p.trim());

    return processed;
  };

  return {
    formData,
    errors,
    handleChange,
    handleSubmit,
    fields: getFieldsByRole(role),
    setRole, // expose setter to switch role dynamically
  };
}