// src/pages/UserProfilePage/EditProfileDialog.jsx
import React from "react";
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
  useTheme,
} from "@mui/material";

import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import SaveOutlinedIcon from "@mui/icons-material/SaveOutlined";
import CloseIcon from "@mui/icons-material/Close";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";

import useProfileForm from "../../components/hooks/profile/useProfileForm";
import useUpdateProfile from "../../components/hooks/profile/useUpdateProfile";

export default function EditProfileDialog({ open, handleClose, profile, refreshProfile }) {
  const theme = useTheme();

  const { 
    formData, 
    errors, 
    handleChange, 
    handleSubmit: handleFormSubmit, 
    fields, 
    role: selectedRole 
  } = useProfileForm(profile || {});

  // Fallback active role resolution
  const activeRole = selectedRole || profile?.role || profile?.roles?.[0];

  const { handleSave, loading } = useUpdateProfile({
    profile,
    activeRole,
    refreshProfile,
    handleClose,
  });

  /* ---------------- Premium & Compact Input Styles (Theme-Driven) ---------------- */
  const premiumInputStyles = {
    mt: 0.5,
    "& .MuiOutlinedInput-root": {
      borderRadius: `${theme.shape.borderRadius}px`,
      backgroundColor: theme.palette.background.paper,
      color: theme.palette.primary.main,
      fontSize: "0.875rem",
      fontWeight: 600,
      transition: "all 0.2s cubic-bezier(0.4, 0, 0.2, 1)",
      "& fieldset": {
        borderColor: theme.palette.divider,
        borderWidth: "1.5px",
      },
      "&.Mui-hover fieldset, &:hover fieldset": {
        borderColor: `${theme.palette.secondary.main}80`,
      },
      "&.Mui-focused": {
        backgroundColor: theme.palette.background.paper,
        boxShadow: `0 4px 12px ${theme.palette.secondary.main}20`,
        "& fieldset": {
          borderColor: theme.palette.secondary.main,
          borderWidth: "1.5px",
        },
      },
    },
    "& .MuiInputLabel-root": {
      color: theme.palette.text.secondary,
      fontWeight: 700,
      fontSize: "0.825rem",
      "&.Mui-focused": {
        color: theme.palette.secondary.main,
      },
    },
    "& .MuiInputLabel-outlined.MuiInputLabel-shrink": {
      transform: "translate(14px, -8px) scale(0.75)",
      bgcolor: theme.palette.background.paper,
      px: 0.5,
    },
  };

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
              <PersonOutlinedIcon sx={{ color: theme.palette.secondary.main, fontSize: "1.1rem" }} />
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
            direction={{ xs: "column", lg: "row" }}
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
              sx={{ mb: 1, fontWeight: 800, color: theme.palette.primary.main, fontSize: "0.85rem", letterSpacing: "-0.01em" }}
            >
              {field.label}
            </Typography>

            <Stack spacing={1.5}>{renderFields(field.nested, field.key)}</Stack>
          </Box>
        );
      } else if (["firstName", "middleName", "lastName"].includes(field.key)) {
        nameFieldsBuffer.push(field);
      } else {
        flushNameBuffer();
        renderedElements.push(renderSingleField(field, parentKey));
      }
    });

    flushNameBuffer();
    return renderedElements;
  };

  return (
    <Dialog 
      open={open} 
      onClose={handleClose} 
      fullWidth 
      maxWidth="md"
      PaperProps={{ 
        sx: { 
          borderRadius: `${theme.shape.borderRadius * 2}px`, 
          p: 0.5,
          border: `1px solid ${theme.palette.secondary.main}66`,
          boxShadow: `0 20px 40px ${theme.palette.primary.main}2E`,
          background: `linear-gradient(180deg, ${theme.palette.background.paper} 0%, ${theme.palette.action.hover} 100%)`,
          bgcolor: theme.palette.background.paper,
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
          borderBottom: `1px solid ${theme.palette.divider}`,
        }}
      >
        <Stack direction="row" spacing={1.5} alignItems="center">
          <Box
            sx={{
              width: 38,
              height: 38,
              borderRadius: `${theme.shape.borderRadius}px`,
              bgcolor: `${theme.palette.secondary.main}1F`,
              color: theme.palette.secondary.main,
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
              sx={{ fontWeight: 800, color: theme.palette.primary.main, fontSize: "1.05rem", lineHeight: 1.2 }}
            >
              Edit Profile
            </Typography>
            <Typography variant="caption" sx={{ color: theme.palette.text.secondary, fontWeight: 600, fontSize: "0.75rem" }}>
              Update your account details below
            </Typography>
          </Box>
        </Stack>

        <IconButton 
          onClick={handleClose} 
          disabled={loading}
          size="small" 
          sx={{ color: theme.palette.text.secondary, "&:hover": { bgcolor: theme.palette.action.hover, color: theme.palette.error?.main || "#EF4444" } }}
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
          borderTop: `1px solid ${theme.palette.divider}`,
          justifyContent: { xs: "center", md: "flex-end" }, 
          gap: 1.2 
        }}
      >
        <Button
          onClick={handleClose}
          disabled={loading}
          startIcon={<CancelOutlinedIcon sx={{ fontSize: "18px !important" }} />}
          sx={{
            bgcolor: `${theme.palette.error?.main || "#EF4444"}14`,
            color: theme.palette.error?.main || "#EF4444",
            borderRadius: `${theme.shape.borderRadius}px`,
            px: 2.5,
            py: 0.6,
            fontWeight: 700,
            fontSize: "0.825rem",
            textTransform: "none",
            "& .MuiButton-startIcon": { color: theme.palette.error?.main || "#EF4444" },
            "&:hover": { 
              bgcolor: theme.palette.error?.main || "#EF4444", 
              color: theme.palette.common.white,
              "& .MuiButton-startIcon": { color: theme.palette.common.white },
              boxShadow: `0 4px 12px ${theme.palette.error?.main || "#EF4444"}40`,
            },
            transition: "all 0.2s ease",
          }}
        >
          Cancel
        </Button>

        <Button
          startIcon={loading ? <CircularProgress size={16} color="inherit" /> : <SaveOutlinedIcon sx={{ fontSize: "18px !important" }} />}
          variant="contained"
          onClick={() => handleSave(handleFormSubmit)}
          disabled={loading}
          sx={{
            bgcolor: theme.palette.primary.main,
            color: theme.palette.primary.contrastText,
            borderRadius: `${theme.shape.borderRadius}px`,
            px: 3,
            py: 0.6,
            fontWeight: 700,
            fontSize: "0.825rem",
            textTransform: "none",
            boxShadow: `0 4px 12px ${theme.palette.primary.main}26`,
            transition: "all 0.2s ease",
            "& .MuiButton-startIcon": { color: theme.palette.secondary.main },
            "&:hover": {
              bgcolor: theme.palette.secondary.main,
              color: theme.palette.primary.main,
              boxShadow: `0 6px 18px ${theme.palette.secondary.main}59`,
              "& .MuiButton-startIcon": { color: theme.palette.primary.main },
            },
          }}
        >
          {loading ? "Saving..." : "Save Changes"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}