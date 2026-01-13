import React from "react";
import { Box, Typography, Breadcrumbs, Link, IconButton, Menu, MenuItem } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { useAuth } from "../pages/Auth/AuthContext";

function DashboardHeader({ title = "My Dashboard", breadcrumbs = [] }) {
  const { user } = useAuth();
  const onDashboard =
    breadcrumbs.length === 0 && window.location.pathname === `/${user.role}`;

  // State for collapsed menu
  const [anchorEl, setAnchorEl] = React.useState(null);
  const openMenu = Boolean(anchorEl);
  const handleOpenMenu = (event) => setAnchorEl(event.currentTarget);
  const handleCloseMenu = () => setAnchorEl(null);

  // Show only last 2 items on mobile
  const collapsedBreadcrumbs = breadcrumbs.length > 2 ? breadcrumbs.slice(-2) : breadcrumbs;
  const earlyItems = breadcrumbs.length > 2 ? breadcrumbs.slice(0, -2) : [];

  return (
    <Box sx={{ mb: 1 }}>
      {/* Breadcrumbs */}
      <Breadcrumbs
        separator={<NavigateNextIcon fontSize="small" />}
        aria-label="breadcrumb"
        sx={{ mb: 2, overflowX: "auto", whiteSpace: "nowrap" }}
      >
        {/* Home link */}
        {onDashboard ? (
          <Box sx={{ display: "flex", alignItems: "center", gap: 0.5, color: "text.primary" }}>
            <HomeIcon fontSize="small" /> Home
          </Box>
        ) : (
          <Link
            underline="hover"
            color="inherit"
            href={`/${user.role}`}
            sx={{ display: "flex", alignItems: "center", gap: 0.5 }}
          >
            <HomeIcon fontSize="small" /> Home
          </Link>
        )}

        {/* Collapsed early items */}
        {earlyItems.length > 0 && (
          <>
            <IconButton
              size="small"
              onClick={handleOpenMenu}
              sx={{ p: 0, minWidth: 24, color: "text.secondary" }}
            >
              <MoreHorizIcon fontSize="small" />
            </IconButton>
            <Menu anchorEl={anchorEl} open={openMenu} onClose={handleCloseMenu}>
              {earlyItems.map((item, idx) => (
                <MenuItem key={idx} onClick={handleCloseMenu} component="a" href={item.href}>
                  {item.label}
                </MenuItem>
              ))}
            </Menu>
          </>
        )}

        {/* Last 2 breadcrumbs */}
        {collapsedBreadcrumbs.map((item, index) =>
          index === collapsedBreadcrumbs.length - 1 ? (
            <Typography key={index} color="text.primary" noWrap>
              {item.label}
            </Typography>
          ) : (
            <Link key={index} underline="hover" color="inherit" href={item.href} noWrap>
              {item.label}
            </Link>
          )
        )}
      </Breadcrumbs>

      {/* Page Title */}
      <Typography
        variant="h5"
        fontWeight={700}
        align="center"
        sx={{
          fontSize: { xs: "1.2rem", sm: "1.5rem", md: "1.8rem" },
          wordBreak: "break-word",
        }}
      >
        {title}
      </Typography>
    </Box>
  );
}

export default DashboardHeader;
