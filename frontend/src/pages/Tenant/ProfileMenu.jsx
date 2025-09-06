import React, { useState } from "react";
import {
  Menu,
  MenuItem,
  IconButton,
  ListItemIcon,
  Typography,
  Divider,
} from "@mui/material";
import { Link } from "react-router-dom";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LogoutIcon from "@mui/icons-material/Logout";
import PersonIcon from "@mui/icons-material/Person";

function ProfileMenu() {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleOpen = (event) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);

  const hoverStyle = {
    backgroundColor: "#f8b500", // light gold
    color: "#111",
    "& .MuiListItemIcon-root": { color: "#111" },
  };

  return (
    <>
      {/* Profile Icon Button */}
      <IconButton color="inherit" onClick={handleOpen}>
        <AccountCircleIcon sx={{ fontSize: 28, color: "#111" }} />
      </IconButton>

      {/* Dropdown Menu */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        PaperProps={{
          sx: {
            mt: 1.5,
            borderRadius: 2,
            minWidth: 200,
            boxShadow: 4,
            bgcolor: "#fff", // white background
            color: "#111", // black text
          },
        }}
      >
        {/* My Profile (links to /tenant/user-profile) */}
        <MenuItem
          component={Link}
          to="/tenant/user-profile"
          onClick={handleClose}
          sx={{
            px: 2,
            py: 1,
            transition: "background-color 0.3s",
            "&:hover": hoverStyle,
          }}
        >
          <ListItemIcon sx={{ minWidth: 36 }}>
            <PersonIcon fontSize="small" />
          </ListItemIcon>
          <Typography variant="body2" sx={{ fontWeight: 500 }}>
            My Profile
          </Typography>
        </MenuItem>

        <Divider sx={{ borderColor: "#eee" }} />

        {/* Logout */}
        <MenuItem
          onClick={() => {
            handleClose();
            console.log("Logout clicked");
          }}
          sx={{
            px: 2,
            py: 1,
            transition: "background-color 0.3s",
            "&:hover": hoverStyle,
          }}
        >
          <ListItemIcon sx={{ minWidth: 36 }}>
            <LogoutIcon fontSize="small" />
          </ListItemIcon>
          <Typography variant="body2" sx={{ fontWeight: 500 }}>
            Logout
          </Typography>
        </MenuItem>
      </Menu>
    </>
  );
}

export default ProfileMenu;
