// src/components/Profile/ProfileDocuments.jsx
import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  IconButton,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  MenuItem,
  Select,
  FormControl,
  Stack,
  Divider,
  Skeleton,
  Alert,
  CircularProgress
} from "@mui/material";
import {
  PictureAsPdf as PictureAsPdfIcon,
  Download as DownloadIcon,
  DeleteOutline as DeleteOutlineIcon,
  UploadFile as UploadFileIcon,
  CheckCircleOutline as CheckCircleOutlineIcon,
  Close as CloseIcon,
  CancelOutlined as CancelOutlinedIcon,
} from "@mui/icons-material";
import useDocuments from "../../../components/hooks/useDocuments";

// Import DocumentGlobal and helper methods
import DocumentGlobal from "../../DocumentPage/DocumentGlobal"; 

// 2 MB Size Configuration
const MAX_FILE_SIZE_MB = 2;
const MAX_FILE_SIZE_BYTES = MAX_FILE_SIZE_MB * 1024 * 1024;

export default function ProfileDocuments({ openDialog, setOpenDialog, role }) {
  const [selectedDocType, setSelectedDocType] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [actionLoadingId, setActionLoadingId] = useState(null);

  // Dynamically derive allowed document types using role scope
  const availableDocTypes = DocumentGlobal.getDocumentTypesByRole(role);

  const {
    documents,
    loading,
    uploading,
    fetchDocuments,
    uploadDocument,
    deleteDocument,
    downloadDocument,
  } = useDocuments();

  useEffect(() => {
    fetchDocuments();
  }, [fetchDocuments]);

  const handleCloseDialog = () => {
    setErrorMessage("");
    setSelectedDocType("");
    setOpenDialog(false);
  };

  const handleFileUpload = async (e) => {
    setErrorMessage("");
    const file = e.target.files[0];

    if (!file) return;

    if (!selectedDocType) {
      setErrorMessage("Please select a document type first.");
      e.target.value = "";
      return;
    }

    // Client-side 2 MB validation check
    if (file.size > MAX_FILE_SIZE_BYTES) {
      setErrorMessage(`File size exceeds the maximum limit of ${MAX_FILE_SIZE_MB} MB.`);
      e.target.value = "";
      return;
    }

    const activeRole = role || "USER";

    try {
      await uploadDocument(file, selectedDocType, activeRole);
      setSelectedDocType("");
      e.target.value = ""; 
      await fetchDocuments();
      handleCloseDialog();
    } catch (err) {
      console.error("Upload failed:", err);
      setErrorMessage(err.message || "Failed to upload document. Please try again.");
      e.target.value = "";
    }
  };

  const handleDelete = async (docId) => {
    try {
      setActionLoadingId(docId);
      await deleteDocument(docId, role || "USER");
      await fetchDocuments();
    } catch (err) {
      console.error("Delete failed:", err);
    } finally {
      setActionLoadingId(null);
    }
  };

  const handleDownload = async (doc) => {
    try {
      setActionLoadingId(doc.id);
      await downloadDocument(doc, role || "USER");
    } catch (err) {
      console.error("Download failed:", err);
    } finally {
      setActionLoadingId(null);
    }
  };

  const safeDocuments = Array.isArray(documents) ? documents : [];

  return (
    <Box
      sx={(theme) => ({
        bgcolor: theme.palette.background.paper,
        borderRadius: `${theme.shape.borderRadius * 2}px`,
        p: { xs: 1.5, sm: 2 },
        border: `1px solid ${theme.palette.divider}`,
        boxShadow: `0 10px 30px -10px ${theme.palette.primary.main}14`,
        background: `linear-gradient(180deg, ${theme.palette.background.paper} 0%, ${theme.palette.action.hover} 100%)`,
      })}
    >
      {loading ? (
        <Stack spacing={1}>
          <Skeleton variant="rectangular" width="100%" height={52} sx={(theme) => ({ borderRadius: `${theme.shape.borderRadius}px` })} />
          <Skeleton variant="rectangular" width="100%" height={52} sx={(theme) => ({ borderRadius: `${theme.shape.borderRadius}px` })} />
        </Stack>
      ) : safeDocuments.length === 0 ? (
        <Box
          sx={(theme) => ({
            py: 3.5,
            px: 2,
            textAlign: "center",
            border: `1.5px dashed ${theme.palette.secondary.main}66`,
            borderRadius: `${theme.shape.borderRadius * 1.5}px`,
            bgcolor: `${theme.palette.secondary.main}0A`,
          })}
        >
          <PictureAsPdfIcon
            sx={(theme) => ({
              fontSize: 38,
              color: theme.palette.secondary.main,
              mb: 0.5,
              opacity: 0.9,
            })}
          />
          <Typography fontWeight={700} variant="body2" sx={(theme) => ({ color: theme.palette.primary.main, fontSize: "0.875rem" })}>
            No Documents Uploaded
          </Typography>
          <Typography variant="caption" sx={(theme) => ({ color: theme.palette.text.secondary, mt: 0.2, display: "block", fontSize: "0.75rem" })}>
            {role ? `Vault is empty for ${role.toLowerCase()} records.` : "Vault is empty."}
          </Typography>
        </Box>
      ) : (
        <List sx={{ p: 0, display: "flex", flexDirection: "column", gap: 1 }}>
          {safeDocuments.map((doc) => {
            const isProcessing = actionLoadingId === doc.id;
            return (
              <ListItem
                key={doc.id}
                sx={(theme) => ({
                  borderRadius: `${theme.shape.borderRadius * 1.5}px`,
                  bgcolor: theme.palette.background.paper,
                  border: `1px solid ${theme.palette.divider}`,
                  py: 1.2,
                  px: 1.5,
                  transition: "all 0.25s cubic-bezier(0.4, 0, 0.2, 1)",
                  "&:hover": {
                    borderColor: `${theme.palette.secondary.main}80`,
                    boxShadow: `0 6px 16px ${theme.palette.secondary.main}20`,
                    transform: "translateY(-1px)",
                    "& .doc-icon-box": {
                      background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, #1E293B 100%)`,
                      color: theme.palette.secondary.main,
                    },
                  },
                })}
                secondaryAction={
                  <Stack direction="row" spacing={0.8}>
                    <IconButton
                      aria-label="download"
                      size="small"
                      disabled={isProcessing}
                      onClick={() => handleDownload(doc)}
                      sx={(theme) => ({
                        width: 32,
                        height: 32,
                        color: theme.palette.primary.main,
                        bgcolor: theme.palette.action.hover,
                        "&:hover": {
                          bgcolor: theme.palette.primary.main,
                          color: theme.palette.secondary.main,
                        },
                        transition: "all 0.2s ease",
                      })}
                    >
                      {isProcessing ? <CircularProgress size={14} color="inherit" /> : <DownloadIcon sx={{ fontSize: 16 }} />}
                    </IconButton>
                    <IconButton
                      aria-label="delete"
                      size="small"
                      disabled={isProcessing}
                      onClick={() => handleDelete(doc.id)}
                      sx={(theme) => ({
                        width: 32,
                        height: 32,
                        color: theme.palette.error?.main || "#EF4444",
                        bgcolor: `${theme.palette.error?.main || "#EF4444"}14`,
                        "&:hover": {
                          bgcolor: theme.palette.error?.main || "#EF4444",
                          color: theme.palette.common.white,
                        },
                        transition: "all 0.2s ease",
                      })}
                    >
                      <DeleteOutlineIcon sx={{ fontSize: 16 }} />
                    </IconButton>
                  </Stack>
                }
              >
                <ListItemIcon sx={{ minWidth: 44 }}>
                  <Box
                    className="doc-icon-box"
                    sx={(theme) => ({
                      width: 34,
                      height: 34,
                      borderRadius: `${theme.shape.borderRadius}px`,
                      bgcolor: `${theme.palette.secondary.main}1A`,
                      color: theme.palette.secondary.main,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      transition: "all 0.25s ease",
                    })}
                  >
                    <PictureAsPdfIcon sx={{ fontSize: 18 }} />
                  </Box>
                </ListItemIcon>
                <ListItemText
                  primary={DocumentGlobal.getLabel(doc.documentType)}
                  secondary={doc.fileName || "Uploaded File"}
                  primaryTypographyProps={{
                    fontWeight: 700,
                    color: "text.primary",
                    fontSize: "0.85rem",
                    lineHeight: 1.2,
                  }}
                  secondaryTypographyProps={{
                    color: "text.secondary",
                    fontSize: "0.75rem",
                    lineHeight: 1.3,
                  }}
                />
              </ListItem>
            );
          })}
        </List>
      )}

      {/* UPLOAD DIALOG */}
      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        maxWidth="sm"
        fullWidth
        PaperProps={{
          sx: (theme) => ({
            borderRadius: `${theme.shape.borderRadius * 2}px`,
            border: `1px solid ${theme.palette.secondary.main}66`,
            boxShadow: `0 20px 40px ${theme.palette.primary.main}33`,
            bgcolor: theme.palette.background.paper,
          }),
        }}
      >
        <DialogTitle
          sx={(theme) => ({
            fontWeight: 800,
            textAlign: { xs: "center", md: "center" },
            px: 4,
            py: 2,
            color: theme.palette.primary.main,
            borderBottom: `1px solid ${theme.palette.divider}`,
            position: "relative",
            fontSize: "1.1rem",
          })}
        >
          Upload Document {role ? `as ${role.toLowerCase()}` : ""}
          <IconButton
            aria-label="close"
            onClick={handleCloseDialog}
            sx={(theme) => ({
              position: "absolute",
              right: 12,
              top: 10,
              color: theme.palette.text.secondary,
              "&:hover": { color: theme.palette.error?.main || "#EF4444" },
            })}
          >
            <CloseIcon sx={{ fontSize: 20 }} />
          </IconButton>
        </DialogTitle>

        <DialogContent sx={{ p: { xs: 2, sm: 2.5 } }}>
          <Stack spacing={2} mt={0.5}>
            {errorMessage && (
              <Alert severity="error" onClose={() => setErrorMessage("")} sx={(theme) => ({ borderRadius: `${theme.shape.borderRadius}px`, fontSize: "0.8rem" })}>
                {errorMessage}
              </Alert>
            )}

            <FormControl fullWidth size="small">
              <Select
                value={selectedDocType}
                onChange={(e) => setSelectedDocType(e.target.value)}
                displayEmpty
                sx={(theme) => ({
                  borderRadius: `${theme.shape.borderRadius}px`,
                  fontWeight: 600,
                  fontSize: "0.85rem",
                  color: theme.palette.primary.main,
                  "& .MuiOutlinedInput-notchedOutline": {
                    borderColor: theme.palette.divider,
                  },
                  "&:hover .MuiOutlinedInput-notchedOutline": {
                    borderColor: theme.palette.secondary.main,
                  },
                  "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                    borderColor: theme.palette.secondary.main,
                  },
                })}
              >
                <MenuItem value="" disabled sx={{ fontSize: "0.85rem" }}>
                  Select document type
                </MenuItem>
                {availableDocTypes.map((docTypeObj) => (
                  <MenuItem
                    key={docTypeObj.value}
                    value={docTypeObj.value}
                    disabled={safeDocuments.some((d) => d.documentType === docTypeObj.value)}
                    sx={{ fontWeight: 600, py: 1, fontSize: "0.85rem" }}
                  >
                    {docTypeObj.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <Button
              variant="contained"
              component="label"
              startIcon={
                uploading ? (
                  <CircularProgress size={18} color="inherit" />
                ) : (
                  <UploadFileIcon sx={{ color: "#D4AF37", fontSize: 18 }} />
                )
              }
              disabled={!selectedDocType || uploading}
              sx={(theme) => ({
                bgcolor: theme.palette.primary.main,
                color: theme.palette.primary.contrastText,
                fontWeight: 700,
                fontSize: "0.825rem",
                py: 1,
                borderRadius: `${theme.shape.borderRadius}px`,
                textTransform: "none",
                boxShadow: `0 4px 12px ${theme.palette.primary.main}26`,
                "&:hover": {
                  bgcolor: "#1E293B",
                  color: theme.palette.primary.contrastText,
                },
                "&.Mui-disabled": {
                  bgcolor: theme.palette.action.hover,
                  color: theme.palette.text.disabled,
                },
                transition: "all 0.2s ease",
              })}
            >
              {uploading ? "Uploading..." : "Select a PDF to Upload (Max 2MB)"}
              <input
                type="file"
                hidden
                accept="application/pdf"
                onClick={(e) => {
                  e.target.value = null;
                }}
                onChange={handleFileUpload}
              />
            </Button>
          </Stack>
        </DialogContent>

        <Divider sx={(theme) => ({ borderColor: theme.palette.divider })} />

        <DialogActions sx={(theme) => ({ px: 2.5, py: 1.5, justifyContent: { xs: "center", md: "flex-end" }, gap: 1.2 })}>
          <Button
            onClick={handleCloseDialog}
            startIcon={<CancelOutlinedIcon sx={{ fontSize: "18px !important" }} />}
            sx={(theme) => ({
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
            })}
          >
            Cancel
          </Button>

          <Button
            onClick={handleCloseDialog}
            variant="contained"
            startIcon={<CheckCircleOutlineIcon sx={{ fontSize: 18 }} />}
            sx={(theme) => ({
              bgcolor: theme.palette.primary.main,
              color: theme.palette.primary.contrastText,
              fontWeight: 700,
              fontSize: "0.8rem",
              textTransform: "none",
              borderRadius: `${theme.shape.borderRadius}px`,
              px: 3,
              py: 0.6,
              boxShadow: `0 4px 12px ${theme.palette.primary.main}26`,
              "& .MuiButton-startIcon": { color: theme.palette.secondary.main },
              "&:hover": {
                bgcolor: theme.palette.secondary.main,
                color: theme.palette.primary.main,
                boxShadow: `0 6px 18px ${theme.palette.secondary.main}59`,
                "& .MuiButton-startIcon": { color: theme.palette.primary.main },
              },
              transition: "all 0.2s ease",
            })}
          >
            Done
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}