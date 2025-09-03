import React from "react";
import { Card, CardContent, Typography, Button, Box } from "@mui/material";
import DescriptionIcon from "@mui/icons-material/Description";

function DocumentsCard() {
  // Placeholder count
  const availableDocs = 3;

  return (
    <Card sx={{ borderRadius: 3, boxShadow: 2, bgcolor: "#fff" }}>
      <CardContent>
        {/* Title with Icon */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1 }}>
          <DescriptionIcon sx={{ color: "#f8b500" }} />
          <Typography variant="h6" sx={{ fontWeight: 600, color: "#111" }}>
            Documents
          </Typography>
        </Box>

        {/* Document Info */}
        <Typography variant="body1" sx={{ color: "#555", mb: 2 }}>
          You have <strong>{availableDocs}</strong> documents available.
        </Typography>

        {/* Action Button with Icon */}
        <Button
          variant="contained"
          startIcon={<DescriptionIcon />} // Add icon here
          sx={{
            bgcolor: "#f8b500",
            color: "#111",
            fontWeight: 600,
            textTransform: "none",
            borderRadius: 2,
            "&:hover": { bgcolor: "#c59000" },
          }}
        >
          View Documents
        </Button>
      </CardContent>
    </Card>
  );
}

export default DocumentsCard;
