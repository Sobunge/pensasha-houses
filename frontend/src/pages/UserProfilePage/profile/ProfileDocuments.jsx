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
      sx={{
        bgcolor: "#FFFFFF",
        borderRadius: "16px",
        p: { xs: 1.5, sm: 2 },
        border: "1px solid rgba(226, 232, 240, 0.8)",
        boxShadow: "0 10px 30px -10px rgba(15, 23, 42, 0.05)",
        background: "linear-gradient(180deg, #FFFFFF 0%, #F8FAFC 100%)",
      }}
    >
      {loading ? (
        <Stack spacing={1}>
          <Skeleton variant="rectangular" width="100%" height={52} sx={{ borderRadius: "10px" }} />
          <Skeleton variant="rectangular" width="100%" height={52} sx={{ borderRadius: "10px" }} />
        </Stack>
      ) : safeDocuments.length === 0 ? (
        <Box
          sx={{
            py: 3.5,
            px: 2,
            textAlign: "center",
            border: "1.5px dashed rgba(212, 175, 55, 0.4)",
            borderRadius: "12px",
            bgcolor: "rgba(212, 175, 55, 0.02)",
          }}
        >
          <PictureAsPdfIcon
            sx={{
              fontSize: 38,
              color: "#D4AF37",
              mb: 0.5,
              opacity: 0.9,
            }}
          />
          <Typography fontWeight={700} variant="body2" sx={{ color: "#0F172A", fontSize: "0.875rem" }}>
            No Documents Uploaded
          </Typography>
          <Typography variant="caption" sx={{ color: "#64748B", mt: 0.2, display: "block", fontSize: "0.75rem" }}>
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
                sx={{
                  borderRadius: "12px",
                  bgcolor: "#FFFFFF",
                  border: "1px solid #E2E8F0",
                  py: 1.2,
                  px: 1.5,
                  transition: "all 0.25s cubic-bezier(0.4, 0, 0.2, 1)",
                  "&:hover": {
                    borderColor: "rgba(212, 175, 55, 0.5)",
                    boxShadow: "0 6px 16px rgba(212, 175, 55, 0.12)",
                    transform: "translateY(-1px)",
                    "& .doc-icon-box": {
                      background: "linear-gradient(135deg, #0F172A 0%, #1E293B 100%)",
                      color: "#D4AF37",
                    },
                  },
                }}
                secondaryAction={
                  <Stack direction="row" spacing={0.8}>
                    <IconButton
                      aria-label="download"
                      size="small"
                      disabled={isProcessing}
                      onClick={() => handleDownload(doc)}
                      sx={{
                        width: 32,
                        height: 32,
                        color: "#0F172A",
                        bgcolor: "#F1F5F9",
                        "&:hover": {
                          bgcolor: "#0F172A",
                          color: "#D4AF37",
                        },
                        transition: "all 0.2s ease",
                      }}
                    >
                      {isProcessing ? <CircularProgress size={14} color="inherit" /> : <DownloadIcon sx={{ fontSize: 16 }} />}
                    </IconButton>
                    <IconButton
                      aria-label="delete"
                      size="small"
                      disabled={isProcessing}
                      onClick={() => handleDelete(doc.id)}
                      sx={{
                        width: 32,
                        height: 32,
                        color: "#EF4444",
                        bgcolor: "rgba(239, 68, 68, 0.08)",
                        "&:hover": {
                          bgcolor: "#EF4444",
                          color: "#FFFFFF",
                        },
                        transition: "all 0.2s ease",
                      }}
                    >
                      <DeleteOutlineIcon sx={{ fontSize: 16 }} />
                    </IconButton>
                  </Stack>
                }
              >
                <ListItemIcon sx={{ minWidth: 44 }}>
                  <Box
                    className="doc-icon-box"
                    sx={{
                      width: 34,
                      height: 34,
                      borderRadius: "8px",
                      bgcolor: "rgba(212, 175, 55, 0.1)",
                      color: "#B48A1D",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      transition: "all 0.25s ease",
                    }}
                  >
                    <PictureAsPdfIcon sx={{ fontSize: 18 }} />
                  </Box>
                </ListItemIcon>
                <ListItemText
                  primary={DocumentGlobal.getLabel(doc.documentType)}
                  secondary={doc.fileName || "Uploaded File"}
                  primaryTypographyProps={{
                    fontWeight: 700,
                    color: "#0F172A",
                    fontSize: "0.85rem",
                    lineHeight: 1.2,
                  }}
                  secondaryTypographyProps={{
                    color: "#64748B",
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
          sx: {
            borderRadius: "16px",
            border: "1px solid rgba(212, 175, 55, 0.4)",
            boxShadow: "0 20px 40px rgba(15, 23, 42, 0.2)",
            bgcolor: "#FFFFFF",
          },
        }}
      >
        <DialogTitle
          sx={{
            fontWeight: 800,
            textAlign: { xs: "center", md: "center" },
            px: 4,
            py: 2,
            color: "#0F172A",
            borderBottom: "1px solid #F1F5F9",
            position: "relative",
            fontSize: "1.1rem",
          }}
        >
          Upload Document {role ? `as ${role.toLowerCase()}` : ""}
          <IconButton
            aria-label="close"
            onClick={handleCloseDialog}
            sx={{
              position: "absolute",
              right: 12,
              top: 10,
              color: "#64748B",
              "&:hover": { color: "#EF4444" },
            }}
          >
            <CloseIcon sx={{ fontSize: 20 }} />
          </IconButton>
        </DialogTitle>

        <DialogContent sx={{ p: { xs: 2, sm: 2.5 } }}>
          <Stack spacing={2} mt={0.5}>
            {errorMessage && (
              <Alert severity="error" onClose={() => setErrorMessage("")} sx={{ borderRadius: "8px", fontSize: "0.8rem" }}>
                {errorMessage}
              </Alert>
            )}

            <FormControl fullWidth size="small">
              <Select
                value={selectedDocType}
                onChange={(e) => setSelectedDocType(e.target.value)}
                displayEmpty
                sx={{
                  borderRadius: "8px",
                  fontWeight: 600,
                  fontSize: "0.85rem",
                  color: "#0F172A",
                  "& .MuiOutlinedInput-notchedOutline": {
                    borderColor: "#E2E8F0",
                  },
                  "&:hover .MuiOutlinedInput-notchedOutline": {
                    borderColor: "#D4AF37",
                  },
                  "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                    borderColor: "#D4AF37",
                  },
                }}
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
              sx={{
                bgcolor: "#0F172A",
                color: "#FFFFFF",
                fontWeight: 700,
                fontSize: "0.825rem",
                py: 1,
                borderRadius: "8px",
                textTransform: "none",
                boxShadow: "0 4px 12px rgba(15, 23, 42, 0.15)",
                "&:hover": {
                  bgcolor: "#1E293B",
                  color: "#FFFFFF",
                },
                "&.Mui-disabled": {
                  bgcolor: "#F1F5F9",
                  color: "#94A3B8",
                },
                transition: "all 0.2s ease",
              }}
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

        <Divider sx={{ borderColor: "#F1F5F9" }} />

        <DialogActions sx={{ px: 2.5, py: 1.5, justifyContent: { xs: "center", md: "flex-end" }, gap: 1.2 }}>
          <Button
            onClick={handleCloseDialog}
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
            onClick={handleCloseDialog}
            variant="contained"
            startIcon={<CheckCircleOutlineIcon sx={{ fontSize: 18 }} />}
            sx={{
              bgcolor: "#0F172A",
              color: "#FFFFFF",
              fontWeight: 700,
              fontSize: "0.8rem",
              textTransform: "none",
              borderRadius: "8px",
              px: 3,
              py: 0.6,
              boxShadow: "0 4px 12px rgba(15, 23, 42, 0.15)",
              "& .MuiButton-startIcon": { color: "#D4AF37" },
              "&:hover": {
                bgcolor: "#D4AF37",
                color: "#0F172A",
                boxShadow: "0 6px 18px rgba(212, 175, 55, 0.35)",
                "& .MuiButton-startIcon": { color: "#0F172A" },
              },
              transition: "all 0.2s ease",
            }}
          >
            Done
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}