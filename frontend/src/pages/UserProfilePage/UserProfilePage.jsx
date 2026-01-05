import React, { useState } from "react";
import {
  Box,
  Paper,
  Typography,
  Divider,
  Button,
} from "@mui/material";

import EditIcon from "@mui/icons-material/Edit";
import UploadFileIcon from "@mui/icons-material/UploadFile";

import ProfileHeader from "../UserProfilePage/profile/ProfileHeader";
import ProfileInfo from "../UserProfilePage/profile/ProfileInfo";
import ProfileDocuments from "../UserProfilePage/profile/ProfileDocuments";
import DashboardHeader from "../../components/DashboardHeader";

import EditProfileDialog from "./EditProfileDialog";
import ChangeProfilePicDialog from "./ChangeProfilePicDialog";
import { useAuth } from "../Auth/AuthContext";

export default function UserProfilePage() {
  const { user } = useAuth();
  const [openEditProfile, setOpenEditProfile] = useState(false);
  const [openChangePic, setOpenChangePic] = useState(false);
  const [openManageDocs, setOpenManageDocs] = useState(false);

  if (!user) {
    return (
      <Typography
        variant="h6"
        sx={{ p: 3, textAlign: "center", color: "text.secondary" }}
      >
        Please log in to view your profile.
      </Typography>
    );
  }

  const solidBlueButton = {
    bgcolor: "#1976d2",
    color: "#fff",
    fontWeight: 600,
    "&:hover": {
      bgcolor: "#1565c0",
    },
  };

  return (
    <Box
      sx={{
        pb: { xs: 2, md: 3 }, px: { xs:2, md: 3 },
        bgcolor: "#f5f5f5",
        display: "flex",
        flexDirection: "column",
        gap: 3,
      }}
    >
      {/* ===== TITLE + BREADCRUMBS ===== */}
      {/* My Dashboard Header */}
      <DashboardHeader
        title="My Profile"
        breadcrumbs={[{ label: "My Profile"}]}
      />

      {/* ===== PROFILE HEADER ===== */}
      <Paper elevation={4} sx={{ p: 4, borderRadius: 3 }}>
        <ProfileHeader user={user} onChangePic={() => setOpenChangePic(true)} />
      </Paper>

      {/* ===== PERSONAL INFO ===== */}
      <Paper elevation={4} sx={{ p: 4, borderRadius: 3 }}>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
          <Typography variant="h6" fontWeight={600}>
            Personal Information
          </Typography>

          <Button
            variant="contained"
            startIcon={<EditIcon />}
            size="small"
            onClick={() => setOpenEditProfile(true)}
            sx={solidBlueButton}
          >
            Edit
          </Button>
        </Box>

        <Divider sx={{ mb: 2 }} />
        <ProfileInfo user={user} />
      </Paper>

      {/* ===== DOCUMENTS ===== */}
      <Paper elevation={4} sx={{ p: 4, borderRadius: 3 }}>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
          <Typography variant="h6" fontWeight={600}>
            Documents
          </Typography>

          <Button
            variant="contained"
            startIcon={<UploadFileIcon />}
            size="small"
            onClick={() => setOpenManageDocs(true)}
            sx={solidBlueButton}
          >
            Upload
          </Button>
        </Box>

        <Divider sx={{ mb: 2 }} />

        <ProfileDocuments openDialog={openManageDocs} setOpenDialog={setOpenManageDocs} />
      </Paper>

      {/* ===== DIALOGS ===== */}
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
    </Box>
  );
}
