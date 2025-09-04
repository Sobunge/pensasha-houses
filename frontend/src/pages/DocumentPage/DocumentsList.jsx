import React from "react";
import { Box, Grid } from "@mui/material";
import DocumentItem from "./DocumentItem";

// Sample documents (replace with backend data)
const documents = [
  { id: 1, name: "Lease Agreement", type: "PDF", date: "2025-08-20" },
  { id: 2, name: "Payment Receipt", type: "PDF", date: "2025-08-15" },
  { id: 3, name: "Maintenance Report", type: "DOCX", date: "2025-08-10" },
];

function DocumentsList() {
  return (
    <Box>
      <Grid container spacing={2}>
        {documents.map((doc) => (
          <Grid item xs={12} sm={6} md={4} key={doc.id}>
            <DocumentItem document={doc} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

export default DocumentsList;
