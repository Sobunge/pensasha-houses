import React from "react";
import { Card, CardContent, Typography, Button, Box } from "@mui/material";
import DescriptionIcon from "@mui/icons-material/Description";
import { useNavigate } from "react-router-dom";

function DocumentsCard() {
  const navigate = useNavigate();
  const availableDocs = 3;

  const handleNavigate = () => {
    navigate("/tenant/documents");
  };

  return (
    <Card sx={{ borderRadius: 3, boxShadow: 2, bgcolor: "#fff" }}>
      <CardContent>
        {/* Title with Icon */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1 }}>
          <DescriptionIcon sx={{ color: "#f8b500" }} />
          <Typography variant="subtitle1" sx={{ fontWeight: 600, color: "#111" }}>
            Documents
          </Typography>
        </Box>

        {/* Document Info */}
        <Typography variant="body2" sx={{ color: "#555", mb: 2 }}>
          You have <strong>{availableDocs}</strong> documents available.
        </Typography>

        {/* Action Button */}
        <Button
          variant="contained"
          size="small"
          startIcon={<DescriptionIcon />}
          onClick={handleNavigate} // Navigate to documents page
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
