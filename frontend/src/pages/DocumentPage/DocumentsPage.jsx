// src/pages/Documents/DocumentsPage.jsx
import React, { useState } from "react";
import { Box, Typography, Button } from "@mui/material";
import UsersNavbar from "../../components/UsersNavbar";
import UserSidebar from "../../components/UserSidebar"; // ✅ use new sidebar
import DocumentsList from "./DocumentsList";
import UploadDocumentForm from "./UploadDocumentForm";

import DescriptionIcon from "@mui/icons-material/Description";
import UploadFileIcon from "@mui/icons-material/UploadFile";

function DocumentsPage() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [showUpload, setShowUpload] = useState(false);

  const handleDrawerToggle = () => setMobileOpen(!mobileOpen);
  const handleUploadClick = () => setShowUpload(!showUpload);

  return (
    <Box sx={{ display: "flex", flexDirection: { xs: "column", md: "row" } }}>
      {/* Navbar */}
      <UsersNavbar onMenuClick={handleDrawerToggle} />

      {/* Sidebar */}
      <UserSidebar mobileOpen={mobileOpen} onClose={handleDrawerToggle} />

      {/* Main Content */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: { xs: 2, md: 3 },
          mt: { xs: 10, md: 8 },
          bgcolor: "#f7f7f7",
          minHeight: "79.11vh",
        }}
      >
        {/* Header */}
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", sm: "row" },
            justifyContent: { xs: "center", sm: "space-between" }, // centered on mobile
            alignItems: { xs: "center", sm: "center" },
            mb: 2,
            gap: 2,
          }}
        >
          {/* Title */}
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <DescriptionIcon sx={{ color: "#f8b500", fontSize: { xs: 28, md: 32 } }} />
            <Typography
              variant="h5"
              fontWeight={600}
              sx={{ fontSize: { xs: "1.25rem", md: "1.5rem" }, textAlign: { xs: "center", sm: "left" } }}
            >
              My Documents
            </Typography>
          </Box>

          {/* Upload Button */}
          <Button
            variant="contained"
            color="warning"
            startIcon={<UploadFileIcon />}
            onClick={handleUploadClick}
            sx={{ width: { xs: "100%", sm: "auto" } }}
          >
            {showUpload ? "Cancel Upload" : "Upload Document"}
          </Button>
        </Box>

        {/* Upload Form */}
        {showUpload && <UploadDocumentForm onClose={handleUploadClick} />}

        {/* Documents List */}
        <DocumentsList />
      </Box>
    </Box>
  );
}

export default DocumentsPage;
