import React from "react";
import { Fab, Zoom, useScrollTrigger } from "@mui/material";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";

export default function ScrollToTop() {
  // Triggers when the user scrolls down 200px
  const trigger = useScrollTrigger({
    threshold: 200,
    disableHysteresis: true,
  });

  const handleClick = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <Zoom in={trigger}>
      <Fab
        onClick={handleClick}
        size="small"
        aria-label="scroll back to top"
        sx={{
          position: "fixed",
          bottom: 24,
          right: 24,
          backgroundColor: "#D4AF37", // Matching your gold accent color
          color: "#000000",
          "&:hover": {
            backgroundColor: "#B5922B",
          },
          zIndex: 1000,
        }}
      >
        <KeyboardArrowUpIcon />
      </Fab>
    </Zoom>
  );
}