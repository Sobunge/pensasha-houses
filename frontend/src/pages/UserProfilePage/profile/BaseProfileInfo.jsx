// src/components/Profile/BaseProfileInfo.jsx
import React, { useState } from "react";
import {
  Box,
  Typography,
  Grid,
  Button,
} from "@mui/material";
import BadgeOutlinedIcon from "@mui/icons-material/BadgeOutlined";
import PhoneOutlinedIcon from "@mui/icons-material/PhoneOutlined";
import PermIdentityOutlinedIcon from "@mui/icons-material/PermIdentityOutlined";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import LockResetOutlinedIcon from "@mui/icons-material/LockResetOutlined";
import ChangePasswordDialog from "../ChangePasswordDialog";

export default function BaseProfileInfo({ profile }) {
  const [openReset, setOpenReset] = useState(false);

  const fullName =
    [profile?.firstName, profile?.middleName, profile?.lastName]
      .filter(Boolean)
      .join(" ") || "-";

  const infoData = [
    {
      label: "Full Name",
      value: fullName,
      icon: <PermIdentityOutlinedIcon fontSize="small" />,
    },
    {
      label: "National ID",
      value: profile?.idNumber || "-",
      icon: <BadgeOutlinedIcon fontSize="small" />,
    },
    {
      label: "Email Address",
      value: profile?.email || "-",
      icon: <EmailOutlinedIcon fontSize="small" />,
    },
    {
      label: "Phone Number",
      value: profile?.phoneNumber || "-",
      icon: <PhoneOutlinedIcon fontSize="small" />,
    },
  ];

  return (
    <Box
      sx={{
        bgcolor: "#F8FAFC",
        borderRadius: "14px",
        p: { xs: 2.5, sm: 3 },
        border: "1px solid #E2E8F0",
      }}
    >
      {/* INFO GRID */}
      <Grid container spacing={2.5}>
        {infoData.map((item) => (
          <Grid item xs={12} sm={6} key={item.label}>
            <Box
              sx={{
                p: 2,
                borderRadius: "12px",
                bgcolor: "#FFFFFF",
                border: "1px solid #E2E8F0",
                display: "flex",
                alignItems: "center",
                gap: 2,
                transition: "all 0.2s ease",
                "&:hover": {
                  borderColor: "#D4AF37",
                  boxShadow: "0 4px 12px rgba(212, 175, 55, 0.12)",
                },
              }}
            >
              {/* Gold-tinted Icon Container */}
              <Box
                sx={{
                  width: 42,
                  height: 42,
                  borderRadius: "10px",
                  bgcolor: "rgba(212, 175, 55, 0.12)",
                  color: "#D4AF37",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                }}
              >
                {item.icon}
              </Box>

              <Box sx={{ minWidth: 0, flex: 1 }}>
                <Typography
                  variant="caption"
                  sx={{
                    color: "#64748B",
                    fontWeight: 700,
                    textTransform: "uppercase",
                    letterSpacing: 0.8,
                    fontSize: "0.68rem",
                    display: "block",
                    mb: 0.3,
                  }}
                >
                  {item.label}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    fontWeight: 700,
                    color: "#0F172A",
                    wordBreak: "break-word",
                  }}
                >
                  {item.value}
                </Typography>
              </Box>
            </Box>
          </Grid>
        ))}
      </Grid>

      {/* RESET PASSWORD ACTION */}
      <Box
        sx={{
          mt: 3,
          pt: 2.5,
          borderTop: "1px solid #E2E8F0",
          display: "flex",
          justify: "flex-end",
        }}
      >
        <Button
          variant="outlined"
          startIcon={<LockResetOutlinedIcon />}
          onClick={() => setOpenReset(true)}
          sx={{
            borderColor: "#0F172A",
            color: "#0F172A",
            fontWeight: 700,
            textTransform: "none",
            borderRadius: "10px",
            px: 2.5,
            py: 0.8,
            "& .MuiButton-startIcon": { color: "#D4AF37" },
            "&:hover": {
              borderColor: "#D4AF37",
              bgcolor: "rgba(212, 175, 55, 0.08)",
              color: "#0F172A",
            },
            transition: "all 0.2s ease",
          }}
        >
          Reset Password
        </Button>
      </Box>

      <ChangePasswordDialog
        open={openReset}
        handleClose={() => setOpenReset(false)}
      />
    </Box>
  );
}