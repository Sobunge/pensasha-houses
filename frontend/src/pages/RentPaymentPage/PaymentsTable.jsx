// src/pages/RentPayments/PaymentsTable.jsx
import React, { useState } from "react";
import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TableContainer,
  Paper,
  Button,
  Chip,
  Pagination,
  Card,
  CardContent,
  Typography,
  Stack,
  Box,
  useMediaQuery,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";

import ReceiptIcon from "@mui/icons-material/Receipt";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import PaymentIcon from "@mui/icons-material/Payment";
import DateRangeIcon from "@mui/icons-material/DateRange";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import NumbersIcon from "@mui/icons-material/Numbers";
import BuildIcon from "@mui/icons-material/Build";
import VisibilityIcon from "@mui/icons-material/Visibility";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";

function PaymentsTable({ payments, onView, onPay }) {
  const theme = useTheme();
  const isSmall = useMediaQuery(theme.breakpoints.down("sm"));

  const [page, setPage] = useState(1);
  const rowsPerPage = 5;

  const handleChangePage = (event, value) => setPage(value);

  const paginatedPayments = payments.slice(
    (page - 1) * rowsPerPage,
    page * rowsPerPage
  );

  const getStatusChip = (status) => {
    const colorMap = { Paid: "success", Pending: "warning", Overdue: "error" };
    return <Chip label={status} color={colorMap[status] || "default"} size="small" />;
  };

  // 🖥 Desktop table
  if (!isSmall) {
    return (
      <Box>
        <TableContainer component={Paper} sx={{ borderRadius: 2, boxShadow: 2 }}>
          <Table>
            <TableHead>
              <TableRow>
                {[
                  { icon: <ReceiptIcon fontSize="small" />, label: "Invoice", align: "left" },
                  { icon: <CalendarTodayIcon fontSize="small" />, label: "Period", align: "left" },
                  { icon: <PaymentIcon fontSize="small" />, label: "Amount", align: "right" },
                  { icon: <DateRangeIcon fontSize="small" />, label: "Due Date", align: "left" },
                  { icon: <CheckCircleIcon fontSize="small" />, label: "Status", align: "left" },
                  { icon: <CreditCardIcon fontSize="small" />, label: "Method", align: "left" },
                  { icon: <NumbersIcon fontSize="small" />, label: "Reference", align: "right" },
                  { icon: <BuildIcon fontSize="small" />, label: "Actions", align: "center" },
                ].map((col, i) => (
                  <TableCell key={i} align={col.align}>
                    <Stack direction="row" alignItems="center" spacing={1} justifyContent={col.align === "right" ? "flex-end" : col.align === "center" ? "center" : "flex-start"}>
                      {col.icon}
                      <Typography variant="body2" fontWeight="bold">
                        {col.label}
                      </Typography>
                    </Stack>
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>

            <TableBody>
              {paginatedPayments.map((payment) => (
                <TableRow key={payment.id} hover>
                  <TableCell>{payment.invoiceNo}</TableCell>
                  <TableCell>{payment.period}</TableCell>
                  <TableCell align="right">Ksh {payment.amount.toLocaleString()}</TableCell>
                  <TableCell>{payment.dueDate}</TableCell>
                  <TableCell>{getStatusChip(payment.status)}</TableCell>
                  <TableCell>{payment.method || "-"}</TableCell>
                  <TableCell align="right">{payment.ref || "-"}</TableCell>
                  <TableCell align="center">
                    <Stack direction="row" spacing={1} justifyContent="center">
                      <Button
                        size="small"
                        variant="outlined"
                        startIcon={<VisibilityIcon />}
                        onClick={() => onView(payment)}
                      >
                        View
                      </Button>
                      {payment.status !== "Paid" && (
                        <Button
                          size="small"
                          variant="contained"
                          startIcon={<AttachMoneyIcon />}
                          sx={{ bgcolor: "#f8b500", color: "#111", fontWeight: 600, "&:hover": { bgcolor: "#d49400" } }}
                          onClick={() => onPay(payment)}
                        >
                          Pay Now
                        </Button>
                      )}
                    </Stack>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        {/* Pagination */}
        {payments.length > rowsPerPage && (
          <Stack alignItems="center" mt={2}>
            <Pagination
              count={Math.ceil(payments.length / rowsPerPage)}
              page={page}
              onChange={handleChangePage}
              color="primary"
            />
          </Stack>
        )}
      </Box>
    );
  }

  // 📱 Mobile card view
  return (
    <Stack spacing={2}>
      {paginatedPayments.map((payment) => (
        <Card key={payment.id} sx={{ borderRadius: 2, boxShadow: 2 }}>
          <CardContent>
            <Typography variant="subtitle1" fontWeight={600}>
              {payment.period}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Invoice: {payment.invoiceNo}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Amount: Ksh {payment.amount.toLocaleString()}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Due: {payment.dueDate}
            </Typography>
            <Box sx={{ mt: 1 }}>{getStatusChip(payment.status)}</Box>

            <Stack direction="row" spacing={1} sx={{ mt: 2 }}>
              <Button size="small" variant="outlined" startIcon={<VisibilityIcon />} onClick={() => onView(payment)}>
                View
              </Button>
              {payment.status !== "Paid" && (
                <Button
                  size="small"
                  variant="contained"
                  startIcon={<AttachMoneyIcon />}
                  sx={{ bgcolor: "#f8b500", color: "#111", fontWeight: 600, "&:hover": { bgcolor: "#d49400" } }}
                  onClick={() => onPay(payment)}
                >
                  Pay Now
                </Button>
              )}
            </Stack>
          </CardContent>
        </Card>
      ))}

      {/* Pagination */}
      {payments.length > rowsPerPage && (
        <Stack alignItems="center" mt={2}>
          <Pagination
            count={Math.ceil(payments.length / rowsPerPage)}
            page={page}
            onChange={handleChangePage}
            color="primary"
          />
        </Stack>
      )}
    </Stack>
  );
}

export default PaymentsTable;
