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
} from "@mui/material";

import LockResetIcon from "@mui/icons-material/LockReset";
import CancelIcon from "@mui/icons-material/Cancel";
import LockIcon from "@mui/icons-material/Lock";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import CloseIcon from "@mui/icons-material/Close";

import useResetPassword from "../../components/hooks/useResetPassword";

export default function ChangePasswordDialog({ open, handleClose }) {
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
    strength < 50 ? "#EF4444" : strength < 75 ? "#F59E0B" : "#10B981";

  /* ---------------- Submit ---------------- */
  const handleSubmit = async () => {
    setFieldErrors({});
    const success = await resetPassword({ setFieldErrors });
    if (success) handleClose();
  };

  const premiumInputStyles = {
    "& .MuiOutlinedInput-root": {
      borderRadius: "12px",
      backgroundColor: "#FAFAFA",
      color: "#0F172A",
      fontSize: "0.95rem",
      fontWeight: 500,
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
    "& input::placeholder": {
      color: "#94A3B8",
      opacity: 1,
    },
    "& .MuiFormHelperText-root": {
      color: "#DC2626",
      fontWeight: 500,
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
          borderRadius: "16px",
          border: "1.5px solid #D4AF37",
          boxShadow: "0 20px 40px rgba(15, 23, 42, 0.2)",
          p: 1,
        },
      }}
    >
      <DialogTitle sx={{ pb: 4, pt: 2, position: "relative" }}>
        <Box textAlign="center">
          <Typography variant="h6" fontWeight={800} sx={{ color: "#0F172A" }}>
            Change Password
          </Typography>
          <Typography variant="body2" sx={{ color: "#64748B", mt: 0.5 }}>
            Choose a strong password you haven’t used before
          </Typography>
        </Box>
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{
            position: "absolute",
            right: 12,
            top: 12,
            color: "#64748B",
            "&:hover": { color: "#0F172A" },
          }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent sx={{ py: 2 }}>
        <Stack spacing={2.5} mt={1}>
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
            sx={{
              ...premiumInputStyles,
              "& input::-ms-reveal, & input::-ms-clear": { display: "none" },
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <LockIcon fontSize="small" sx={{ color: "#D4AF37" }} />
                </InputAdornment>
              ),
              endAdornment: (
                <IconButton onClick={() => toggleShow("currentPassword")}>
                  {show.currentPassword ? (
                    <VisibilityOff fontSize="small" />
                  ) : (
                    <Visibility fontSize="small" />
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
            sx={{
              ...premiumInputStyles,
              "& input::-ms-reveal, & input::-ms-clear": { display: "none" },
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <LockIcon fontSize="small" sx={{ color: "#D4AF37" }} />
                </InputAdornment>
              ),
              endAdornment: (
                <IconButton onClick={() => toggleShow("newPassword")}>
                  {show.newPassword ? (
                    <VisibilityOff fontSize="small" />
                  ) : (
                    <Visibility fontSize="small" />
                  )}
                </IconButton>
              ),
            }}
          />

          {/* Strength bar */}
          <Box sx={{ px: 0.5 }}>
            <Box
              height={6}
              bgcolor="#E2E8F0"
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
              mt={0.8}
            >
              <Typography variant="caption" sx={{ color: "#64748B", fontWeight: 600 }}>
                Password strength
              </Typography>
              <Typography
                variant="caption"
                sx={{ color: strengthColor, fontWeight: 700 }}
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
            sx={{
              ...premiumInputStyles,
              "& input::-ms-reveal, & input::-ms-clear": { display: "none" },
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <LockIcon fontSize="small" sx={{ color: "#D4AF37" }} />
                </InputAdornment>
              ),
              endAdornment: (
                <IconButton onClick={() => toggleShow("confirmNewPassword")}>
                  {show.confirmNewPassword ? (
                    <VisibilityOff fontSize="small" />
                  ) : (
                    <Visibility fontSize="small" />
                  )}
                </IconButton>
              ),
            }}
          />
        </Stack>
      </DialogContent>

      <Divider sx={{ borderColor: "#E2E8F0", mt: 1 }} />

      <DialogActions sx={{ px: 3, py: 2, justifyContent: "space-between" }}>
        <Button
          onClick={handleClose}
          disabled={loading}
          startIcon={<CancelIcon />}
          sx={{
            color: "#64748B",
            fontWeight: 700,
            textTransform: "none",
            "&:hover": { color: "#0F172A", bgcolor: "#F1F5F9" },
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
              <CircularProgress size={18} sx={{ color: "#FFFFFF" }} />
            ) : (
              <LockResetIcon sx={{ color: "#D4AF37" }} />
            )
          }
          sx={{
            bgcolor: "#0F172A",
            color: "#FFFFFF",
            fontWeight: 700,
            px: 3,
            py: 1,
            borderRadius: "10px",
            textTransform: "none",
            boxShadow: "0 4px 12px rgba(15, 23, 42, 0.15)",
            "&:hover": {
              bgcolor: "#D4AF37",
              color: "#0F172A",
              "& .MuiSvgIcon-root": { color: "#0F172A" },
            },
            transition: "all 0.2s ease",
          }}
        >
          {loading ? "Saving..." : "Save Password"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}