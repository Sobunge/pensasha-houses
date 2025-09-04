import React, { useState, useMemo } from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  Table,
  TableHead,
  TableBody,
  TableCell,
  TableRow,
  TableContainer,
  Paper,
  Stack,
  Pagination,
  TextField,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";

function MaintenanceRequestList({ requests = [], onView }) {
  const [page, setPage] = useState(1);
  const [filter, setFilter] = useState("");
  const itemsPerPage = 6;

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  // Filtered requests based on title, type, priority, or status
  const filteredRequests = useMemo(() => {
    return requests.filter(
      (req) =>
        req.title.toLowerCase().includes(filter.toLowerCase()) ||
        req.type.toLowerCase().includes(filter.toLowerCase()) ||
        req.priority.toLowerCase().includes(filter.toLowerCase()) ||
        req.status.toLowerCase().includes(filter.toLowerCase())
    );
  }, [requests, filter]);

  const totalPages = Math.ceil(filteredRequests.length / itemsPerPage);

  const handleChange = (event, value) => setPage(value);

  const paginatedRequests = filteredRequests.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  );

  if (!requests.length) {
    return (
      <Box sx={{ textAlign: "center", mt: 4 }}>
        <Typography>No maintenance requests found.</Typography>
      </Box>
    );
  }

  return (
    <Box>
      {/* Filter Input */}
      <TextField
        label="Search Requests"
        variant="outlined"
        size="small"
        fullWidth
        sx={{ mb: 2 }}
        value={filter}
        onChange={(e) => {
          setFilter(e.target.value);
          setPage(1); // Reset to first page when filtering
        }}
      />

      {isMobile ? (
        // Mobile: Cards
        <Box>
          {paginatedRequests.map((req) => (
            <Card key={req.id} sx={{ mb: 2, p: 2, borderRadius: 2, boxShadow: 2 }}>
              <CardContent>
                <Typography variant="subtitle1" fontWeight={600}>
                  {req.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {req.type} | {req.priority} | {req.status}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                  {req.date}
                </Typography>
                <Button
                  size="small"
                  variant="contained"
                  color="primary"
                  startIcon={<VisibilityIcon />}
                  onClick={() => onView(req)}
                >
                  View
                </Button>
              </CardContent>
            </Card>
          ))}

          {/* Pagination */}
          {totalPages > 1 && (
            <Stack alignItems="center" sx={{ mt: 2 }}>
              <Pagination
                count={totalPages}
                page={page}
                onChange={handleChange}
                color="primary"
                size="small"
              />
            </Stack>
          )}
        </Box>
      ) : (
        // Desktop: Table
        <Box>
          <TableContainer component={Paper} sx={{ borderRadius: 2, boxShadow: 2 }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell sx={{ fontWeight: 700 }}>Title</TableCell>
                  <TableCell sx={{ fontWeight: 700 }}>Type</TableCell>
                  <TableCell sx={{ fontWeight: 700 }}>Priority</TableCell>
                  <TableCell sx={{ fontWeight: 700 }}>Status</TableCell>
                  <TableCell sx={{ fontWeight: 700 }}>Date</TableCell>
                  <TableCell sx={{ fontWeight: 700 }}>Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {paginatedRequests.map((req) => (
                  <TableRow key={req.id}>
                    <TableCell>{req.title}</TableCell>
                    <TableCell>{req.type}</TableCell>
                    <TableCell>{req.priority}</TableCell>
                    <TableCell>{req.status}</TableCell>
                    <TableCell>{req.date}</TableCell>
                    <TableCell>
                      <Button
                        size="small"
                        variant="contained"
                        color="primary"
                        startIcon={<VisibilityIcon />}
                        onClick={() => onView(req)}
                      >
                        View
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          {/* Pagination */}
          {totalPages > 1 && (
            <Stack alignItems="center" sx={{ mt: 2 }}>
              <Pagination
                count={totalPages}
                page={page}
                onChange={handleChange}
                color="primary"
                size="medium"
              />
            </Stack>
          )}
        </Box>
      )}
    </Box>
  );
}

export default MaintenanceRequestList;
