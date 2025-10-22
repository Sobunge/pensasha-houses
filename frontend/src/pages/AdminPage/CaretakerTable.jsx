import React from "react";
import { Paper, Typography, Table, TableHead, TableRow, TableCell, TableBody } from "@mui/material";

const caretakers = [
  { id: 1, name: "Paul Ouma", property: "Green Villas", contact: "0712 345 678", status: "Active" },
  { id: 2, name: "Lucy Achieng", property: "Palm Heights", contact: "0798 123 456", status: "On Leave" },
  { id: 3, name: "David Kamau", property: "Lakeview Apartments", contact: "0722 888 555", status: "Active" },
];

function CaretakerTable() {
  return (
    <Paper sx={{ p: 2, borderRadius: 3, boxShadow: 3 }}>
      <Typography variant="h6" sx={{ mb: 2 }}>
        Caretakers
      </Typography>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Property</TableCell>
            <TableCell>Contact</TableCell>
            <TableCell>Status</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {caretakers.map((c) => (
            <TableRow key={c.id}>
              <TableCell>{c.name}</TableCell>
              <TableCell>{c.property}</TableCell>
              <TableCell>{c.contact}</TableCell>
              <TableCell>{c.status}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
  );
}

export default CaretakerTable;
