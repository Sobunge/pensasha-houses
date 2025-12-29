import React from "react";
import { Typography, Box } from "@mui/material";
import DocumentsCard from "../cards/DocumentsCard";

const CardWrapper = ({ children }) => (
  <Box
    sx={{
      height: "100%",
      "& .MuiCard-root": {
        height: "100%",
        borderRadius: 3,
        transition: "all 0.2s ease-in-out",
        "&:hover": { transform: "translateY(-4px)", boxShadow: 4 },
      },
    }}
  >
    {children}
  </Box>
);

export const DocumentsSection = ({ userId }) => (
  <CardWrapper>
    <DocumentsCard userId={userId} />
    <Typography
      variant="body2"
      sx={{ width: "100%", textAlign: "center", color: "#555", mt: 1 }}
    >
      No documents available.
    </Typography>
  </CardWrapper>
);
