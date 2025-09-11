// src/pages/UserProfilePage/UserProfilePage.jsx
import React, { useState } from "react";
import {
  Box,
  Typography,
  Paper,
  Avatar,
  Divider,
  Grid,
} from "@mui/material";
import { useAuth } from "../Auth/AuthContext";
import UserSidebar from "../../components/UserSidebar";

function UserProfilePage() {
  const { user } = useAuth();
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  if (!user) {
    return (
      <Typography variant="h6" sx={{ p: 2 }}>
        Please log in to view your profile.
      </Typography>
    );
  }

  return (
    <Box sx={{ display: "flex" }}>
      {/* ✅ Sidebar based on logged-in user role */}
      <UserSidebar mobileOpen={mobileOpen} onClose={handleDrawerToggle} />

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          mt: 2,
        }}
      >
        <Paper sx={{ p: 4, borderRadius: 3, maxWidth: 800, mx: "auto" }}>
          <Grid container spacing={2} alignItems="center">
            <Grid item>
              <Avatar sx={{ width: 80, height: 80 }}>
                {user.name.charAt(0)}
              </Avatar>
            </Grid>
            <Grid item>
              <Typography variant="h5" gutterBottom>
                {user.name}
              </Typography>
              <Typography variant="subtitle1" color="text.secondary">
                {user.role.toUpperCase()}
              </Typography>
            </Grid>
          </Grid>

          <Divider sx={{ my: 3 }} />

          <Typography variant="body1">
            <strong>Email:</strong> {user.email}
          </Typography>
          <Typography variant="body1">
            <strong>Phone:</strong> {user.phone}
          </Typography>
        </Paper>
      </Box>
    </Box>
  );
}

export default UserProfilePage;
