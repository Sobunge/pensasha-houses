// src/pages/LandlordPage/LandlordCaretakers.jsx
import React, { useState, useMemo } from "react";
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
  TextField,
  useMediaQuery,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

import SupervisorAccountIcon from "@mui/icons-material/SupervisorAccount";
import AddIcon from "@mui/icons-material/Add";
import VisibilityIcon from "@mui/icons-material/Visibility";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import MailIcon from "@mui/icons-material/Mail";
import PhoneIcon from "@mui/icons-material/Phone";

// Dummy caretakers data (replace with API later)
const dummyCaretakers = Array.from({ length: 45 }).map((_, i) => ({
  id: i + 1,
  name: `Caretaker ${i + 1}`,
  property: i % 2 === 0 ? "Greenwood Apartments" : "Lakeview Villas",
  email: `caretaker${i + 1}@example.com`,
  phone: `+25471234${(100 + i).toString().slice(-3)}`,
  status: i % 3 === 0 ? "Inactive" : "Active",
}));

// Sorting helper
const getComparator = (order, orderBy) =>
  order === "desc"
    ? (a, b) => (b[orderBy] < a[orderBy] ? -1 : 1)
    : (a, b) => (a[orderBy] < b[orderBy] ? -1 : 1);

const LandlordCaretakers = () => {
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("name");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchQuery, setSearchQuery] = useState("");

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const navigate = useNavigate();

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

  // Filter caretakers based on search
  const filteredCaretakers = useMemo(() => {
    return dummyCaretakers.filter((caretaker) => {
      const query = searchQuery.toLowerCase();
      return (
        caretaker.name.toLowerCase().includes(query) ||
        caretaker.property.toLowerCase().includes(query) ||
        caretaker.email.toLowerCase().includes(query) ||
        caretaker.phone.toLowerCase().includes(query) ||
        caretaker.status.toLowerCase().includes(query)
      );
    });
  }, [searchQuery]);

  const sortedCaretakers = [...filteredCaretakers].sort(
    getComparator(order, orderBy)
  );

  const paginatedCaretakers = sortedCaretakers.slice(
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
              <SupervisorAccountIcon sx={{ color: "#111" }} />
            </Avatar>
            <Box>
              <Typography variant="h6" sx={{ fontWeight: 600 }}>
                Caretaker Management
              </Typography>
              <Typography variant="body2" color="text.secondary">
                You currently have {dummyCaretakers.length} caretakers
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
            Add Caretaker
          </Button>
        </Card>
      </motion.div>

      {/* Search Bar */}
      <TextField
        placeholder="Search by name, property, email, phone, or status..."
        variant="outlined"
        size="small"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        fullWidth
        sx={{ mb: 3 }}
      />

      {/* Caretaker List */}
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
                    <TableCell sortDirection={orderBy === "name" ? order : false}>
                      <TableSortLabel
                        active={orderBy === "name"}
                        direction={orderBy === "name" ? order : "asc"}
                        onClick={() => handleSort("name")}
                      >
                        Name
                      </TableSortLabel>
                    </TableCell>
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
                    <TableCell>Phone</TableCell>
                    <TableCell sortDirection={orderBy === "status" ? order : false}>
                      <TableSortLabel
                        active={orderBy === "status"}
                        direction={orderBy === "status" ? order : "asc"}
                        onClick={() => handleSort("status")}
                      >
                        Status
                      </TableSortLabel>
                    </TableCell>
                    <TableCell align="center">Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {paginatedCaretakers.map((caretaker) => (
                    <TableRow key={caretaker.id} hover>
                      <TableCell
                        sx={{ cursor: "pointer" }}
                        onClick={() =>
                          navigate(`/landlord/caretakers/${caretaker.id}`)
                        }
                      >
                        {caretaker.name}
                      </TableCell>
                      <TableCell>{caretaker.property}</TableCell>
                      <TableCell>{caretaker.email}</TableCell>
                      <TableCell>{caretaker.phone}</TableCell>
                      <TableCell>
                        <Typography
                          variant="caption"
                          sx={{
                            px: 1.5,
                            py: 0.5,
                            borderRadius: 1,
                            bgcolor:
                              caretaker.status === "Active"
                                ? "success.light"
                                : "error.light",
                            color:
                              caretaker.status === "Active"
                                ? "success.dark"
                                : "error.dark",
                            fontWeight: 600,
                          }}
                        >
                          {caretaker.status}
                        </Typography>
                      </TableCell>
                      <TableCell align="center">
                        <Tooltip title="View Details">
                          <IconButton
                            onClick={() =>
                              navigate(`/landlord/caretakers/${caretaker.id}`)
                            }
                          >
                            <VisibilityIcon />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="Send Email">
                          <IconButton>
                            <MailIcon />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="Call">
                          <IconButton>
                            <PhoneIcon />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="Edit">
                          <IconButton>
                            <EditIcon />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="Remove">
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
              count={filteredCaretakers.length}
              page={page}
              onPageChange={handleChangePage}
              rowsPerPage={rowsPerPage}
              onRowsPerPageChange={handleChangeRowsPerPage}
              rowsPerPageOptions={[5, 10, 25]}
            />
          </Paper>
        ) : (
          /* Mobile Card/List View */
          <Stack spacing={2}>
            {paginatedCaretakers.map((caretaker) => (
              <Card
                key={caretaker.id}
                sx={{ p: 2, borderRadius: 2, boxShadow: 2 }}
              >
                <Stack direction="row" spacing={2} alignItems="center">
                  <Avatar sx={{ bgcolor: "#f8b500" }}>
                    <SupervisorAccountIcon sx={{ color: "#111" }} />
                  </Avatar>
                  <Box flex={1}>
                    <Typography fontWeight={600}>{caretaker.name}</Typography>
                    <Typography variant="body2" color="text.secondary">
                      {caretaker.property}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      {caretaker.email} • {caretaker.phone}
                    </Typography>
                  </Box>
                  <Typography
                    variant="caption"
                    sx={{
                      px: 1.2,
                      py: 0.3,
                      borderRadius: 1,
                      bgcolor:
                        caretaker.status === "Active"
                          ? "success.light"
                          : "error.light",
                      color:
                        caretaker.status === "Active"
                          ? "success.dark"
                          : "error.dark",
                      fontWeight: 600,
                    }}
                  >
                    {caretaker.status}
                  </Typography>
                </Stack>

                <Divider sx={{ my: 1 }} />

                <Stack direction="row" spacing={1} justifyContent="flex-end">
                  <IconButton
                    size="small"
                    onClick={() =>
                      navigate(`/landlord/caretakers/${caretaker.id}`)
                    }
                  >
                    <VisibilityIcon fontSize="small" />
                  </IconButton>
                  <IconButton size="small">
                    <MailIcon fontSize="small" />
                  </IconButton>
                  <IconButton size="small">
                    <PhoneIcon fontSize="small" />
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
              count={filteredCaretakers.length}
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

export default LandlordCaretakers;
