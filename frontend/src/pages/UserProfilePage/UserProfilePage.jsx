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
  useTheme,
} from "@mui/material";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
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

// Motion container helper matching LandlordDashboard
const motionContainerStyle = {
  width: "100%",
  height: "100%",
  display: "flex",
  flexDirection: "column",
};

export default function UserProfilePage() {
  const theme = useTheme();
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

  // Theme-driven Luxury Button Styling
  const primaryThemeButton = {
    bgcolor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
    fontWeight: 700,
    textTransform: "none",
    borderRadius: "10px",
    px: 3,
    py: 1,
    boxShadow: "0 4px 12px rgba(15, 23, 42, 0.15)",
    "& .MuiButton-startIcon": { color: theme.palette.secondary.main },
    "&:hover": {
      bgcolor: theme.palette.secondary.main,
      color: theme.palette.primary.main,
      boxShadow: "0 6px 18px rgba(212, 175, 55, 0.35)",
      transform: "translateY(-2px)",
      "& .MuiButton-startIcon": { color: theme.palette.primary.main },
    },
    transition: "all 0.2s ease",
  };

  // Theme-driven Card Paper Styling
  const cardPaperStyle = {
    p: { xs: 2.5, sm: 3 },
    borderRadius: `${theme.shape.borderRadius}px`,
    bgcolor: theme.palette.background.paper,
    border: `1.5px solid ${theme.palette.secondary.main}`,
    boxShadow: "0 10px 30px rgba(15, 23, 42, 0.08)",
    width: "100%",
    boxSizing: "border-box",
  };

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
          <CircularProgress size={45} thickness={4} sx={{ color: theme.palette.secondary.main }} />
          <Typography
            variant="body2"
            sx={{
              color: theme.palette.text.secondary,
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
        <Typography variant="h6" sx={{ color: theme.palette.error?.main || "#EF4444", fontWeight: 700 }}>
          Oops!
        </Typography>
        <Typography variant="body2" sx={{ color: theme.palette.text.secondary, mt: 1 }}>
          {error}
        </Typography>
      </Box>
    );
  }

  if (!profile) {
    return (
      <Typography variant="h6" sx={{ p: 5, textAlign: "center", color: theme.palette.text.secondary }}>
        Please log in to view this profile.
      </Typography>
    );
  }

  return (
    <Box
      sx={{
        flexGrow: 1,
        py: 1,
        width: "100%",
        maxWidth: 1280,
        mx: "auto",
        display: "flex",
        flexDirection: "column",
        gap: 2,
        boxSizing: "border-box",
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

      {/* ===== 1. PROFILE HEADER CARD ===== */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, ease: "easeOut" }}
        style={motionContainerStyle}
      >
        <Paper elevation={0} sx={cardPaperStyle}>
          {loading ? (
            <Stack direction="row" spacing={3} alignItems="center">
              <Skeleton variant="circular" width={100} height={100} sx={{ bgcolor: theme.palette.divider }} />
              <Box sx={{ flex: 1 }}>
                <Skeleton variant="text" width="40%" height={36} sx={{ bgcolor: theme.palette.divider }} />
                <Skeleton variant="text" width="25%" height={24} sx={{ bgcolor: theme.palette.divider }} />
              </Box>
            </Stack>
          ) : (
            <ProfileHeader profile={{ ...profile, role: primaryRole }} onChangePic={() => setOpenChangePic(true)} />
          )}
        </Paper>
      </motion.div>

      {/* ===== 2. PERSONAL INFO CARD ===== */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, delay: 0.1, ease: "easeOut" }}
        style={motionContainerStyle}
      >
        <Paper elevation={0} sx={cardPaperStyle}>
          <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1.5,
                pl: 1.5,
                borderLeft: `4px solid ${theme.palette.secondary.main}`,
              }}
            >
              <Typography
                variant="h6"
                fontWeight={800}
                sx={{ color: theme.palette.text.primary, fontSize: "1.15rem", letterSpacing: "-0.01em" }}
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
              <Skeleton variant="text" width="80%" height={28} sx={{ bgcolor: theme.palette.divider }} />
              <Skeleton variant="text" width="60%" height={28} sx={{ bgcolor: theme.palette.divider }} />
              <Skeleton variant="text" width="90%" height={28} sx={{ bgcolor: theme.palette.divider }} />
            </Stack>
          ) : (
            <BaseProfileInfo profile={profile} />
          )}
        </Paper>
      </motion.div>

      {/* ===== 3. ROLE-SPECIFIC CARDS ===== */}
      {!loading && (
        <>
          {userRoles.includes("TENANT") && (
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: 0.15, ease: "easeOut" }}
              style={motionContainerStyle}
            >
              <Paper elevation={0} sx={cardPaperStyle}>
                <Box display="flex" justifyContent="space-between" alignItems="center" mb={2.5}>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, pl: 1.5, borderLeft: `4px solid ${theme.palette.secondary.main}` }}>
                    <Typography variant="h6" fontWeight={800} sx={{ color: theme.palette.text.primary, fontSize: "1.15rem", letterSpacing: "-0.01em" }}>
                      Tenant Information
                    </Typography>
                  </Box>
                </Box>
                <Divider sx={{ mb: 3, borderColor: theme.palette.divider }} />
                <TenantProfileInfo profile={profile} />
              </Paper>
            </motion.div>
          )}

          {userRoles.includes("LANDLORD") && (
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: 0.15, ease: "easeOut" }}
              style={motionContainerStyle}
            >
              <Paper elevation={0} sx={cardPaperStyle}>
                <Box display="flex" justifyContent="space-between" alignItems="center" mb={2.5}>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, pl: 1.5, borderLeft: `4px solid ${theme.palette.secondary.main}` }}>
                    <Typography variant="h6" fontWeight={800} sx={{ color: theme.palette.text.primary, fontSize: "1.15rem", letterSpacing: "-0.01em" }}>
                      Landlord Information
                    </Typography>
                  </Box>
                </Box>
                <Divider sx={{ mb: 3, borderColor: theme.palette.divider }} />
                <LandlordProfileInfo profile={profile} />
              </Paper>
            </motion.div>
          )}

          {userRoles.includes("CARETAKER") && (
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: 0.15, ease: "easeOut" }}
              style={motionContainerStyle}
            >
              <Paper elevation={0} sx={cardPaperStyle}>
                <Box display="flex" justifyContent="space-between" alignItems="center" mb={2.5}>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, pl: 1.5, borderLeft: `4px solid ${theme.palette.secondary.main}` }}>
                    <Typography variant="h6" fontWeight={800} sx={{ color: theme.palette.text.primary, fontSize: "1.15rem", letterSpacing: "-0.01em" }}>
                      Caretaker Information
                    </Typography>
                  </Box>
                </Box>
                <Divider sx={{ mb: 3, borderColor: theme.palette.divider }} />
                <CaretakerProfileInfo profile={profile} />
              </Paper>
            </motion.div>
          )}
        </>
      )}

      {/* ===== 4. DOCUMENTS VAULT CARD ===== */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, delay: 0.2, ease: "easeOut" }}
        style={motionContainerStyle}
      >
        <Paper elevation={0} sx={cardPaperStyle}>
          <Box display="flex" justifyContent="space-between" alignItems="center" mb={2.5}>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1.5,
                pl: 1.5,
                borderLeft: `4px solid ${theme.palette.secondary.main}`,
              }}
            >
              <Typography
                variant="h6"
                fontWeight={800}
                sx={{ color: theme.palette.text.primary, fontSize: "1.15rem", letterSpacing: "-0.01em" }}
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

          <Divider sx={{ mb: 3, borderColor: theme.palette.divider }} />

          {!loading && (
            <ProfileDocuments
              openDialog={openManageDocs}
              setOpenDialog={setOpenManageDocs}
              role={primaryRole}
              userId={userId || null}
            />
          )}
        </Paper>
      </motion.div>

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