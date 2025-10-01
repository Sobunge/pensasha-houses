// src/pages/LandlordPage/LandlordFinance.jsx
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
  TablePagination,
  TableSortLabel,
  Stack,
  Divider,
  IconButton,
  Tooltip,
  useMediaQuery,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { motion } from "framer-motion";

import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import DownloadIcon from "@mui/icons-material/Download";
import VisibilityIcon from "@mui/icons-material/Visibility";

// Dummy finance data
const dummyTransactions = Array.from({ length: 50 }).map((_, i) => ({
  id: i + 1,
  date: `2025-09-${(i % 30) + 1}`,
  type: i % 2 === 0 ? "Rent Payment" : "Maintenance Expense",
  property: i % 3 === 0 ? "Greenwood Apartments" : "Lakeview Villas",
  amount: i % 2 === 0 ? 1500 : -500,
  status: i % 2 === 0 ? "Completed" : "Pending",
  reference: `TXN${1000 + i}`,
  description:
    i % 2 === 0
      ? "Monthly rent payment received from tenant"
      : "Repair and maintenance cost",
}));

// Sorting helper
const getComparator = (order, orderBy) =>
  order === "desc"
    ? (a, b) => (b[orderBy] < a[orderBy] ? -1 : 1)
    : (a, b) => (a[orderBy] < b[orderBy] ? -1 : 1);

