// src/pages/AnnouncementPage/AnnouncementsPage.jsx
import React, { useState } from "react";
import {
  Box,
  Typography,
  Stack,
  TextField,
  MenuItem,
  Button,
  Toolbar,
  useMediaQuery,
  Card,
  CardContent,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import VisibilityIcon from "@mui/icons-material/Visibility";
import CampaignIcon from "@mui/icons-material/Campaign";
import UsersNavbar from "../../components/UsersNavbar";
import TenantSidebar from "../Tenant/TenantSidebar";
import AnnouncementModal from "./AnnouncementModal";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import SearchIcon from "@mui/icons-material/Search";
import CategoryIcon from "@mui/icons-material/Category";
import MarkEmailUnreadIcon from "@mui/icons-material/MarkEmailUnread";

// Sample Data
const sampleAnnouncements = Array.from({ length: 45 }).map((_, i) => ({
  id: i + 1,
  title: `Announcement ${i + 1}`,
  category: i % 2 === 0 ? "Maintenance" : "Finance",
  date: `2025-09-${(i % 30) + 1}`,
  description: `Details for announcement ${i + 1}`,
  status: i % 3 === 0 ? "Unread" : "Read",
}));

function AnnouncementsPage() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [announcements, setAnnouncements] = useState(sampleAnnouncements);
  const [selectedAnnouncement, setSelectedAnnouncement] = useState(null);
  const [filters, setFilters] = useState({ search: "", category: "", status: "" });

  const isMobile = useMediaQuery("(max-width:900px)");

  // Manual pagination (mobile only)
  const [page, setPage] = useState(1);
  const pageSize = 5;
  const totalPages = Math.ceil(announcements.length / pageSize);

  // Handle filter change
  const handleFilterChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
    setPage(1);
  };

  // Handle click → mark as read & open modal
  const handleAnnouncementClick = (announcement) => {
    setAnnouncements((prev) =>
      prev.map((a) =>
        a.id === announcement.id ? { ...a, status: "Read" } : a
      )
    );
    setSelectedAnnouncement(announcement);
  };

  // Columns (desktop)
  const columns = [
    { field: "title", headerName: "Title", flex: 1 },
    { field: "category", headerName: "Category", flex: 1 },
    { field: "date", headerName: "Date", flex: 1 },
    {
      field: "status",
      headerName: "Status",
      flex: 1,
      align: "center",
      headerAlign: "center",
      renderCell: (params) => (
        <Typography
          sx={{
            fontWeight: params.value === "Unread" ? 600 : 400,
            color: params.value === "Unread" ? "#c59000" : "#2a2a2a",
          }}
        >
          {params.value}
        </Typography>
      ),
    },
    {
      field: "actions",
      headerName: "Actions",
      flex: 0.6,
      align: "center",
      headerAlign: "center",
      sortable: false,
      renderCell: (params) => (
        <Button
          variant="contained"
          size="small"
          startIcon={<VisibilityIcon />}
          sx={{
            bgcolor: "#1976d2", // Blue
            color: "#fff",
            fontWeight: 600,
            "&:hover": { bgcolor: "#1565c0" },
          }}
          onClick={() => handleAnnouncementClick(params.row)}
        >
          View
        </Button>
      ),
    },
  ];

  // Apply filters
  const filteredAnnouncements = announcements.filter((a) => {
    const matchesSearch = a.title
      .toLowerCase()
      .includes(filters.search.toLowerCase());
    const matchesCategory = filters.category
      ? a.category === filters.category
      : true;
    const matchesStatus = filters.status ? a.status === filters.status : true;
    return matchesSearch && matchesCategory && matchesStatus;
  });

  // Paginate for mobile
  const paginatedAnnouncements = isMobile
    ? filteredAnnouncements.slice((page - 1) * pageSize, page * pageSize)
    : filteredAnnouncements;

  return (
    <Box sx={{ display: "flex" }}>
      {/* Navbar & Sidebar */}
      <UsersNavbar onMenuClick={() => setMobileOpen(!mobileOpen)} />
      <TenantSidebar mobileOpen={mobileOpen} onClose={() => setMobileOpen(false)} />

      {/* Main Content */}
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
          alignItems="center"
          justifyContent="center"
          spacing={1}
          sx={{ mb: 2 }}
        >
          <CampaignIcon sx={{ color: "#f8b500" }} />
          <Typography
            variant="h5"
            sx={{ fontWeight: "bold", color: "#111111", textAlign: "center" }}
          >
            Announcements
          </Typography>
        </Stack>

        {/* Filters */}
        <Stack
          direction={{ xs: "column", md: "row" }}
          spacing={2}
          sx={{ mb: 2 }}
        >
          {/* Search Field */}
          <TextField
            name="search"
            value={filters.search}
            onChange={handleFilterChange}
            placeholder="Search announcements..."
            size="small"
            InputProps={{
              startAdornment: <SearchIcon sx={{ mr: 1, color: "#c59000" }} />,
            }}
            sx={{ bgcolor: "#fff", borderRadius: 2, flex: 1 }}
          />

          {/* Category Filter */}
          <TextField
            select
            name="category"
            value={filters.category}
            onChange={handleFilterChange}
            label="Category"
            size="small"
            InputProps={{
              startAdornment: <CategoryIcon sx={{ mr: 1, color: "#c59000" }} />,
            }}
            sx={{ bgcolor: "#fff", borderRadius: 2, flex: 1 }}
          >
            <MenuItem value="">All</MenuItem>
            <MenuItem value="Maintenance">Maintenance</MenuItem>
            <MenuItem value="Finance">Finance</MenuItem>
          </TextField>

          {/* Status Filter */}
          <TextField
            select
            name="status"
            value={filters.status}
            onChange={handleFilterChange}
            label="Status"
            size="small"
            InputProps={{
              startAdornment: <MarkEmailUnreadIcon sx={{ mr: 1, color: "#c59000" }} />,
            }}
            sx={{ bgcolor: "#fff", borderRadius: 2, flex: 1 }}
          >
            <MenuItem value="">All</MenuItem>
            <MenuItem value="Unread">Unread</MenuItem>
            <MenuItem value="Read">Read</MenuItem>
          </TextField>

          {/* Reset Button */}
          <Button
            variant="contained"
            size="small"
            startIcon={<RestartAltIcon fontSize="small" />}
            sx={{
              bgcolor: "#f8b500",
              color: "#111111",
              fontWeight: 600,
              fontSize: "0.85rem",
              px: 2,
              py: 0.8,
              borderRadius: 2,
              minWidth: 100,
              alignSelf: { xs: "stretch", md: "center" },
              "&:hover": { bgcolor: "#ffc62c" },
            }}
            onClick={() => setFilters({ search: "", category: "", status: "" })}
          >
            Reset
          </Button>
        </Stack>

        {/* Responsive Announcements */}
        {isMobile ? (
          <>
            {/* Mobile → Card List with pagination */}
            <Stack spacing={2}>
              {paginatedAnnouncements.map((a) => (
                <Card
                  key={a.id}
                  sx={{
                    borderLeft:
                      a.status === "Unread"
                        ? "4px solid #f8b500"
                        : "4px solid transparent",
                    "&:hover": { bgcolor: "#fffbe6" },
                  }}
                >
                  <CardContent>
                    <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                      {a.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {a.category} • {a.date}
                    </Typography>
                    <Stack
                      direction="row"
                      justifyContent="space-between"
                      alignItems="center"
                      sx={{ mt: 1 }}
                    >
                      <Typography
                        variant="caption"
                        sx={{
                          fontWeight: a.status === "Unread" ? 600 : 400,
                          color: a.status === "Unread" ? "#c59000" : "#2a2a2a",
                        }}
                      >
                        {a.status}
                      </Typography>
                      <Button
                        variant="contained"
                        size="small"
                        startIcon={<VisibilityIcon />}
                        sx={{
                          bgcolor: "#1976d2",
                          color: "#fff",
                          fontWeight: 600,
                          "&:hover": { bgcolor: "#1565c0" },
                        }}
                        onClick={() => handleAnnouncementClick(a)}
                      >
                        View
                      </Button>
                    </Stack>
                  </CardContent>
                </Card>
              ))}
            </Stack>

            {/* Pagination Controls */}
            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="center"
              sx={{ mt: 2 }}
            >
              <Button
                variant="outlined"
                disabled={page === 1}
                onClick={() => setPage((p) => p - 1)}
              >
                Previous
              </Button>
              <Typography variant="body2" sx={{ color: "#2a2a2a" }}>
                Page {page} of {totalPages}
              </Typography>
              <Button
                variant="outlined"
                disabled={page === totalPages}
                onClick={() => setPage((p) => p + 1)}
              >
                Next
              </Button>
            </Stack>
          </>
        ) : (
          // Desktop → DataGrid
          <Box
            sx={{
              height: 500,
              width: "100%",
              "& .MuiDataGrid-root": { border: "none" },
              "& .MuiDataGrid-columnHeaders": {
                bgcolor: "#f8b500",
                color: "#111111",
              },
              "& .MuiDataGrid-columnHeaderTitle": {
                fontWeight: "bold !important",
              },
              "& .MuiDataGrid-row:hover": { bgcolor: "#fffbe6" },
              "& .MuiDataGrid-footerContainer": { bgcolor: "#f7f7f7" },
            }}
          >
            <DataGrid
              rows={filteredAnnouncements}
              columns={columns}
              pageSize={10}
              rowsPerPageOptions={[10, 20, 50]}
              disableSelectionOnClick
              getRowId={(row) => row.id}
            />
          </Box>
        )}

        {/* Modal */}
        <AnnouncementModal
          announcement={selectedAnnouncement}
          onClose={() => setSelectedAnnouncement(null)}
        />
      </Box>
    </Box>
  );
}

export default AnnouncementsPage;
