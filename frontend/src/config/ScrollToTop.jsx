// src/components/ScrollToTop.jsx
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
        sx={(theme) => ({
          position: "fixed",
          bottom: 24,
          right: 24,
          backgroundColor: theme.palette.secondary.main, // Champagne Gold token
          color: theme.palette.primary.main,            // Obsidian Dark Slate token
          boxShadow: `0 4px 14px ${theme.palette.secondary.main}59`,
          transition: "all 0.2s ease-in-out",
          "&:hover": {
            backgroundColor: theme.palette.secondary.dark,
            boxShadow: `0 6px 18px ${theme.palette.secondary.main}73`,
            transform: "translateY(-2px)",
          },
          zIndex: theme.zIndex.speedDial || 1000,
        })}
      >
        <KeyboardArrowUpIcon />
      </Fab>
    </Zoom>
  );
}