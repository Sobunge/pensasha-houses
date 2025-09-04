import React, { useState } from "react";
import { Box, TextField, Button } from "@mui/material";
import UploadFileIcon from "@mui/icons-material/UploadFile";

function UploadDocumentForm({ onClose }) {
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => setFile(e.target.files[0]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!file) return;
    // TODO: Upload logic here
    console.log("Uploading:", file);
    onClose();
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        mb: 3,
        p: 2,
        bgcolor: "#fff",
        borderRadius: 2,
        boxShadow: 2,
      }}
    >
      <TextField type="file" fullWidth onChange={handleFileChange} />
      <Button
        type="submit"
        variant="contained"
        color="warning"
        startIcon={<UploadFileIcon />}
        sx={{ mt: 2 }}
      >
        Upload
      </Button>
    </Box>
  );
}

export default UploadDocumentForm;
