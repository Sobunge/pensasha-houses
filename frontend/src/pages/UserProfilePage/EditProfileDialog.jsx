// src/pages/UserProfilePage/EditProfileDialog.jsx
import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Stack,
  Box,
  Typography,
  InputAdornment,
  CircularProgress,
  IconButton,
} from "@mui/material";

import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import SaveOutlinedIcon from "@mui/icons-material/SaveOutlined";
import CloseIcon from "@mui/icons-material/Close";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";

import api from "../../api/api";
import useProfileForm from "../../components/hooks/useProfileForm";
import { useNotification } from "../../components/NotificationProvider";

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

/* ---------------- Premium & Compact Input Styles ---------------- */
const premiumInputStyles = {
  mt: 0.5,
  "& .MuiOutlinedInput-root": {
    borderRadius: "10px",
    backgroundColor: "#FFFFFF",
    color: "#0F172A",
    fontSize: "0.875rem",
    fontWeight: 600,
    transition: "all 0.2s cubic-bezier(0.4, 0, 0.2, 1)",
    "& fieldset": {
      borderColor: "#E2E8F0",
      borderWidth: "1.5px",
    },
    "&:hover fieldset": {
      borderColor: "rgba(212, 175, 55, 0.5)",
    },
    "&.Mui-focused": {
      backgroundColor: "#FFFFFF",
      boxShadow: "0 4px 12px rgba(212, 175, 55, 0.12)",
      "& fieldset": {
        borderColor: "#D4AF37",
        borderWidth: "1.5px",
      },
    },
  },
  "& .MuiInputLabel-root": {
    color: "#475569",
    fontWeight: 700,
    fontSize: "0.825rem",
    "&.Mui-focused": {
      color: "#B48A1D",
    },
  },
  "& .MuiInputLabel-outlined.MuiInputLabel-shrink": {
    transform: "translate(14px, -8px) scale(0.75)",
    bgcolor: "#FFFFFF",
    px: 0.5,
  },
};

