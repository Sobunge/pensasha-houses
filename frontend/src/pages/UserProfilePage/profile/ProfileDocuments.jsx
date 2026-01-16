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

import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import DownloadIcon from "@mui/icons-material/Download";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import CloseIcon from "@mui/icons-material/Close";

import useDocuments from "../../../components/hooks/useDocuments";

export default function ProfileDocuments({ openDialog, setOpenDialog }) {
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

  /* ===================== FETCH ON OPEN ===================== */
  useEffect(() => {
    if (openDialog) fetchDocuments();
  }, [openDialog, fetchDocuments]);

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file || !selectedDocType) return;

    try {
      await uploadDocument(file, selectedDocType);
      setSelectedDocType("");
      e.target.value = "";
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Box>
      {/* DOCUMENT LIST OR SKELETON */}
      {loading ? (
        <Stack spacing={1}>
          <Skeleton width="100%" height={40} />
          <Skeleton width="100%" height={40} />
        </Stack>
      ) : documents.length === 0 ? (
        <Box sx={{ py: 4, textAlign: "center" }}>
          <PictureAsPdfIcon sx={{ fontSize: 42, color: "#c59000", mb: 1 }} />
          <Typography fontWeight={600} color="#111111">
            No documents uploaded
          </Typography>
        </Box>
      ) : (
        <List sx={{ mb: 2 }}>
          {documents.map((doc) => (
            <ListItem
              key={doc.id}
              sx={{
                mb: 1,
                borderRadius: 2,
                bgcolor: "#f7f7f7",
                border: "1px solid #eee",
                "&:hover": { bgcolor: "#fff8e1" },
              }}
              secondaryAction={
                <Stack direction="row" spacing={0.5}>
                  <IconButton aria-label="download" sx={{ color: "#f8b500" }} onClick={() => downloadDocument(doc)}>
                    <DownloadIcon />
                  </IconButton>
                  <IconButton aria-label="delete" sx={{ color: "error.main" }} onClick={() => deleteDocument(doc.id)}>
                    <DeleteOutlineIcon />
                  </IconButton>
                </Stack>
              }
            >
              <ListItemIcon>
                <PictureAsPdfIcon sx={{ color: "#f8b500" }} />
              </ListItemIcon>
              <ListItemText primary={doc.documentType} secondary={doc.fileName} primaryTypographyProps={{ fontWeight: 600 }} />
            </ListItem>
          ))}
        </List>
      )}

      {/* DIALOG FOR UPLOAD */}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)} maxWidth="sm" fullWidth>
        <DialogTitle sx={{ fontWeight: 700, pr: 5 }}>
          Upload Document
          <IconButton
            aria-label="close"
            onClick={() => setOpenDialog(false)}
            sx={{ position: "absolute", right: 8, top: 8, color: "text.secondary" }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>

        <DialogContent>
          <Stack spacing={3} mt={1}>
            <FormControl fullWidth>
              <Select value={selectedDocType} onChange={(e) => setSelectedDocType(e.target.value)} displayEmpty>
                <MenuItem value="" disabled>Select document type</MenuItem>
                {documentTypes.map((type) => (
                  <MenuItem key={type} value={type} disabled={documents.some((d) => d.documentType === type)}>
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
              sx={{ bgcolor: "#f8b500", color: "#111", fontWeight: 600 }}
            >
              {uploading ? "Uploading..." : "Select a PDF to upload"}
              <input type="file" hidden accept="application/pdf" onChange={handleFileUpload} />
            </Button>
          </Stack>
        </DialogContent>

        <Divider />

        <DialogActions sx={{ px: 3, pb: 2 }}>
          <Button
            onClick={() => setOpenDialog(false)}
            variant="contained"
            startIcon={<CheckCircleOutlineIcon />}
            sx={{ bgcolor: "success.main", fontWeight: 600 }}
          >
            Done
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
