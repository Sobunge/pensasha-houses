import React from "react";
import {
  Card,
  CardContent,
  Typography,
  Button,
  Box,
  Divider,
  CircularProgress,
} from "@mui/material";
import DescriptionIcon from "@mui/icons-material/Description";
import { useNavigate } from "react-router-dom";
import { useDocumentCount } from "../../components/hooks/useDocumentCount";

function DocumentsCard({ userId }) {
  const navigate = useNavigate();
  const { count: docCount, loading, error } = useDocumentCount(userId);

  return (
    <Card
      elevation={2}
      sx={{
        width: { xs: "100%", sm: "100%", md: "100%", lg: "auto" },
        minWidth: 400, // minimum width
        borderRadius: 3,
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Card Header */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 1,
          p: { xs: 1.5, sm: 2 },
          borderBottom: 1,
          borderColor: "divider",
          bgcolor: "background.paper",
        }}
      >
        <DescriptionIcon color="warning" />
        <Typography variant="subtitle1" fontWeight={600}>
          Documents
        </Typography>
      </Box>

      {/* Card Content */}
      <CardContent
        sx={{
          p: { xs: 1.5, sm: 2 },
          display: "flex",
          flexDirection: "column",
          gap: 1.5,
          flexGrow: 1,
        }}
      >
        {loading ? (
          <Box
            sx={{
              minHeight: 64,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 1,
            }}
          >
            <CircularProgress size={20} />
            <Typography variant="body2" color="text.secondary">
              Loading documents…
            </Typography>
          </Box>
        ) : error ? (
          <Typography
            variant="body2"
            color="error.main"
            sx={{ textAlign: "center" }}
          >
            Unable to load documents
          </Typography>
        ) : (
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ textAlign: "center" }}
          >
            You have{" "}
            <Box component="span" sx={{ fontWeight: 600, color: "text.primary" }}>
              {docCount}
            </Box>{" "}
            document{docCount !== 1 ? "s" : ""} available.
          </Typography>
        )}
      </CardContent>

      {/* Footer */}
      <Divider />
      <Box
        sx={{
          p: { xs: 1.5, sm: 2 },
          display: "flex",
          justifyContent: { xs: "center", sm: "flex-end" },
        }}
      >
        <Button
          variant="contained"
          size="small"
          startIcon={<DescriptionIcon />}
          onClick={() => navigate("/tenant/documents")}
          disabled={loading || error}
          sx={{
            textTransform: "none",
            fontWeight: 600,
          }}
        >
          View Documents
        </Button>
      </Box>
    </Card>
  );
}

export default DocumentsCard;
