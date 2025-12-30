import React, { useState } from "react";
import {
  Box,
  Typography,
  Paper,
  Avatar,
  Divider,
  Stack,
  Link,
} from "@mui/material";
import BadgeIcon from "@mui/icons-material/Badge";
import { useAuth } from "../Auth/AuthContext";

// Role-specific components
import TenantProfile from "./TenantProfile";
import LandlordProfile from "./LandlordProfile";
import CaretakerProfile from "./CaretakerProfile";
import AdminProfile from "./AdminProfile";

import EditProfileDialog from "./EditProfileDialog";
import ChangeProfilePicDialog from "./ChangeProfilePicDialog";

export default function UserProfilePage() {
  const { user } = useAuth();
  const [openEditProfile, setOpenEditProfile] = useState(false);
  const [openChangePic, setOpenChangePic] = useState(false);

  if (!user) {
    return (
      <Typography
        variant="h6"
        sx={{ p: 2, textAlign: "center", color: "text.secondary" }}
      >
        Please log in to view your profile.
      </Typography>
    );
  }

  const renderRoleProfile = (role) => {
    switch (role) {
      case "tenant":
        return <TenantProfile user={user} />;
      case "landlord":
        return <LandlordProfile user={user} />;
      case "caretaker":
        return <CaretakerProfile user={user} />;
      case "admin":
        return <AdminProfile user={user} />;
      default:
        return null;
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        py: 3,
        px: 2,
        bgcolor: "#f5f5f5",
      }}
    >
      <Paper
        elevation={4}
        sx={{
          p: { xs: 3, sm: 5 },
          borderRadius: 4,
          maxWidth: 800,
          width: "100%",
        }}
      >
        {/* ================= HEADER ================= */}
        <Stack
          direction={{ xs: "column", md: "row" }}
          spacing={4}
          alignItems="center"
          justifyContent="center"
          mb={4}
        >
          {/* Avatar */}
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar
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
              {user.name?.charAt(0) || "U"}
            </Avatar>

            <Link
              component="button"
              variant="caption"
              onClick={() => setOpenChangePic(true)}
              sx={{
                mt: 3,
                fontWeight: 600,
                letterSpacing: 0.6,
                textTransform: "uppercase",
              }}
            >
              Change Photo
            </Link>
          </Box>

          {/* Name + Role */}
          <Box
            textAlign={{ xs: "center", md: "left" }}
            display="flex"
            flexDirection="column"
            alignItems={{ xs: "center", md: "flex-start" }}
          >
            <Typography
              variant="h4"
              sx={{
                fontWeight: 800,
                lineHeight: 1.2,
                letterSpacing: -0.5,
              }}
            >
              {user.name}
            </Typography>

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
                {user.role?.toUpperCase()}
              </Typography>
            </Stack>
          </Box>
        </Stack>

        <Divider sx={{ mb: 3 }} />

        {/* ================= ROLE CONTENT ================= */}
        {renderRoleProfile(user.role)}

        {/* ================= DIALOGS ================= */}
        {openEditProfile && (
          <EditProfileDialog
            open={openEditProfile}
            handleClose={() => setOpenEditProfile(false)}
            user={user}
          />
        )}

        {openChangePic && (
          <ChangeProfilePicDialog
            open={openChangePic}
            handleClose={() => setOpenChangePic(false)}
            user={user}
          />
        )}
      </Paper>
    </Box>
  );
}
