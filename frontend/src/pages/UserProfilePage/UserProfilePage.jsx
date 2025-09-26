// src/pages/UserProfilePage/UserProfilePage.jsx
import React from "react";
import {
  Box,
  Typography,
  Paper,
  Avatar,
  Divider,
  Grid,
  Stack,
} from "@mui/material";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import BadgeIcon from "@mui/icons-material/Badge";
import { useAuth } from "../Auth/AuthContext";

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
            {user.name.charAt(0)}
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
                {user.role.toUpperCase()}
              </Typography>
            </Stack>
          </Box>
        </Stack>

        <Divider sx={{ mb: 4 }} />

        {/* User Details */}
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <Paper
              sx={{
                p: 2,
                borderRadius: 3,
                bgcolor: "#fff8e1",
                boxShadow: 1,
                display: "flex",
                alignItems: "center",
                gap: 1.5,
              }}
            >
              <EmailIcon sx={{ color: "#f8b500" }} />
              <Box>
                <Typography variant="subtitle2" color="text.secondary">
                  Email
                </Typography>
                <Typography variant="body1" sx={{ fontWeight: 600 }}>
                  {user.email}
                </Typography>
              </Box>
            </Paper>
          </Grid>

          <Grid item xs={12} sm={6}>
            <Paper
              sx={{
                p: 2,
                borderRadius: 3,
                bgcolor: "#fff8e1",
                boxShadow: 1,
                display: "flex",
                alignItems: "center",
                gap: 1.5,
              }}
            >
              <PhoneIcon sx={{ color: "#f8b500" }} />
              <Box>
                <Typography variant="subtitle2" color="text.secondary">
                  Phone
                </Typography>
                <Typography variant="body1" sx={{ fontWeight: 600 }}>
                  {user.phone}
                </Typography>
              </Box>
            </Paper>
          </Grid>
        </Grid>

        {/* Optional: About / Bio */}
        {user.bio && (
          <>
            <Divider sx={{ my: 4 }} />
            <Typography variant="h6" gutterBottom>
              About Me
            </Typography>
            <Typography variant="body1" color="text.secondary">
              {user.bio}
            </Typography>
          </>
        )}
      </Paper>
    </Box>
  );
}
