// src/data/menuItems.js
import React from "react";

import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import ApartmentIcon from "@mui/icons-material/Apartment";
import AnnouncementIcon from "@mui/icons-material/Announcement";
import AssessmentIcon from "@mui/icons-material/Assessment";
import BuildIcon from "@mui/icons-material/Build";
import DashboardIcon from "@mui/icons-material/Dashboard";
import DescriptionIcon from "@mui/icons-material/Description";
import HomeWorkIcon from "@mui/icons-material/HomeWork";
import MailIcon from "@mui/icons-material/Mail";
import MessageIcon from "@mui/icons-material/Message";
import NotificationsIcon from "@mui/icons-material/Notifications";
import PaymentIcon from "@mui/icons-material/Payment";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import PersonIcon from "@mui/icons-material/Person";
import SecurityIcon from "@mui/icons-material/Security";
import SettingsIcon from "@mui/icons-material/Settings";
import StorageIcon from "@mui/icons-material/Storage";
import SupportAgentIcon from "@mui/icons-material/SupportAgent";
import SearchIcon from "@mui/icons-material/Search";


// ======================= TENANT MENU =======================
export const tenantMenuItems = [
  { label: "Dashboard", link: "/tenant", icon: <DashboardIcon /> },
  { label: "Profile", link: "/tenant/user-profile", icon: <PersonIcon /> },
  { label: "My Rentals", link: "/tenant/properties", icon: <ApartmentIcon /> },
  { label: "Browse Properties", link: "/tenant/browse-properties", icon: <SearchIcon /> },
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
  // --- Core Pages ---
  { label: "Dashboard", link: "/admin", icon: <DashboardIcon /> },
  { label: "Profile", link: "/admin/user-profile", icon: <PersonIcon /> },

  // --- Management ---
  { label: "Properties", link: "/admin/properties", icon: <ApartmentIcon /> },
  { label: "Tenants", link: "/admin/tenants", icon: <PeopleAltIcon /> },
  { label: "Landlords", link: "/admin/landlords", icon: <PersonIcon /> },
  { label: "Caretakers", link: "/admin/caretakers", icon: <SupportAgentIcon /> },

  // --- Communication & Notifications ---
  { label: "Announcements", link: "/admin/announcements", icon: <AnnouncementIcon /> },
  { label: "Messages", link: "/admin/messages", icon: <MailIcon /> },
  { label: "Activity Feeds", link: "/admin/activities", icon: <NotificationsIcon /> },

  // --- Operations ---
  { label: "Maintenance Requests", link: "/admin/maintenance-requests", icon: <BuildIcon /> },
  { label: "finances", link: "/admin/finances", icon: <PaymentIcon /> },
  { label: "Documents", link: "/admin/documents", icon: <DescriptionIcon /> },
  { label: "Reports", link: "/admin/reports", icon: <AssessmentIcon /> },
  { label: "System Logs", link: "/admin/logs", icon: <StorageIcon /> },

  // --- Security & Settings ---
  { label: "User Management", link: "/admin/users", icon: <AdminPanelSettingsIcon /> },
  { label: "Roles & Permissions", link: "/admin/roles", icon: <SecurityIcon /> },
  { label: "System Settings", link: "/admin/settings", icon: <SettingsIcon /> },
];
