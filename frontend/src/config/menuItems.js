import React from "react";
import HomeIcon from "@mui/icons-material/Home";
import AnnouncementIcon from "@mui/icons-material/Announcement";
import MessageIcon from "@mui/icons-material/Message";
import DescriptionIcon from "@mui/icons-material/Description";
import BuildIcon from "@mui/icons-material/Build";
import PaymentIcon from "@mui/icons-material/Payment";
import PersonIcon from "@mui/icons-material/Person";
import DashboardIcon from "@mui/icons-material/Dashboard";
import HomeWorkIcon from "@mui/icons-material/HomeWork";
import MailIcon from "@mui/icons-material/Mail";
import CampaignIcon from "@mui/icons-material/Campaign";
import NotificationsIcon from "@mui/icons-material/Notifications";

// Tenant menu
export const tenantMenuItems = [
  { label: "Dashboard", link: "/tenant", icon: <HomeIcon /> },
  { label: "Properties", link: "/tenant/properties", icon: <HomeWorkIcon />},
  { label: "Announcements", link: "/tenant/announcements", icon: <AnnouncementIcon /> },
  { label: "Messages", link: "/tenant/messages", icon: <MessageIcon /> },
  { label: "Documents", link: "/tenant/documents", icon: <DescriptionIcon /> },
   { label: "Activity Feeds", link: "/tenant/activities", icon: <NotificationsIcon /> },
  { label: "Maintenance Requests", link: "/tenant/maintenance-requests", icon: <BuildIcon /> },
  { label: "Rent Payments", link: "/tenant/rent-payments", icon: <PaymentIcon /> },
  { label: "Profile", link: "/tenant/user-profile", icon: <PersonIcon /> },
];

// Landlord menu
export const landlordMenuItems = [
  { label: "Dashboard", icon: <DashboardIcon />, link: "/landlord" },
  { label: "My Properties", icon: <HomeWorkIcon />, link: "/landlord/properties" },
  { label: "Tenants", icon: <PersonIcon />, link: "/landlord/tenants" },
  { label: "Caretakers", icon: <BuildIcon />, link: "/landlord/caretakers" },
  { label: "Finances", icon: <PaymentIcon />, link: "/landlord/finances" },
  { label: "Reports", icon: <DescriptionIcon />, link: "/landlord/reports" },
  { label: "Messages", icon: <MailIcon />, link: "/landlord/messages" },
  { label: "Announcements", icon: <CampaignIcon />, link: "/landlord/announcements" },
];

// Caretaker menu
export const caretakerMenuItems = [
  { label: "Dashboard", link: "/caretaker", icon: <DashboardIcon /> },
  { label: "Tasks", link: "/caretaker/tasks", icon: <BuildIcon /> },
  { label: "Maintenance Requests", link: "/caretaker/maintenance", icon: <BuildIcon /> },
  { label: "Messages", link: "/caretaker/messages", icon: <MailIcon /> },
];

// Admin menu
export const adminMenuItems = [
  { label: "Dashboard", link: "/admin", icon: <DashboardIcon /> },
  { label: "Users", link: "/admin/users", icon: <PersonIcon /> },
  { label: "Properties", link: "/admin/properties", icon: <HomeWorkIcon /> },
  { label: "Reports", link: "/admin/reports", icon: <DescriptionIcon /> },
  { label: "Messages", link: "/admin/messages", icon: <MailIcon /> },
];
