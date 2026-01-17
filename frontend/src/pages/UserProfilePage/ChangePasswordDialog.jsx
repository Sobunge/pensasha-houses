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
} from "@mui/material";

import LockResetIcon from "@mui/icons-material/LockReset";
import CancelIcon from "@mui/icons-material/Cancel";
import LockIcon from "@mui/icons-material/Lock";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

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
    const pwd = values.newPassword;
    let score = 0;

    if (pwd.length >= 8) score += 25;
    if (/[A-Z]/.test(pwd)) score += 25;
    if (/[0-9]/.test(pwd)) score += 25;
    if (/[\W]/.test(pwd)) score += 25;

    return score;
  }, [values.newPassword]);

  const strengthColor =
    strength < 50 ? "error.main" : strength < 75 ? "warning.main" : "success.main";

  /* ---------------- Submit ---------------- */
  const handleSubmit = async () => {
    setFieldErrors({});
    const success = await resetPassword({ setFieldErrors });
    if (success) handleClose();
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      fullWidth
      maxWidth="xs"
      PaperProps={{ sx: { borderRadius: 3, p: 1.5 } }}
    >
      <DialogTitle>
        <Box textAlign="center">
          <Typography variant="h6" fontWeight={600}>
            Change Password
          </Typography>
          <Typography variant="body2" color="text.secondary" mt={0.5}>
            Choose a strong password you haven’t used before
          </Typography>
        </Box>
      </DialogTitle>

      <DialogContent>
        <Stack spacing={2.2} mt={1}>
          {/* Current password */}
          <TextField
            label="Current Password"
            name="currentPassword"
            placeholder="Enter current password"
            type={show.currentPassword ? "text" : "password"}
            value={values.currentPassword}
            onChange={handleChange}
            error={!!fieldErrors.currentPassword}
            helperText={fieldErrors.currentPassword}
            fullWidth
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <LockIcon fontSize="small" />
                </InputAdornment>
              ),
              endAdornment: (
                <IconButton onClick={() => toggleShow("currentPassword")}>
                  {show.currentPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              ),
            }}
          />

          {/* New password */}
          <TextField
            label="New Password"
            name="newPassword"
            placeholder="Enter New password"
            type={show.newPassword ? "text" : "password"}
            value={values.newPassword}
            onChange={handleChange}
            error={!!fieldErrors.newPassword}
            helperText={fieldErrors.newPassword}
            fullWidth
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <LockIcon fontSize="small" />
                </InputAdornment>
              ),
              endAdornment: (
                <IconButton onClick={() => toggleShow("newPassword")}>
                  {show.newPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              ),
            }}
          />

          {/* Strength bar */}
          <Box>
            <Box height={6} bgcolor="grey.300" borderRadius={3}>
              <Box
                height="100%"
                width={`${strength}%`}
                bgcolor={strengthColor}
                borderRadius={3}
                transition="width 0.3s"
              />
            </Box>
            <Typography variant="caption" color="text.secondary">
              Password strength
            </Typography>
          </Box>

          {/* Confirm password */}
          <TextField
            label="Confirm New Password"
            name="confirmNewPassword"
            placeholder="Confirm new password"
            type={show.confirmNewPassword ? "text" : "password"}
            value={values.confirmNewPassword}
            onChange={handleChange}
            error={!!fieldErrors.confirmNewPassword}
            helperText={fieldErrors.confirmNewPassword}
            fullWidth
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <LockIcon fontSize="small" />
                </InputAdornment>
              ),
              endAdornment: (
                <IconButton onClick={() => toggleShow("confirmNewPassword")}>
                  {show.confirmNewPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              ),
            }}
          />
        </Stack>
      </DialogContent>

      <DialogActions sx={{ px: 3, pb: 2, justifyContent: "space-between" }}>
        <Button
          onClick={handleClose}
          color="secondary"
          disabled={loading}
          startIcon={<CancelIcon />}
        >
          Cancel
        </Button>

        <Button
          onClick={handleSubmit}
          variant="contained"
          disabled={loading}
          startIcon={
            loading ? <CircularProgress size={18} /> : <LockResetIcon />
          }
        >
          {loading ? "Saving..." : "Save"}
        </Button>
      </DialogActions>

    </Dialog>
  );
}
