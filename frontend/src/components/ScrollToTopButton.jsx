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
        sx={{
          position: "fixed",
          bottom: 24,
          right: 24,
          backgroundColor: "#D4AF37", // Gold accent
          color: "#0F172A",
          "&:hover": {
            backgroundColor: "#B5922B",
          },
          zIndex: 9999, // Keeps it on top of dashboard cards/tables
        }}
      >
        <KeyboardArrowUpIcon />
      </Fab>
    </Zoom>
  );
}