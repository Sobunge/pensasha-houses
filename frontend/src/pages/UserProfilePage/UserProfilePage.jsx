// src/pages/UserProfilePage/UserProfilePage.jsx
import React, { useState, useEffect } from "react";
import { Box, Paper, Typography, Divider, Button, Stack } from "@mui/material";
import { useParams } from "react-router-dom";
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
import api from "../../api/api";

export default function UserProfilePage() {
  const { userId } = useParams();
  const { profile: selfProfile, loading: selfLoading, refreshProfile } = useProfile();

  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(selfLoading);
  const [error, setError] = useState(null);

  const [openEditProfile, setOpenEditProfile] = useState(false);
  const [openChangePic, setOpenChangePic] = useState(false);
  const [openManageDocs, setOpenManageDocs] = useState(false);

  // Fetch profile (self or other user)
  useEffect(() => {
    if (!userId) {
      setProfile(selfProfile);
      setLoading(selfLoading);
      return;
    }

    const fetchUser = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await api.get(`/users/${userId}`);
        setProfile(res.data);
      } catch (err) {
        setError("Failed to load profile. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [userId, selfProfile, selfLoading]);

  if (error) {
    return (
      <Typography variant="h6" sx={{ p: 3, textAlign: "center", color: "error.main" }}>
        {error}
      </Typography>
    );
  }

  if (!profile && loading) {
    return (
      <Typography variant="h6" sx={{ p: 3, textAlign: "center", color: "text.secondary" }}>
        Loading profile...
      </Typography>
    );
  }

  if (!profile) {
    return (
      <Typography variant="h6" sx={{ p: 3, textAlign: "center", color: "text.secondary" }}>
        Please log in to view this profile.
      </Typography>
    );
  }

  const solidBlueButton = {
    bgcolor: "#1976d2",
    color: "#fff",
    fontWeight: 600,
    "&:hover": { bgcolor: "#1565c0" },
  };

  const primaryRole = profile.roles?.[0] || "";

  return (
    <Box sx={{ pb: 3, px: 3, bgcolor: "#f5f5f5", display: "flex", flexDirection: "column", gap: 3 }}>
      {/* HEADER */}
      <DashboardHeader title="Profile" breadcrumbs={[{ label: "Profile" }]} />

      {/* PROFILE HEADER */}
      <Paper elevation={4} sx={{ p: 4, borderRadius: 3 }}>
        {loading ? (
          <Stack direction="row" spacing={4} alignItems="center">
            <Box sx={{ width: 110, height: 110, bgcolor: "grey.300", borderRadius: "50%" }} />
            <Box sx={{ flex: 1 }}>
              <Box sx={{ width: "50%", height: 40, bgcolor: "grey.300", mb: 1 }} />
              <Box sx={{ width: "30%", height: 25, bgcolor: "grey.300" }} />
            </Box>
          </Stack>
        ) : (
          <ProfileHeader profile={profile} onChangePic={() => setOpenChangePic(true)} />
        )}
      </Paper>

      {/* PERSONAL INFO */}
      <Paper elevation={4} sx={{ p: 4, borderRadius: 3 }}>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
          <Typography variant="h6" fontWeight={600}>
            Personal Information
          </Typography>
          {!loading && !userId && (
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
            <Box sx={{ width: "80%", height: 25, bgcolor: "grey.300" }} />
            <Box sx={{ width: "60%", height: 25, bgcolor: "grey.300" }} />
            <Box sx={{ width: "90%", height: 25, bgcolor: "grey.300" }} />
          </Stack>
        ) : (
          <>
            <BaseProfileInfo profile={profile} />
            <Divider sx={{ my: 3 }} />

            {/* Multi-role sections */}
            {profile.roles?.includes("TENANT") && (
              <>
                <Typography variant="subtitle1" sx={{ mt: 2, mb: 1, fontWeight: 600 }}>
                  Tenant Info
                </Typography>
                <TenantProfileInfo profile={profile} />
                <Divider sx={{ my: 3 }} />
              </>
            )}
            {profile.roles?.includes("LANDLORD") && (
              <>
                <Typography variant="subtitle1" sx={{ mt: 2, mb: 1, fontWeight: 600 }}>
                  Landlord Info
                </Typography>
                <LandlordProfileInfo profile={profile} />
                <Divider sx={{ my: 3 }} />
              </>
            )}
            {profile.roles?.includes("CARETAKER") && (
              <>
                <Typography variant="subtitle1" sx={{ mt: 2, mb: 1, fontWeight: 600 }}>
                  Caretaker Info
                </Typography>
                <CaretakerProfileInfo profile={profile} />
                <Divider sx={{ my: 3 }} />
              </>
            )}
          </>
        )}
      </Paper>

      {/* DOCUMENTS */}
      <Paper elevation={4} sx={{ p: 4, borderRadius: 3 }}>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
          <Typography variant="h6" fontWeight={600}>
            Documents
          </Typography>
          {!loading && !userId && (
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

        {!loading && (
          <ProfileDocuments
            openDialog={openManageDocs}
            setOpenDialog={setOpenManageDocs}
            role={primaryRole}
            userId={userId || null} // pass userId if viewing another profile
          />
        )}
      </Paper>

      {/* DIALOGS */}
      {!loading && !userId && openEditProfile && (
        <EditProfileDialog
          open={openEditProfile}
          handleClose={() => setOpenEditProfile(false)}
          profile={profile}
          refreshProfile={refreshProfile}
        />
      )}
      {!loading && !userId && openChangePic && (
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