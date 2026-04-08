import { useState, useEffect, useMemo } from "react";

/**
 * Hook for managing profile form state with validation and placeholders
 * @param {Object} profile - user profile
 */
export default function useProfileForm(profile) {
  const [role, setRole] = useState(profile?.roles?.[0] || "");
  const [formData, setFormData] = useState({});
  const [errors, setErrors] = useState({});

  const fields = useMemo(() => {
    const baseFields = [
      { key: "firstName", label: "First Name", required: true, min: 3, max: 20, placeholder: "Enter first name" },
      { key: "middleName", label: "Middle Name", placeholder: "Enter middle name (optional)" },
      { key: "lastName", label: "Last Name", required: true, min: 3, max: 20, placeholder: "Enter last name" },
      { key: "idNumber", label: "ID Number", required: true, type: "id", placeholder: "Enter ID number" },
      { key: "email", label: "Email", required: true, type: "email", placeholder: "Enter email address" },
      { key: "phoneNumber", label: "Phone", required: true, type: "phone", placeholder: "Enter phone number" },
    ];

    switch (role) {
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
              { key: "accountNumber", label: "Account Number", required: true, placeholder: "Enter account number" },
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
  }, [role]);

  useEffect(() => {
    if (!profile) return;

    const initialData = {};
    const populateData = (fieldList, source, target) => {
      fieldList.forEach((field) => {
        if (field.nested) {
          target[field.key] = {};
          populateData(field.nested, source[field.key] || {}, target[field.key]);
        } else {
          target[field.key] = source[field.key] || "";
        }
      });
    };

    populateData(fields, profile, initialData);
    setFormData(initialData);
    setErrors({});
  }, [profile, fields]);

  // NEW: Enhanced Validation Logic matching Spring Boot DTO
  const validateField = (key, value, field) => {
    if (field.required && (!value || value.toString().trim() === "")) {
      return `${field.label} is required`;
    }

    if (value) {
      // Name length validation (3-20 chars)
      if (field.min && value.length < field.min) {
        return `${field.label} must be at least ${field.min} characters`;
      }
      if (field.max && value.length > field.max) {
        return `${field.label} must not exceed ${field.max} characters`;
      }

      // Email validation
      if (field.type === "email") {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) return "Invalid email address";
      }

      // Kenyan Phone Number validation (Matches your DTO Regex)
      if (field.type === "phone") {
        const phoneRegex = /^(?:\+254|0)[17][0-9]{8}$/;
        if (!phoneRegex.test(value)) {
          return "Use format +2547XXXXXXXX or 07XXXXXXXX";
        }
      }

      // ID Number validation (6-12 digits)
      if (field.type === "id") {
        const idRegex = /^[0-9]{6,12}$/;
        if (!idRegex.test(value)) return "ID Number must be 6-12 digits";
      }
    }

    return "";
  };

  const handleChange = (key, value, parentKey = null, fieldDef = null) => {
    setFormData((prev) => {
      const updated = { ...prev };
      if (parentKey) {
        updated[parentKey] = { ...updated[parentKey], [key]: value };
      } else {
        updated[key] = value;
      }
      return updated;
    });

    if (fieldDef) {
      const errorMsg = validateField(key, value, fieldDef);
      setErrors((prev) => {
        const updated = { ...prev };
        if (parentKey) {
          updated[parentKey] = { ...updated[parentKey], [key]: errorMsg };
        } else {
          updated[key] = errorMsg;
        }
        return updated;
      });
    }
  };

  const validateAll = (fieldList, data) => {
    let valid = true;
    const errs = {};

    fieldList.forEach((field) => {
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
    const validation = validateAll(fields, formData);
    setErrors(validation.errors);

    if (!validation.valid) return null;

    return formData;
  };

  return {
    formData,
    errors,
    role,
    setRole,
    fields,
    handleChange,
    handleSubmit,
  };
}