import React from "react";
import {
  Box,
  Typography,
  Paper,
  Avatar,
  Divider,
  Stack,
} from "@mui/material";
import BadgeIcon from "@mui/icons-material/Badge";
import { useAuth } from "../Auth/AuthContext";

// Role-specific imports
import TenantProfile from "./TenantProfile";
import LandlordProfile from "./LandlordProfile";
import CaretakerProfile from "./CaretakerProfile";
import AdminProfile from "./AdminProfile";

export default function UserProfilePage() {
  const { user } = useAuth();

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
        py: 1,
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
          mb={4}
        >
          <Avatar
            sx={{
              width: { xs: 80, sm: 100 },
              height: { xs: 80, sm: 100 },
              bgcolor: "#f8b500",
              fontSize: { xs: 32, sm: 40 },
            }}
          >
            {user.name?.charAt(0) || "U"}
          </Avatar>
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

        <Divider sx={{ mb: 4 }} />

        {/* Role-specific content */}
        {renderRoleProfile(user.role)}
      </Paper>
    </Box>
  );
}
