import React from "react";
import { Box, Typography, Divider, Grid } from "@mui/material";

export default function ProfileInfo({ user }) {
  const infoData = [
    { label: "Email", value: user.email || "-" },
    { label: "Phone", value: user.phone || "-" },
    { label: "Address", value: user.address || "-" },
  ];

  return (
    <Box>
      <Typography variant="h6" fontWeight={600} mb={2}>
        Personal Information
      </Typography>
      <Divider sx={{ mb: 2 }} />
      <Grid container spacing={2}>
        {infoData.map((item) => (
          <Grid item xs={12} sm={6} key={item.label}>
            <Typography variant="subtitle2" color="text.secondary">
              {item.label}
            </Typography>
            <Typography variant="body1" fontWeight={500}>
              {item.value}
            </Typography>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