const LandlordFinance = () => {
  const [order, setOrder] = useState("desc");
  const [orderBy, setOrderBy] = useState("date");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTxn, setSelectedTxn] = useState(null); // modal state

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

  // Filter by search (includes date now)
  const filteredData = dummyTransactions.filter((txn) =>
    [txn.date, txn.type, txn.property, txn.status, txn.reference]
      .join(" ")
      .toLowerCase()
      .includes(searchQuery.toLowerCase())
  );

  const sortedData = [...filteredData].sort(getComparator(order, orderBy));
  const paginatedData = sortedData.slice(
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
              <AccountBalanceWalletIcon sx={{ color: "#111" }} />
            </Avatar>
            <Box>
              <Typography variant="h6" sx={{ fontWeight: 600 }}>
                Financial Overview
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Track rent, expenses, and outstanding balances
              </Typography>
            </Box>
          </Box>

          <Button
            variant="contained"
            startIcon={<DownloadIcon />}
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
            Export Report
          </Button>
        </Card>
      </motion.div>

      {/* Search Bar */}
      <Box sx={{ mb: 2 }}>
        <TextField
          fullWidth
          variant="outlined"
          size="small"
          placeholder="Search by date, type, property, status, or reference..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </Box>

      {/* Transactions List */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.1 }}
      >
        {!isMobile ? (
          /* Desktop Table */
          <Paper sx={{ width: "100%", overflow: "hidden" }}>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow sx={{ backgroundColor: "#f8f8f8" }}>
                    <TableCell>
                      <TableSortLabel
                        active={orderBy === "date"}
                        direction={orderBy === "date" ? order : "asc"}
                        onClick={() => handleSort("date")}
                      >
                        Date
                      </TableSortLabel>
                    </TableCell>
                    <TableCell>
                      <TableSortLabel
                        active={orderBy === "type"}
                        direction={orderBy === "type" ? order : "asc"}
                        onClick={() => handleSort("type")}
                      >
                        Type
                      </TableSortLabel>
                    </TableCell>
                    <TableCell>
                      <TableSortLabel
                        active={orderBy === "property"}
                        direction={orderBy === "property" ? order : "asc"}
                        onClick={() => handleSort("property")}
                      >
                        Property
                      </TableSortLabel>
                    </TableCell>
                    <TableCell align="right">Amount</TableCell>
                    <TableCell>
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
                  {paginatedData.map((txn) => (
                    <TableRow key={txn.id} hover>
                      <TableCell>{txn.date}</TableCell>
                      <TableCell>{txn.type}</TableCell>
                      <TableCell>{txn.property}</TableCell>
                      <TableCell
                        align="right"
                        sx={{ color: txn.amount > 0 ? "success.main" : "error.main" }}
                      >
                        {txn.amount > 0 ? `+${txn.amount}` : txn.amount} Ksh
                      </TableCell>
                      <TableCell>
                        <Typography
                          variant="caption"
                          sx={{
                            px: 1.5,
                            py: 0.5,
                            borderRadius: 1,
                            bgcolor:
                              txn.status === "Completed"
                                ? "success.light"
                                : "warning.light",
                            color:
                              txn.status === "Completed"
                                ? "success.dark"
                                : "warning.dark",
                            fontWeight: 600,
                          }}
                        >
                          {txn.status}
                        </Typography>
                      </TableCell>
                      <TableCell align="center">
                        <Tooltip title="View Transaction">
                          <IconButton onClick={() => setSelectedTxn(txn)}>
                            <VisibilityIcon />
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
              count={filteredData.length}
              page={page}
              onPageChange={handleChangePage}
              rowsPerPage={rowsPerPage}
              onRowsPerPageChange={handleChangeRowsPerPage}
              rowsPerPageOptions={[5, 10, 25]}
            />
          </Paper>
        ) : (
          /* Mobile Cards */
          <Stack spacing={2}>
            {paginatedData.map((txn) => (
              <Card key={txn.id} sx={{ p: 2, borderRadius: 2, boxShadow: 2 }}>
                <Stack spacing={1}>
                  <Typography variant="subtitle2" fontWeight={600}>
                    {txn.type}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    {txn.date} • {txn.property}
                  </Typography>
                  <Typography
                    fontWeight={600}
                    sx={{ color: txn.amount > 0 ? "success.main" : "error.main" }}
                  >
                    {txn.amount > 0 ? `+${txn.amount}` : txn.amount} Ksh
                  </Typography>
                  <Divider />
                  <Stack
                    direction="row"
                    justifyContent="space-between"
                    alignItems="center"
                  >
                    <Typography
                      variant="caption"
                      sx={{
                        px: 1.2,
                        py: 0.3,
                        borderRadius: 1,
                        bgcolor:
                          txn.status === "Completed"
                            ? "success.light"
                            : "warning.light",
                        color:
                          txn.status === "Completed"
                            ? "success.dark"
                            : "warning.dark",
                        fontWeight: 600,
                      }}
                    >
                      {txn.status}
                    </Typography>
                    <IconButton size="small" onClick={() => setSelectedTxn(txn)}>
                      <VisibilityIcon fontSize="small" />
                    </IconButton>
                  </Stack>
                </Stack>
              </Card>
            ))}

            {/* Pagination */}
            <TablePagination
              component="div"
              count={filteredData.length}
              page={page}
              onPageChange={handleChangePage}
              rowsPerPage={rowsPerPage}
              onRowsPerPageChange={handleChangeRowsPerPage}
              rowsPerPageOptions={[5, 10, 25]}
            />
          </Stack>
        )}
      </motion.div>

      {/* Transaction Details Modal */}
      <Dialog
        open={Boolean(selectedTxn)}
        onClose={() => setSelectedTxn(null)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>Transaction Details</DialogTitle>
        {selectedTxn && (
          <DialogContent dividers>
            <Typography variant="body1" fontWeight={600}>
              {selectedTxn.type}
            </Typography>
            <Typography variant="body2" color="text.secondary" gutterBottom>
              {selectedTxn.date} • {selectedTxn.property}
            </Typography>
            <Typography
              sx={{ mt: 1 }}
              fontWeight={600}
              color={selectedTxn.amount > 0 ? "success.main" : "error.main"}
            >
              {selectedTxn.amount > 0 ? `+${selectedTxn.amount}` : selectedTxn.amount} Ksh
            </Typography>
            <Typography variant="body2" sx={{ mt: 2 }}>
              Status:{" "}
              <b style={{ color: selectedTxn.status === "Completed" ? "green" : "orange" }}>
                {selectedTxn.status}
              </b>
            </Typography>
            <Typography variant="body2">Reference: {selectedTxn.reference}</Typography>
            <Typography variant="body2" sx={{ mt: 2 }}>
              {selectedTxn.description}
            </Typography>
          </DialogContent>
        )}
        <DialogActions>
          <Button onClick={() => setSelectedTxn(null)}>Close</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default LandlordFinance;
