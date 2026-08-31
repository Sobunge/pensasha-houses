// src/components/Profile/ProfileHeader.jsx
import React, { useState } from "react";
import { Box, Avatar, Typography, Stack, Button } from "@mui/material";
import BadgeIcon from "@mui/icons-material/Badge";
import PhotoCameraIcon from "@mui/icons-material/PhotoCamera";
import ChangeProfilePicDialog from "../ChangeProfilePicDialog";

export default function ProfileHeader({ profile, onChange }) {
  const [openChangePic, setOpenChangePic] = useState(false);
  const [avatarPreview, setAvatarPreview] = useState(profile?.avatar || "");

  // Build full name safely
  const fullName = [profile?.firstName, profile?.middleName, profile?.lastName]
    .filter(Boolean)
    .join(" ");

  // Fallback for avatar initial
  const avatarInitial =
    profile?.firstName?.charAt(0) ||
    profile?.middleName?.charAt(0) ||
    profile?.lastName?.charAt(0) ||
    "U";

  const handleSaveAvatar = (file) => {
    const objectUrl = URL.createObjectURL(file);
    setAvatarPreview(objectUrl);
    if (onChange) onChange(file);
  };

  return (
    <>
      <Stack
        direction={{ xs: "column", md: "row" }}
        spacing={{ xs: 2.5, md: 4 }}
        alignItems={{ xs: "center", md: "center" }}
        justifyContent={{ xs: "center", md: "flex-start" }}
      >
        {/* ===== Avatar Section ===== */}
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            position: "relative",
          }}
        >
          <Box
            sx={{
              p: "3px",
              borderRadius: "50%",
              background: "linear-gradient(135deg, #D4AF37 0%, #0F172A 100%)",
              boxShadow: "0 8px 24px rgba(15, 23, 42, 0.12)",
            }}
          >
            <Avatar
              src={avatarPreview}
              sx={{
                width: { xs: 80, sm: 96, md: 104 },
                height: { xs: 80, sm: 96, md: 104 },
                fontSize: { xs: 30, sm: 38, md: 42 },
                fontWeight: 800,
                bgcolor: "#F8FAFC",
                color: "#0F172A",
                border: "3px solid #FFFFFF",
                transition: "transform 0.3s ease",
                "&:hover": { transform: "scale(1.03)" },
              }}
            >
              {!avatarPreview && avatarInitial}
            </Avatar>
          </Box>

          <Button
            size="small"
            startIcon={<PhotoCameraIcon sx={{ fontSize: "14px !important" }} />}
            onClick={() => setOpenChangePic(true)}
            sx={{
              mt: 1.5,
              px: 1.5,
              py: 0.4,
              borderRadius: "20px",
              bgcolor: "#FFFFFF",
              color: "#0F172A",
              border: "1px solid #E2E8F0",
              fontWeight: 700,
              letterSpacing: 0.5,
              fontSize: { xs: "0.7rem", sm: "0.75rem" },
              textTransform: "none",
              boxShadow: "0 2px 6px rgba(0,0,0,0.04)",
              "&:hover": {
                bgcolor: "#D4AF37",
                color: "#0F172A",
                borderColor: "#D4AF37",
              },
              transition: "all 0.2s ease",
            }}
          >
            Change Photo
          </Button>
        </Box>

        {/* ===== Name + Role Section ===== */}
        <Box
          sx={{
            textAlign: { xs: "center", md: "left" },
            display: "flex",
            flexDirection: "column",
            alignItems: { xs: "center", md: "flex-start" },
            maxWidth: { xs: "100%", md: 550 },
          }}
        >
          {fullName && (
            <Typography
              variant="h4"
              sx={{
                fontWeight: 800,
                color: "#0F172A",
                lineHeight: 1.2,
                letterSpacing: "-0.5px",
                wordBreak: "break-word",
                fontSize: { xs: "1.5rem", sm: "1.8rem", md: "2.1rem" },
              }}
            >
              {fullName}
            </Typography>
          )}

          {profile?.role && (
            <Stack
              direction="row"
              alignItems="center"
              spacing={1}
              mt={1.5}
              sx={{
                bgcolor: "rgba(212, 175, 55, 0.12)",
                border: "1px solid rgba(212, 175, 55, 0.3)",
                px: 1.8,
                py: 0.6,
                borderRadius: "20px",
                justifyContent: { xs: "center", md: "flex-start" },
              }}
            >
              <BadgeIcon sx={{ color: "#D4AF37", fontSize: 18 }} />
              <Typography
                variant="subtitle2"
                sx={{
                  fontWeight: 800,
                  letterSpacing: 0.8,
                  color: "#0F172A",
                  fontSize: { xs: "0.72rem", sm: "0.78rem" },
                }}
              >
                {profile.role.toUpperCase()}
              </Typography>
            </Stack>
          )}
        </Box>
      </Stack>

      {/* ===== Change Profile Picture Dialog ===== */}
      {openChangePic && (
        <ChangeProfilePicDialog
          open={openChangePic}
          handleClose={() => setOpenChangePic(false)}
          profile={profile}
          onSave={handleSaveAvatar}
        />
      )}
    </>
  );
}