// src/components/Profile/ProfileHeader.jsx
import React, { useState } from "react";
import { Box, Avatar, Typography, Stack, Button, Chip } from "@mui/material";
import VerifiedIcon from "@mui/icons-material/Verified";
import PhotoCameraIcon from "@mui/icons-material/PhotoCamera";
import ShieldOutlinedIcon from "@mui/icons-material/ShieldOutlined";
import ChangeProfilePicDialog from "../ChangeProfilePicDialog";

export default function ProfileHeader({ profile, onChangePic }) {
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

  return (
    <Box sx={{ position: "relative", overflow: "hidden", borderRadius: "18px" }}>
      {/* Cover Banner */}
      <Box
        sx={{
          height: { xs: 80, sm: 80 },
          background: "linear-gradient(135deg, #0F172A 0%, #1E293B 60%, #D4AF37 200%)",
          position: "relative",
          "&::after": {
            content: '""',
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background:
              "radial-gradient(circle at 80% 20%, rgba(212, 175, 55, 0.25) 0%, transparent 50%)",
          },
        }}
      />

      {/* Header Body */}
      <Box sx={{ px: { xs: 2.5, sm: 4, md: 4 }}}>
        <Stack
          // Column layout for xs, sm, and md; Row layout for lg and up
          direction={{ xs: "column", lg: "row" }}
          spacing={{ xs: 2, sm: 3 }}
          // Center items for xs, sm, and md; flex-end for lg+
          alignItems={{ xs: "center", lg: "flex-end" }}
          sx={{ marginTop: { xs: "-45px", sm: "-55px" }, mb: 2 }}
        >
          {/* Avatar Container with Floating Camera Button */}
          <Box sx={{ position: "relative" }}>
            <Box
              sx={{
                p: "1px",
                borderRadius: "50%",
                background: "linear-gradient(135deg, #D4AF37 0%, #0F172A 100%)",
                boxShadow: "0 10px 25px rgba(15, 23, 42, 0.2)",
              }}
            >
              <Avatar
                src={avatarPreview}
                sx={{
                  width: { xs: 90, sm: 110 },
                  height: { xs: 90, sm: 110 },
                  fontSize: { xs: 32, sm: 42 },
                  fontWeight: 800,
                  bgcolor: "#FFFFFF",
                  color: "#0F172A",
                  border: "4px solid #FFFFFF",
                }}
              >
                {!avatarPreview && avatarInitial}
              </Avatar>
            </Box>

            {/* Quick Action Overlay Button */}
            <Button
              onClick={handleOpenPic}
              size="small"
              sx={{
                position: "absolute",
                bottom: 4,
                right: 4,
                minWidth: 0,
                width: 32,
                height: 32,
                borderRadius: "50%",
                bgcolor: "#0F172A",
                color: "#D4AF37",
                border: "2px solid #FFFFFF",
                boxShadow: "0 4px 10px rgba(0,0,0,0.2)",
                "&:hover": {
                  bgcolor: "#D4AF37",
                  color: "#0F172A",
                },
              }}
            >
              <PhotoCameraIcon sx={{ fontSize: 16 }} />
            </Button>
          </Box>

          {/* User Information */}
          <Box
            sx={{
              flex: 1,
              // Center text on xs, sm, and md screens
              textAlign: { xs: "center", lg: "left" },
              pt: { xs: 0, lg: 1 },
            }}
          >
            <Stack
              direction="row"
              alignItems="center"
              // Center content row on xs, sm, and md screens
              justifyContent={{ xs: "center", lg: "flex-start" }}
              spacing={1}
            >
              <Typography
                variant="h5"
                sx={{
                  fontWeight: 800,
                  color: "#0F172A",
                  letterSpacing: "-0.02em",
                  fontSize: { xs: "1.35rem", sm: "1.65rem" },
                }}
              >
                {fullName || "User Account"}
              </Typography>
              <VerifiedIcon sx={{ color: "#D4AF37", fontSize: 22 }} />
            </Stack>

            <Typography
              variant="body2"
              sx={{ color: "#64748B", fontWeight: 500, mt: 0.2 }}
            >
              {profile?.email || "Account Holder"}
            </Typography>
          </Box>

          {/* Primary Role & Verification Badge */}
          <Stack direction="row" spacing={1} justifyContent="center">
            {profile?.role && (
              <Chip
                icon={<ShieldOutlinedIcon sx={{ color: "#D4AF37 !important", fontSize: "16px" }} />}
                label={profile.role.toUpperCase()}
                sx={{
                  bgcolor: "#0F172A",
                  color: "#FFFFFF",
                  fontWeight: 700,
                  fontSize: "0.75rem",
                  letterSpacing: 0.6,
                  px: 0.5,
                  borderRadius: "8px",
                  border: "1px solid rgba(212, 175, 55, 0.4)",
                  boxShadow: "0 4px 12px rgba(15, 23, 42, 0.12)",
                }}
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
        />
      )}
    </Box>
  );
}