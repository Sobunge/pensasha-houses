// src/pages/Profile/UserProfilePage.jsx
import React, { useState } from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Avatar,
  Button,
  Divider,
  Stack,
  List,
  ListItem,
  ListItemText,
  useMediaQuery,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import HomeIcon from "@mui/icons-material/Home";
import PaymentsIcon from "@mui/icons-material/Payments";
import ApartmentIcon from "@mui/icons-material/Apartment";
import PeopleIcon from "@mui/icons-material/People";
import ReportProblemIcon from "@mui/icons-material/ReportProblem";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { useTheme } from "@mui/material/styles";

// ✅ Layout components
import UsersNavbar from "../../components/UsersNavbar";
import TenantSidebar from "../Tenant/TenantSidebar";

// ✅ Edit Dialog
import EditProfileDialog from "./EditProfileDialog";

function UserProfilePage() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const [user, setUser] = useState({
    name: "Jane Doe",
    email: "jane@example.com",
    phone: "+254 712 345 678",
    role: "Tenant",
    joinDate: "Feb 2024",
  });

  const [openEdit, setOpenEdit] = useState(false);

  const handleEditOpen = () => setOpenEdit(true);
  const handleEditClose = () => setOpenEdit(false);

  const getQuickStats = () => {
    switch (user.role) {
      case "Tenant":
        return [
          { label: "Total Paid", value: "Ksh 45,000", icon: <PaymentsIcon sx={{ color: "#4caf50" }} /> },
          { label: "Pending Rent", value: "Ksh 15,000", icon: <PaymentsIcon sx={{ color: "#f44336" }} /> },
        ];
      case "Landlord":
        return [
          { label: "Properties", value: "12", icon: <ApartmentIcon sx={{ color: "#1976d2" }} /> },
          { label: "Tenants", value: "48", icon: <PeopleIcon sx={{ color: "#4caf50" }} /> },
          { label: "Monthly Income", value: "Ksh 120,000", icon: <PaymentsIcon sx={{ color: "#f8b500" }} /> },
        ];
      case "Caretaker":
        return [
          { label: "Assigned Properties", value: "5", icon: <ApartmentIcon sx={{ color: "#1976d2" }} /> },
          { label: "Open Issues", value: "3", icon: <ReportProblemIcon sx={{ color: "#f44336" }} /> },
          { label: "Resolved", value: "12", icon: <CheckCircleIcon sx={{ color: "#4caf50" }} /> },
        ];
      case "Admin":
        return [
          { label: "Users", value: "120", icon: <PeopleIcon sx={{ color: "#1976d2" }} /> },
          { label: "System Reports", value: "35", icon: <ReportProblemIcon sx={{ color: "#f8b500" }} /> },
          { label: "Revenue", value: "Ksh 1.2M", icon: <PaymentsIcon sx={{ color: "#4caf50" }} /> },
        ];
      default:
        return [];
    }
  };

  return (
    <Box sx={{ display: "flex", minHeight: "93.33vh", bgcolor: "#f5f6fa" }}>
      {!isMobile && <TenantSidebar />}
      <Box sx={{ flexGrow: 1 }}>
        <UsersNavbar />

        <Box sx={{ p: { xs: 2, sm: 3 }, mt: 8 }}>
          {/* ✅ Page Title */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center", // ✅ always centered
              mb: 3,
            }}
          >
            <AccountCircleIcon sx={{ fontSize: 32, color: "#f8b500", mr: 1 }} />
            <Typography variant="h5" fontWeight={700} sx={{ color: "#111" }}>
              Profile
            </Typography>
          </Box>

          {/* Profile Header */}
          <Card sx={{ borderRadius: 3, boxShadow: 2, mb: 3 }}>
            <CardContent
              sx={{
                display: "flex",
                flexDirection: { xs: "column", sm: "row" },
                alignItems: "center",
                textAlign: { xs: "center", sm: "left" },
                gap: 2,
              }}
            >
              <Avatar sx={{ bgcolor: "#f8b500", width: 64, height: 64 }}>
                {user.name.charAt(0)}
              </Avatar>
              <Box sx={{ flexGrow: 1 }}>
                <Typography variant="h6" fontWeight={600}>
                  {user.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {user.role} • Joined {user.joinDate}
                </Typography>
              </Box>
              <Button
                fullWidth={isMobile}
                variant="contained"
                startIcon={<EditIcon />}
                onClick={handleEditOpen}
                sx={{
                  bgcolor: "#f8b500",
                  color: "#111",
                  textTransform: "none",
                  borderRadius: 2,
                  "&:hover": { bgcolor: "#c59000" },
                }}
              >
                Edit Profile
              </Button>
            </CardContent>
          </Card>

          {/* Personal Info */}
          <Card sx={{ borderRadius: 3, boxShadow: 2, mb: 3 }}>
            <CardContent>
              <Typography variant="subtitle1" fontWeight={600} gutterBottom>
                Personal Information
              </Typography>
              <Divider sx={{ mb: 2 }} />
              <List dense={isMobile}>
                <ListItem>
                  <EmailIcon sx={{ mr: 1, color: "#555" }} />
                  <ListItemText primary="Email" secondary={user.email} />
                </ListItem>
                <ListItem>
                  <PhoneIcon sx={{ mr: 1, color: "#555" }} />
                  <ListItemText primary="Phone" secondary={user.phone} />
                </ListItem>
                <ListItem>
                  <HomeIcon sx={{ mr: 1, color: "#555" }} />
                  <ListItemText primary="Role" secondary={user.role} />
                </ListItem>
              </List>
            </CardContent>
          </Card>

          {/* Quick Stats */}
          <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
            {getQuickStats().map((stat, idx) => (
              <Card key={idx} sx={{ flex: 1, borderRadius: 3, boxShadow: 2 }}>
                <CardContent sx={{ textAlign: "center" }}>
                  {stat.icon}
                  <Typography variant="h6" fontWeight={600} sx={{ mt: 1 }}>
                    {stat.value}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {stat.label}
                  </Typography>
                </CardContent>
              </Card>
            ))}
          </Stack>
        </Box>
      </Box>

      {/* ✅ Edit Profile Dialog */}
      <EditProfileDialog
        open={openEdit}
        handleClose={handleEditClose}
        user={user}
        onSave={(updatedData) => {
          setUser(updatedData);
          setOpenEdit(false);
        }}
      />
    </Box>
  );
}

export default UserProfilePage;
