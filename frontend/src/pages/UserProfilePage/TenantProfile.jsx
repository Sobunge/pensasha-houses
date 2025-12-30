import React, { useState, useEffect } from "react";
import {
  Grid,
  Paper,
  Typography,
  Box,
  Skeleton,
  TextField,
  Button,
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
  width: "100%",
};

const iconStyle = { color: "#f8b500", fontSize: 32 };

function ProfileSkeleton() {
  return (
    <Box>
      <Skeleton variant="text" width={220} height={40} sx={{ mb: 2, mx: "auto" }} />
      <Grid container spacing={3} justifyContent="center">
        {[1, 2, 3].map((i) => (
          <Grid
            item
            xs={12}
            sm={12}
            md={12}
            lg={6}
            display="flex"
            justifyContent="center"
            key={i}
          >
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

export default function TenantProfile({ user, onUpdate }) {
  const { profile, loading, error } = useUserProfile(user);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    secondName: "",
    thirdName: "",
    phoneNumber: "",
    emergencyContact: "",
  });

  // Initialize form data when profile loads
  useEffect(() => {
    if (profile) {
      setFormData({
        firstName: profile.firstName || "",
        secondName: profile.secondName || "",
        thirdName: profile.thirdName || "",
        phoneNumber: profile.phoneNumber || "",
        emergencyContact: profile.emergencyContact || "",
      });
    }
  }, [profile]);

  if (loading) return <ProfileSkeleton />;
  if (error) return <Typography color="error" variant="body2" textAlign="center">{error}</Typography>;
  if (!profile) return null;

  const fullName = [formData.firstName, formData.secondName, formData.thirdName].filter(Boolean).join(" ");
  const assignedProperties = profile.leases?.map((lease) => lease.propertyName).join(", ") || "Not Assigned";

  const handleChange = (field) => (e) => setFormData({ ...formData, [field]: e.target.value });

  const handleSave = () => {
    if (onUpdate) onUpdate(formData); // callback for parent/API update
    setEditMode(false);
  };

  const handleCancel = () => {
    setFormData({
      firstName: profile.firstName || "",
      secondName: profile.secondName || "",
      thirdName: profile.thirdName || "",
      phoneNumber: profile.phoneNumber || "",
      emergencyContact: profile.emergencyContact || "",
    });
    setEditMode(false);
  };

  const infoCards = [
    { label: "Phone", value: formData.phoneNumber, icon: <PhoneIcon sx={iconStyle} />, field: "phoneNumber", editable: true },
    { label: "Assigned Property", value: assignedProperties, icon: <HomeWorkIcon sx={iconStyle} />, editable: false },
    { label: "Emergency Contact", value: formData.emergencyContact, icon: <ContactEmergencyIcon sx={iconStyle} />, field: "emergencyContact", editable: true },
  ];

  return (
    <Box>
      {/* Name Editing */}
      <Box textAlign="center" mb={3}>
        {editMode ? (
          <TextField
            label="Full Name"
            value={fullName}
            onChange={(e) => {
              const names = e.target.value.split(" ");
              setFormData({
                ...formData,
                firstName: names[0] || "",
                secondName: names[1] || "",
                thirdName: names[2] || "",
              });
            }}
            fullWidth
            variant="outlined"
            size="small"
          />
        ) : (
          <Typography variant="h5" sx={{ fontWeight: 700 }}>{fullName}</Typography>
        )}
      </Box>

      {/* Info Cards */}
      <Grid container spacing={3} justifyContent="center">
        {infoCards.map((card) => (
          <Grid
            item
            xs={12}
            sm={12}
            md={12}
            lg={6}
            display="flex"
            justifyContent="center"
            key={card.label}
          >
            <Paper sx={cardStyle}>
              {card.icon}
              <Box sx={{ flex: 1 }}>
                <Typography variant="subtitle2" color="text.secondary">{card.label}</Typography>
                {editMode && card.editable ? (
                  <TextField
                    value={card.value}
                    onChange={handleChange(card.field)}
                    fullWidth
                    variant="outlined"
                    size="small"
                  />
                ) : (
                  <Typography variant="body1" sx={{ fontWeight: 600 }}>
                    {card.value || "Not Provided"}
                  </Typography>
                )}
              </Box>
            </Paper>
          </Grid>
        ))}
      </Grid>

      {/* Action Buttons */}
      <Box mt={3} textAlign="center">
        {editMode ? (
          <>
            <Button variant="contained" color="primary" onClick={handleSave} sx={{ mr: 2 }}>
              Save
            </Button>
            <Button variant="outlined" color="secondary" onClick={handleCancel}>
              Cancel
            </Button>
          </>
        ) : (
          <Button variant="outlined" onClick={() => setEditMode(true)}>
            Edit Profile
          </Button>
        )}
      </Box>
    </Box>
  );
}
