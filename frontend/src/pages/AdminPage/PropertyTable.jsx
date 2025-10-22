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

const properties = [
  { id: 1, name: "Green Villas", units: 12, location: "Milimani", status: "Occupied" },
  { id: 2, name: "Palm Heights", units: 20, location: "Tom Mboya", status: "Vacant" },
  { id: 3, name: "Lakeview Apartments", units: 15, location: "Kisumu CBD", status: "Partially Occupied" },
];

function PropertyTable() {
  return (
    <Paper sx={{ p: 2, borderRadius: 3, boxShadow: 3 }}>
      <Typography variant="h6" sx={{ mb: 2 }}>
        Properties
      </Typography>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Property Name</TableCell>
            <TableCell>Units</TableCell>
            <TableCell>Location</TableCell>
            <TableCell>Status</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {properties.map((p) => (
            <TableRow key={p.id}>
              <TableCell>{p.name}</TableCell>
              <TableCell>{p.units}</TableCell>
              <TableCell>{p.location}</TableCell>
              <TableCell>
                <Chip
                  label={p.status}
                  color={
                    p.status === "Occupied"
                      ? "success"
                      : p.status === "Vacant"
                      ? "error"
                      : "warning"
                  }
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

export default PropertyTable;
