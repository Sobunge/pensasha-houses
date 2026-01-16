// src/components/Profile/BaseProfileInfo.jsx
import React, { useState } from "react";
import {
  Box,
  Typography,
  Stack,
  Divider,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  CircularProgress,
} from "@mui/material";
import BadgeIcon from "@mui/icons-material/Badge";
import PhoneIcon from "@mui/icons-material/Phone";
import PermIdentityIcon from "@mui/icons-material/PermIdentity";
import LockResetIcon from "@mui/icons-material/LockReset";
import { useNotification } from "../../../components/NotificationProvider";
import api from "../../../api/api";

export default function BaseProfileInfo({ profile }) {
  const { notify } = useNotification();
  const [openReset, setOpenReset] = useState(false);
  const [passwords, setPasswords] = useState({
    currentPassword: "",
    newPassword: "",
    confirmNewPassword: "",
  });
  const [loading, setLoading] = useState(false);

  const fullName = [profile?.firstName, profile?.middleName, profile?.lastName]
    .filter(Boolean)
    .join(" ") || "-";

  const infoData = [
    {
      label: "Name",
      value: fullName,
      icon: <PermIdentityIcon fontSize="small" sx={{ color: "#1976d2" }} />,
    },
    {
      label: "ID Number",
      value: profile?.idNumber || "-",
      icon: <BadgeIcon fontSize="small" sx={{ color: "#f8b500" }} />,
    },
    {
      label: "Phone Number",
      value: profile?.phoneNumber || "-",
      icon: <PhoneIcon fontSize="small" sx={{ color: "#4caf50" }} />,
    },
  ];

  /* ---------------- Handlers ---------------- */
  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswords((prev) => ({ ...prev, [name]: value }));
  };

  const validatePasswords = () => {
    const { currentPassword, newPassword, confirmNewPassword } = passwords;
    if (!currentPassword.trim()) return "Current password is required";
    if (!newPassword.trim()) return "New password is required";
    if (newPassword.length < 8) return "New password must be at least 8 characters";
    if (newPassword !== confirmNewPassword) return "Passwords do not match";
    return null;
  };

  const handleResetPassword = async () => {
    const error = validatePasswords();
    if (error) {
      notify(error, "error");
      return;
    }

    setLoading(true);
    try {
      await api.put("/users/me/changePassword", passwords); // matches backend endpoint
      notify("Password updated successfully!", "success");
      setPasswords({ currentPassword: "", newPassword: "", confirmNewPassword: "" });
      setOpenReset(false);
    } catch (err) {
      notify(err.response?.data?.error || "Failed to reset password", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        bgcolor: "background.paper",
        borderRadius: 3,
        p: { xs: 2, sm: 3 },
        boxShadow: "0 4px 16px rgba(0,0,0,0.08)",
      }}
    >
      <Stack spacing={2}>
        {infoData.map((item, index) => (
          <Box key={item.label}>
            <Stack
              direction={{ xs: "column", sm: "row" }}
              spacing={1.5}
              alignItems={{ xs: "flex-start", sm: "center" }}
            >
              {item.icon}
              <Typography
                variant="subtitle2"
                sx={{
                  minWidth: { sm: 120 },
                  color: "text.secondary",
                  fontWeight: 600,
                  letterSpacing: 0.5,
                }}
              >
                {item.label}
              </Typography>
              <Typography variant="body1" sx={{ fontWeight: 500, color: "text.primary" }}>
                {item.value}
              </Typography>
            </Stack>
            {index < infoData.length - 1 && <Divider sx={{ my: 1.5, borderColor: "divider" }} />}
          </Box>
        ))}

        <Divider sx={{ my: 2 }} />

        {/* Reset Password Button */}
        <Button
          variant="outlined"
          startIcon={<LockResetIcon />}
          onClick={() => setOpenReset(true)}
          sx={{ fontWeight: 600 }}
        >
          Reset Password
        </Button>
      </Stack>

      {/* Reset Password Dialog */}
      <Dialog open={openReset} onClose={() => setOpenReset(false)} fullWidth maxWidth="xs">
        <DialogTitle>Reset Password</DialogTitle>
        <DialogContent>
          <Stack spacing={2} mt={1}>
            <TextField
              label="Current Password"
              type="password"
              name="currentPassword"
              value={passwords.currentPassword}
              onChange={handlePasswordChange}
              fullWidth
            />
            <TextField
              label="New Password"
              type="password"
              name="newPassword"
              value={passwords.newPassword}
              onChange={handlePasswordChange}
              fullWidth
            />
            <TextField
              label="Confirm New Password"
              type="password"
              name="confirmNewPassword"
              value={passwords.confirmNewPassword}
              onChange={handlePasswordChange}
              fullWidth
            />
          </Stack>
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 2 }}>
          <Button onClick={() => setOpenReset(false)} disabled={loading}>
            Cancel
          </Button>
          <Button
            onClick={handleResetPassword}
            variant="contained"
            disabled={loading}
            startIcon={loading && <CircularProgress size={16} />}
          >
            {loading ? "Saving..." : "Save"}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
