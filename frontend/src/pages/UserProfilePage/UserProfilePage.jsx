// src/pages/UserProfilePage/UserProfilePage.jsx
import React, { useState, useEffect } from "react";
import {
  Box,
  Paper,
  Typography,
  Divider,
  Button,
  Stack,
  CircularProgress,
  Fade,
  Skeleton,
} from "@mui/material";
import { useParams } from "react-router-dom";
import EditIcon from "@mui/icons-material/EditOutlined";
import UploadFileIcon from "@mui/icons-material/UploadFileOutlined";

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

  // Luxury Styled Button Theme
  const primaryThemeButton = {
    bgcolor: "#0F172A",
    color: "#FFFFFF",
    fontWeight: 700,
    textTransform: "none",
    borderRadius: "10px",
    px: 3,
    py: 1,
    boxShadow: "0 4px 12px rgba(15, 23, 42, 0.15)",
    "& .MuiButton-startIcon": { color: "#D4AF37" },
    "&:hover": {
      bgcolor: "#D4AF37",
      color: "#0F172A",
      boxShadow: "0 6px 18px rgba(212, 175, 55, 0.35)",
      transform: "translateY(-2px)",
      "& .MuiButton-startIcon": { color: "#0F172A" },
    },
    transition: "all 0.2s ease",
  };

  // Card Container Styling
  const cardPaperStyle = {
    p: { xs: 2.5, sm: 4 },
    borderRadius: "18px",
    bgcolor: "#FFFFFF",
    border: "1.5px solid #D4AF37",
    boxShadow: "0 10px 30px rgba(15, 23, 42, 0.08)",
  };

  // Visual Loading State
  if (!profile && loading) {
    return (
      <Fade in timeout={800}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            minHeight: "60vh",
            gap: 2,
          }}
        >
          <CircularProgress size={45} thickness={4} sx={{ color: "#D4AF37" }} />
          <Typography
            variant="body2"
            sx={{
              color: "#64748B",
              fontWeight: 700,
              textTransform: "uppercase",
              letterSpacing: 1.5,
              fontSize: "0.75rem",
            }}
          >
            Retrieving Profile...
          </Typography>
        </Box>
      </Fade>
    );
  }

  if (error) {
    return (
      <Box sx={{ p: 5, textAlign: "center" }}>
        <Typography variant="h6" sx={{ color: "#EF4444", fontWeight: 700 }}>
          Oops!
        </Typography>
        <Typography variant="body2" sx={{ color: "#64748B", mt: 1 }}>
          {error}
        </Typography>
      </Box>
    );
  }

  if (!profile) {
    return (
      <Typography variant="h6" sx={{ p: 5, textAlign: "center", color: "#64748B" }}>
        Please log in to view this profile.
      </Typography>
    );
  }

  const primaryRole = profile.roles?.[0] || "";

  return (
    <Box
      sx={{
        pb: 4,
        px: { xs: 1.5, sm: 3 },
        display: "flex",
        flexDirection: "column",
        gap: 3.5,
        maxWidth: 1280,
        mx: "auto",
      }}
    >
      {/* HEADER */}
      <DashboardHeader title="Profile" breadcrumbs={[{ label: "Profile" }]} />

      {/* PROFILE HEADER CARD */}
      <Paper elevation={0} sx={cardPaperStyle}>
        {loading ? (
          <Stack direction="row" spacing={3} alignItems="center">
            <Skeleton variant="circular" width={100} height={100} sx={{ bgcolor: "#F1F5F9" }} />
            <Box sx={{ flex: 1 }}>
              <Skeleton variant="text" width="40%" height={36} sx={{ bgcolor: "#F1F5F9" }} />
              <Skeleton variant="text" width="25%" height={24} sx={{ bgcolor: "#F1F5F9" }} />
            </Box>
          </Stack>
        ) : (
          <ProfileHeader profile={profile} onChangePic={() => setOpenChangePic(true)} />
        )}
      </Paper>

      {/* PERSONAL INFO CARD */}
      <Paper elevation={0} sx={cardPaperStyle}>
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          mb={2.5}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1.5,
              pl: 1.5,
              borderLeft: "4px solid #D4AF37",
            }}
          >
            <Typography
              variant="h6"
              fontWeight={800}
              sx={{ color: "#0F172A", fontSize: "1.15rem", letterSpacing: "-0.01em" }}
            >
              Personal Information
            </Typography>
          </Box>

          {!loading && !userId && (
            <Button
              variant="contained"
              startIcon={<EditIcon />}
              size="small"
              onClick={() => setOpenEditProfile(true)}
              sx={primaryThemeButton}
            >
              Edit Profile
            </Button>
          )}
        </Box>

        <Divider sx={{ mb: 3, borderColor: "#E2E8F0" }} />

        {loading ? (
          <Stack spacing={2}>
            <Skeleton variant="text" width="80%" height={28} sx={{ bgcolor: "#F1F5F9" }} />
            <Skeleton variant="text" width="60%" height={28} sx={{ bgcolor: "#F1F5F9" }} />
            <Skeleton variant="text" width="90%" height={28} sx={{ bgcolor: "#F1F5F9" }} />
          </Stack>
        ) : (
          <>
            <BaseProfileInfo profile={profile} />

            {/* Multi-role dynamic sections */}
            {profile.roles?.includes("TENANT") && (
              <>
                <Divider sx={{ my: 3.5, borderColor: "#E2E8F0" }} />
                <Typography
                  variant="subtitle1"
                  sx={{
                    mb: 2,
                    fontWeight: 800,
                    color: "#0F172A",
                    pl: 1.5,
                    borderLeft: "3px solid #D4AF37",
                  }}
                >
                  Tenant Info
                </Typography>
                <TenantProfileInfo profile={profile} />
              </>
            )}

            {profile.roles?.includes("LANDLORD") && (
              <>
                <Divider sx={{ my: 3.5, borderColor: "#E2E8F0" }} />
                <Typography
                  variant="subtitle1"
                  sx={{
                    mb: 2,
                    fontWeight: 800,
                    color: "#0F172A",
                    pl: 1.5,
                    borderLeft: "3px solid #D4AF37",
                  }}
                >
                  Landlord Info
                </Typography>
                <LandlordProfileInfo profile={profile} />
              </>
            )}

            {profile.roles?.includes("CARETAKER") && (
              <>
                <Divider sx={{ my: 3.5, borderColor: "#E2E8F0" }} />
                <Typography
                  variant="subtitle1"
                  sx={{
                    mb: 2,
                    fontWeight: 800,
                    color: "#0F172A",
                    pl: 1.5,
                    borderLeft: "3px solid #D4AF37",
                  }}
                >
                  Caretaker Info
                </Typography>
                <CaretakerProfileInfo profile={profile} />
              </>
            )}
          </>
        )}
      </Paper>

      {/* DOCUMENTS CARD */}
      <Paper elevation={0} sx={cardPaperStyle}>
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          mb={2.5}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1.5,
              pl: 1.5,
              borderLeft: "4px solid #D4AF37",
            }}
          >
            <Typography
              variant="h6"
              fontWeight={800}
              sx={{ color: "#0F172A", fontSize: "1.15rem", letterSpacing: "-0.01em" }}
            >
              Documents Vault
            </Typography>
          </Box>

          {!loading && !userId && (
            <Button
              variant="contained"
              startIcon={<UploadFileIcon />}
              size="small"
              onClick={() => setOpenManageDocs(true)}
              sx={primaryThemeButton}
            >
              Upload Document
            </Button>
          )}
        </Box>

        <Divider sx={{ mb: 3, borderColor: "#E2E8F0" }} />

        {!loading && (
          <ProfileDocuments
            openDialog={openManageDocs}
            setOpenDialog={setOpenManageDocs}
            role={primaryRole}
            userId={userId || null}
          />
        )}
      </Paper>

      {/* MODAL DIALOGS */}
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