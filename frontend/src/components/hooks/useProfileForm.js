import { useState, useEffect, useCallback, useMemo } from "react";

/**
 * Hook for managing profile form state with validation and placeholders
 * @param {Object} profile - user profile
 */
export default function useProfileForm(profile) {
  // 1. Manage role state internally
  const [role, setRole] = useState(profile?.roles?.[0] || "");
  const [formData, setFormData] = useState({});
  const [errors, setErrors] = useState({});

  // 2. Define fields using useMemo so they only recalculate when the role changes
  const fields = useMemo(() => {
    const baseFields = [
      { key: "firstName", label: "First Name", required: true, placeholder: "Enter first name" },
      { key: "middleName", label: "Middle Name", placeholder: "Enter middle name (optional)" },
      { key: "lastName", label: "Last Name", required: true, placeholder: "Enter last name" },
      { key: "idNumber", label: "ID Number", required: true, placeholder: "Enter ID number" },
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

  // 3. Populate form data whenever role or profile changes
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
  }, [profile, fields]); // Recalculate whenever fields (role-based) or profile changes

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
    role,      // Exposed so the Dialog knows which role is active
    setRole,   // Exposed so the Dialog can switch roles
    fields,    // The actual array for renderFields()
    handleChange,
    handleSubmit,
  };
}