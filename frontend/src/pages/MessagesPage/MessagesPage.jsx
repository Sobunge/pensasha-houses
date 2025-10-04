// src/pages/MessagesPage/MessagesPage.jsx
import React, { useState } from "react";
import { Box, Stack, Typography, Button } from "@mui/material";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import MessageFilters from "./MessageFilters";
import ThreadCard from "./ThreadCard";
import { useAuth } from "../Auth/AuthContext"; // ✅ Import auth context
import { useNavigate } from "react-router-dom"; // ✅ Import navigate

// Sample Data: 200 threads
const sampleThreads = Array.from({ length: 200 }).map((_, i) => ({
  id: i + 1,
  sender: `Sender ${i + 1}`,
  lastMessage: `Last message from sender ${i + 1}`,
  date: `2025-09-${(i % 30) + 1}`,
  unread: i % 3 === 0, // random unread messages
}));

function MessagesPage() {
  const { user } = useAuth(); // ✅ Get logged-in user with role
  const navigate = useNavigate();

  const [filters, setFilters] = useState({ search: "", status: "" });
  const [threads, setThreads] = useState(sampleThreads);
  const [page, setPage] = useState(1);
  const pageSize = 5;

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

    // ✅ Role-based navigation
    const role = user?.role || "tenant"; 
    navigate(`/${role}/messages/${thread.id}`);
  };

  return (
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        p: { xs: 2, md: 3 },
        bgcolor: "#f7f7f7",
        minHeight: "87.25vh",
      }}
    >
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
  );
}

export default MessagesPage;
