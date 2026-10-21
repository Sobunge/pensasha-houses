// src/components/Profile/ChangeProfilePicDialog.jsx
import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Avatar,
  Stack,
  Typography,
  Box,
  IconButton,
  Divider,
  CircularProgress,
} from "@mui/material";
import PhotoCameraIcon from "@mui/icons-material/PhotoCamera";
import SaveOutlinedIcon from "@mui/icons-material/SaveOutlined";
import CloseIcon from "@mui/icons-material/Close";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import UploadFileOutlinedIcon from "@mui/icons-material/UploadFileOutlined";

import useChangeProfilePic from "../../components/hooks/profile/useChangeProfilePic";

export default function ChangeProfilePicDialog({
  open,
  handleClose,
  user,
  onSave,
  refreshProfile,
}) {
  const {
    selectedFile,
    currentPicture,
    avatarInitial,
    uploading,
    handleFileChange,
    handleSave,
    resetAndClose,
  } = useChangeProfilePic({ user, onSave, handleClose, refreshProfile });

  return (
    <Dialog
      open={open}
      onClose={resetAndClose}
      fullWidth
      maxWidth="xs"
      PaperProps={{
        sx: {
          borderRadius: "16px",
          border: "1px solid rgba(212, 175, 55, 0.4)",
          boxShadow: "0 20px 40px rgba(15, 23, 42, 0.18)",
          p: 0.5,
          background: "linear-gradient(180deg, #FFFFFF 0%, #F8FAFC 100%)",
        },
      }}
    >
      {/* ===== Header ===== */}
      <DialogTitle
        sx={{
          pb: 1.5,
          pt: 2,
          px: { xs: 2, sm: 2.5 },
          borderBottom: "1px solid #F1F5F9",
          position: "relative",
        }}
      >
        <Stack direction="row" spacing={1.5} alignItems="center">
          <Box
            sx={{
              width: 38,
              height: 38,
              borderRadius: "10px",
              bgcolor: "rgba(212, 175, 55, 0.12)",
              color: "#D4AF37",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
            }}
          >
            <PhotoCameraIcon sx={{ fontSize: 20 }} />
          </Box>
          <Box>
            <Typography
              variant="h6"
              sx={{ fontWeight: 800, color: "#0F172A", fontSize: "1.05rem", lineHeight: 1.2 }}
            >
              Update Picture
            </Typography>
            <Typography variant="caption" sx={{ color: "#64748B", fontWeight: 600, fontSize: "0.75rem" }}>
              Upload a new profile picture or avatar
            </Typography>
          </Box>
        </Stack>

        <IconButton
          aria-label="close"
          onClick={resetAndClose}
          disabled={uploading}
          size="small"
          sx={{
            position: "absolute",
            right: 12,
            top: 12,
            color: "#64748B",
            "&:hover": { bgcolor: "#F1F5F9", color: "#EF4444" },
          }}
        >
          <CloseIcon fontSize="small" />
        </IconButton>
      </DialogTitle>

      {/* ===== Content ===== */}
      <DialogContent sx={{ px: { xs: 2, sm: 2.5 }, py: 3 }}>
        <Stack spacing={2.5} alignItems="center">
          {/* Avatar Preview with Gold Border Frame */}
          <Box
            sx={{
              p: "3px",
              borderRadius: "50%",
              background: "linear-gradient(135deg, #D4AF37 0%, #0F172A 100%)",
              boxShadow: "0 8px 20px rgba(15, 23, 42, 0.15)",
            }}
          >
            <Avatar
              src={currentPicture}
              sx={{
                width: 100,
                height: 100,
                bgcolor: "#FFFFFF",
                color: "#0F172A",
                fontWeight: 800,
                fontSize: 36,
                border: "3px solid #FFFFFF",
              }}
            >
              {!currentPicture && avatarInitial}
            </Avatar>
          </Box>

          {/* Upload Button Box */}
          <Button
            variant="outlined"
            component="label"
            disabled={uploading}
            startIcon={<UploadFileOutlinedIcon sx={{ fontSize: "18px !important" }} />}
            sx={{
              borderColor: "rgba(15, 23, 42, 0.15)",
              color: "#0F172A",
              fontWeight: 700,
              fontSize: "0.825rem",
              textTransform: "none",
              borderRadius: "8px",
              px: 2.5,
              py: 0.8,
              bgcolor: "#FFFFFF",
              boxShadow: "0 2px 6px rgba(15, 23, 42, 0.03)",
              "& .MuiButton-startIcon": { color: "#D4AF37" },
              "&:hover": {
                borderColor: "#D4AF37",
                bgcolor: "rgba(212, 175, 55, 0.05)",
                color: "#0F172A",
                boxShadow: "0 4px 12px rgba(212, 175, 55, 0.15)",
              },
              transition: "all 0.2s ease",
            }}
          >
            Choose Image File
            <input type="file" hidden accept="image/*" onChange={handleFileChange} />
          </Button>

          {selectedFile ? (
            <Typography
              variant="caption"
              sx={{
                color: "#0F172A",
                fontWeight: 600,
                fontSize: "0.75rem",
                bgcolor: "#F1F5F9",
                px: 1.5,
                py: 0.5,
                borderRadius: "6px",
                maxWidth: "100%",
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
              }}
            >
              Selected: {selectedFile.name}
            </Typography>
          ) : (
            <Typography variant="caption" sx={{ color: "#94A3B8", fontWeight: 500, fontSize: "0.725rem" }}>
              Supports JPG, PNG or WEBP (Max 2MB)
            </Typography>
          )}
        </Stack>
      </DialogContent>

      <Divider sx={{ borderColor: "#F1F5F9" }} />

      {/* ===== Actions ===== */}
      <DialogActions
        sx={{
          px: { xs: 2, sm: 2.5 },
          py: 1.5,
          justifyContent: { xs: "center", md: "flex-end" },
          gap: 1.2,
        }}
      >
        <Button
          onClick={resetAndClose}
          disabled={uploading}
          startIcon={<CancelOutlinedIcon sx={{ fontSize: "18px !important" }} />}
          sx={{
            bgcolor: "rgba(239, 68, 68, 0.08)",
            color: "#EF4444",
            borderRadius: "8px",
            px: 2.5,
            py: 0.6,
            fontWeight: 700,
            fontSize: "0.825rem",
            textTransform: "none",
            "& .MuiButton-startIcon": { color: "#EF4444" },
            "&:hover": {
              bgcolor: "#EF4444",
              color: "#FFFFFF",
              "& .MuiButton-startIcon": { color: "#FFFFFF" },
              boxShadow: "0 4px 12px rgba(239, 68, 68, 0.25)",
            },
            transition: "all 0.2s ease",
          }}
        >
          Cancel
        </Button>

        <Button
          size="small"
          onClick={handleSave}
          variant="contained"
          disabled={!selectedFile || uploading}
          startIcon={
            uploading ? (
              <CircularProgress size={16} color="inherit" />
            ) : (
              <SaveOutlinedIcon sx={{ fontSize: "18px !important" }} />
            )
          }
          sx={{
            bgcolor: "#0F172A",
            color: "#FFFFFF",
            borderRadius: "8px",
            px: 3,
            py: 0.6,
            fontWeight: 700,
            fontSize: "0.825rem",
            textTransform: "none",
            boxShadow: "0 4px 12px rgba(15, 23, 42, 0.15)",
            transition: "all 0.2s ease",
            "& .MuiButton-startIcon": { color: "#D4AF37" },
            "&:hover": {
              bgcolor: "#D4AF37",
              color: "#0F172A",
              boxShadow: "0 6px 18px rgba(212, 175, 55, 0.35)",
              "& .MuiButton-startIcon": { color: "#0F172A" },
            },
            "&.Mui-disabled": {
              bgcolor: "#F1F5F9",
              color: "#94A3B8",
              "& .MuiButton-startIcon": { color: "#CBD5E1" },
            },
          }}
        >
          {uploading ? "Uploading..." : "Save"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}