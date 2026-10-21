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
      icon: <PermIdentityOutlinedIcon sx={{ fontSize: 18 }} />,
    },
    {
      label: "National ID",
      value: profile?.idNumber || "-",
      icon: <BadgeOutlinedIcon sx={{ fontSize: 18 }} />,
    },
    {
      label: "Email Address",
      value: profile?.email || "-",
      icon: <EmailOutlinedIcon sx={{ fontSize: 18 }} />,
    },
    {
      label: "Phone Number",
      value: profile?.phoneNumber || "-",
      icon: <PhoneOutlinedIcon sx={{ fontSize: 18 }} />,
    },
  ];

  return (
    <Box
      sx={{
        bgcolor: "#FFFFFF",
        borderRadius: "16px",
        p: { xs: 1.5, sm: 2 },
        border: "1px solid rgba(226, 232, 240, 0.8)",
        boxShadow: "0 10px 30px -10px rgba(15, 23, 42, 0.05)",
        background: "linear-gradient(180deg, #FFFFFF 0%, #F8FAFC 100%)",
      }}
    >
      {/* INFO GRID */}
      <Grid container spacing={1.5}>
        {infoData.map((item) => (
          <Grid item xs={12} sm={6} key={item.label}>
            <Box
              sx={{
                p: 1.5,
                borderRadius: "12px",
                bgcolor: "#FFFFFF",
                border: "1px solid #E2E8F0",
                display: "flex",
                alignItems: "center",
                gap: 1.5,
                transition: "all 0.25s cubic-bezier(0.4, 0, 0.2, 1)",
                position: "relative",
                overflow: "hidden",
                "&:hover": {
                  borderColor: "rgba(212, 175, 55, 0.5)",
                  boxShadow: "0 8px 20px rgba(212, 175, 55, 0.12)",
                  transform: "translateY(-1px)",
                  "& .icon-box": {
                    background: "linear-gradient(135deg, #0F172A 0%, #1E293B 100%)",
                    color: "#D4AF37",
                    transform: "scale(1.05)",
                  },
                },
              }}
            >
              {/* Premium Icon Container */}
              <Box
                className="icon-box"
                sx={{
                  width: 38,
                  height: 38,
                  borderRadius: "8px",
                  bgcolor: "rgba(212, 175, 55, 0.1)",
                  color: "#B48A1D",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                  transition: "all 0.25s ease",
                }}
              >
                {item.icon}
              </Box>

              <Box sx={{ minWidth: 0, flex: 1 }}>
                <Typography
                  variant="caption"
                  sx={{
                    color: "#475569", // Darker slate color for crisp visibility
                    fontWeight: 700,
                    textTransform: "uppercase",
                    letterSpacing: 0.6,
                    fontSize: "0.725rem", // Increased from 0.625rem for legibility
                    display: "block",
                    lineHeight: 1.2,
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
                    fontSize: "0.875rem",
                    wordBreak: "break-word",
                    lineHeight: 1.3,
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
          pt: 1.5,
          borderTop: "1px solid #F1F5F9",
          display: "flex",
          justifyContent: "flex-end",
        }}
      >
        <Button
          variant="outlined"
          startIcon={<LockResetOutlinedIcon sx={{ fontSize: "18px !important" }} />}
          onClick={() => setOpenReset(true)}
          sx={{
            borderColor: "rgba(15, 23, 42, 0.15)",
            color: "#0F172A",
            fontWeight: 700,
            fontSize: "0.8rem",
            textTransform: "none",
            borderRadius: "8px",
            px: 2,
            py: 0.5,
            bgcolor: "#FFFFFF",
            boxShadow: "0 2px 6px rgba(15, 23, 42, 0.03)",
            "& .MuiButton-startIcon": { color: "#D4AF37", mr: 0.8 },
            "&:hover": {
              borderColor: "#D4AF37",
              bgcolor: "rgba(212, 175, 55, 0.05)",
              color: "#0F172A",
              boxShadow: "0 4px 12px rgba(212, 175, 55, 0.15)",
            },
            transition: "all 0.2s ease",
          }}
        >
          Change Password
        </Button>
      </Box>

      <ChangePasswordDialog
        open={openReset}
        handleClose={() => setOpenReset(false)}
      />
    </Box>
  );
}