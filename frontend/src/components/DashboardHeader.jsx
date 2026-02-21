import React from "react";
import {
  Box,
  Typography,
  Breadcrumbs,
  IconButton,
  Menu,
  MenuItem,
  Link as MuiLink,
} from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { useAuth } from "../pages/Auth/AuthContext";

const DashboardHeader = React.memo(function DashboardHeader({
  title = "My Dashboard",
  breadcrumbs = [],
}) {
  const { user } = useAuth();

  const userRole = user?.role || "dashboard";
  const onDashboard = breadcrumbs.length === 0 && window.location.pathname === `/${userRole}`;

  // State for collapsed early menu
  const [anchorEl, setAnchorEl] = React.useState(null);
  const openMenu = Boolean(anchorEl);
  const handleOpenMenu = (event) => setAnchorEl(event.currentTarget);
  const handleCloseMenu = () => setAnchorEl(null);

  // Split breadcrumbs: last 2 always visible, rest in menu
  const collapsedBreadcrumbs =
    breadcrumbs.length > 2 ? breadcrumbs.slice(-2) : breadcrumbs;
  const earlyItems = breadcrumbs.length > 2 ? breadcrumbs.slice(0, -2) : [];

  return (
    <Box sx={{ mb: 1 }}>
      {/* Breadcrumbs */}
      <Breadcrumbs
        separator={<NavigateNextIcon fontSize="small" />}
        aria-label="breadcrumb"
        sx={{ mb: 2, overflowX: "auto", whiteSpace: "nowrap" }}
      >
        {/* Home Link */}
        {onDashboard ? (
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 0.5,
              color: "text.primary",
            }}
          >
            <HomeIcon fontSize="small" /> Home
          </Box>
        ) : (
          <MuiLink
            underline="hover"
            color="inherit"
            component={RouterLink}
            to={`/${userRole}`}
            sx={{ display: "flex", alignItems: "center", gap: 0.5 }}
          >
            <HomeIcon fontSize="small" /> Home
          </MuiLink>
        )}

        {/* Collapsed early breadcrumbs menu */}
        {earlyItems.length > 0 && (
          <>
            <IconButton
              size="small"
              onClick={handleOpenMenu}
              sx={{ p: 0, minWidth: 24, color: "text.secondary" }}
            >
              <MoreHorizIcon fontSize="small" />
            </IconButton>

            <Menu
              anchorEl={anchorEl}
              open={openMenu}
              onClose={handleCloseMenu}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
            >
              {earlyItems.map((item, idx) => (
                <MenuItem
                  key={idx}
                  onClick={handleCloseMenu}
                  component={RouterLink}
                  to={item.href || "#"}
                >
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
            <MuiLink
              key={index}
              underline="hover"
              color="inherit"
              component={RouterLink}
              to={item.href || "#"}
              noWrap
            >
              {item.label}
            </MuiLink>
          )
        )}
      </Breadcrumbs>

      {/* Page Title */}
      <Typography
        variant="h5"
        fontWeight={700}
        align={{ xs: "center", sm: "left" }}
        sx={{
          fontSize: { xs: "1.2rem", sm: "1.5rem", md: "1.8rem" },
          wordBreak: "break-word",
        }}
      >
        {title}
      </Typography>
    </Box>
  );
});

export default DashboardHeader;