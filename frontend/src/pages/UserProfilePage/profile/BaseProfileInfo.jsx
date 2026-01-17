// src/components/Profile/BaseProfileInfo.jsx
import React, { useState } from "react";
import {
  Box,
  Typography,
  Stack,
  Divider,
  Button,
} from "@mui/material";
import BadgeIcon from "@mui/icons-material/Badge";
import PhoneIcon from "@mui/icons-material/Phone";
import PermIdentityIcon from "@mui/icons-material/PermIdentity";
import LockResetIcon from "@mui/icons-material/LockReset";
import ChangePasswordDialog from "../ChangePasswordDialog"; // import the dialog

export default function BaseProfileInfo({ profile }) {
  const [openReset, setOpenReset] = useState(false);

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

      {/* Open the centralized ChangePasswordDialog */}
      <ChangePasswordDialog open={openReset} handleClose={() => setOpenReset(false)} />
    </Box>
  );
}
