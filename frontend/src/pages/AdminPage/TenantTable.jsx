import React from "react";
import { Paper, Typography, Table, TableHead, TableRow, TableCell, TableBody } from "@mui/material";

const tenants = [
  { id: 1, name: "John Doe", property: "Green Villas", status: "Active" },
  { id: 2, name: "Mary Wambui", property: "Palm Heights", status: "Pending" },
  { id: 3, name: "Peter Otieno", property: "Lakeview Apartments", status: "Active" },
];

function TenantTable() {
  return (
    <Paper sx={{ p: 2, borderRadius: 3, boxShadow: 3 }}>
      <Typography variant="h6" sx={{ mb: 2 }}>
        Tenants
      </Typography>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Property</TableCell>
            <TableCell>Status</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {tenants.map((t) => (
            <TableRow key={t.id}>
              <TableCell>{t.name}</TableCell>
              <TableCell>{t.property}</TableCell>
              <TableCell>{t.status}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
  );
}

export default TenantTable;
