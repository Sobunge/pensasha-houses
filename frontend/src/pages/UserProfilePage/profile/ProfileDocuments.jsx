import React, { useState } from "react";
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
} from "@mui/material";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import DownloadIcon from "@mui/icons-material/Download";
import DeleteIcon from "@mui/icons-material/Delete";

export default function ProfileDocuments({ openDialog, setOpenDialog }) {
  // Sample required document types
  const documentTypes = ["ID Copy", "Lease Agreement", "Passport", "Utility Bill"];

  // Initial sample documents
  const [documents, setDocuments] = useState([
    { type: "ID Copy", file: new File([""], "id-copy.pdf", { type: "application/pdf" }) },
    { type: "Lease Agreement", file: new File([""], "lease-agreement.pdf", { type: "application/pdf" }) },
  ]);

  const [selectedDocType, setSelectedDocType] = useState("");

  // Handle uploading a new document
  const handleAddDocument = (e) => {
    const file = e.target.files[0];
    if (!file || !selectedDocType) return;

    if (documents.some((doc) => doc.type === selectedDocType)) {
      return alert("This document type is already uploaded.");
    }

    if (file.type !== "application/pdf") {
      return alert("Only PDF files are allowed.");
    }

    setDocuments([...documents, { type: selectedDocType, file }]);
    setSelectedDocType("");
    e.target.value = ""; // reset input
  };

  // Delete a document
  const handleRemoveDocument = (type) => {
    setDocuments(documents.filter((doc) => doc.type !== type));
  };

  return (
    <Box>
      {documents.length === 0 ? (
        <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
          No documents uploaded yet.
        </Typography>
      ) : (
        <List>
          {documents.map((doc, index) => (
            <ListItem
              key={index}
              sx={{
                bgcolor: "#f7f7f7",
                mb: 1,
                borderRadius: 1,
                boxShadow: "0 2px 6px rgba(0,0,0,0.05)",
              }}
              secondaryAction={
                <>
                  <IconButton
                    onClick={() => {
                      const url = URL.createObjectURL(doc.file);
                      const link = document.createElement("a");
                      link.href = url;
                      link.download = doc.file.name;
                      link.click();
                    }}
                  >
                    <DownloadIcon />
                  </IconButton>
                  <IconButton onClick={() => handleRemoveDocument(doc.type)}>
                    <DeleteIcon />
                  </IconButton>
                </>
              }
            >
              <ListItemIcon>
                <PictureAsPdfIcon color="error" />
              </ListItemIcon>
              <ListItemText primary={doc.type} secondary={doc.file.name} />
            </ListItem>
          ))}
        </List>
      )}

      {/* Manage Documents Dialog */}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Manage Documents</DialogTitle>
        <DialogContent>
          <Stack spacing={3} mt={1}>
            <FormControl fullWidth>
              <Select
                value={selectedDocType}
                onChange={(e) => setSelectedDocType(e.target.value)}
                displayEmpty
              >
                <MenuItem value="" disabled>
                  Select Document Type
                </MenuItem>
                {documentTypes.map((type) => (
                  <MenuItem
                    key={type}
                    value={type}
                    disabled={documents.some((doc) => doc.type === type)}
                  >
                    {type}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <Button variant="outlined" component="label">
              Upload PDF
              <input type="file" accept="application/pdf" hidden onChange={handleAddDocument} />
            </Button>
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Close</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
