// src/pages/MessagesPage/MessagesPage.jsx
import React, { useState } from "react";
import { Box, Stack, Typography, Button, Toolbar } from "@mui/material";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import UsersNavbar from "../../components/UsersNavbar";
import UserSidebar from "../../components/UserSidebar"; // ✅ use the shared sidebar
import MessageFilters from "./MessageFilters";
import ThreadCard from "./ThreadCard";
import ChatIcon from "@mui/icons-material/Chat";
import HomeIcon from "@mui/icons-material/Home";
import SettingsIcon from "@mui/icons-material/Settings";

// Sample Data: 200 threads
const sampleThreads = Array.from({ length: 200 }).map((_, i) => ({
  id: i + 1,
  sender: `Sender ${i + 1}`,
  lastMessage: `Last message from sender ${i + 1}`,
  date: `2025-09-${(i % 30) + 1}`,
  unread: i % 3 === 0, // random unread messages
}));

function MessagesPage() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [filters, setFilters] = useState({ search: "", status: "" });
  const [threads, setThreads] = useState(sampleThreads);
  const [page, setPage] = useState(1);
  const pageSize = 5;

  // Sidebar menu items (example for Tenant)
  const menuItems = [
    { label: "Dashboard", icon: <HomeIcon />, link: "/tenant" },
    { label: "Messages", icon: <ChatIcon />, link: "/tenant/messages" },
    { label: "Settings", icon: <SettingsIcon />, link: "/tenant/settings" },
  ];

  // Apply filters
  const filteredThreads = threads.filter(
    (t) =>
      t.sender.toLowerCase().includes(filters.search.toLowerCase()) &&
      (filters.status
        ? filters.status === "Unread"
          ? t.unread
          : !t.unread
        : true)
  );

  const totalPages = Math.ceil(filteredThreads.length / pageSize);
  const paginatedThreads = filteredThreads.slice(
    (page - 1) * pageSize,
    page * pageSize
  );

  // Handle clicking "View"
  const handleViewThread = (thread) => {
    setThreads((prev) =>
      prev.map((t) => (t.id === thread.id ? { ...t, unread: false } : t))
    );
    window.location.href = `/tenant/messages/${thread.id}`;
  };

  return (
    <Box sx={{ display: "flex" }}>
      <UsersNavbar onMenuClick={() => setMobileOpen(!mobileOpen)} />
      <UserSidebar
        mobileOpen={mobileOpen}
        onClose={() => setMobileOpen(false)}
        menuItems={menuItems}
      />

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: { xs: 2, md: 3 },
          bgcolor: "#f7f7f7",
          minHeight: "87.25vh",
        }}
      >
        <Toolbar />

        {/* Page Title */}
        <Stack
          direction="row"
          spacing={1}
          alignItems="center"
          justifyContent="center"
          sx={{ mb: 2 }}
        >
          <MailOutlineIcon sx={{ color: "#f8b500" }} />
          <Typography variant="h5" sx={{ fontWeight: 600, textAlign: "center" }}>
            Messages
          </Typography>
        </Stack>

        <MessageFilters filters={filters} onFilterChange={setFilters} />

        <Stack spacing={2}>
          {paginatedThreads.map((thread) => (
            <ThreadCard
              key={thread.id}
              thread={thread}
              onView={handleViewThread}
            />
          ))}
        </Stack>

        {/* Pagination Controls */}
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          sx={{ mt: 2 }}
        >
          <Button disabled={page === 1} onClick={() => setPage((p) => p - 1)}>
            Previous
          </Button>
          <Typography>
            Page {page} of {totalPages}
          </Typography>
          <Button
            disabled={page === totalPages}
            onClick={() => setPage((p) => p + 1)}
          >
            Next
          </Button>
        </Stack>
      </Box>
    </Box>
  );
}

export default MessagesPage;
