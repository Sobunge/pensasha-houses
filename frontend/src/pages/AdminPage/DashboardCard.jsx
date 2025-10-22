import React from "react";
import { Card, CardContent, Typography, Box, Avatar } from "@mui/material";
import { Link } from "react-router-dom";

function DashboardCard({ title, value, icon, link }) {
  return (
    <Card
      component={Link}
      to={link}
      sx={{
        textDecoration: "none",
        color: "inherit",
        borderRadius: 4,
        boxShadow: 3,
        transition: "all 0.3s ease",
        "&:hover": {
          transform: "translateY(-4px)",
          boxShadow: 6,
        },
      }}
    >
      <CardContent
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          p: 3,
          textAlign: "center",
        }}
      >
        {/* Icon on Top */}
        <Avatar
          sx={{
            bgcolor: "#f8b500",
            width: 48,
            height: 48,
            color: "#111",
            mb: 1.5,
            boxShadow: 2,
          }}
        >
          {icon}
        </Avatar>

        {/* Value */}
        <Typography
          variant="h6"
          sx={{
            fontWeight: 700,
            color: "#111",
            fontSize: "1.1rem",
          }}
        >
          {value}
        </Typography>

        {/* Title */}
        <Typography
          variant="body2"
          sx={{
            color: "text.secondary",
            fontWeight: 500,
            fontSize: "0.85rem",
            mt: 0.3,
          }}
        >
          {title}
        </Typography>
      </CardContent>
    </Card>
  );
}

export default DashboardCard;
