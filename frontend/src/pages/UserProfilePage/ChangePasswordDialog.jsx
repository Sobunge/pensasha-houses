// src/components/Profile/ChangePasswordDialog.jsx
import React, { useState, useMemo } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Stack,
  CircularProgress,
  Box,
  Typography,
  InputAdornment,
  IconButton,
  Divider,
  useTheme,
} from "@mui/material";

import LockResetIcon from "@mui/icons-material/LockReset";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import LockIcon from "@mui/icons-material/Lock";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import CloseIcon from "@mui/icons-material/Close";

import useResetPassword from "../../components/hooks/profile/useResetPassword";

export default function ChangePasswordDialog({ open, handleClose }) {
  const theme = useTheme();
  const { values, handleChange, resetPassword, loading } = useResetPassword();

  /* ---------------- Visibility toggles ---------------- */
  const [show, setShow] = useState({
    currentPassword: false,
    newPassword: false,
    confirmNewPassword: false,
  });

  const toggleShow = (field) =>
    setShow((prev) => ({ ...prev, [field]: !prev[field] }));

  /* ---------------- Field errors ---------------- */
  const [fieldErrors, setFieldErrors] = useState({});

  /* ---------------- Password strength ---------------- */
  const strength = useMemo(() => {
    const pwd = values.newPassword || "";
    let score = 0;

    if (pwd.length >= 8) score += 25;
    if (/[A-Z]/.test(pwd)) score += 25;
    if (/[0-9]/.test(pwd)) score += 25;
    if (/[\W]/.test(pwd)) score += 25;

    return score;
  }, [values.newPassword]);

  const strengthColor =
    strength < 50
      ? theme.palette.error?.main || "#EF4444"
      : strength < 75
      ? "#F59E0B"
      : "#10B981";

  /* ---------------- Submit ---------------- */
  const handleSubmit = async () => {
    setFieldErrors({});
    const success = await resetPassword({ setFieldErrors });
    if (success) handleClose();
  };

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
      "&:hover fieldset": {
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
    "& input::placeholder": {
      color: theme.palette.text.disabled,
      opacity: 0.8,
    },
    "& .MuiFormHelperText-root": {
      color: theme.palette.error?.main || "#EF4444",
      fontWeight: 600,
      fontSize: "0.725rem",
      mt: 0.3,
    },
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      fullWidth
      maxWidth="xs"
      PaperProps={{
        sx: {
          borderRadius: `${theme.shape.borderRadius * 2}px`,
          border: `1.5px solid ${theme.palette.secondary.main}66`,
          boxShadow: `0 20px 40px ${theme.palette.primary.main}2E`,
          p: 0.5,
          background: `linear-gradient(180deg, ${theme.palette.background.paper} 0%, ${theme.palette.action.hover} 100%)`,
          bgcolor: theme.palette.background.paper,
        },
      }}
    >
      {/* DIALOG HEADER */}
      <DialogTitle
        sx={{
          pb: 1.5,
          pt: 2,
          px: { xs: 2, sm: 2.5 },
          borderBottom: `1px solid ${theme.palette.divider}`,
          position: "relative",
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
            <LockResetIcon sx={{ fontSize: 20 }} />
          </Box>
          <Box>
            <Typography
              variant="h6"
              sx={{ fontWeight: 800, color: theme.palette.primary.main, fontSize: "1.05rem", lineHeight: 1.2 }}
            >
              Change Password
            </Typography>
            <Typography variant="caption" sx={{ color: theme.palette.text.secondary, fontWeight: 600, fontSize: "0.75rem" }}>
              Choose a strong password you haven’t used before
            </Typography>
          </Box>
        </Stack>

        <IconButton
          aria-label="close"
          onClick={handleClose}
          disabled={loading}
          size="small"
          sx={{
            position: "absolute",
            right: 12,
            top: 12,
            color: theme.palette.text.secondary,
            "&:hover": { bgcolor: theme.palette.action.hover, color: theme.palette.error?.main || "#EF4444" },
          }}
        >
          <CloseIcon fontSize="small" />
        </IconButton>
      </DialogTitle>

      {/* DIALOG BODY */}
      <DialogContent sx={{ px: { xs: 2, sm: 2.5 }, py: 2.5, overflowY: "visible" }}>
        <Stack spacing={2} sx={{ pt: 1 }}>
          {/* Current password */}
          <TextField
            size="small"
            label="Current Password"
            name="currentPassword"
            placeholder="Enter current password"
            type={show.currentPassword ? "text" : "password"}
            value={values.currentPassword}
            onChange={handleChange}
            error={!!fieldErrors.currentPassword}
            helperText={fieldErrors.currentPassword}
            fullWidth
            InputLabelProps={{ shrink: true }}
            sx={{
              ...premiumInputStyles,
              "& input::-ms-reveal, & input::-ms-clear": { display: "none" },
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <LockIcon sx={{ color: theme.palette.secondary.main, fontSize: "1.1rem" }} />
                </InputAdornment>
              ),
              endAdornment: (
                <IconButton
                  size="small"
                  onClick={() => toggleShow("currentPassword")}
                  edge="end"
                  sx={{ color: theme.palette.text.secondary }}
                >
                  {show.currentPassword ? (
                    <VisibilityOff sx={{ fontSize: 18 }} />
                  ) : (
                    <Visibility sx={{ fontSize: 18 }} />
                  )}
                </IconButton>
              ),
            }}
          />

          {/* New password */}
          <TextField
            size="small"
            label="New Password"
            name="newPassword"
            placeholder="Enter new password"
            type={show.newPassword ? "text" : "password"}
            value={values.newPassword}
            onChange={handleChange}
            error={!!fieldErrors.newPassword}
            helperText={fieldErrors.newPassword}
            fullWidth
            InputLabelProps={{ shrink: true }}
            sx={{
              ...premiumInputStyles,
              "& input::-ms-reveal, & input::-ms-clear": { display: "none" },
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <LockIcon sx={{ color: theme.palette.secondary.main, fontSize: "1.1rem" }} />
                </InputAdornment>
              ),
              endAdornment: (
                <IconButton
                  size="small"
                  onClick={() => toggleShow("newPassword")}
                  edge="end"
                  sx={{ color: theme.palette.text.secondary }}
                >
                  {show.newPassword ? (
                    <VisibilityOff sx={{ fontSize: 18 }} />
                  ) : (
                    <Visibility sx={{ fontSize: 18 }} />
                  )}
                </IconButton>
              ),
            }}
          />

          {/* Strength bar */}
          <Box sx={{ px: 0.5, mt: -0.5 }}>
            <Box
              height={5}
              bgcolor={theme.palette.divider}
              borderRadius={3}
              sx={{ overflow: "hidden" }}
            >
              <Box
                height="100%"
                width={`${strength}%`}
                bgcolor={strengthColor}
                borderRadius={3}
                sx={{ transition: "width 0.3s ease, background-color 0.3s ease" }}
              />
            </Box>
            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="center"
              mt={0.6}
            >
              <Typography variant="caption" sx={{ color: theme.palette.text.secondary, fontWeight: 600, fontSize: "0.725rem" }}>
                Password Strength
              </Typography>
              <Typography
                variant="caption"
                sx={{ color: strengthColor, fontWeight: 700, fontSize: "0.725rem" }}
              >
                {strength < 50 ? "Weak" : strength < 75 ? "Medium" : "Strong"}
              </Typography>
            </Stack>
          </Box>

          {/* Confirm password */}
          <TextField
            size="small"
            label="Confirm New Password"
            name="confirmNewPassword"
            placeholder="Confirm new password"
            type={show.confirmNewPassword ? "text" : "password"}
            value={values.confirmNewPassword}
            onChange={handleChange}
            error={!!fieldErrors.confirmNewPassword}
            helperText={fieldErrors.confirmNewPassword}
            fullWidth
            InputLabelProps={{ shrink: true }}
            sx={{
              ...premiumInputStyles,
              "& input::-ms-reveal, & input::-ms-clear": { display: "none" },
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <LockIcon sx={{ color: theme.palette.secondary.main, fontSize: "1.1rem" }} />
                </InputAdornment>
              ),
              endAdornment: (
                <IconButton
                  size="small"
                  onClick={() => toggleShow("confirmNewPassword")}
                  edge="end"
                  sx={{ color: theme.palette.text.secondary }}
                >
                  {show.confirmNewPassword ? (
                    <VisibilityOff sx={{ fontSize: 18 }} />
                  ) : (
                    <Visibility sx={{ fontSize: 18 }} />
                  )}
                </IconButton>
              ),
            }}
          />
        </Stack>
      </DialogContent>

      <Divider sx={{ borderColor: theme.palette.divider }} />

      {/* DIALOG ACTIONS */}
      <DialogActions
        sx={{
          px: { xs: 2, sm: 2.5 },
          py: 1.5,
          justifyContent: { xs: "center", md: "flex-end" },
          gap: 1.2,
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
          size="small"
          onClick={handleSubmit}
          variant="contained"
          disabled={loading}
          startIcon={
            loading ? (
              <CircularProgress size={16} color="inherit" />
            ) : (
              <LockResetIcon sx={{ fontSize: "18px !important" }} />
            )
          }
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
          {loading ? "Saving..." : "Save Password"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}