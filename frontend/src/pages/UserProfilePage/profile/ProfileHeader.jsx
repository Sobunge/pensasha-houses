import React, { useState } from "react";
import { Box, Avatar, Typography, Stack, Link } from "@mui/material";
import BadgeIcon from "@mui/icons-material/Badge";
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
        spacing={{ xs: 2, md: 4 }}
        alignItems={{ xs: "center", md: "flex-start" }}
        justifyContent={{ xs: "center", md: "flex-start" }}
      >
        {/* ===== Avatar Section ===== */}
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            mb: { xs: 1, md: 0 },
          }}
        >
          <Avatar
            src={avatarPreview}
            sx={{
              width: { xs: 70, sm: 90, md: 100 },
              height: { xs: 70, sm: 90, md: 100 },
              fontSize: { xs: 28, sm: 36, md: 42 },
              bgcolor: "#f8b500",
              boxShadow: "0 6px 20px rgba(0,0,0,0.15)",
              border: "3px solid #fff",
              transition: "transform 0.3s ease",
              "&:hover": { transform: "scale(1.05)" },
            }}
          >
            {!avatarPreview && avatarInitial}
          </Avatar>

          <Link
            component="button"
            variant="caption"
            onClick={() => setOpenChangePic(true)}
            sx={{
              mt: 1.5,
              fontWeight: 600,
              letterSpacing: 0.5,
              textTransform: "uppercase",
              fontSize: { xs: 11, sm: 12 },
            }}
          >
            Change Photo
          </Link>
        </Box>

        {/* ===== Name + Role Section ===== */}
        <Box
          sx={{
            textAlign: { xs: "center", md: "left" },
            display: "flex",
            flexDirection: "column",
            alignItems: { xs: "center", md: "flex-start" },
            maxWidth: { xs: "90%", md: 500 }, // limits name width on desktop
          }}
        >
          {fullName && (
            <Typography
              variant="h4"
              sx={{
                fontWeight: 700,
                lineHeight: 1.2,
                letterSpacing: -0.5,
                wordBreak: "break-word",
                fontSize: { xs: "1.4rem", sm: "1.6rem", md: "1.9rem" }, // controlled size
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
                bgcolor: "rgba(248,181,0,0.12)",
                px: 1.5,
                py: 0.5,
                borderRadius: 2,
                flexWrap: "wrap",
                justifyContent: { xs: "center", md: "flex-start" },
              }}
            >
              <BadgeIcon sx={{ color: "#f8b500", fontSize: 18 }} />
              <Typography
                variant="subtitle2"
                sx={{
                  fontWeight: 700,
                  letterSpacing: 0.8,
                  color: "text.secondary",
                  fontSize: { xs: 11, sm: 12, md: 13 },
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
