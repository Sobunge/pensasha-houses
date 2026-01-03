import React from "react";
import { Box, Typography, Stack } from "@mui/material";

export default function ProfileInfo({ user }) {
  const infoData = [
    { label: "Email", value: user.email || "-" },
    { label: "Phone", value: user.phone || "-" },
    { label: "Address", value: user.address || "-" },
  ];

  return (
    <Stack spacing={3}>
      {infoData.map((item) => (
        <Box key={item.label}>
          <Typography
            variant="subtitle2"
            color="text.secondary"
            sx={{ mb: 0.5 }}
          >
            {item.label}
          </Typography>
          <Typography variant="body1" fontWeight={500}>
            {item.value}
          </Typography>
        </Box>
      ))}
    </Stack>
  );
}
