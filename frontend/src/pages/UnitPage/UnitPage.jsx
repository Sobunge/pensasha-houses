import React, { useState, useMemo } from "react";
import { 
  Box, Typography, Button, Grid, Chip, Stack, 
  useMediaQuery, Container, Paper, Tabs, Tab, useTheme, Card, CardContent 
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import EditIcon from "@mui/icons-material/Edit";
import VisibilityIcon from "@mui/icons-material/Visibility";

// Components
import TenantCard from "../../components/cards/TenantCard";
import QuickActions from "../../components/cards/QuickActions";
import PaymentLedger from "../../pages/RentPaymentPage/PaymentLedger"; 
import ActivityFilters from "../../pages/ActivityFeedPage/ActivityFilters"; // Assuming path
import ActivityModal from "../../pages/ActivityFeedPage/ActivityModal";     // Assuming path

const unitDetails = {
  id: 101,
  unitNumber: "A-101",
  property: "Sunrise Apartments",
  type: "2 Bedroom, 1 Bath",
  status: "Occupied",
  rentAmount: 45000,
  lastPayment: "2026-04-01",
  tenant: {
    name: "Alice Wanjiku",
    phone: "+254 712 345 678",
    email: "alice.w@email.com",
    leaseStart: "2025-01-15",
    leaseEnd: "2026-01-15",
  },
  recentActivities: [
    { id: 1, date: "Apr 05, 2026", task: "Sink repair completed", type: "Maintenance", status: "Read" },
    { id: 2, date: "Apr 01, 2026", task: "Rent paid (KES 45,000)", type: "Payment", status: "Read" },
    { id: 3, date: "Mar 20, 2026", task: "Lease renewal signed", type: "Admin", status: "Unread" },
  ],
  paymentHistory: [
    { id: 1, date: "2026-04-01", description: "April Rent", amount: 45000, method: "M-Pesa", status: "Paid" },
    { id: 2, date: "2026-03-02", description: "March Rent", amount: 45000, method: "Bank Transfer", status: "Paid" },
    { id: 3, date: "2026-02-15", description: "Water Bill (Feb)", amount: 1250, method: "M-Pesa", status: "Paid" },
  ]
};

const UnitPage = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  
  // State
  const [tabValue, setTabValue] = useState(0);
  const [filters, setFilters] = useState({ search: "", type: "", status: "" });
  const [page, setPage] = useState(1);
  const [selectedActivity, setSelectedActivity] = useState(null);
  
  const pageSize = 5;

  // --- Activity Logic ---
  const filteredActivities = useMemo(() => {
    return unitDetails.recentActivities.filter((a) => {
      const searchMatch = !filters.search || a.task.toLowerCase().includes(filters.search.toLowerCase());
      const typeMatch = !filters.type || a.type === filters.type;
      const statusMatch = !filters.status || a.status === filters.status;
      return searchMatch && typeMatch && statusMatch;
    });
  }, [filters]);

  const totalPages = Math.ceil(filteredActivities.length / pageSize);
  const paginatedActivities = filteredActivities.slice((page - 1) * pageSize, page * pageSize);

  const handleFilterChange = (e) => {
    setFilters(prev => ({ ...prev, [e.target.name]: e.target.value }));
    setPage(1);
  };

  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "#f9fafb", pb: 6, pt: { xs: 2, md: 3 } }}>
      <Container maxWidth="lg">
        
        {/* HEADER NAVIGATION */}
        <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 2 }}>
          <Button 
            startIcon={<ArrowBackIosNewIcon sx={{ fontSize: '12px !important' }} />} 
            onClick={() => navigate(-1)}
            sx={{ color: "text.secondary", fontWeight: 700, textTransform: 'none', fontSize: '0.875rem' }}
          >
            {isMobile ? "" : "Back"}
          </Button>
          <Button 
            variant="contained" 
            size="small"
            startIcon={<EditIcon sx={{ fontSize: '16px !important' }} />}
            sx={{ borderRadius: "8px", bgcolor: "#111", fontWeight: 700, textTransform: 'none', px: 2 }}
          >
            {isMobile ? "Edit" : "Edit Details"}
          </Button>
        </Stack>

        <Paper 
          elevation={0} 
          sx={{ borderRadius: 4, boxShadow: "0 4px 20px rgba(0,0,0,0.03)", bgcolor: "#fff", p: { xs: 2, sm: 3, md: 4 } }}
        >
          {/* HERO SECTION */}
          <Box sx={{ mb: 4, textAlign: "center" }}> 
            <Stack direction="row" spacing={1} alignItems="center" justifyContent="center" sx={{ mb: 0.5 }}>
              <Typography variant={isMobile ? "h5" : "h4"} fontWeight={900} sx={{ letterSpacing: "-1px" }}>
                Unit {unitDetails.unitNumber}
              </Typography>
              <Chip 
                label={unitDetails.status} 
                size="small"
                sx={{ fontWeight: 800, borderRadius: "6px", bgcolor: "#e8f5e9", color: "#2e7d32", height: 24 }} 
              />
            </Stack>
            <Typography variant="body2" sx={{ color: "text.secondary", fontWeight: 500 }}>
              {unitDetails.property} — {unitDetails.type}
            </Typography>
          </Box>

          {/* TABS */}
          <Box sx={{ display: 'flex', justifyContent: 'center', mb: 3 }}>
            <Tabs 
              value={tabValue} 
              onChange={(e, v) => setTabValue(v)} 
              sx={{ 
                minHeight: 40,
                '& .MuiTabs-indicator': { bgcolor: '#f8b500', height: 2 },
                '& .MuiTab-root': { minHeight: 40, py: 1, fontSize: '0.85rem', textTransform: 'none', fontWeight: 700 }
              }}
            >
              <Tab label="Overview" />
              <Tab label="Payments" />
              <Tab label="Activities" />
            </Tabs>
          </Box>

          {/* TAB CONTENT */}
          <Box>
            {tabValue === 0 && (
              <Grid container spacing={8} justifyContent="center">
                <Grid item xs={12} md={7}><TenantCard tenant={unitDetails.tenant} variant="outlined" /></Grid>
                <Grid item xs={12} md={5}>
                  <QuickActions rentAmount={unitDetails.rentAmount} lastPayment={unitDetails.lastPayment} />
                </Grid>
              </Grid>
            )}

            {tabValue === 1 && (
              <Box>
                <Typography variant="subtitle1" fontWeight={800} sx={{ mb: 2 }}>Payment History</Typography>
                <PaymentLedger payments={unitDetails.paymentHistory} />
              </Box>
            )}

            {tabValue === 2 && (
              <Box>
                <Typography variant="subtitle1" fontWeight={800} sx={{ mb: 2 }}>Unit Activity Feed</Typography>
                
                <ActivityFilters 
                  filters={filters} 
                  onChange={handleFilterChange} 
                  onReset={() => setFilters({ search: "", type: "", status: "" })} 
                />

                <Stack spacing={1.5} sx={{ mt: 2 }}>
                  {paginatedActivities.map((a) => (
                    <Card key={a.id} variant="outlined" sx={{ 
                      borderRadius: 2, 
                      borderLeft: a.status === "Unread" ? "4px solid #f8b500" : "1px solid #e0e0e0" 
                    }}>
                      <CardContent sx={{ p: 2, '&:last-child': { pb: 2 } }}>
                        <Stack direction="row" justifyContent="space-between" alignItems="flex-start">
                          <Box>
                            <Typography variant="caption" color="text.secondary" fontWeight={600}>{a.date}</Typography>
                            <Typography variant="body2" fontWeight={700}>{a.task}</Typography>
                          </Box>
                          <Button 
                            size="small" 
                            startIcon={<VisibilityIcon sx={{ fontSize: '16px !important' }}/>}
                            onClick={() => setSelectedActivity(a)}
                            sx={{ textTransform: 'none' }}
                          >
                            View
                          </Button>
                        </Stack>
                        <Chip label={a.type} size="small" sx={{ mt: 1, height: 20, fontSize: '0.65rem', fontWeight: 700 }} />
                      </CardContent>
                    </Card>
                  ))}
                </Stack>

                {/* Pagination Controls */}
                {totalPages > 1 && (
                  <Stack direction="row" justifyContent="center" alignItems="center" spacing={2} sx={{ mt: 3 }}>
                    <Button size="small" disabled={page === 1} onClick={() => setPage(p => p - 1)}>Prev</Button>
                    <Typography variant="caption">Page {page} of {totalPages}</Typography>
                    <Button size="small" disabled={page === totalPages} onClick={() => setPage(p => p + 1)}>Next</Button>
                  </Stack>
                )}
              </Box>
            )}
          </Box>
        </Paper>
      </Container>

      <ActivityModal 
        open={!!selectedActivity} 
        activity={selectedActivity} 
        onClose={() => setSelectedActivity(null)} 
      />
    </Box>
  );
};

export default UnitPage;