import React from "react";
import { Grid, Paper, Typography, Box } from "@mui/material";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import HomeWorkIcon from "@mui/icons-material/HomeWork";
import PeopleIcon from "@mui/icons-material/People";

const cardStyle = {
  p: 2,
  borderRadius: 3,
  bgcolor: "#fff8e1",
  boxShadow: 1,
  display: "flex",
  alignItems: "center",
  gap: 1.5,
};

export default function LandlordProfile({ user }) {
  return (
    <Grid container spacing={3}>
      <Grid item xs={12} sm={6}>
        <Paper sx={cardStyle}>
          <EmailIcon sx={{ color: "#f8b500" }} />
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
          <PhoneIcon sx={{ color: "#f8b500" }} />
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
          <HomeWorkIcon sx={{ color: "#f8b500" }} />
          <Box>
            <Typography variant="subtitle2" color="text.secondary">
              Properties Managed
            </Typography>
            <Typography variant="body1" sx={{ fontWeight: 600 }}>
              {user.propertiesCount || 0}
            </Typography>
          </Box>
        </Paper>
      </Grid>

      <Grid item xs={12} sm={6}>
        <Paper sx={cardStyle}>
          <PeopleIcon sx={{ color: "#f8b500" }} />
          <Box>
            <Typography variant="subtitle2" color="text.secondary">
              Tenants
            </Typography>
            <Typography variant="body1" sx={{ fontWeight: 600 }}>
              {user.tenantsCount || 0}
            </Typography>
          </Box>
        </Paper>
      </Grid>
    </Grid>
  );
}
