import React from "react";
import { Paper, Typography, Table, TableHead, TableRow, TableCell, TableBody, Chip } from "@mui/material";

const users = [
  { id: 1, name: "Admin", role: "Administrator", email: "admin@estate.com", status: "Active" },
  { id: 2, name: "John Doe", role: "Tenant", email: "john@tenant.com", status: "Active" },
  { id: 3, name: "Mary Wambui", role: "Landlord", email: "mary@landlord.com", status: "Suspended" },
];

function UserTable() {
  return (
    <Paper sx={{ p: 2, borderRadius: 3, boxShadow: 3 }}>
      <Typography variant="h6" sx={{ mb: 2 }}>
        System Users
      </Typography>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Role</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Status</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users.map((u) => (
            <TableRow key={u.id}>
              <TableCell>{u.name}</TableCell>
              <TableCell>{u.role}</TableCell>
              <TableCell>{u.email}</TableCell>
              <TableCell>
                <Chip
                  label={u.status}
                  color={u.status === "Active" ? "success" : "error"}
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

export default UserTable;
