// src/pages/RentPayments/RentPaymentsPage.jsx
import React, { useState } from "react";
import { Box, Typography, Divider, Stack } from "@mui/material";
import PaymentsIcon from "@mui/icons-material/Payments";
import UsersNavbar from "../../components/UsersNavbar";
import PaymentFilters from "./PaymentFilters";
import RentSummaryCard from "./RentSummaryCard";
import PaymentsTable from "./PaymentsTable";
import PaymentModal from "./PaymentModal";
import UsersSidebar from "../../components/UserSidebar"; // ✅ Unified sidebar

function RentPaymentsPage() {
  const { user } = useAuth(); // get logged-in user (with role)
  const [payments, setPayments] = useState([
    { id: 1, invoiceNo: "INV-001", period: "September 2025", amount: 15000, status: "Paid", dueDate: "2025-09-05", method: "Mpesa", ref: "MP123456" },
    { id: 2, invoiceNo: "INV-002", period: "October 2025", amount: 15000, status: "Pending", dueDate: "2025-10-05", method: "", ref: "" },
    { id: 3, invoiceNo: "INV-003", period: "August 2025", amount: 15000, status: "Overdue", dueDate: "2025-08-05", method: "", ref: "" },
  ]);

  const [filters, setFilters] = useState({ search: "", status: "", method: "" });
  const [selectedPayment, setSelectedPayment] = useState(null);

  // ✅ Sidebar state
  const [mobileOpen, setMobileOpen] = useState(false);
  const toggleSidebar = () => setMobileOpen(!mobileOpen);

  // Handlers
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };
  const handleResetFilters = () => setFilters({ search: "", status: "", method: "" });
  const handleOpenPayment = (payment, mode = "view") => setSelectedPayment({ ...payment, mode });
  const handleClosePayment = () => setSelectedPayment(null);
  const handlePay = (updatedPayment) =>
    setPayments((prev) => prev.map((p) => (p.id === updatedPayment.id ? updatedPayment : p)));

  const filteredPayments = payments.filter((p) => {
    const searchLower = filters.search.toLowerCase();
    const matchSearch = filters.search
      ? p.invoiceNo.toLowerCase().includes(searchLower) ||
        p.period.toLowerCase().includes(searchLower) ||
        p.dueDate.includes(filters.search)
      : true;
    const matchStatus = filters.status ? p.status === filters.status : true;
    const matchMethod = filters.method ? p.method === filters.method : true;
    return matchSearch && matchStatus && matchMethod;
  });

  return (
    <Box sx={{ display: "flex", height: "93.4vh", bgcolor: "#f5f6fa" }}>
      {/* ✅ Role-based Sidebar */}
      <UsersSidebar user={user} mobileOpen={mobileOpen} onClose={toggleSidebar} />

      {/* Main Content */}
      <Box sx={{ flexGrow: 1, display: "flex", flexDirection: "column" }}>
        <UsersNavbar onMenuClick={toggleSidebar} />

        {/* Page Content */}
        <Box sx={{ p: 3, flexGrow: 1, overflowY: "auto", mt: 8 }}>
          <Stack
            direction="row"
            spacing={1}
            alignItems="center"
            justifyContent="center"
            sx={{ mb: 2 }}
          >
            <PaymentsIcon sx={{ color: "#1976d2", fontSize: 30 }} />
            <Typography variant="h5" fontWeight="bold">
              Rent & Payments
            </Typography>
          </Stack>
          <Divider sx={{ mb: 3 }} />

          {/* Summary Cards */}
          <RentSummaryCard payments={payments} />

          {/* Filters */}
          <PaymentFilters
            filters={filters}
            onChange={handleFilterChange}
            onReset={handleResetFilters}
          />

          {/* Payments Table */}
          <PaymentsTable
            payments={filteredPayments}
            onView={(p) => handleOpenPayment(p, "view")}
            onPay={(p) => handleOpenPayment(p, "pay")}
          />
        </Box>
      </Box>

      {/* Payment Modal */}
      <PaymentModal
        payment={selectedPayment}
        open={!!selectedPayment}
        onClose={handleClosePayment}
        onPay={handlePay}
      />
    </Box>
  );
}

export default RentPaymentsPage;
