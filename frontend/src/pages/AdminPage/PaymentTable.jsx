import React from "react";
import {
  Paper,
  Typography,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Chip,
} from "@mui/material";

const payments = [
  { id: 1, tenant: "John Doe", property: "Green Villas", amount: 25000, status: "Paid" },
  { id: 2, tenant: "Mary Wambui", property: "Palm Heights", amount: 30000, status: "Pending" },
  { id: 3, tenant: "Peter Otieno", property: "Lakeview Apartments", amount: 28000, status: "Paid" },
];

function PaymentTable() {
  return (
    <Paper sx={{ p: 2, borderRadius: 3, boxShadow: 3 }}>
      <Typography variant="h6" sx={{ mb: 2 }}>
        Rent Payments
      </Typography>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Tenant</TableCell>
            <TableCell>Property</TableCell>
            <TableCell>Amount (Ksh)</TableCell>
            <TableCell>Status</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {payments.map((p) => (
            <TableRow key={p.id}>
              <TableCell>{p.tenant}</TableCell>
              <TableCell>{p.property}</TableCell>
              <TableCell>{p.amount.toLocaleString()}</TableCell>
              <TableCell>
                <Chip
                  label={p.status}
                  color={p.status === "Paid" ? "success" : "warning"}
                  size="small"
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
  );
}

export default PaymentTable;
