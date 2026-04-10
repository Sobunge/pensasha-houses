import React from "react";
import {
  Card,
  CardContent,
  Typography,
  Button,
  Box,
  Divider,
  CircularProgress,
  Stack,
} from "@mui/material";
import DescriptionIcon from "@mui/icons-material/Description";
import FolderSharedIcon from "@mui/icons-material/FolderShared"; 
import { useNavigate } from "react-router-dom";
import { useDocumentCount } from "../../components/hooks/useDocumentCount";

function DocumentsCard({ userId }) {
  const navigate = useNavigate();
  const { count: docCount, loading, error } = useDocumentCount(userId);

  return (
    <Card
      elevation={0}
      sx={{
        flex: { xs: "1 1 100%", md: "1 1 45%", lg: "0 1 400px" },
        minWidth: { xs: "100%", sm: "320px" }, // Maintains standard width across all cards
        borderRadius: 4,
        border: "1px solid",
        borderColor: "divider",
        display: "flex",
        flexDirection: "column",
        transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
        "&:hover": { 
          boxShadow: "0 12px 40px rgba(0,0,0,0.08)", 
          transform: "translateY(-5px)" 
        },
      }}
    >
      {/* Header */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 1.5,
          p: 2,
          bgcolor: "rgba(248, 181, 0, 0.04)",
          borderBottom: "1px solid",
          borderColor: "divider",
        }}
      >
        <DescriptionIcon sx={{ color: "#f8b500" }} />
        <Typography variant="subtitle1" fontWeight={800} color="text.primary">
          Documents
        </Typography>
      </Box>

      {/* Main Content Area */}
      <CardContent
        sx={{
          p: 4,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          flexGrow: 1,
          minHeight: 160,
        }}
      >
        {loading ? (
          <Stack alignItems="center" spacing={1.5}>
            <CircularProgress size={28} sx={{ color: "#f8b500" }} />
            <Typography variant="body2" color="text.secondary" fontWeight={500}>
              Syncing files...
            </Typography>
          </Stack>
        ) : error ? (
          <Typography variant="body2" color="error.main" fontWeight={600}>
            Connection failed. Please retry.
          </Typography>
        ) : (
          <Box textAlign="center">
            <Typography variant="h3" fontWeight={900} sx={{ color: "#1a1a1a", lineHeight: 1 }}>
              {docCount || 0}
            </Typography>
            <Typography variant="body2" color="text.secondary" fontWeight={600} sx={{ mt: 1, textTransform: 'uppercase', letterSpacing: 0.5 }}>
              Available Document{docCount !== 1 ? "s" : ""}
            </Typography>
          </Box>
        )}
      </CardContent>

      <Divider sx={{ borderStyle: "dashed", opacity: 0.6 }} />

      {/* Footer Action - Responsive Aligned */}
      <Box
        sx={{
          p: 2,
          display: "flex",
          justifyContent: { xs: "center", sm: "flex-end" }, // Centers button for easier tapping on mobile
        }}
      >
        <Button
          variant="contained"
          startIcon={<FolderSharedIcon />}
          onClick={() => navigate("/tenant/documents")}
          disabled={loading || error}
          sx={{
            bgcolor: "#f8b500",
            color: "#000000",
            textTransform: "none",
            fontWeight: 900,
            fontSize: { xs: "0.825rem", sm: "0.875rem" }, // Slightly smaller font on mobile
            px: { xs: 2, sm: 3 },
            py: 1.2,
            borderRadius: 2.5,
            width: { xs: "100%", sm: "auto" }, // Expands to full width on small screens
            boxShadow: "0 4px 12px 0 rgba(248, 181, 0, 0.25)",
            "& .MuiButton-startIcon": {
              color: "#000000",
            },
            "&:hover": { 
              bgcolor: "#eab000", 
              boxShadow: "0 6px 16px rgba(248, 181, 0, 0.4)",
              transform: "translateY(-1px)",
            },
            "&.Mui-disabled": {
              bgcolor: "action.disabledBackground"
            },
            transition: "all 0.2s ease-in-out"
          }}
        >
          View Document Vault
        </Button>
      </Box>
    </Card>
  );
}

export default DocumentsCard;