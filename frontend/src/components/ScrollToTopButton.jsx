// src/components/ScrollToTopButton.jsx
import React, { useState, useEffect } from "react";
import { Fab, Zoom } from "@mui/material";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";

export default function ScrollToTopButton({ containerId }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Find the dashboard's scrollable container
    const container = containerId ? document.getElementById(containerId) : window;

    const handleScroll = () => {
      const scrollTop = containerId
        ? document.getElementById(containerId)?.scrollTop || 0
        : window.scrollY;

      setVisible(scrollTop > 200);
    };

    if (container) {
      container.addEventListener("scroll", handleScroll);
    }

    return () => {
      if (container) {
        container.removeEventListener("scroll", handleScroll);
      }
    };
  }, [containerId]);

  const handleClick = () => {
    const container = containerId ? document.getElementById(containerId) : null;

    if (container) {
      container.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <Zoom in={visible}>
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
          zIndex: theme.zIndex.speedDial || 9999,
        })}
      >
        <KeyboardArrowUpIcon />
      </Fab>
    </Zoom>
  );
}