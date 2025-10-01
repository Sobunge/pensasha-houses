// src/pages/LandlordPage/LandlordTenants.jsx
import React, { useState } from "react";
import {
  Box,
  Typography,
  Card,
  Avatar,
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableSortLabel,
  TablePagination,
  IconButton,
  Tooltip,
  Stack,
  Divider,
  useMediaQuery,
  TextField,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

import PersonIcon from "@mui/icons-material/Person";
import AddIcon from "@mui/icons-material/Add";
import VisibilityIcon from "@mui/icons-material/Visibility";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import MailIcon from "@mui/icons-material/Mail";

// Dummy tenants data (replace with API later)
const dummyTenants = Array.from({ length: 120 }).map((_, i) => ({
  id: i + 1,
  name: `Tenant ${i + 1}`,
  property: i % 2 === 0 ? "Greenwood Apartments" : "Lakeview Villas",
  email: `tenant${i + 1}@example.com`,
  status: i % 3 === 0 ? "Pending" : "Active",
  dateJoined: new Date(
    2024,
    Math.floor(Math.random() * 12),
    Math.floor(Math.random() * 28) + 1
  ).toISOString().split("T")[0], // YYYY-MM-DD
}));

// Sorting helper
const getComparator = (order, orderBy) => {
  return order === "desc"
    ? (a, b) => (b[orderBy] < a[orderBy] ? -1 : 1)
    : (a, b) => (a[orderBy] < b[orderBy] ? -1 : 1);
};

const LandlordTenants = () => {
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("name");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const handleSort = (property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleChangePage = (_, newPage) => setPage(newPage);

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // Filtering tenants by search query (name, email, property, status, date)
  const filteredTenants = dummyTenants.filter((tenant) => {
    const query = searchQuery.toLowerCase();
    return (
      tenant.name.toLowerCase().includes(query) ||
      tenant.email.toLowerCase().includes(query) ||
      tenant.property.toLowerCase().includes(query) ||
      tenant.status.toLowerCase().includes(query) ||
      tenant.dateJoined.includes(query)
    );
  });

  const sortedTenants = [...filteredTenants].sort(getComparator(order, orderBy));
  const paginatedTenants = sortedTenants.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  return (
    <Box sx={{ minHeight: "100%" }}>
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: -15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <Card
          sx={{
            mb: 4,
            p: { xs: 2, sm: 3 },
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: 2,
            borderRadius: 3,
            boxShadow: 3,
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <Avatar sx={{ bgcolor: "#f8b500", width: 56, height: 56 }}>
              <PersonIcon sx={{ color: "#111" }} />
            </Avatar>
            <Box>
              <Typography variant="h6" sx={{ fontWeight: 600 }}>
                Tenant Management
              </Typography>
              <Typography variant="body2" color="text.secondary">
                You currently have {filteredTenants.length} tenants
              </Typography>
            </Box>
          </Box>

          <Button
            variant="contained"
            startIcon={<AddIcon />}
            sx={{
              bgcolor: "#f8b500",
              color: "#111",
              fontWeight: 600,
              textTransform: "none",
              borderRadius: 2,
              px: 3,
              "&:hover": { bgcolor: "#ffc62c" },
            }}
          >
            Add Tenant
          </Button>
        </Card>
      </motion.div>

      {/* Search Bar */}
      <Box mb={3}>
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Search by name, email, property, status, or date (YYYY-MM-DD)"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </Box>

      {/* Responsive Tenant List */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.1 }}
      >
        {!isMobile ? (
          /* Desktop Table View */
          <Paper sx={{ width: "100%", overflow: "hidden" }}>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow sx={{ backgroundColor: "#f8f8f8" }}>
                    {/* Sort by Name */}
                    <TableCell sortDirection={orderBy === "name" ? order : false}>
                      <TableSortLabel
                        active={orderBy === "name"}
                        direction={orderBy === "name" ? order : "asc"}
                        onClick={() => handleSort("name")}
                      >
                        Name
                      </TableSortLabel>
                    </TableCell>

                    {/* Sort by Property */}
                    <TableCell sortDirection={orderBy === "property" ? order : false}>
                      <TableSortLabel
                        active={orderBy === "property"}
                        direction={orderBy === "property" ? order : "asc"}
                        onClick={() => handleSort("property")}
                      >
                        Property
                      </TableSortLabel>
                    </TableCell>

                    <TableCell>Email</TableCell>

                    {/* Sort by Status */}
                    <TableCell sortDirection={orderBy === "status" ? order : false}>
                      <TableSortLabel
                        active={orderBy === "status"}
                        direction={orderBy === "status" ? order : "asc"}
                        onClick={() => handleSort("status")}
                      >
                        Status
                      </TableSortLabel>
                    </TableCell>

                    {/* Sort by Date */}
                    <TableCell sortDirection={orderBy === "dateJoined" ? order : false}>
                      <TableSortLabel
                        active={orderBy === "dateJoined"}
                        direction={orderBy === "dateJoined" ? order : "asc"}
                        onClick={() => handleSort("dateJoined")}
                      >
                        Date Joined
                      </TableSortLabel>
                    </TableCell>

                    <TableCell align="center">Actions</TableCell>
                  </TableRow>
                </TableHead>

                <TableBody>
                  {paginatedTenants.map((tenant) => (
                    <TableRow key={tenant.id} hover>
                      <TableCell
                        sx={{ cursor: "pointer" }}
                        onClick={() => navigate(`/landlord/tenants/${tenant.id}`)}
                      >
                        {tenant.name}
                      </TableCell>
                      <TableCell>{tenant.property}</TableCell>
                      <TableCell>{tenant.email}</TableCell>
                      <TableCell>
                        <Typography
                          variant="caption"
                          sx={{
                            px: 1.5,
                            py: 0.5,
                            borderRadius: 1,
                            bgcolor:
                              tenant.status === "Active"
                                ? "success.light"
                                : "warning.light",
                            color:
                              tenant.status === "Active"
                                ? "success.dark"
                                : "warning.dark",
                            fontWeight: 600,
                          }}
                        >
                          {tenant.status}
                        </Typography>
                      </TableCell>
                      <TableCell>{tenant.dateJoined}</TableCell>
                      <TableCell align="center">
                        <Tooltip title="View Details">
                          <IconButton
                            onClick={() => navigate(`/landlord/tenants/${tenant.id}`)}
                          >
                            <VisibilityIcon />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="Send Message">
                          <IconButton>
                            <MailIcon />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="Update Lease">
                          <IconButton>
                            <EditIcon />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="Remove Tenant">
                          <IconButton color="error">
                            <DeleteIcon />
                          </IconButton>
                        </Tooltip>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>

            {/* Pagination */}
            <TablePagination
              component="div"
              count={filteredTenants.length}
              page={page}
              onPageChange={handleChangePage}
              rowsPerPage={rowsPerPage}
              onRowsPerPageChange={handleChangeRowsPerPage}
              rowsPerPageOptions={[5, 10, 25, 50]}
            />
          </Paper>
        ) : (
          /* Mobile Card/List View */
          <Stack spacing={2}>
            {paginatedTenants.map((tenant) => (
              <Card
                key={tenant.id}
                sx={{ p: 2, borderRadius: 2, boxShadow: 2, cursor: "pointer" }}
                onClick={() => navigate(`/landlord/tenants/${tenant.id}`)}
              >
                <Stack direction="row" spacing={2} alignItems="center">
                  <Avatar sx={{ bgcolor: "#f8b500" }}>
                    <PersonIcon sx={{ color: "#111" }} />
                  </Avatar>
                  <Box flex={1}>
                    <Typography fontWeight={600}>{tenant.name}</Typography>
                    <Typography variant="body2" color="text.secondary">
                      {tenant.property}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      {tenant.email}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      Joined: {tenant.dateJoined}
                    </Typography>
                  </Box>
                  <Typography
                    variant="caption"
                    sx={{
                      px: 1.2,
                      py: 0.3,
                      borderRadius: 1,
                      bgcolor:
                        tenant.status === "Active"
                          ? "success.light"
                          : "warning.light",
                      color:
                        tenant.status === "Active"
                          ? "success.dark"
                          : "warning.dark",
                      fontWeight: 600,
                    }}
                  >
                    {tenant.status}
                  </Typography>
                </Stack>

                <Divider sx={{ my: 1 }} />

                <Stack direction="row" spacing={1} justifyContent="flex-end">
                  <IconButton size="small">
                    <VisibilityIcon fontSize="small" />
                  </IconButton>
                  <IconButton size="small">
                    <MailIcon fontSize="small" />
                  </IconButton>
                  <IconButton size="small">
                    <EditIcon fontSize="small" />
                  </IconButton>
                  <IconButton size="small" color="error">
                    <DeleteIcon fontSize="small" />
                  </IconButton>
                </Stack>
              </Card>
            ))}

            {/* Pagination for mobile */}
            <TablePagination
              component="div"
              count={filteredTenants.length}
              page={page}
              onPageChange={handleChangePage}
              rowsPerPage={rowsPerPage}
              onRowsPerPageChange={handleChangeRowsPerPage}
              rowsPerPageOptions={[5, 10, 25]}
            />
          </Stack>
        )}
      </motion.div>
    </Box>
  );
};

export default LandlordTenants;
