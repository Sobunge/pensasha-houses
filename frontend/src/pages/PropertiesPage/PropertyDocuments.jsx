import React from "react";
import { Card, CardContent, Typography, Button, Grid } from "@mui/material";

const PropertyDocuments = ({ documents }) => {
  if (!documents || documents.length === 0) {
    return <Typography>No documents available.</Typography>;
  }

  return (
    <Grid container spacing={2}>
      {documents.map((doc, idx) => (
        <Grid item key={idx} xs={12} sm={6} md={4}>
          <Card>
            <CardContent>
              <Typography>{doc}</Typography>
              <Button variant="outlined" sx={{ mt: 1 }}>
                View
              </Button>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default PropertyDocuments;
