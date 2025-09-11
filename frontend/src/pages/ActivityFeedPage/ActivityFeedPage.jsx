// src/pages/ActivityFeed/ActivityFeedPage.jsx
import React, { useState } from "react";
import {
  Box,
  Typography,
  Stack,
  Card,
  CardContent,
  Button,
  Toolbar,
  useMediaQuery,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";
import VisibilityIcon from "@mui/icons-material/Visibility";
import UsersNavbar from "../../components/UsersNavbar";
import UserSidebar from "../../components/UserSidebar"; // ✅ use dynamic sidebar
import ActivityFilters from "./ActivityFilters";
import ActivityModal from "./ActivityModal";

// Sample Activity Data
const sampleActivities = Array.from({ length: 120 }).map((_, i) => ({
  id: i + 1,
  type: i % 2 === 0 ? "Payment" : "Maintenance",
  message:
    i % 2 === 0
      ? `Tenant ${i + 1} made a payment`
      : `Maintenance request ${i + 1} created`,
  date: `2025-09-${(i % 30) + 1}`,
  status: i % 3 === 0 ? "Unread" : "Read",
}));

function ActivityFeedPage() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activities, setActivities] = useState(sampleActivities);
  const [page, setPage] = useState(1);
  const [selectedActivity, setSelectedActivity] = useState(null);

  const [filters, setFilters] = useState({ search: "", type: "", status: "" });

  const pageSize = 5;
  const totalPages = Math.ceil(activities.length / pageSize);

  const isMobile = useMediaQuery("(max-width:900px)");

  // Handle Filters
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
    setPage(1);
  };

  const handleResetFilters = () => {
    setFilters({ search: "", type: "", status: "" });
  };

  // Apply filters
  const filteredActivities = activities.filter((a) => {
    const searchMatch =
      !filters.search ||
      a.message.toLowerCase().includes(filters.search.toLowerCase());
    const typeMatch = !filters.type || a.type === filters.type;
    const statusMatch = !filters.status || a.status === filters.status;
    return searchMatch && typeMatch && statusMatch;
  });

  // Mobile pagination slice
  const paginatedActivities = filteredActivities.slice(
    (page - 1) * pageSize,
    page * pageSize
  );

  // Open modal & mark as read if needed
  const handleViewActivity = (activity) => {
    let updated = activity;

    if (activity.status === "Unread") {
      setActivities((prev) =>
        prev.map((a) => {
          if (a.id === activity.id) {
            updated = { ...a, status: "Read" };
            return updated;
          }
          return a;
        })
      );
    }

    setSelectedActivity(updated); // use updated object
  };

  // Explicit Mark as Read from Modal
  const handleMarkRead = (id) => {
    let updated;
    setActivities((prev) =>
      prev.map((a) => {
        if (a.id === id) {
          updated = { ...a, status: "Read" };
          return updated;
        }
        return a;
      })
    );

    if (selectedActivity?.id === id) {
      setSelectedActivity(updated);
    }
  };

  // Table columns
  const columns = [
    { field: "type", headerName: "Type", flex: 1 },
    { field: "message", headerName: "Message", flex: 2 },
    { field: "date", headerName: "Date", flex: 1 },
    {
      field: "status",
      headerName: "Status",
      flex: 1,
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
      sortable: false,
      renderCell: (params) => (
        <Button
          size="small"
          variant="contained"
          startIcon={<VisibilityIcon />}
          sx={{
            bgcolor: "#1976d2",
            color: "#fff",
            fontWeight: 600,
            "&:hover": { bgcolor: "#1565c0" },
          }}
          onClick={() => handleViewActivity(params.row)}
        >
          View
        </Button>
      ),
    },
  ];

  return (
    <Box sx={{ display: "flex" }}>
      {/* Navbar + Sidebar */}
      <UsersNavbar onMenuClick={() => setMobileOpen(!mobileOpen)} />
      <UserSidebar mobileOpen={mobileOpen} onClose={() => setMobileOpen(false)} /> 
      {/* ✅ Dynamic sidebar based on logged-in role */}

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

        {/* Title */}
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="center"
          spacing={1}
          sx={{ mb: 2 }}
        >
          <NotificationsActiveIcon sx={{ color: "#f8b500" }} />
          <Typography
            variant="h5"
            sx={{ fontWeight: "bold", color: "#111111" }}
          >
            Activity Feed
          </Typography>
        </Stack>

        {/* Filters */}
        <ActivityFilters
          filters={filters}
          onChange={handleFilterChange}
          onReset={handleResetFilters}
        />

        {/* Responsive Rendering */}
        {isMobile ? (
          <>
            <Stack spacing={2}>
              {paginatedActivities.map((a) => (
                <Card
                  key={a.id}
                  sx={{
                    borderLeft:
                      a.status === "Unread"
                        ? "4px solid #f8b500"
                        : "4px solid transparent",
                  }}
                >
                  <CardContent>
                    <Typography variant="subtitle1" fontWeight={600}>
                      {a.type}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {a.message}
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
                        {a.date} • {a.status}
                      </Typography>
                      <Button
                        variant="contained"
                        size="small"
                        startIcon={<VisibilityIcon />}
                        sx={{
                          bgcolor: "#1976d2",
                          color: "#fff",
                          "&:hover": { bgcolor: "#1565c0" },
                        }}
                        onClick={() => handleViewActivity(a)}
                      >
                        View
                      </Button>
                    </Stack>
                  </CardContent>
                </Card>
              ))}
            </Stack>

            {/* Mobile Pagination */}
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
              <Typography>
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
          <Box
            sx={{
              height: 500,
              width: "100%",
              "& .MuiDataGrid-root": { border: "none" },
              "& .MuiDataGrid-columnHeaders": {
                bgcolor: "#f8b500",
                color: "#111111",
                fontWeight: "bold",
              },
              "& .MuiDataGrid-columnHeaderTitle": {
                fontWeight: "bold",
              },
              "& .MuiDataGrid-row:hover": { bgcolor: "#fffbe6" },
            }}
          >
            <DataGrid
              rows={filteredActivities}
              columns={columns}
              pageSize={10}
              rowsPerPageOptions={[10, 20, 50]}
              getRowId={(row) => row.id}
              disableSelectionOnClick
              pagination
            />
          </Box>
        )}

        {/* Modal */}
        <ActivityModal
          open={!!selectedActivity}
          activity={selectedActivity}
          onClose={() => setSelectedActivity(null)}
          onMarkRead={handleMarkRead}
        />
      </Box>
    </Box>
  );
}

export default ActivityFeedPage;
