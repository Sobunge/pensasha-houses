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

/* ---------------- Theme-consistent Input Styles ---------------- */
const premiumInputStyles = {
  "& .MuiOutlinedInput-root": {
    borderRadius: "12px",
    backgroundColor: "#FAFAFA",
    color: "#0F172A",
    fontSize: "0.95rem",
    fontWeight: 500,
    transition: "all 0.2s ease",
    "& fieldset": {
      borderColor: "#CBD5E1",
      borderWidth: "1.5px",
    },
    "&:hover fieldset": {
      borderColor: "#94A3B8",
    },
    "&.Mui-focused": {
      backgroundColor: "#FFFFFF",
      "& fieldset": {
        borderColor: "#D4AF37",
        borderWidth: "2px",
      },
    },
  },
  "& .MuiInputLabel-root": {
    color: "#475569",
    fontWeight: 600,
    fontSize: "0.9rem",
    "&.Mui-focused": {
      color: "#D4AF37",
    },
  },
};

export default function EditProfileDialog({ open, handleClose, profile, refreshProfile }) {
  const { notify } = useNotification(); // 👈 Updated to extract 'notify' directly

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

  // Render dynamic fields (supports nested)
  const renderFields = (fieldsToRender, parentKey = null) => {
    if (!fieldsToRender) return null;

    return fieldsToRender.map((field) => {
      if (field.nested) {
        return (
          <Box key={field.key} sx={{ pl: parentKey ? 2 : 0 }}>
            <Typography
              variant="subtitle2"
              sx={{ mb: 1.5, fontWeight: 700, color: "#0F172A", fontSize: "0.9rem" }}
            >
              {field.label}
            </Typography>

            <Stack spacing={2}>{renderFields(field.nested, field.key)}</Stack>
          </Box>
        );
      }

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
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <PersonOutlinedIcon sx={{ color: "#475569", fontSize: "1.1rem" }} />
              </InputAdornment>
            ),
          }}
          sx={premiumInputStyles}
        />
      );
    });
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
      
      // Notify success
      notify("Profile updated successfully!", "success");

      // Refresh profile state in parent
      if (refreshProfile) {
        await refreshProfile();
      }

      handleClose();
    } catch (err) {
      console.error("Failed to update profile:", err);
      
      // Extract backend error message if present
      const errorMessage =
        err.response?.data?.message ||
        err.message ||
        "Failed to update profile. Please try again.";

      // Notify failure
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
      maxWidth="sm" 
      PaperProps={{ 
        sx: { 
          borderRadius: "16px", 
          p: 1,
          border: "1px solid #D4AF37",
          boxShadow: "0 10px 30px rgba(15, 23, 42, 0.12)",
        } 
      }}
    >
      <DialogTitle
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          pb: 1,
          pt: 1.5,
          px: 2.5,
        }}
      >
        <Stack direction="row" spacing={1.5} alignItems="center">
          <Box
            sx={{
              width: 42,
              height: 42,
              borderRadius: "12px",
              bgcolor: "rgba(212, 175, 55, 0.12)",
              color: "#D4AF37",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <EditOutlinedIcon sx={{ fontSize: 24 }} />
          </Box>
          <Box>
            <Typography
              variant="h6"
              sx={{ fontWeight: 800, color: "#0F172A", fontSize: "1.1rem", lineHeight: 1.2 }}
            >
              Edit Profile
            </Typography>
            <Typography variant="caption" sx={{ color: "#64748B", fontWeight: 500 }}>
              Update your account details below
            </Typography>
          </Box>
        </Stack>

        <IconButton 
          onClick={handleClose} 
          disabled={loading}
          size="small" 
          sx={{ color: "#64748B", "&:hover": { bgcolor: "#F1F5F9" } }}
        >
          <CloseIcon fontSize="small" />
        </IconButton>
      </DialogTitle>

      <DialogContent sx={{ px: 2.5, pt: "20px !important", pb: 2 }}>
        <Stack spacing={2.5} sx={{ mt: 1.5 }}>
          {renderFields(fields)}
        </Stack>
      </DialogContent>

      <DialogActions sx={{ px: 2.5, pb: 2, pt: 1, justifyContent: "flex-end", gap: 1.5 }}>
        <Button
          onClick={handleClose}
          disabled={loading}
          sx={{
            bgcolor: "#F1F5F9",
            color: "#475569",
            borderRadius: "50px",
            px: 3,
            py: 0.9,
            fontWeight: 700,
            fontSize: "0.875rem",
            textTransform: "none",
            "&:hover": { bgcolor: "#E2E8F0" },
          }}
        >
          Cancel
        </Button>

        <Button
          startIcon={loading ? <CircularProgress size={18} color="inherit" /> : <SaveOutlinedIcon />}
          variant="contained"
          onClick={handleSave}
          disabled={loading}
          sx={{
            bgcolor: "#D4AF37",
            color: "#000000",
            borderRadius: "50px",
            px: 3.5,
            py: 0.9,
            fontWeight: 700,
            fontSize: "0.875rem",
            textTransform: "none",
            boxShadow: "0 4px 14px rgba(212, 175, 55, 0.35)",
            transition: "all 0.2s ease",
            "&:hover": {
              bgcolor: "#B5922B",
              boxShadow: "0 6px 18px rgba(181, 146, 43, 0.45)",
            },
          }}
        >
          {loading ? "Saving..." : "Save Changes"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}