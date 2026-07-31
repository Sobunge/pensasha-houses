// src/pages/profile/profile/ProfileDocuments.jsx
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

export default function ProfileDocuments({ openDialog, setOpenDialog, role }) {
  const documentTypes = ["ID Copy", "Lease Agreement", "Passport", "Utility Bill"];
  const [selectedDocType, setSelectedDocType] = useState("");

  const {
    documents,
    loading,
    uploading,
    fetchDocuments,
    uploadDocument,
    deleteDocument,
    downloadDocument,
  } = useDocuments();

  // 1. Fetch documents immediately on mount
  useEffect(() => {
    fetchDocuments();
  }, [fetchDocuments]);

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file || !selectedDocType || !role) return;
    try {
      await uploadDocument(file, selectedDocType, role);
      setSelectedDocType("");
      e.target.value = "";
      // Refresh list after upload
      fetchDocuments();
    } catch (err) {
      console.error("Upload failed:", err);
    }
  };

  // Ensure documents is always treated as an array to prevent .map crashes
  const safeDocuments = Array.isArray(documents) ? documents : [];

  return (
    <Box>
      {loading ? (
        <Stack spacing={1.5}>
          <Skeleton
            variant="rectangular"
            width="100%"
            height={64}
            sx={{ borderRadius: "12px", bgcolor: "#F1F5F9" }}
          />
          <Skeleton
            variant="rectangular"
            width="100%"
            height={64}
            sx={{ borderRadius: "12px", bgcolor: "#F1F5F9" }}
          />
        </Stack>
      ) : safeDocuments.length === 0 ? (
        <Box
          sx={{
            py: 5,
            px: 2,
            textAlign: "center",
            border: "1.5px dashed rgba(212, 175, 55, 0.4)",
            borderRadius: "14px",
            bgcolor: "#F8FAFC",
          }}
        >
          <PictureAsPdfIcon sx={{ fontSize: 48, color: "#D4AF37", mb: 1, opacity: 0.8 }} />
          <Typography fontWeight={700} sx={{ color: "#0F172A", fontSize: "0.95rem" }}>
            No Documents Uploaded
          </Typography>
          <Typography variant="body2" sx={{ color: "#64748B", mt: 0.5 }}>
            {role ? `Vault is empty for ${role.toLowerCase()} records.` : "Vault is empty."}
          </Typography>
        </Box>
      ) : (
        <List sx={{ p: 0, display: "flex", flexDirection: "column", gap: 1.5 }}>
          {safeDocuments.map((doc) => (
            <ListItem
              key={doc.id}
              sx={{
                borderRadius: "12px",
                bgcolor: "#FFFFFF",
                border: "1px solid #E2E8F0",
                p: 2,
                transition: "all 0.2s ease",
                "&:hover": {
                  borderColor: "#D4AF37",
                  bgcolor: "rgba(212, 175, 55, 0.03)",
                  boxShadow: "0 4px 12px rgba(212, 175, 55, 0.1)",
                },
              }}
              secondaryAction={
                <Stack direction="row" spacing={1}>
                  <IconButton
                    aria-label="download"
                    size="small"
                    onClick={() => downloadDocument(doc, role)}
                    sx={{
                      color: "#0F172A",
                      bgcolor: "#F1F5F9",
                      "&:hover": { bgcolor: "#D4AF37", color: "#0F172A" },
                      transition: "all 0.2s ease",
                    }}
                  >
                    <DownloadIcon fontSize="small" />
                  </IconButton>
                  <IconButton
                    aria-label="delete"
                    size="small"
                    onClick={() => deleteDocument(doc.id, role)}
                    sx={{
                      color: "#EF4444",
                      bgcolor: "#FEF2F2",
                      "&:hover": { bgcolor: "#EF4444", color: "#FFFFFF" },
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
                    borderRadius: "8px",
                    bgcolor: "rgba(212, 175, 55, 0.12)",
                    color: "#D4AF37",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <PictureAsPdfIcon fontSize="small" />
                </Box>
              </ListItemIcon>
              <ListItemText
                primary={doc.documentType}
                secondary={doc.fileName || "Uploaded File"}
                primaryTypographyProps={{
                  fontWeight: 700,
                  color: "#0F172A",
                  fontSize: "0.9rem",
                }}
                secondaryTypographyProps={{
                  color: "#64748B",
                  fontSize: "0.8rem",
                }}
              />
            </ListItem>
          ))}
        </List>
      )}

      {/* UPLOAD DIALOG */}
      <Dialog
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        maxWidth="sm"
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: "16px",
            border: "1.5px solid #D4AF37",
            boxShadow: "0 20px 40px rgba(15, 23, 42, 0.2)",
          },
        }}
      >
        <DialogTitle
          sx={{
            fontWeight: 800,
            pr: 6,
            color: "#0F172A",
            borderBottom: "1px solid #E2E8F0",
            py: 2.5,
          }}
        >
          Upload Document {role ? `as ${role.toLowerCase()}` : ""}
          <IconButton
            aria-label="close"
            onClick={() => setOpenDialog(false)}
            sx={{
              position: "absolute",
              right: 12,
              top: 12,
              color: "#64748B",
              "&:hover": { color: "#0F172A" },
            }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>

        <DialogContent sx={{ py: 3 }}>
          <Stack spacing={3} mt={1}>
            <FormControl fullWidth>
              <Select
                value={selectedDocType}
                onChange={(e) => setSelectedDocType(e.target.value)}
                displayEmpty
                sx={{
                  borderRadius: "10px",
                  fontWeight: 600,
                  color: "#0F172A",
                  "& .MuiOutlinedInput-notchedOutline": {
                    borderColor: "#CBD5E1",
                  },
                  "&:hover .MuiOutlinedInput-notchedOutline": {
                    borderColor: "#D4AF37",
                  },
                  "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                    borderColor: "#D4AF37",
                  },
                }}
              >
                <MenuItem value="" disabled>
                  Select document type
                </MenuItem>
                {documentTypes.map((type) => (
                  <MenuItem
                    key={type}
                    value={type}
                    disabled={safeDocuments.some((d) => d.documentType === type)}
                    sx={{ fontWeight: 600, py: 1.2 }}
                  >
                    {type}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <Button
              variant="contained"
              component="label"
              startIcon={<UploadFileIcon />}
              disabled={!selectedDocType || uploading}
              sx={{
                bgcolor: "#0F172A",
                color: "#FFFFFF",
                fontWeight: 700,
                py: 1.5,
                borderRadius: "10px",
                textTransform: "none",
                boxShadow: "0 4px 12px rgba(15, 23, 42, 0.15)",
                "& .MuiButton-startIcon": { color: "#D4AF37" },
                "&:hover": {
                  bgcolor: "#D4AF37",
                  color: "#0F172A",
                  "& .MuiButton-startIcon": { color: "#0F172A" },
                },
                "&.Mui-disabled": {
                  bgcolor: "#E2E8F0",
                  color: "#94A3B8",
                },
                transition: "all 0.2s ease",
              }}
            >
              {uploading ? "Uploading..." : "Select a PDF to Upload"}
              <input type="file" hidden accept="application/pdf" onChange={handleFileUpload} />
            </Button>
          </Stack>
        </DialogContent>

        <Divider sx={{ borderColor: "#E2E8F0" }} />

        <DialogActions sx={{ px: 3, py: 2 }}>
          <Button
            onClick={() => setOpenDialog(false)}
            variant="contained"
            startIcon={<CheckCircleOutlineIcon />}
            sx={{
              bgcolor: "#D4AF37",
              color: "#0F172A",
              fontWeight: 700,
              textTransform: "none",
              borderRadius: "8px",
              px: 3,
              "&:hover": {
                bgcolor: "#0F172A",
                color: "#FFFFFF",
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