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
  useTheme,
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
  const theme = useTheme();
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
          borderRadius: `${theme.shape.borderRadius * 2}px`,
          border: `1.5px solid ${theme.palette.secondary.main}66`,
          boxShadow: `0 20px 40px ${theme.palette.primary.main}2E`,
          p: 0.5,
          background: `linear-gradient(180deg, ${theme.palette.background.paper} 0%, ${theme.palette.action.hover} 100%)`,
          bgcolor: theme.palette.background.paper,
        },
      }}
    >
      {/* ===== Header ===== */}
      <DialogTitle
        sx={{
          pb: 1.5,
          pt: 2,
          px: { xs: 2, sm: 2.5 },
          borderBottom: `1px solid ${theme.palette.divider}`,
          position: "relative",
        }}
      >
        <Stack direction="row" spacing={1.5} alignItems="center">
          <Box
            sx={{
              width: 38,
              height: 38,
              borderRadius: `${theme.shape.borderRadius}px`,
              bgcolor: `${theme.palette.secondary.main}1F`,
              color: theme.palette.secondary.main,
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
              sx={{ fontWeight: 800, color: theme.palette.primary.main, fontSize: "1.05rem", lineHeight: 1.2 }}
            >
              Update Picture
            </Typography>
            <Typography variant="caption" sx={{ color: theme.palette.text.secondary, fontWeight: 600, fontSize: "0.75rem" }}>
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
            color: theme.palette.text.secondary,
            "&:hover": { bgcolor: theme.palette.action.hover, color: theme.palette.error?.main || "#EF4444" },
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
              background: `linear-gradient(135deg, ${theme.palette.secondary.main} 0%, ${theme.palette.primary.main} 100%)`,
              boxShadow: `0 8px 20px ${theme.palette.primary.main}26`,
            }}
          >
            <Avatar
              src={currentPicture}
              sx={{
                width: 100,
                height: 100,
                bgcolor: theme.palette.background.paper,
                color: theme.palette.primary.main,
                fontWeight: 800,
                fontSize: 36,
                border: `3px solid ${theme.palette.background.paper}`,
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
              borderColor: `${theme.palette.primary.main}26`,
              color: theme.palette.primary.main,
              fontWeight: 700,
              fontSize: "0.825rem",
              textTransform: "none",
              borderRadius: `${theme.shape.borderRadius}px`,
              px: 2.5,
              py: 0.8,
              bgcolor: theme.palette.background.paper,
              boxShadow: `0 2px 6px ${theme.palette.primary.main}08`,
              "& .MuiButton-startIcon": { color: theme.palette.secondary.main },
              "&:hover": {
                borderColor: theme.palette.secondary.main,
                bgcolor: `${theme.palette.secondary.main}0D`,
                color: theme.palette.primary.main,
                boxShadow: `0 4px 12px ${theme.palette.secondary.main}26`,
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
                color: theme.palette.primary.main,
                fontWeight: 600,
                fontSize: "0.75rem",
                bgcolor: theme.palette.action.hover,
                px: 1.5,
                py: 0.5,
                borderRadius: `${theme.shape.borderRadius * 0.75}px`,
                maxWidth: "100%",
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
              }}
            >
              Selected: {selectedFile.name}
            </Typography>
          ) : (
            <Typography variant="caption" sx={{ color: theme.palette.text.disabled, fontWeight: 500, fontSize: "0.725rem" }}>
              Supports JPG, PNG or WEBP (Max 2MB)
            </Typography>
          )}
        </Stack>
      </DialogContent>

      <Divider sx={{ borderColor: theme.palette.divider }} />

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
            bgcolor: `${theme.palette.error?.main || "#EF4444"}14`,
            color: theme.palette.error?.main || "#EF4444",
            borderRadius: `${theme.shape.borderRadius}px`,
            px: 2.5,
            py: 0.6,
            fontWeight: 700,
            fontSize: "0.825rem",
            textTransform: "none",
            "& .MuiButton-startIcon": { color: theme.palette.error?.main || "#EF4444" },
            "&:hover": {
              bgcolor: theme.palette.error?.main || "#EF4444",
              color: theme.palette.common.white,
              "& .MuiButton-startIcon": { color: theme.palette.common.white },
              boxShadow: `0 4px 12px ${theme.palette.error?.main || "#EF4444"}40`,
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
            bgcolor: theme.palette.primary.main,
            color: theme.palette.primary.contrastText,
            borderRadius: `${theme.shape.borderRadius}px`,
            px: 3,
            py: 0.6,
            fontWeight: 700,
            fontSize: "0.825rem",
            textTransform: "none",
            boxShadow: `0 4px 12px ${theme.palette.primary.main}26`,
            transition: "all 0.2s ease",
            "& .MuiButton-startIcon": { color: theme.palette.secondary.main },
            "&:hover": {
              bgcolor: theme.palette.secondary.main,
              color: theme.palette.primary.main,
              boxShadow: `0 6px 18px ${theme.palette.secondary.main}59`,
              "& .MuiButton-startIcon": { color: theme.palette.primary.main },
            },
            "&.Mui-disabled": {
              bgcolor: theme.palette.action.hover,
              color: theme.palette.text.disabled,
              "& .MuiButton-startIcon": { color: theme.palette.divider },
            },
          }}
        >
          {uploading ? "Uploading..." : "Save"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}