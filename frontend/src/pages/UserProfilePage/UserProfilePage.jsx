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

// Role-specific imports
import TenantProfile from "./TenantProfile";
import LandlordProfile from "./LandlordProfile";
import CaretakerProfile from "./CaretakerProfile";
import AdminProfile from "./AdminProfile";
import EditProfileDialog from "./EditProfileDialog"; // optional: for profile editing
import ChangeProfilePicDialog from "./ChangeProfilePicDialog"; // new dialog

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
        return <TenantProfile user={user} onUpdate={() => {}} />;
      case "landlord":
        return <LandlordProfile user={user} onUpdate={() => {}} />;
      case "caretaker":
        return <CaretakerProfile user={user} onUpdate={() => {}} />;
      case "admin":
        return <AdminProfile user={user} onUpdate={() => {}} />;
      default:
        return null;
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        py: 2,
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
        {/* Header: Avatar + Name */}
        <Stack
          direction={{ xs: "column", sm: "row" }}
          spacing={3}
          alignItems="center"
          mb={2}
        >
          <Box textAlign="center">
            <Avatar
              sx={{
                width: { xs: 80, sm: 100 },
                height: { xs: 80, sm: 100 },
                bgcolor: "#f8b500",
                fontSize: { xs: 32, sm: 40 },
                mx: "auto",
              }}
            >
              {user.name?.charAt(0) || "U"}
            </Avatar>
            {/* Change Profile Picture Link */}
            <Link
              component="button"
              variant="body2"
              onClick={() => setOpenChangePic(true)}
              sx={{ mt: 1, display: "block", color: "#1976d2" }}
            >
              Change Profile Picture
            </Link>
          </Box>
          <Box textAlign={{ xs: "center", sm: "left" }}>
            <Typography
              variant="h4"
              sx={{ fontWeight: 700, wordBreak: "break-word" }}
            >
              {user.name}
            </Typography>
            <Stack
              direction="row"
              alignItems="center"
              justifyContent={{ xs: "center", sm: "flex-start" }}
              spacing={1}
              mt={1}
            >
              <BadgeIcon sx={{ color: "#f8b500" }} />
              <Typography
                variant="subtitle1"
                sx={{ fontWeight: 600, color: "text.secondary" }}
              >
                {user.role?.toUpperCase()}
              </Typography>
            </Stack>
          </Box>
        </Stack>

        <Divider sx={{ mb: 3 }} />

        {/* Role-specific content */}
        {renderRoleProfile(user.role)}

        {/* Edit Profile Dialog */}
        {openEditProfile && (
          <EditProfileDialog
            open={openEditProfile}
            handleClose={() => setOpenEditProfile(false)}
            user={user}
            onSave={(data) => console.log("Save profile:", data)}
          />
        )}

        {/* Change Profile Picture Dialog */}
        {openChangePic && (
          <ChangeProfilePicDialog
            open={openChangePic}
            handleClose={() => setOpenChangePic(false)}
            user={user}
            onSave={(newPic) => console.log("Profile pic updated:", newPic)}
          />
        )}
      </Paper>
    </Box>
  );
}
