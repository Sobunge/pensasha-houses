// src/pages/LandlordPage/LandlordReports.jsx
import React, { useState } from "react";
import {
  Box,
  Typography,
  Card,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  TableSortLabel,
  TextField,
  useMediaQuery,
  useTheme,
  Stack,
} from "@mui/material";
import { motion } from "framer-motion";

// Theme colors
const THEME_COLORS = {
  primary: "#f8b500",
  dark: "#2a2a2a",
  text: "#111111",
};

// Dummy stats
const overviewStats = [
  { label: "Total Properties", value: 12 },
  { label: "Total Tenants", value: 85 },
  { label: "Total Caretakers", value: 15 },
  { label: "Total Income (This Month)", value: "Ksh 450,000" },
  { label: "Outstanding Payments", value: "Ksh 75,000" },
];

// Dummy table data
const reportData = [
  { property: "Greenwood Apts", income: 120000, expenses: 40000, occupancy: "95%" },
  { property: "Lakeview Villas", income: 90000, expenses: 30000, occupancy: "88%" },
  { property: "Sunset Towers", income: 60000, expenses: 25000, occupancy: "80%" },
  { property: "Hilltop Homes", income: 75000, expenses: 27000, occupancy: "92%" },
];

const LandlordReports = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("property");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const handleSort = (property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const filteredReports = reportData.filter((row) =>
    row.property.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const sortedReports = [...filteredReports].sort((a, b) =>
    order === "asc" ? (a[orderBy] > b[orderBy] ? 1 : -1) : (b[orderBy] > a[orderBy] ? 1 : -1)
  );

  const paginatedReports = sortedReports.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  return (
    <Box sx={{ minHeight: "100%", p: { xs: 1, md: 2 } }}>
      {/* Overview Cards */}
      <Grid container spacing={2} mb={4} justifyContent="center">
        {overviewStats.map((stat, i) => (
          <Grid item xs={12} sm={6} md={4} lg={2.4} key={i}>
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
              <Card
                sx={{
                  p: 2,
                  borderRadius: 3,
                  textAlign: "center",
                  boxShadow: 2,
                  bgcolor: "#fff",
                }}
              >
                <Typography variant="body1" sx={{ fontWeight: 600, color: THEME_COLORS.dark }}>
                  {stat.label}
                </Typography>
                <Typography
                  variant="h6"
                  sx={{ fontWeight: 700, mt: 1, color: THEME_COLORS.primary }}
                >
                  {stat.value}
                </Typography>
              </Card>
            </motion.div>
          </Grid>
        ))}
      </Grid>

      {/* Detailed Reports */}
      <Paper sx={{ p: 2, borderRadius: 3, bgcolor: "#fff" }}>
        <Typography
          variant="h6"
          mb={2}
          sx={{ color: THEME_COLORS.dark, fontWeight: 700, textAlign: "center" }}
        >
          Detailed Reports
        </Typography>

        <TextField
          placeholder="Search property..."
          variant="outlined"
          size="small"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          sx={{ mb: 2 }}
          fullWidth
        />

        {isMobile ? (
          <Stack spacing={2}>
            {paginatedReports.map((row, i) => (
              <Card key={i} sx={{ p: 2, borderRadius: 2, boxShadow: 2 }}>
                <Typography variant="subtitle1" sx={{ fontWeight: 700, color: THEME_COLORS.text }}>
                  {row.property}
                </Typography>
                <Typography variant="body2">Income: Ksh {row.income.toLocaleString()}</Typography>
                <Typography variant="body2">Expenses: Ksh {row.expenses.toLocaleString()}</Typography>
                <Typography variant="body2">Occupancy: {row.occupancy}</Typography>
              </Card>
            ))}
          </Stack>
        ) : (
          <>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell sx={{ fontWeight: 700 }}>
                      <TableSortLabel
                        active={orderBy === "property"}
                        direction={orderBy === "property" ? order : "asc"}
                        onClick={() => handleSort("property")}
                      >
                        Property
                      </TableSortLabel>
                    </TableCell>
                    <TableCell sx={{ fontWeight: 700 }}>Income</TableCell>
                    <TableCell sx={{ fontWeight: 700 }}>Expenses</TableCell>
                    <TableCell sx={{ fontWeight: 700 }}>Occupancy</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {paginatedReports.map((row, i) => (
                    <TableRow key={i} hover>
                      <TableCell sx={{ fontWeight: 600, color: THEME_COLORS.text }}>
                        {row.property}
                      </TableCell>
                      <TableCell>Ksh {row.income.toLocaleString()}</TableCell>
                      <TableCell>Ksh {row.expenses.toLocaleString()}</TableCell>
                      <TableCell>{row.occupancy}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>

            <TablePagination
              component="div"
              count={filteredReports.length}
              page={page}
              onPageChange={(_, newPage) => setPage(newPage)}
              rowsPerPage={rowsPerPage}
              onRowsPerPageChange={(e) => setRowsPerPage(parseInt(e.target.value, 10))}
              rowsPerPageOptions={[5, 10, 25]}
            />
          </>
        )}
      </Paper>
    </Box>
  );
};

export default LandlordReports;
