// src/components/DocumentsCard.jsx
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
import DescriptionIcon from "@mui/icons-material/DescriptionOutlined";
import FolderSharedIcon from "@mui/icons-material/FolderSharedOutlined";
import { useNavigate } from "react-router-dom";
import { useDocumentCount } from "../hooks/useDocumentCount"; // Adjusted relative import

function DocumentsCard({ userId, activeRole = "TENANT" }) {
  const navigate = useNavigate();
  const { count: docCount, loading, error } = useDocumentCount(userId, activeRole);

  // Dynamically resolve route base path based on active role context
  const getDocumentRoute = () => {
    const rolePath = activeRole.toLowerCase().replace("role_", "");
    return `/${rolePath}/documents`;
  };

  return (
    <Card
      elevation={0}
      sx={{
        flex: { xs: "1 1 100%", md: "1 1 45%", lg: "0 1 400px" },
        minWidth: { xs: "100%", sm: "320px" },
        borderRadius: "16px",
        border: "1.5px solid #D4AF37", // Pensasha Gold
        boxShadow: "0 10px 30px rgba(15, 23, 42, 0.08)",
        bgcolor: "#FFFFFF",
        display: "flex",
        flexDirection: "column",
        transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
        "&:hover": {
          boxShadow: "0 14px 36px rgba(15, 23, 42, 0.12)",
          transform: "translateY(-4px)",
          borderColor: "#B5922B",
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
          bgcolor: "rgba(212, 175, 55, 0.04)",
          borderBottom: "1px solid #E2E8F0",
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: 32,
            height: 32,
            borderRadius: "8px",
            bgcolor: "rgba(212, 175, 55, 0.12)",
            color: "#D4AF37",
          }}
        >
          <DescriptionIcon sx={{ fontSize: 18 }} />
        </Box>
        <Typography
          variant="subtitle1"
          sx={{
            fontWeight: 700,
            color: "#0F172A",
            fontSize: "1rem",
            letterSpacing: "-0.2px",
          }}
        >
          Document Vault
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
            <CircularProgress size={28} sx={{ color: "#D4AF37" }} />
            <Typography
              variant="body2"
              sx={{ color: "#64748B", fontWeight: 500 }}
            >
              Syncing files...
            </Typography>
          </Stack>
        ) : error ? (
          <Typography
            variant="body2"
            sx={{ color: "#EF4444", fontWeight: 600 }}
          >
            Connection failed. Please retry.
          </Typography>
        ) : (
          <Box textAlign="center">
            <Typography
              variant="h3"
              sx={{
                fontWeight: 800,
                color: "#0F172A",
                lineHeight: 1,
                fontSize: { xs: "2.5rem", sm: "3rem" },
              }}
            >
              {docCount || 0}
            </Typography>
            <Typography
              variant="body2"
              sx={{
                mt: 1.5,
                color: "#64748B",
                fontWeight: 700,
                textTransform: "uppercase",
                letterSpacing: "0.8px",
                fontSize: "0.75rem",
              }}
            >
              Available Document{docCount !== 1 ? "s" : ""}
            </Typography>
          </Box>
        )}
      </CardContent>

      <Divider sx={{ borderStyle: "dashed", borderColor: "#E2E8F0" }} />

      {/* Footer Action */}
      <Box
        sx={{
          p: 2,
          display: "flex",
          justifyContent: { xs: "center", sm: "flex-end" },
        }}
      >
        <Button
          variant="contained"
          startIcon={<FolderSharedIcon />}
          onClick={() => navigate(getDocumentRoute())}
          disabled={loading || error}
          sx={{
            bgcolor: "#0F172A",
            color: "#FFFFFF",
            textTransform: "none",
            fontWeight: 700,
            fontSize: { xs: "0.8125rem", sm: "0.875rem" },
            px: { xs: 2, sm: 3 },
            py: 1.2,
            borderRadius: "10px",
            width: { xs: "100%", sm: "auto" },
            boxShadow: "0 4px 12px rgba(15, 23, 42, 0.15)",
            "& .MuiButton-startIcon": {
              color: "#D4AF37",
            },
            "&:hover": {
              bgcolor: "#D4AF37",
              color: "#0F172A",
              boxShadow: "0 6px 16px rgba(212, 175, 55, 0.3)",
              "& .MuiButton-startIcon": {
                color: "#0F172A",
              },
            },
            "&.Mui-disabled": {
              bgcolor: "#F1F5F9",
              color: "#94A3B8",
              "& .MuiButton-startIcon": {
                color: "#94A3B8",
              },
            },
            transition: "all 0.2s ease-in-out",
          }}
        >
          View Document Vault
        </Button>
      </Box>
    </Card>
  );
}

export default DocumentsCard;