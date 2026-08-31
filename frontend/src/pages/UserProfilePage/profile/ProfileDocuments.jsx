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
  alpha,
  useTheme,
  CircularProgress
} from "@mui/material";
import {
  PictureAsPdf as PictureAsPdfIcon,
  Download as DownloadIcon,
  DeleteOutline as DeleteOutlineIcon,
  UploadFile as UploadFileIcon,
  CheckCircleOutline as CheckCircleOutlineIcon,
  Close as CloseIcon,
} from "@mui/icons-material";
import useDocuments from "../../../components/hooks/useDocuments";

// Import DocumentGlobal and helper methods
import DocumentGlobal from "../../DocumentPage/DocumentGlobal"; 

// 2 MB Size Configuration
const MAX_FILE_SIZE_MB = 2;
const MAX_FILE_SIZE_BYTES = MAX_FILE_SIZE_MB * 1024 * 1024;

export default function ProfileDocuments({ openDialog, setOpenDialog, role }) {
  const theme = useTheme();
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

  const primaryAccent = theme.palette.primary.main;
  const primaryHover = theme.palette.primary.dark;

  return (
    <Box>
      {loading ? (
        <Stack spacing={1.5}>
          <Skeleton variant="rectangular" width="100%" height={64} sx={{ borderRadius: 3 }} />
          <Skeleton variant="rectangular" width="100%" height={64} sx={{ borderRadius: 3 }} />
        </Stack>
      ) : safeDocuments.length === 0 ? (
        <Box
          sx={{
            py: 5,
            px: 2,
            textAlign: "center",
            border: `1.5px dashed ${alpha(primaryAccent, 0.4)}`,
            borderRadius: 3.5,
            bgcolor: alpha(primaryAccent, 0.02),
          }}
        >
          <PictureAsPdfIcon
            sx={{
              fontSize: 48,
              color: primaryAccent,
              mb: 1,
              opacity: 0.8,
            }}
          />
          <Typography fontWeight={700} variant="body1" sx={{ color: "text.primary" }}>
            No Documents Uploaded
          </Typography>
          <Typography variant="body2" sx={{ color: "text.secondary", mt: 0.5 }}>
            {role ? `Vault is empty for ${role.toLowerCase()} records.` : "Vault is empty."}
          </Typography>
        </Box>
      ) : (
        <List sx={{ p: 0, display: "flex", flexDirection: "column", gap: 1.5 }}>
          {safeDocuments.map((doc) => {
            const isProcessing = actionLoadingId === doc.id;
            return (
              <ListItem
                key={doc.id}
                sx={{
                  borderRadius: 3,
                  bgcolor: "background.paper",
                  border: "1px solid",
                  borderColor: "divider",
                  p: 2,
                  transition: "all 0.2s ease",
                  "&:hover": {
                    borderColor: primaryAccent,
                    bgcolor: alpha(primaryAccent, 0.04),
                    boxShadow: `0 4px 12px ${alpha(primaryAccent, 0.12)}`,
                  },
                }}
                secondaryAction={
                  <Stack direction="row" spacing={1}>
                    <IconButton
                      aria-label="download"
                      size="small"
                      disabled={isProcessing}
                      onClick={() => handleDownload(doc)}
                      sx={{
                        color: "text.primary",
                        bgcolor: alpha(theme.palette.action.active, 0.05),
                        "&:hover": {
                          bgcolor: primaryAccent,
                          color: "#FFFFFF",
                        },
                        transition: "all 0.2s ease",
                      }}
                    >
                      {isProcessing ? <CircularProgress size={16} /> : <DownloadIcon fontSize="small" />}
                    </IconButton>
                    <IconButton
                      aria-label="delete"
                      size="small"
                      disabled={isProcessing}
                      onClick={() => handleDelete(doc.id)}
                      sx={{
                        color: "error.main",
                        bgcolor: alpha(theme.palette.error.main, 0.08),
                        "&:hover": {
                          bgcolor: "error.main",
                          color: "error.contrastText",
                        },
                        transition: "all 0.2s ease",
                      }}
                    >
                      <DeleteOutlineIcon fontSize="small" />
                    </IconButton>
                  </Stack>
                }
              >
                <ListItemIcon sx={{ minWidth: 44 }}>
                  <Box
                    sx={{
                      width: 36,
                      height: 36,
                      borderRadius: 2,
                      bgcolor: alpha(primaryAccent, 0.12),
                      color: primaryAccent,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <PictureAsPdfIcon fontSize="small" />
                  </Box>
                </ListItemIcon>
                <ListItemText
                  primary={DocumentGlobal.getLabel(doc.documentType)}
                  secondary={doc.fileName || "Uploaded File"}
                  primaryTypographyProps={{
                    fontWeight: 700,
                    color: "text.primary",
                    fontSize: "0.9rem",
                  }}
                  secondaryTypographyProps={{
                    color: "text.secondary",
                    fontSize: "0.8rem",
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
            borderRadius: 4,
            border: `1.5px solid ${primaryAccent}`,
            boxShadow: theme.shadows[10],
            bgcolor: "background.paper",
          },
        }}
      >
        <DialogTitle
          sx={{
            fontWeight: 800,
            textAlign: "center",
            px: 6,
            color: "text.primary",
            borderBottom: "1px solid",
            borderColor: "divider",
            py: 2.5,
            position: "relative",
          }}
        >
          Upload Document {role ? `as ${role.toLowerCase()}` : ""}
          <IconButton
            aria-label="close"
            onClick={handleCloseDialog}
            sx={{
              position: "absolute",
              right: 12,
              top: 12,
              color: "text.secondary",
              "&:hover": { color: "text.primary" },
            }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>

        <DialogContent sx={{ py: 3 }}>
          <Stack spacing={3} mt={1}>
            {errorMessage && (
              <Alert severity="error" onClose={() => setErrorMessage("")}>
                {errorMessage}
              </Alert>
            )}

            <FormControl fullWidth>
              <Select
                value={selectedDocType}
                onChange={(e) => setSelectedDocType(e.target.value)}
                displayEmpty
                sx={{
                  borderRadius: 2.5,
                  fontWeight: 600,
                  color: "text.primary",
                  "& .MuiOutlinedInput-notchedOutline": {
                    borderColor: "divider",
                  },
                  "&:hover .MuiOutlinedInput-notchedOutline": {
                    borderColor: primaryAccent,
                  },
                  "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                    borderColor: primaryAccent,
                  },
                }}
              >
                <MenuItem value="" disabled>
                  Select document type
                </MenuItem>
                {availableDocTypes.map((docTypeObj) => (
                  <MenuItem
                    key={docTypeObj.value}
                    value={docTypeObj.value}
                    disabled={safeDocuments.some((d) => d.documentType === docTypeObj.value)}
                    sx={{ fontWeight: 600, py: 1.2 }}
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
                  <CircularProgress size={20} color="inherit" />
                ) : (
                  <UploadFileIcon sx={{ color: "#FFFFFF" }} />
                )
              }
              disabled={!selectedDocType || uploading}
              sx={{
                bgcolor: primaryAccent,
                color: "#FFFFFF",
                fontWeight: 700,
                py: 1.5,
                borderRadius: 2.5,
                textTransform: "none",
                boxShadow: theme.shadows[2],
                "&:hover": {
                  bgcolor: primaryHover,
                  color: "#FFFFFF",
                },
                "&.Mui-disabled": {
                  bgcolor: "action.disabledBackground",
                  color: "action.disabled",
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

        <Divider sx={{ borderColor: "divider" }} />

        <DialogActions sx={{ px: 3, py: 2 }}>
          <Button
            onClick={handleCloseDialog}
            variant="contained"
            color="success"
            startIcon={<CheckCircleOutlineIcon />}
            sx={{
              fontWeight: 700,
              textTransform: "none",
              borderRadius: 2,
              px: 3,
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