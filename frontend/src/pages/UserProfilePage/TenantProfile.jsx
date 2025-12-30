// src/components/UserProfile/TenantProfile.jsx
import React from "react";
import {
  Grid,
  Paper,
  Typography,
  Box,
  Skeleton,
} from "@mui/material";
import PhoneIcon from "@mui/icons-material/Phone";
import HomeWorkIcon from "@mui/icons-material/HomeWork";
import ContactEmergencyIcon from "@mui/icons-material/ContactEmergency";
import useUserProfile from "../../components/hooks/useUserProfile";

const cardStyle = {
  p: 2,
  borderRadius: 3,
  bgcolor: "#fff8e1",
  boxShadow: 1,
  display: "flex",
  alignItems: "center",
  gap: 1.5,
  width: "100%", // Full width
};

const iconStyle = { color: "#f8b500", fontSize: 32 };

function ProfileSkeleton() {
  return (
    <Box>
      <Skeleton variant="text" width={220} height={40} sx={{ mb: 2, mx: "auto" }} />

      <Grid container spacing={3} justifyContent="center">
        {[1, 2, 3].map((i) => (
          <Grid item xs={12} sm={12} md={6} key={i} display="flex" justifyContent="center">
            <Paper sx={cardStyle}>
              <Skeleton variant="circular" width={32} height={32} />
              <Box sx={{ flex: 1, ml: 1 }}>
                <Skeleton variant="text" width="40%" />
                <Skeleton variant="text" width="70%" />
              </Box>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

export default function TenantProfile({ user }) {
  const { profile, loading, error } = useUserProfile(user);

  if (loading) return <ProfileSkeleton />;

  if (error)
    return (
      <Typography color="error" variant="body2" textAlign="center">
        {error}
      </Typography>
    );

  if (!profile) return null;

  const fullName = [profile.firstName, profile.secondName, profile.thirdName]
    .filter(Boolean)
    .join(" ");

  const assignedProperties =
    profile.leases?.map((lease) => lease.propertyName).join(", ") || "Not Assigned";

  const infoCards = [
    {
      label: "Phone",
      value: profile.phoneNumber || "Not Provided",
      icon: <PhoneIcon sx={iconStyle} />,
    },
    {
      label: "Assigned Property",
      value: assignedProperties,
      icon: <HomeWorkIcon sx={iconStyle} />,
    },
    {
      label: "Emergency Contact",
      value: profile.emergencyContact || "Not Provided",
      icon: <ContactEmergencyIcon sx={iconStyle} />,
    },
  ];

  return (
    <Box>
      <Typography variant="h5" sx={{ mb: 3, fontWeight: 700 }} textAlign="center">
        {fullName}
      </Typography>

      <Grid container spacing={3} justifyContent="center">
        {infoCards.map((card) => (
          <Grid
            item
            xs={12}  // full width on extra-small screens
            sm={12}  // full width on small screens
            md={12}  // full width on medium screens
            lg={6}   // half width on large screens and above
            display="flex"
            justifyContent="center"
            key={card.label}
          >
            <Paper sx={cardStyle}>
              {card.icon}
              <Box>
                <Typography variant="subtitle2" color="text.secondary">
                  {card.label}
                </Typography>
                <Typography variant="body1" sx={{ fontWeight: 600 }}>
                  {card.value}
                </Typography>
              </Box>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Box >
  );
}
