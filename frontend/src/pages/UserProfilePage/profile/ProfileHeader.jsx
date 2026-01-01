import React from "react";
import { Box, Avatar, Typography, Stack, Link } from "@mui/material";
import BadgeIcon from "@mui/icons-material/Badge";

export default function ProfileHeader({ user, onChangePic }) {
  return (
    <Stack
      direction={{ xs: "column", md: "row" }}
      spacing={4}
      alignItems="center"
      justifyContent="center"
      mb={4}
    >
      {/* Avatar */}
      <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
        <Avatar
          sx={{
            width: { xs: 90, sm: 110 },
            height: { xs: 90, sm: 110 },
            fontSize: { xs: 36, sm: 44 },
            bgcolor: "#f8b500",
            boxShadow: "0 8px 24px rgba(0,0,0,0.15)",
            border: "4px solid #fff",
            transition: "transform 0.3s ease",
            "&:hover": { transform: "scale(1.05)" },
          }}
        >
          {user.name?.charAt(0) || "U"}
        </Avatar>

        <Link
          component="button"
          variant="caption"
          onClick={onChangePic}
          sx={{ mt: 3, fontWeight: 600, letterSpacing: 0.6, textTransform: "uppercase" }}
        >
          Change Photo
        </Link>
      </Box>

      {/* Name + Role */}
      <Box
        textAlign={{ xs: "center", md: "left" }}
        display="flex"
        flexDirection="column"
        alignItems={{ xs: "center", md: "flex-start" }}
      >
        <Typography variant="h4" sx={{ fontWeight: 800, lineHeight: 1.2, letterSpacing: -0.5 }}>
          {user.name}
        </Typography>

        <Stack
          direction="row"
          alignItems="center"
          spacing={1}
          mt={1.5}
          sx={{ bgcolor: "rgba(248,181,0,0.12)", px: 1.5, py: 0.5, borderRadius: 2 }}
        >
          <BadgeIcon sx={{ color: "#f8b500", fontSize: 20 }} />
          <Typography variant="subtitle2" sx={{ fontWeight: 700, letterSpacing: 0.8, color: "text.secondary" }}>
            {user.role?.toUpperCase()}
          </Typography>
        </Stack>
      </Box>
    </Stack>
  );
}