export default function EditProfileDialog({ open, handleClose, profile, refreshProfile }) {
  const { notify } = useNotification();

  const { 
    formData, 
    errors, 
    handleChange, 
    handleSubmit, 
    fields, 
    role: selectedRole 
  } = useProfileForm(profile || {});

  const [loading, setLoading] = useState(false);

  // Fallback active role resolution
  const activeRole = selectedRole || profile?.role || profile?.roles?.[0];

  // Helper function to render an individual input field
  const renderSingleField = (field, parentKey = null) => {
    const value = parentKey
      ? formData[parentKey]?.[field.key] ?? ""
      : formData[field.key] ?? "";

    const error = parentKey
      ? errors[parentKey]?.[field.key]
      : errors[field.key];

    return (
      <TextField
        key={field.key}
        label={field.label}
        placeholder={field.placeholder || ""}
        value={value}
        onChange={(e) =>
          handleChange(field.key, e.target.value, parentKey, field)
        }
        error={Boolean(error)}
        helperText={error}
        fullWidth
        size="small"
        variant="outlined"
        InputLabelProps={{ shrink: true }}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <PersonOutlinedIcon sx={{ color: "#D4AF37", fontSize: "1.1rem" }} />
            </InputAdornment>
          ),
        }}
        sx={premiumInputStyles}
      />
    );
  };

  // Render dynamic fields (supports nested and responsive layout grouping for name fields)
  const renderFields = (fieldsToRender, parentKey = null) => {
    if (!fieldsToRender) return null;

    const renderedElements = [];
    let nameFieldsBuffer = [];

    const flushNameBuffer = () => {
      if (nameFieldsBuffer.length > 0) {
        renderedElements.push(
          <Stack
            key="name-fields-row"
            direction={{ xs: "column", lg: "row" }} // Column for sm & md, Horizontal Row for lg
            spacing={2}
            sx={{ width: "100%" }}
          >
            {nameFieldsBuffer.map((f) => (
              <Box key={f.key} sx={{ flex: 1 }}>
                {renderSingleField(f, parentKey)}
              </Box>
            ))}
          </Stack>
        );
        nameFieldsBuffer = [];
      }
    };

    fieldsToRender.forEach((field) => {
      if (field.nested) {
        flushNameBuffer();
        renderedElements.push(
          <Box key={field.key} sx={{ pl: parentKey ? 1.5 : 0 }}>
            <Typography
              variant="subtitle2"
              sx={{ mb: 1, fontWeight: 800, color: "#0F172A", fontSize: "0.85rem", letterSpacing: "-0.01em" }}
            >
              {field.label}
            </Typography>

            <Stack spacing={1.5}>{renderFields(field.nested, field.key)}</Stack>
          </Box>
        );
      } else if (["firstName", "middleName", "lastName"].includes(field.key)) {
        // Collect name fields to put in a horizontal row on large screens
        nameFieldsBuffer.push(field);
      } else {
        flushNameBuffer();
        renderedElements.push(renderSingleField(field, parentKey));
      }
    });

    flushNameBuffer();
    return renderedElements;
  };

  // Save handler with Notification feedback
  const handleSave = async () => {
    if (!profile?.id || !activeRole) {
      notify("Missing user or active role information.", "warning");
      return;
    }

    const payload = handleSubmit();
    if (!payload) {
      notify("Please resolve validation errors before saving.", "error");
      return;
    }

    const endpoint = getProfileEndpoint(activeRole, profile.id);
    if (!endpoint) {
      notify("Could not resolve update endpoint for role.", "error");
      return;
    }

    setLoading(true);
    try {
      await api.put(endpoint, payload);
      
      notify("Profile updated successfully!", "success");

      if (refreshProfile) {
        await refreshProfile();
      }

      handleClose();
    } catch (err) {
      console.error("Failed to update profile:", err);
      
      const errorMessage =
        err.response?.data?.message ||
        err.message ||
        "Failed to update profile. Please try again.";

      notify(errorMessage, "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog 
      open={open} 
      onClose={handleClose} 
      fullWidth 
      maxWidth="md"
      PaperProps={{ 
        sx: { 
          borderRadius: "16px", 
          p: 0.5,
          border: "1px solid rgba(212, 175, 55, 0.4)",
          boxShadow: "0 20px 40px rgba(15, 23, 42, 0.18)",
          background: "linear-gradient(180deg, #FFFFFF 0%, #F8FAFC 100%)",
        } 
      }}
    >
      {/* DIALOG HEADER */}
      <DialogTitle
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          pb: 1.5,
          pt: 2,
          px: { xs: 2, sm: 2.5 },
          borderBottom: "1px solid #F1F5F9",
        }}
      >
        <Stack direction="row" spacing={1.5} alignItems="center">
          <Box
            sx={{
              width: 38,
              height: 38,
              borderRadius: "10px",
              bgcolor: "rgba(212, 175, 55, 0.12)",
              color: "#D4AF37",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
            }}
          >
            <EditOutlinedIcon sx={{ fontSize: 20 }} />
          </Box>
          <Box>
            <Typography
              variant="h6"
              sx={{ fontWeight: 800, color: "#0F172A", fontSize: "1.05rem", lineHeight: 1.2 }}
            >
              Edit Profile
            </Typography>
            <Typography variant="caption" sx={{ color: "#64748B", fontWeight: 600, fontSize: "0.75rem" }}>
              Update your account details below
            </Typography>
          </Box>
        </Stack>

        <IconButton 
          onClick={handleClose} 
          disabled={loading}
          size="small" 
          sx={{ color: "#64748B", "&:hover": { bgcolor: "#F1F5F9", color: "#EF4444" } }}
        >
          <CloseIcon fontSize="small" />
        </IconButton>
      </DialogTitle>

      {/* DIALOG BODY */}
      <DialogContent sx={{ px: { xs: 2, sm: 2.5 }, py: 2.5, overflowY: "visible" }}>
        <Stack spacing={2} sx={{ pt: 1 }}>
          {renderFields(fields)}
        </Stack>
      </DialogContent>

      {/* DIALOG ACTIONS */}
      <DialogActions 
        sx={{ 
          px: { xs: 2, sm: 2.5 }, 
          py: 1.5, 
          borderTop: "1px solid #F1F5F9",
          justifyContent: { xs: "center", md: "flex-end" }, 
          gap: 1.2 
        }}
      >
        <Button
          onClick={handleClose}
          disabled={loading}
          startIcon={<CancelOutlinedIcon sx={{ fontSize: "18px !important" }} />}
          sx={{
            bgcolor: "rgba(239, 68, 68, 0.08)",
            color: "#EF4444",
            borderRadius: "8px",
            px: 2.5,
            py: 0.6,
            fontWeight: 700,
            fontSize: "0.825rem",
            textTransform: "none",
            "& .MuiButton-startIcon": { color: "#EF4444" },
            "&:hover": { 
              bgcolor: "#EF4444", 
              color: "#FFFFFF",
              "& .MuiButton-startIcon": { color: "#FFFFFF" },
              boxShadow: "0 4px 12px rgba(239, 68, 68, 0.25)",
            },
            transition: "all 0.2s ease",
          }}
        >
          Cancel
        </Button>

        <Button
          startIcon={loading ? <CircularProgress size={16} color="inherit" /> : <SaveOutlinedIcon sx={{ fontSize: "18px !important" }} />}
          variant="contained"
          onClick={handleSave}
          disabled={loading}
          sx={{
            bgcolor: "#0F172A",
            color: "#FFFFFF",
            borderRadius: "8px",
            px: 3,
            py: 0.6,
            fontWeight: 700,
            fontSize: "0.825rem",
            textTransform: "none",
            boxShadow: "0 4px 12px rgba(15, 23, 42, 0.15)",
            transition: "all 0.2s ease",
            "& .MuiButton-startIcon": { color: "#D4AF37" },
            "&:hover": {
              bgcolor: "#D4AF37",
              color: "#0F172A",
              boxShadow: "0 6px 18px rgba(212, 175, 55, 0.35)",
              "& .MuiButton-startIcon": { color: "#0F172A" },
            },
          }}
        >
          {loading ? "Saving..." : "Save Changes"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}