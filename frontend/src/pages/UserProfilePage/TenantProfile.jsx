import React from "react";
import { Grid, Paper, Typography, Box, CircularProgress } from "@mui/material";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import HomeWorkIcon from "@mui/icons-material/HomeWork";
import useTenantProfile from "../../components/hooks/useTenantProfile";

const cardStyle = {
  p: 2,
  borderRadius: 3,
  bgcolor: "#fff8e1",
  boxShadow: 1,
  display: "flex",
  alignItems: "center",
  gap: 1.5,
  transition: "transform 0.2s, box-shadow 0.2s",
  "&:hover": {
    transform: "translateY(-2px)",
    boxShadow: 3,
  },
};

const iconStyle = {
  color: "#f8b500",
  fontSize: 32,
};

export default function TenantProfile(idNumber) {
  const { user, loading, error } = useTenantProfile(idNumber);

  if (loading) return <CircularProgress />;
  if (error) return <Typography color="error">{error}</Typography>;

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} sm={6}>
        <Paper sx={cardStyle}>
          <EmailIcon sx={iconStyle} />
          <Box>
            <Typography variant="subtitle2" color="text.secondary">
              Email
            </Typography>
            <Typography variant="body1" sx={{ fontWeight: 600 }}>
              {user.email}
            </Typography>
          </Box>
        </Paper>
      </Grid>

      <Grid item xs={12} sm={6}>
        <Paper sx={cardStyle}>
          <PhoneIcon sx={iconStyle} />
          <Box>
            <Typography variant="subtitle2" color="text.secondary">
              Phone
            </Typography>
            <Typography variant="body1" sx={{ fontWeight: 600 }}>
              {user.phone || "Not Provided"}
            </Typography>
          </Box>
        </Paper>
      </Grid>

      <Grid item xs={12} sm={6}>
        <Paper sx={cardStyle}>
          <HomeWorkIcon sx={iconStyle} />
          <Box>
            <Typography variant="subtitle2" color="text.secondary">
              Assigned Property
            </Typography>
            <Typography variant="body1" sx={{ fontWeight: 600 }}>
              {user.assignedProperty || "Not Assigned"}
            </Typography>
          </Box>
        </Paper>
      </Grid>
    </Grid>
  );
}
