// src/components/Profile/ProfileHeader.jsx
import React, { useState } from "react";
import { Box, Avatar, Typography, Stack, Button, Chip } from "@mui/material";
import VerifiedIcon from "@mui/icons-material/Verified";
import PhotoCameraIcon from "@mui/icons-material/PhotoCamera";
import ShieldOutlinedIcon from "@mui/icons-material/ShieldOutlined";
import ChangeProfilePicDialog from "../ChangeProfilePicDialog";

export default function ProfileHeader({ profile, onChangePic, refreshProfile }) {
  const [openChangePic, setOpenChangePic] = useState(false);
  const avatarPreview = profile?.profilePicture || profile?.avatar || "";

  const fullName = [profile?.firstName, profile?.middleName, profile?.lastName]
    .filter(Boolean)
    .join(" ");

  const avatarInitial =
    profile?.firstName?.charAt(0) ||
    profile?.middleName?.charAt(0) ||
    profile?.lastName?.charAt(0) ||
    "U";

  const handleOpenPic = () => {
    if (onChangePic) {
      onChangePic();
    } else {
      setOpenChangePic(true);
    }
  };

  const activeRole = profile?.activeRole || profile?.role || profile?.roles?.[0];

  return (
    <Box sx={(theme) => ({ position: "relative", overflow: "hidden", borderRadius: `${theme.shape.borderRadius * 1.5}px` })}>
      {/* Cover Banner */}
      <Box
        sx={(theme) => ({
          height: { xs: 80, sm: 80 },
          background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, #1E293B 60%, ${theme.palette.secondary.main} 200%)`,
          position: "relative",
          "&::after": {
            content: '""',
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: `radial-gradient(circle at 80% 20%, ${theme.palette.secondary.main}40 0%, transparent 50%)`,
          },
        })}
      />

      {/* Header Body */}
      <Box sx={{ px: { xs: 2.5, sm: 4, md: 4 } }}>
        <Stack
          direction={{ xs: "column", lg: "row" }}
          spacing={{ xs: 2, sm: 3 }}
          alignItems={{ xs: "center", lg: "flex-end" }}
          sx={{ marginTop: { xs: "-45px", sm: "-55px" }, mb: 2 }}
        >
          {/* Avatar Container with Floating Camera Button */}
          <Box sx={{ position: "relative" }}>
            <Box
              sx={(theme) => ({
                p: "1px",
                borderRadius: "50%",
                background: `linear-gradient(135deg, ${theme.palette.secondary.main} 0%, ${theme.palette.primary.main} 100%)`,
                boxShadow: `0 10px 25px ${theme.palette.primary.main}33`,
              })}
            >
              <Avatar
                src={avatarPreview}
                sx={(theme) => ({
                  width: { xs: 90, sm: 110 },
                  height: { xs: 90, sm: 110 },
                  fontSize: { xs: 32, sm: 42 },
                  fontWeight: 800,
                  bgcolor: theme.palette.background.paper,
                  color: theme.palette.primary.main,
                  border: `4px solid ${theme.palette.background.paper}`,
                })}
              >
                {!avatarPreview && avatarInitial}
              </Avatar>
            </Box>

            {/* Quick Action Overlay Button */}
            <Button
              onClick={handleOpenPic}
              size="small"
              aria-label="change profile picture"
              sx={(theme) => ({
                position: "absolute",
                bottom: 4,
                right: 4,
                minWidth: 0,
                width: 32,
                height: 32,
                borderRadius: "50%",
                bgcolor: theme.palette.primary.main,
                color: theme.palette.secondary.main,
                border: `2px solid ${theme.palette.background.paper}`,
                boxShadow: "0 4px 10px rgba(0,0,0,0.2)",
                "&:hover": {
                  bgcolor: theme.palette.secondary.main,
                  color: theme.palette.primary.main,
                },
                transition: "all 0.2s ease",
              })}
            >
              <PhotoCameraIcon sx={{ fontSize: 16 }} />
            </Button>
          </Box>

          {/* User Information */}
          <Box
            sx={{
              flex: 1,
              textAlign: { xs: "center", lg: "left" },
              pt: { xs: 0, lg: 1 },
            }}
          >
            <Stack
              direction="row"
              alignItems="center"
              justifyContent={{ xs: "center", lg: "flex-start" }}
              spacing={1}
            >
              <Typography
                variant="h5"
                sx={(theme) => ({
                  fontWeight: 800,
                  color: theme.palette.primary.main,
                  letterSpacing: "-0.02em",
                  fontSize: { xs: "1.35rem", sm: "1.65rem" },
                })}
              >
                {fullName || "User Account"}
              </Typography>
              <VerifiedIcon sx={(theme) => ({ color: theme.palette.secondary.main, fontSize: 22 })} />
            </Stack>

            <Typography
              variant="body2"
              sx={(theme) => ({ color: theme.palette.text.secondary, fontWeight: 600, mt: 0.2 })}
            >
              {profile?.email || "Account Holder"}
            </Typography>
          </Box>

          {/* Primary Role & Verification Badge */}
          <Stack direction="row" spacing={1} justifyContent="center">
            {activeRole && (
              <Chip
                icon={<ShieldOutlinedIcon sx={{ color: "#D4AF37 !important", fontSize: "16px" }} />}
                label={String(activeRole).replace(/^ROLE_/, "").toUpperCase()}
                sx={(theme) => ({
                  bgcolor: theme.palette.primary.main,
                  color: theme.palette.primary.contrastText,
                  fontWeight: 700,
                  fontSize: "0.75rem",
                  letterSpacing: 0.6,
                  px: 0.5,
                  borderRadius: `${theme.shape.borderRadius}px`,
                  border: `1px solid ${theme.palette.secondary.main}66`,
                  boxShadow: `0 4px 12px ${theme.palette.primary.main}1F`,
                })}
              />
            )}
          </Stack>
        </Stack>
      </Box>

      {openChangePic && !onChangePic && (
        <ChangeProfilePicDialog
          open={openChangePic}
          handleClose={() => setOpenChangePic(false)}
          user={profile}
          refreshProfile={refreshProfile}
        />
      )}
    </Box>
  );
}