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
  Divider,
} from "@mui/material";

import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import DownloadIcon from "@mui/icons-material/Download";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import DescriptionOutlinedIcon from "@mui/icons-material/DescriptionOutlined";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import CloseIcon from "@mui/icons-material/Close";

export default function ProfileDocuments({ openDialog, setOpenDialog }) {
  const documentTypes = [
    "ID Copy",
    "Lease Agreement",
    "Passport",
    "Utility Bill",
  ];

  const [documents, setDocuments] = useState([
    {
      type: "ID Copy",
      file: new File([""], "id-copy.pdf", { type: "application/pdf" }),
    },
  ]);

  const [selectedDocType, setSelectedDocType] = useState("");

  const handleUpload = (e) => {
    const file = e.target.files[0];
    if (!file || !selectedDocType) return;
    if (file.type !== "application/pdf") return;

    setDocuments((prev) => [...prev, { type: selectedDocType, file }]);
    setSelectedDocType("");
    e.target.value = "";
  };

  const handleDelete = (type) => {
    setDocuments((prev) => prev.filter((doc) => doc.type !== type));
  };

  return (
    <Box>
      {/* ===== DOCUMENT LIST / EMPTY STATE ===== */}
      {documents.length === 0 ? (
        <Box sx={{ py: 4, textAlign: "center" }}>
          <DescriptionOutlinedIcon sx={{ fontSize: 42, color: "#c59000", mb: 1 }} />
          <Typography fontWeight={600} color="#111111">
            No documents uploaded
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Upload required documents to complete your profile.
          </Typography>
        </Box>
      ) : (
        <List sx={{ mb: 2 }}>
          {documents.map((doc) => (
            <ListItem
              key={doc.type}
              sx={{
                mb: 1,
                borderRadius: 2,
                bgcolor: "#f7f7f7",
                border: "1px solid #eee",
                "&:hover": {
                  bgcolor: "#fff8e1",
                },
              }}
              secondaryAction={
                <Stack direction="row" spacing={0.5}>
                  <IconButton
                    aria-label="download"
                    sx={{ color: "#f8b500" }}
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

                  <IconButton
                    aria-label="delete"
                    onClick={() => handleDelete(doc.type)}
                    sx={{ color: "error.main" }}
                  >
                    <DeleteOutlineIcon />
                  </IconButton>
                </Stack>
              }
            >
              <ListItemIcon>
                <PictureAsPdfIcon sx={{ color: "#f8b500" }} />
              </ListItemIcon>

              <ListItemText
                primary={doc.type}
                secondary={doc.file.name}
                primaryTypographyProps={{
                  fontWeight: 600,
                  color: "#111111",
                }}
              />
            </ListItem>
          ))}
        </List>
      )}

      {/* ===== MANAGE DOCUMENTS DIALOG ===== */}
      <Dialog
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        maxWidth="sm"
        fullWidth
      >
        {/* ===== TITLE WITH CLOSE BUTTON ===== */}
        <DialogTitle
          sx={{
            fontWeight: 700,
            pr: 5,
          }}
        >
          Upload Document

          <IconButton
            aria-label="close"
            onClick={() => setOpenDialog(false)}
            sx={{
              position: "absolute",
              right: 8,
              top: 8,
              color: "text.secondary",
              "&:hover": {
                bgcolor: "action.hover",
              },
            }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>

        <DialogContent>
          <Stack spacing={3} mt={1}>
            <Typography variant="body2" color="text.secondary">
              Choose a document type and upload a PDF file.
            </Typography>

            <FormControl fullWidth>
              <Select
                value={selectedDocType}
                onChange={(e) => setSelectedDocType(e.target.value)}
                displayEmpty
              >
                <MenuItem value="" disabled>
                  Select document type
                </MenuItem>

                {documentTypes.map((type) => (
                  <MenuItem
                    key={type}
                    value={type}
                    disabled={documents.some((d) => d.type === type)}
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
              disabled={!selectedDocType}
              sx={{
                bgcolor: "#f8b500",
                color: "#111",
                fontWeight: 600,
                "&:hover": {
                  bgcolor: "warning.dark",
                },
              }}
            >
              Select a PDF to upload
              <input
                type="file"
                accept="application/pdf"
                hidden
                onChange={handleUpload}
              />
            </Button>
          </Stack>
        </DialogContent>

        <Divider />

        <DialogActions sx={{ px: 3, pb: 2 }}>
          <Button
            onClick={() => setOpenDialog(false)}
            variant="contained"
            startIcon={<CheckCircleOutlineIcon />}
            sx={{
              bgcolor: "success.main",
              fontWeight: 600,
              px: 3,
              "&:hover": {
                bgcolor: "success.dark",
              },
            }}
          >
            Done
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
