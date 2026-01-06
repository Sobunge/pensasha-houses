import React, { useState } from "react";
import { Box, Avatar, Typography, Stack, Link } from "@mui/material";
import BadgeIcon from "@mui/icons-material/Badge";
import ChangeProfilePicDialog from "../ChangeProfilePicDialog";

export default function ProfileHeader({ user, onChange }) {
  const [openChangePic, setOpenChangePic] = useState(false);
  const [avatarPreview, setAvatarPreview] = useState(user?.avatar || "");

  // Build full name safely
  const fullName = [user?.firstName, user?.middleName, user?.lastName]
    .filter(Boolean)
    .join(" ");

  // Fallback for avatar initial
  const avatarInitial =
    user?.firstName?.charAt(0) ||
    user?.middleName?.charAt(0) ||
    user?.lastName?.charAt(0) ||
    "U";

  // Handle saving new avatar from dialog
  const handleSaveAvatar = (file) => {
    const objectUrl = URL.createObjectURL(file);
    setAvatarPreview(objectUrl);
    if (onChange) onChange(file); // optional: pass back to parent to update backend
  };

  return (
    <>
      <Stack
        direction={{ xs: "column", md: "row" }}
        spacing={4}
        alignItems={{ xs: "center", md: "flex-start" }}
        justifyContent={{ xs: "center", md: "flex-start" }}
      >
        {/* ===== Avatar Section ===== */}
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar
            src={avatarPreview}
            sx={{
              width: { xs: 90, sm: 110 },
              height: { xs: 90, sm: 110 },
              fontSize: { xs: 36, sm: 44 },
              bgcolor: "#f8b500",
              boxShadow: "0 8px 24px rgba(0,0,0,0.15)",
              border: "4px solid #fff",
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
              mt: 2,
              fontWeight: 600,
              letterSpacing: 0.6,
              textTransform: "uppercase",
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
          }}
        >
          {fullName && (
            <Typography
              variant="h4"
              sx={{ fontWeight: 800, lineHeight: 1.2, letterSpacing: -0.5 }}
            >
              {fullName}
            </Typography>
          )}

          {user?.role && (
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
              }}
            >
              <BadgeIcon sx={{ color: "#f8b500", fontSize: 20 }} />
              <Typography
                variant="subtitle2"
                sx={{
                  fontWeight: 700,
                  letterSpacing: 0.8,
                  color: "text.secondary",
                }}
              >
                {user.role.toUpperCase()}
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
          user={user}
          onSave={handleSaveAvatar}
        />
      )}
    </>
  );
}
