import React from "react";
import { Card, CardContent, Typography, Button, Box, CircularProgress } from "@mui/material";
import DescriptionIcon from "@mui/icons-material/Description";
import { useNavigate } from "react-router-dom";
import { useDocumentCount } from "../../components/hooks/useDocumentCount";

function DocumentsCard({ userId }) {
  const navigate = useNavigate();
  const { count: docCount, loading, error } = useDocumentCount(userId);

  const handleNavigate = () => {
    navigate("/tenant/documents");
  };

  return (
    <Card sx={{ borderRadius: 3, boxShadow: 2, bgcolor: "#fff" }}>
      <CardContent>
        {/* Title */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1 }}>
          <DescriptionIcon sx={{ color: "#f8b500" }} />
          <Typography variant="subtitle1" sx={{ fontWeight: 600, color: "#111" }}>
            Documents
          </Typography>
        </Box>

        {/* Content */}
        {loading ? (
          <CircularProgress size={20} />
        ) : error ? (
          <Typography variant="body2" sx={{ color: "error.main", mb: 2 }}>
            Unable to load documents
          </Typography>
        ) : (
          <Typography variant="body2" sx={{ color: "#555", mb: 2 }}>
            You have <strong>{docCount}</strong> document{docCount !== 1 ? "s" : ""} available.
          </Typography>
        )}

        {/* Action */}
        <Button
          variant="contained"
          size="small"
          startIcon={<DescriptionIcon />}
          onClick={handleNavigate}
          disabled={loading || error}
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
