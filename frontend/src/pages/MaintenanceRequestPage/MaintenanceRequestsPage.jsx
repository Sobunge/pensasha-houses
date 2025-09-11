// src/pages/MaintenanceRequests/MaintenanceRequestsPage.jsx
import React, { useState } from "react";
import { Box } from "@mui/material";
import UsersNavbar from "../../components/UsersNavbar";
import UserSidebar from "../../components/UserSidebar"; // ✅ use unified sidebar
import MaintenanceRequestsHeader from "./MaintenanceRequestsHeader";
import MaintenanceRequestList from "./MaintenanceRequestList";
import MaintenanceRequestForm from "./MaintenanceRequestForm";
import MaintenanceRequestModal from "./MaintenanceRequestModal";

// Generate 20 dummy maintenance requests
const dummyRequests = Array.from({ length: 20 }, (_, i) => {
  const types = ["Plumbing", "Electrical", "Cleaning", "Other"];
  const priorities = ["Low", "Medium", "High"];
  const statuses = ["Pending", "In Progress", "Completed"];

  const type = types[i % types.length];
  const priority = priorities[i % priorities.length];
  const status = statuses[i % statuses.length]; // Cycle through statuses

  return {
    id: i + 1,
    title: `${type} Issue #${i + 1}`,
    type,
    priority,
    status,
    description: `This is a description for ${type.toLowerCase()} issue #${i + 1}.`,
    date: `2025-09-${(i % 30 + 1).toString().padStart(2, "0")}`,
    file: null,
  };
});

function MaintenanceRequestsPage() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState(null);

  const handleDrawerToggle = () => setMobileOpen(!mobileOpen);
  const handleFormToggle = () => setShowForm(!showForm);
  const handleViewRequest = (request) => setSelectedRequest(request);
  const handleCloseModal = () => setSelectedRequest(null);

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
          mt: { xs: 7, md: 8 },
          bgcolor: "#f7f7f7",
          minHeight: "79.11vh",
        }}
      >
        <MaintenanceRequestsHeader showForm={showForm} onToggleForm={handleFormToggle} />

        {showForm && <MaintenanceRequestForm onClose={handleFormToggle} />}

        <MaintenanceRequestList requests={dummyRequests} onView={handleViewRequest} />

        {selectedRequest && (
          <MaintenanceRequestModal request={selectedRequest} onClose={handleCloseModal} />
        )}
      </Box>
    </Box>
  );
}

export default MaintenanceRequestsPage;
