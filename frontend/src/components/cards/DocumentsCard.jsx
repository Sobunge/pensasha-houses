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
import { useDocumentCount } from "../hooks/useDocumentCount";

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
      sx={(theme) => ({
        flex: { xs: "1 1 100%", md: "1 1 45%", lg: "0 1 400px" },
        minWidth: { xs: "100%", sm: "320px" },
        borderRadius: `${theme.shape.borderRadius * 2}px`,
        border: `1.5px solid ${theme.palette.secondary.main}`,
        boxShadow: `0 10px 30px ${theme.palette.primary.main}14`,
        bgcolor: theme.palette.background.paper,
        display: "flex",
        flexDirection: "column",
        transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
        "&:hover": {
          boxShadow: `0 14px 36px ${theme.palette.primary.main}1F`,
          transform: "translateY(-4px)",
          borderColor: theme.palette.secondary.dark,
        },
      })}
    >
      {/* Header */}
      <Box
        sx={(theme) => ({
          display: "flex",
          alignItems: "center",
          gap: 1.5,
          p: 2,
          bgcolor: `${theme.palette.secondary.main}0A`,
          borderBottom: `1px solid ${theme.palette.divider}`,
        })}
      >
        <Box
          sx={(theme) => ({
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: 32,
            height: 32,
            borderRadius: `${theme.shape.borderRadius}px`,
            bgcolor: `${theme.palette.secondary.main}1F`,
            color: theme.palette.secondary.main,
          })}
        >
          <DescriptionIcon sx={{ fontSize: 18 }} />
        </Box>
        <Typography
          variant="subtitle1"
          sx={(theme) => ({
            fontWeight: 700,
            color: theme.palette.text.primary,
            fontSize: "1rem",
            letterSpacing: "-0.2px",
          })}
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
            <CircularProgress size={28} sx={(theme) => ({ color: theme.palette.secondary.main })} />
            <Typography
              variant="body2"
              sx={(theme) => ({ color: theme.palette.text.secondary, fontWeight: 500 })}
            >
              Syncing files...
            </Typography>
          </Stack>
        ) : error ? (
          <Typography
            variant="body2"
            sx={(theme) => ({ color: theme.palette.error?.main || "#EF4444", fontWeight: 600 })}
          >
            Connection failed. Please retry.
          </Typography>
        ) : (
          <Box textAlign="center">
            <Typography
              variant="h3"
              sx={(theme) => ({
                fontWeight: 800,
                color: theme.palette.text.primary,
                lineHeight: 1,
                fontSize: { xs: "2.5rem", sm: "3rem" },
              })}
            >
              {docCount || 0}
            </Typography>
            <Typography
              variant="body2"
              sx={(theme) => ({
                mt: 1.5,
                color: theme.palette.text.secondary,
                fontWeight: 700,
                textTransform: "uppercase",
                letterSpacing: "0.8px",
                fontSize: "0.75rem",
              })}
            >
              Available Document{docCount !== 1 ? "s" : ""}
            </Typography>
          </Box>
        )}
      </CardContent>

      <Divider sx={(theme) => ({ borderStyle: "dashed", borderColor: theme.palette.divider })} />

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
          sx={(theme) => ({
            bgcolor: theme.palette.primary.main,
            color: theme.palette.primary.contrastText,
            textTransform: "none",
            fontWeight: 700,
            fontSize: { xs: "0.8125rem", sm: "0.875rem" },
            px: { xs: 2, sm: 3 },
            py: 1.2,
            borderRadius: `${theme.shape.borderRadius}px`,
            width: { xs: "100%", sm: "auto" },
            boxShadow: `0 4px 12px ${theme.palette.primary.main}26`,
            "& .MuiButton-startIcon": {
              color: theme.palette.secondary.main,
            },
            "&:hover": {
              bgcolor: theme.palette.secondary.main,
              color: theme.palette.primary.main,
              boxShadow: `0 6px 16px ${theme.palette.secondary.main}4D`,
              "& .MuiButton-startIcon": {
                color: theme.palette.primary.main,
              },
            },
            "&.Mui-disabled": {
              bgcolor: theme.palette.action.disabledBackground,
              color: theme.palette.action.disabled,
              "& .MuiButton-startIcon": {
                color: theme.palette.action.disabled,
              },
            },
            transition: "all 0.2s ease-in-out",
          })}
        >
          View Document Vault
        </Button>
      </Box>
    </Card>
  );
}

export default DocumentsCard;