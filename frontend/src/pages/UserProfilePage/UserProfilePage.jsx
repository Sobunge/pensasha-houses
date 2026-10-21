// src/pages/UserProfilePage/UserProfilePage.jsx
import React, { useState, useEffect, useMemo } from "react";
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
import LandlordProfileInfo from "./profile/landlord/LandlordProfileInfo";
import CaretakerProfileInfo from "./profile/CaretakerProfileInfo";

import EditProfileDialog from "./EditProfileDialog";
import ChangeProfilePicDialog from "./ChangeProfilePicDialog";

import useProfile from "../../components/hooks/profile/useProfile";
import api from "../../api/api";

export default function UserProfilePage() {
  const { userId } = useParams();
  const { profile: selfProfile, loading: selfLoading, refreshProfile } = useProfile();

  const [fetchedProfile, setFetchedProfile] = useState(null);
  const [fetching, setFetching] = useState(false);
  const [error, setError] = useState(null);

  const [openEditProfile, setOpenEditProfile] = useState(false);
  const [openChangePic, setOpenChangePic] = useState(false);
  const [openManageDocs, setOpenManageDocs] = useState(false);

  // Determine active profile and loading status based on whether userId is present
  const profile = userId ? fetchedProfile : selfProfile;
  const loading = userId ? fetching : selfLoading;

  // Fetch profile if viewing another user
  useEffect(() => {
    if (!userId) {
      setFetchedProfile(null);
      setError(null);
      return;
    }

    const fetchUser = async () => {
      setFetching(true);
      setError(null);
      try {
        const res = await api.get(`/users/${userId}`);
        setFetchedProfile(res.data);
      } catch (err) {
        setError("Failed to load profile. Please try again.");
      } finally {
        setFetching(false);
      }
    };

    fetchUser();
  }, [userId]);

  /* ---------------- Robust Normalizing of User Roles ---------------- */
  const userRoles = useMemo(() => {
    if (!profile) return [];

    const explicitRoles = [];

    const directRoleSources = [
      profile.role,
      profile.activeRole,
      profile.roleName,
      profile.primaryRole,
      ...(Array.isArray(profile.roles) ? profile.roles : []),
    ];

    directRoleSources.forEach((r) => {
      if (!r) return;
      const roleStr = typeof r === "object" ? r.name || r.authority || "" : String(r);
      const clean = roleStr.toUpperCase().replace(/^ROLE_/, "");
      if (["TENANT", "LANDLORD", "CARETAKER", "ADMIN", "AGENT"].includes(clean)) {
        if (!explicitRoles.includes(clean)) explicitRoles.push(clean);
      }
    });

    if (explicitRoles.length > 0) return explicitRoles;

    // Fallback permission check if needed
    const permissions = Array.isArray(profile.permissions)
      ? profile.permissions.map((p) => String(p).toUpperCase())
      : [];

    const hasPermission = (perm) => permissions.includes(perm);

    if (
      hasPermission("CARETAKER_ASSIGN") ||
      hasPermission("CARETAKER_CREATE") ||
      hasPermission("PROPERTY_CREATE") ||
      hasPermission("TENANT_APPROVE")
    ) {
      return ["LANDLORD"];
    }

    if (
      hasPermission("CARETAKER_UPDATE") ||
      hasPermission("MAINTENANCE_ASSIGN") ||
      hasPermission("UNIT_UPDATE")
    ) {
      return ["CARETAKER"];
    }

    if (hasPermission("LEASE_VIEW") || hasPermission("MAINTENANCE_CREATE")) {
      return ["TENANT"];
    }

    return [];
  }, [profile]);

  const primaryRole = userRoles[0] || "";

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
    p: { xs: 2.5, sm: 2 },
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

  return (
    <Box
      sx={{
        pb: 1,
        pt: 2,
        px: { xs: 1.5, sm: 3 },
        display: "flex",
        flexDirection: "column",
        gap: 2,
        maxWidth: 1280,
        mx: "auto",
      }}
    >
      {/* DASHBOARD HEADER */}
      <DashboardHeader
        title={userId ? `${profile?.firstName || 'User'}'s Profile` : "User Profile"}
        subtitle={
          userId
            ? "Manage and review account credentials and uploaded records."
            : "Manage your personal details, role-specific information, and secure document vault."
        }
      />

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
          <ProfileHeader profile={{ ...profile, role: primaryRole }} onChangePic={() => setOpenChangePic(true)} />
        )}
      </Paper>

      {/* PERSONAL INFO CARD */}
      <Paper elevation={0} sx={cardPaperStyle}>
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          mb={3}
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

        {loading ? (
          <Stack spacing={2}>
            <Skeleton variant="text" width="80%" height={28} sx={{ bgcolor: "#F1F5F9" }} />
            <Skeleton variant="text" width="60%" height={28} sx={{ bgcolor: "#F1F5F9" }} />
            <Skeleton variant="text" width="90%" height={28} sx={{ bgcolor: "#F1F5F9" }} />
          </Stack>
        ) : (
          <BaseProfileInfo profile={profile} />
        )}
      </Paper>

      {/* SEPARATE ROLE-SPECIFIC CARDS */}
      {!loading && (
        <>
          {userRoles.includes("TENANT") && (
            <Paper elevation={0} sx={cardPaperStyle}>
              <Box display="flex" justifyContent="space-between" alignItems="center" mb={2.5}>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, pl: 1.5, borderLeft: "4px solid #D4AF37" }}>
                  <Typography variant="h6" fontWeight={800} sx={{ color: "#0F172A", fontSize: "1.15rem", letterSpacing: "-0.01em" }}>
                    Tenant Information
                  </Typography>
                </Box>
              </Box>
              <Divider sx={{ mb: 3, borderColor: "#E2E8F0" }} />
              <TenantProfileInfo profile={profile} />
            </Paper>
          )}

          {userRoles.includes("LANDLORD") && (
            <Paper elevation={0} sx={cardPaperStyle}>
              <Box display="flex" justifyContent="space-between" alignItems="center" mb={2.5}>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, pl: 1.5, borderLeft: "4px solid #D4AF37" }}>
                  <Typography variant="h6" fontWeight={800} sx={{ color: "#0F172A", fontSize: "1.15rem", letterSpacing: "-0.01em" }}>
                    Landlord Information
                  </Typography>
                </Box>
              </Box>
              <Divider sx={{ mb: 3, borderColor: "#E2E8F0" }} />
              <LandlordProfileInfo profile={profile} />
            </Paper>
          )}

          {userRoles.includes("CARETAKER") && (
            <Paper elevation={0} sx={cardPaperStyle}>
              <Box display="flex" justifyContent="space-between" alignItems="center" mb={2.5}>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, pl: 1.5, borderLeft: "4px solid #D4AF37" }}>
                  <Typography variant="h6" fontWeight={800} sx={{ color: "#0F172A", fontSize: "1.15rem", letterSpacing: "-0.01em" }}>
                    Caretaker Information
                  </Typography>
                </Box>
              </Box>
              <Divider sx={{ mb: 3, borderColor: "#E2E8F0" }} />
              <CaretakerProfileInfo profile={profile} />
            </Paper>
          )}
        </>
      )}

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