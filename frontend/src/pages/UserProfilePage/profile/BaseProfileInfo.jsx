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
      sx={(theme) => ({
        bgcolor: theme.palette.background.paper,
        borderRadius: `${theme.shape.borderRadius * 2}px`,
        p: { xs: 1.5, sm: 2 },
        border: `1px solid ${theme.palette.divider}`,
        boxShadow: `0 10px 30px -10px ${theme.palette.primary.main}14`,
        background: `linear-gradient(180deg, ${theme.palette.background.paper} 0%, ${theme.palette.action.hover} 100%)`,
      })}
    >
      {/* INFO GRID */}
      <Grid container spacing={1.5}>
        {infoData.map((item) => (
          <Grid item xs={12} sm={6} key={item.label}>
            <Box
              sx={(theme) => ({
                p: 1.5,
                borderRadius: `${theme.shape.borderRadius * 1.5}px`,
                bgcolor: theme.palette.background.paper,
                border: `1px solid ${theme.palette.divider}`,
                display: "flex",
                alignItems: "center",
                gap: 1.5,
                transition: "all 0.25s cubic-bezier(0.4, 0, 0.2, 1)",
                position: "relative",
                overflow: "hidden",
                "&:hover": {
                  borderColor: `${theme.palette.secondary.main}80`,
                  boxShadow: `0 8px 20px ${theme.palette.secondary.main}20`,
                  transform: "translateY(-1px)",
                  "& .icon-box": {
                    background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, #1E293B 100%)`,
                    color: theme.palette.secondary.main,
                    transform: "scale(1.05)",
                  },
                },
              })}
            >
              {/* Premium Icon Container */}
              <Box
                className="icon-box"
                sx={(theme) => ({
                  width: 38,
                  height: 38,
                  borderRadius: `${theme.shape.borderRadius}px`,
                  bgcolor: `${theme.palette.secondary.main}1A`,
                  color: theme.palette.secondary.main,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                  transition: "all 0.25s ease",
                })}
              >
                {item.icon}
              </Box>

              <Box sx={{ minWidth: 0, flex: 1 }}>
                <Typography
                  variant="caption"
                  sx={(theme) => ({
                    color: theme.palette.text.secondary,
                    fontWeight: 700,
                    textTransform: "uppercase",
                    letterSpacing: 0.6,
                    fontSize: "0.725ProfileInfo",
                    display: "block",
                    lineHeight: 1.2,
                    mb: 0.3,
                  })}
                >
                  {item.label}
                </Typography>
                <Typography
                  variant="body2"
                  sx={(theme) => ({
                    fontWeight: 700,
                    color: theme.palette.primary.main,
                    fontSize: "0.875rem",
                    wordBreak: "break-word",
                    lineHeight: 1.3,
                  })}
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
        sx={(theme) => ({
          pt: 1.5,
          mt: 2,
          borderTop: `1px solid ${theme.palette.divider}`,
          display: "flex",
          justifyContent: "flex-end",
        })}
      >
        <Button
          variant="outlined"
          startIcon={<LockResetOutlinedIcon sx={{ fontSize: "18px !important" }} />}
          onClick={() => setOpenReset(true)}
          sx={(theme) => ({
            borderColor: `${theme.palette.primary.main}26`,
            color: theme.palette.primary.main,
            fontWeight: 700,
            fontSize: "0.8rem",
            textTransform: "none",
            borderRadius: `${theme.shape.borderRadius}px`,
            px: 2,
            py: 0.5,
            bgcolor: theme.palette.background.paper,
            boxShadow: `0 2px 6px ${theme.palette.primary.main}08`,
            "& .MuiButton-startIcon": { color: theme.palette.secondary.main, mr: 0.8 },
            "&:hover": {
              borderColor: theme.palette.secondary.main,
              bgcolor: `${theme.palette.secondary.main}0D`,
              color: theme.palette.primary.main,
              boxShadow: `0 4px 12px ${theme.palette.secondary.main}26`,
            },
            transition: "all 0.2s ease",
          })}
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