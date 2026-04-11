import React, { useState, useMemo } from "react";
import { 
  Table, TableBody, TableCell, TableContainer, 
  TableHead, TableRow, Paper, Typography, Chip, 
  TablePagination, Box, Stack, useTheme, useMediaQuery,
  TextField, MenuItem, InputAdornment
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

const PaymentLedger = ({ payments = [] }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  
  // Search and Filter State
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  // Pagination State
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  // --- Filtering Logic ---
  const filteredPayments = useMemo(() => {
    return payments.filter((payment) => {
      const matchesSearch = 
        payment.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        payment.method.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesStatus = 
        statusFilter === "All" || payment.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [payments, searchTerm, statusFilter]);

  // Reset page when filtering
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setPage(0);
  };

  const handleStatusChange = (e) => {
    setStatusFilter(e.target.value);
    setPage(0);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const displayedPayments = filteredPayments.slice(
    page * rowsPerPage, 
    page * rowsPerPage + rowsPerPage
  );

  const filterHeader = (
    <Stack 
      direction={isMobile ? "column" : "row"} 
      spacing={2} 
      sx={{ mb: 2 }}
    >
      <TextField
        placeholder="Search description or method..."
        size="small"
        fullWidth
        value={searchTerm}
        onChange={handleSearchChange}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon sx={{ fontSize: 20, color: 'text.secondary' }} />
            </InputAdornment>
          ),
        }}
        sx={{ bgcolor: "#fff" }}
      />
      <TextField
        select
        label="Status"
        value={statusFilter}
        onChange={handleStatusChange}
        size="small"
        sx={{ minWidth: isMobile ? "100%" : 150, bgcolor: "#fff" }}
      >
        <MenuItem value="All">All Statuses</MenuItem>
        <MenuItem value="Paid">Paid</MenuItem>
        <MenuItem value="Pending">Pending</MenuItem>
        <MenuItem value="Overdue">Overdue</MenuItem>
      </TextField>
    </Stack>
  );

  // --- Mobile Card View ---
  if (isMobile) {
    return (
      <Box>
        {filterHeader}
        <Stack spacing={2}>
          {displayedPayments.map((row) => (
            <Paper 
              key={row.id} 
              variant="outlined" 
              sx={{ p: 2, borderRadius: 2, borderLeft: `4px solid ${row.status === "Paid" ? "#2e7d32" : "#ed6c02"}` }}
            >
              <Stack direction="row" justifyContent="space-between" alignItems="flex-start" sx={{ mb: 1 }}>
                <Box>
                  <Typography variant="caption" color="text.secondary" fontWeight={700}>
                    {row.date}
                  </Typography>
                  <Typography variant="body1" fontWeight={700}>
                    {row.description}
                  </Typography>
                </Box>
                <Chip 
                  label={row.status} 
                  size="small"
                  color={row.status === "Paid" ? "success" : "warning"}
                  sx={{ fontWeight: 700, height: 20, fontSize: '0.65rem' }}
                />
              </Stack>
              
              <Stack direction="row" justifyContent="space-between" alignItems="center">
                <Typography variant="body2" color="text.secondary">
                  {row.method}
                </Typography>
                <Typography variant="body1" fontWeight={900}>
                  KES {row.amount.toLocaleString()}
                </Typography>
              </Stack>
            </Paper>
          ))}
          {filteredPayments.length === 0 && (
            <Typography variant="body2" textAlign="center" color="text.secondary" sx={{ py: 4 }}>
              No payments found matching your filters.
            </Typography>
          )}
        </Stack>
        
        <TablePagination
          component="div"
          count={filteredPayments.length}
          page={page}
          onPageChange={handleChangePage}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          rowsPerPageOptions={[5, 10, 25]}
          sx={{ mt: 1 }}
        />
      </Box>
    );
  }

  // --- Desktop Table View ---
  return (
    <Box>
      {filterHeader}
      <Paper variant="outlined" sx={{ borderRadius: 3, overflow: 'hidden' }}>
        <TableContainer>
          <Table size="small">
            <TableHead sx={{ bgcolor: "#f9fafb" }}>
              <TableRow>
                <TableCell sx={{ fontWeight: 700, py: 1.5 }}>Date</TableCell>
                <TableCell sx={{ fontWeight: 700 }}>Description</TableCell>
                <TableCell sx={{ fontWeight: 700 }}>Method</TableCell>
                <TableCell sx={{ fontWeight: 700 }} align="right">Amount</TableCell>
                <TableCell sx={{ fontWeight: 700 }} align="center">Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {displayedPayments.map((row) => (
                <TableRow key={row.id} hover>
                  <TableCell sx={{ fontSize: '0.85rem' }}>{row.date}</TableCell>
                  <TableCell sx={{ fontWeight: 600, fontSize: '0.85rem' }}>{row.description}</TableCell>
                  <TableCell sx={{ fontSize: '0.85rem' }}>{row.method}</TableCell>
                  <TableCell align="right" sx={{ fontWeight: 800, fontSize: '0.85rem' }}>
                    KES {row.amount.toLocaleString()}
                  </TableCell>
                  <TableCell align="center">
                    <Chip 
                      label={row.status} 
                      size="small"
                      color={row.status === "Paid" ? "success" : "warning"}
                      sx={{ fontWeight: 700, borderRadius: 1.5, height: 22, fontSize: '0.7rem' }}
                    />
                  </TableCell>
                </TableRow>
              ))}
              {filteredPayments.length === 0 && (
                <TableRow>
                  <TableCell colSpan={5} align="center" sx={{ py: 4 }}>
                    <Typography variant="body2" color="text.secondary">
                      No payments found.
                    </Typography>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={filteredPayments.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          sx={{ borderTop: '1px solid #eee' }}
        />
      </Paper>
    </Box>
  );
};

export default PaymentLedger;