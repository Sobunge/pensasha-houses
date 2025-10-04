import React from "react";
import { Grid, Paper, Typography, Box } from "@mui/material";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import ApartmentIcon from "@mui/icons-material/Apartment";
import BuildIcon from "@mui/icons-material/Build";

const cardStyle = {
  p: 2,
  borderRadius: 3,
  bgcolor: "#fff8e1",
  boxShadow: 1,
  display: "flex",
  alignItems: "center",
  gap: 1.5,
};

export default function CaretakerProfile({ user }) {
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
          <ApartmentIcon sx={{ color: "#f8b500" }} />
          <Box>
            <Typography variant="subtitle2" color="text.secondary">
              Buildings Assigned
            </Typography>
            <Typography variant="body1" sx={{ fontWeight: 600 }}>
              {user.buildingsAssigned || 0}
            </Typography>
          </Box>
        </Paper>
      </Grid>

      <Grid item xs={12} sm={6}>
        <Paper sx={cardStyle}>
          <BuildIcon sx={{ color: "#f8b500" }} />
          <Box>
            <Typography variant="subtitle2" color="text.secondary">
              Maintenance Requests Pending
            </Typography>
            <Typography variant="body1" sx={{ fontWeight: 600 }}>
              {user.maintenancePending || 0}
            </Typography>
          </Box>
        </Paper>
      </Grid>
    </Grid>
  );
}
