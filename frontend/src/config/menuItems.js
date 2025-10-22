// src/data/menuItems.js
import React from "react";
import DashboardIcon from "@mui/icons-material/Dashboard";
import HomeWorkIcon from "@mui/icons-material/HomeWork";
import AnnouncementIcon from "@mui/icons-material/Announcement";
import MessageIcon from "@mui/icons-material/Message";
import MailIcon from "@mui/icons-material/Mail";
import NotificationsIcon from "@mui/icons-material/Notifications";
import DescriptionIcon from "@mui/icons-material/Description";
import BuildIcon from "@mui/icons-material/Build";
import PaymentIcon from "@mui/icons-material/Payment";
import PersonIcon from "@mui/icons-material/Person";


// ======================= TENANT MENU =======================
export const tenantMenuItems = [
  { label: "Dashboard", link: "/tenant", icon: <DashboardIcon /> },
  { label: "Profile", link: "/tenant/user-profile", icon: <PersonIcon /> },
  { label: "Properties", link: "/tenant/properties", icon: <HomeWorkIcon /> },
  { label: "Announcements", link: "/tenant/announcements", icon: <AnnouncementIcon /> },
  { label: "Messages", link: "/tenant/messages", icon: <MessageIcon /> },
  { label: "Activity Feeds", link: "/tenant/activities", icon: <NotificationsIcon /> },
  { label: "Maintenance Requests", link: "/tenant/maintenance-requests", icon: <BuildIcon /> },

  // Role-specific
  { label: "Documents", link: "/tenant/documents", icon: <DescriptionIcon /> },
  { label: "Rent Payments", link: "/tenant/rent-payments", icon: <PaymentIcon /> },
];


// ======================= LANDLORD MENU =======================
export const landlordMenuItems = [
  { label: "Dashboard", link: "/landlord", icon: <DashboardIcon /> },
  { label: "Profile", link: "/landlord/user-profile", icon: <PersonIcon /> },
  { label: "Properties", link: "/landlord/properties", icon: <HomeWorkIcon /> },
  { label: "Announcements", link: "/landlord/announcements", icon: <AnnouncementIcon /> },
  { label: "Messages", link: "/landlord/messages", icon: <MailIcon /> },
  { label: "Activity Feeds", link: "/landlord/activities", icon: <NotificationsIcon /> },
  { label: "Maintenance Requests", link: "/landlord/maintenance-requests", icon: <BuildIcon /> },

  // Role-specific
  { label: "Tenants", link: "/landlord/tenants", icon: <PersonIcon /> },
  { label: "Caretakers", link: "/landlord/caretakers", icon: <BuildIcon /> },
  { label: "Finances", link: "/landlord/finances", icon: <PaymentIcon /> },
  { label: "Reports", link: "/landlord/reports", icon: <DescriptionIcon /> },
];


// ======================= CARETAKER MENU =======================
export const caretakerMenuItems = [
  { label: "Dashboard", link: "/caretaker", icon: <DashboardIcon /> },
  { label: "Profile", link: "/caretaker/user-profile", icon: <PersonIcon /> },
  { label: "Properties", link: "/caretaker/properties", icon: <HomeWorkIcon /> },
  { label: "Announcements", link: "/caretaker/announcements", icon: <AnnouncementIcon /> },
  { label: "Messages", link: "/caretaker/messages", icon: <MailIcon /> },
  { label: "Activity Feeds", link: "/caretaker/activities", icon: <NotificationsIcon /> },

  // Role-specific
  { label: "Maintenance Requests", link: "/caretaker/maintenance-requests", icon: <BuildIcon /> },
  { label: "Assigned Tasks", link: "/caretaker/tasks", icon: <BuildIcon /> },
  { label: "Reports", link: "/caretaker/reports", icon: <DescriptionIcon /> },
];


// ======================= ADMIN MENU =======================
export const adminMenuItems = [
  { label: "Dashboard", link: "/admin", icon: <DashboardIcon /> },
  { label: "Profile", link: "/admin/user-profile", icon: <PersonIcon /> },
  { label: "Properties", link: "/admin/properties", icon: <HomeWorkIcon /> },
  { label: "Announcements", link: "/admin/announcements", icon: <AnnouncementIcon /> },
  { label: "Messages", link: "/admin/messages", icon: <MailIcon /> },
  { label: "Activity Feeds", link: "/admin/activities", icon: <NotificationsIcon /> },
  { label: "Maintenance Requests", link: "/admin/maintenance-requests", icon: <BuildIcon /> },

  // Role-specific
  { label: "Users", link: "/admin/users", icon: <PersonIcon /> },
  { label: "Reports", link: "/admin/reports", icon: <DescriptionIcon /> },
];
