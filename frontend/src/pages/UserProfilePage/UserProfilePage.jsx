import React, { useState } from "react";
import { Box, Paper, Typography, Divider, Button, Breadcrumbs, Link as MuiLink } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";

import ProfileHeader from "../UserProfilePage/profile/ProfileHeader";
import ProfileInfo from "../UserProfilePage/profile/ProfileInfo";
import ProfileDocuments from "../UserProfilePage/profile/ProfileDocuments";

import EditProfileDialog from "./EditProfileDialog";
import ChangeProfilePicDialog from "./ChangeProfilePicDialog";
import { useAuth } from "../Auth/AuthContext";

export default function UserProfilePage() {
  const { user } = useAuth();
  const [openEditProfile, setOpenEditProfile] = useState(false);
  const [openChangePic, setOpenChangePic] = useState(false);
  const [openManageDocs, setOpenManageDocs] = useState(false); // new state for documents dialog

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
    <Box sx={{ py: 1, px: 2, bgcolor: "#f5f5f5", display: "flex", flexDirection: "column", gap: 3 }}>
      
      {/* ================= TITLE + BREADCRUMBS ================= */}
      <Box sx={{ mb: 1 }}>
        <Breadcrumbs aria-label="breadcrumb" sx={{ mb: 1 }}>
          <MuiLink component={RouterLink} underline="hover" color="inherit" to={`/${user.role}`}>
            Home
          </MuiLink>
          <Typography color="text.primary">Profile</Typography>
        </Breadcrumbs>
        <Box sx={{ textAlign: "center", mb: 1 }}>
          <Typography variant="h5" fontWeight={700}>
            My Profile
          </Typography>
        </Box>
      </Box>

      {/* ================= HEADER CARD ================= */}
      <Paper elevation={4} sx={{ p: 4, borderRadius: 3 }}>
        <ProfileHeader user={user} onChangePic={() => setOpenChangePic(true)} />
      </Paper>

      {/* ================= PROFILE INFORMATION CARD ================= */}
      <Paper elevation={4} sx={{ p: 4, borderRadius: 3 }}>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
          <Typography variant="h6" fontWeight={600}>
            Personal Information
          </Typography>
          <Button variant="outlined" size="small" onClick={() => setOpenEditProfile(true)}>
            Edit
          </Button>
        </Box>
        <Divider sx={{ mb: 2 }} />
        <ProfileInfo user={user} />
      </Paper>

      {/* ================= DOCUMENTS CARD ================= */}
      <Paper elevation={4} sx={{ p: 4, borderRadius: 3 }}>
        <ProfileDocuments openDialog={openManageDocs} setOpenDialog={setOpenManageDocs} />
      </Paper>

      {/* ================= DIALOGS ================= */}
      {openEditProfile && (
        <EditProfileDialog open={openEditProfile} handleClose={() => setOpenEditProfile(false)} user={user} />
      )}
      {openChangePic && (
        <ChangeProfilePicDialog open={openChangePic} handleClose={() => setOpenChangePic(false)} user={user} />
      )}
    </Box>
  );
}
