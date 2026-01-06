import React, { useState } from "react";
import {
  Box,
  Paper,
  Typography,
  Divider,
  Button,
  Skeleton,
  Stack,
} from "@mui/material";

import EditIcon from "@mui/icons-material/Edit";
import UploadFileIcon from "@mui/icons-material/UploadFile";

import DashboardHeader from "../../components/DashboardHeader";

import ProfileHeader from "./profile/ProfileHeader";
import BaseProfileInfo from "./profile/BaseProfileInfo";
import ProfileDocuments from "./profile/ProfileDocuments";

import TenantProfileInfo from "./profile/TenantProfileInfo";
import LandlordProfileInfo from "./profile/LandlordProfileInfo";
import CaretakerProfileInfo from "./profile/CaretakerProfileInfo";

import EditProfileDialog from "./EditProfileDialog";
import ChangeProfilePicDialog from "./ChangeProfilePicDialog";

import useProfile from "../../components/hooks/useProfile";

export default function UserProfilePage() {
  const { profile, role, loading, error, refreshProfile } = useProfile();

  const [openEditProfile, setOpenEditProfile] = useState(false);
  const [openChangePic, setOpenChangePic] = useState(false);
  const [openManageDocs, setOpenManageDocs] = useState(false);

  if (error) {
    return (
      <Typography
        variant="h6"
        sx={{ p: 3, textAlign: "center", color: "error.main" }}
      >
        Failed to load profile. Please try again later.
      </Typography>
    );
  }

  if (!profile && !loading) {
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
    "&:hover": { bgcolor: "#1565c0" },
  };

  return (
    <Box
      sx={{
        pb: { xs: 2, md: 3 },
        px: { xs: 2, md: 3 },
        bgcolor: "#f5f5f5",
        display: "flex",
        flexDirection: "column",
        gap: 3,
      }}
    >
      {/* ===== HEADER ===== */}
      <DashboardHeader
        title="My Profile"
        breadcrumbs={[{ label: "My Profile" }]}
      />

      {/* ===== PROFILE HEADER ===== */}
      <Paper elevation={4} sx={{ p: 4, borderRadius: 3 }}>
        {loading ? (
          <Stack direction="row" spacing={4} alignItems="center">
            <Skeleton variant="circular" width={110} height={110} />
            <Box sx={{ flex: 1 }}>
              <Skeleton width="50%" height={40} />
              <Skeleton width="30%" height={25} sx={{ mt: 1 }} />
            </Box>
          </Stack>
        ) : (
          <ProfileHeader profile={profile} onChangePic={() => setOpenChangePic(true)} />
        )}
      </Paper>

      {/* ===== BASE PROFILE INFO ===== */}
      <Paper elevation={4} sx={{ p: 4, borderRadius: 3 }}>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
          <Typography variant="h6" fontWeight={600}>
            Personal Information
          </Typography>
          {!loading && (
            <Button
              variant="contained"
              startIcon={<EditIcon />}
              size="small"
              onClick={() => setOpenEditProfile(true)}
              sx={solidBlueButton}
            >
              Edit
            </Button>
          )}
        </Box>

        <Divider sx={{ mb: 3 }} />

        {loading ? (
          <Stack spacing={2}>
            <Skeleton width="80%" height={25} />
            <Skeleton width="60%" height={25} />
            <Skeleton width="90%" height={25} />
          </Stack>
        ) : (
          <>
            <BaseProfileInfo profile={profile} />
            <Divider sx={{ my: 3 }} />
            {role === "TENANT" && <TenantProfileInfo profile={profile} />}
            {role === "LANDLORD" && <LandlordProfileInfo profile={profile} />}
            {role === "CARETAKER" && <CaretakerProfileInfo profile={profile} />}
          </>
        )}
      </Paper>

      {/* ===== DOCUMENTS ===== */}
      <Paper elevation={4} sx={{ p: 4, borderRadius: 3 }}>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
          <Typography variant="h6" fontWeight={600}>
            Documents
          </Typography>
          {!loading && (
            <Button
              variant="contained"
              startIcon={<UploadFileIcon />}
              size="small"
              onClick={() => setOpenManageDocs(true)}
              sx={solidBlueButton}
            >
              Upload
            </Button>
          )}
        </Box>

        <Divider sx={{ mb: 2 }} />

        {loading ? (
          <Stack spacing={1}>
            <Skeleton width="100%" height={40} />
            <Skeleton width="100%" height={40} />
            <Skeleton width="100%" height={40} />
          </Stack>
        ) : (
          <ProfileDocuments
            openDialog={openManageDocs}
            setOpenDialog={setOpenManageDocs}
            role={role}
          />
        )}
      </Paper>

      {/* ===== DIALOGS ===== */}
      {!loading && openEditProfile && (
        <EditProfileDialog
          open={openEditProfile}
          handleClose={() => setOpenEditProfile(false)}
          profile={profile}
          refreshProfile={refreshProfile}
        />
      )}

      {!loading && openChangePic && (
        <ChangeProfilePicDialog
          open={openChangePic}
          handleClose={() => setOpenChangePic(false)}
          profile={profile}
          refreshProfile={refreshProfile}
        />
      )}
    </Box>
  );
}
