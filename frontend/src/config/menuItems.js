// src/data/menuItems.js
import React from "react";

import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import ApartmentIcon from "@mui/icons-material/Apartment";
import AnnouncementIcon from "@mui/icons-material/Announcement";
import AssessmentIcon from "@mui/icons-material/Assessment";
import BuildIcon from "@mui/icons-material/Build";
import DashboardIcon from "@mui/icons-material/Dashboard";
import DescriptionIcon from "@mui/icons-material/Description";
import MessageIcon from "@mui/icons-material/Message";
import PaymentIcon from "@mui/icons-material/Payment";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import PersonIcon from "@mui/icons-material/Person";
import SecurityIcon from "@mui/icons-material/Security";
import SettingsIcon from "@mui/icons-material/Settings";
import StorageIcon from "@mui/icons-material/Storage";
import SupportAgentIcon from "@mui/icons-material/SupportAgent";
import SearchIcon from "@mui/icons-material/Search";

// ======================= CORE (Always Visible) =======================
const coreMenuItems = [
  { label: "Dashboard", link: "/dashboard", icon: <DashboardIcon /> },
  { label: "Profile", link: "/dashboard/profile", icon: <PersonIcon /> },
];

// ======================= ROLE-BASED MENUS =======================
const menuDefinitions = {
  TENANT: [
    { label: "Browse Units", link: "/dashboard/browse-units", icon: <SearchIcon /> },
    { label: "My Rental Units", link: "/dashboard/my-units", icon: <ApartmentIcon /> },
    { label: "Rent Payments", link: "/dashboard/rent-payments", icon: <PaymentIcon /> },
    { label: "Maintenance", link: "/dashboard/maintenance-requests", icon: <BuildIcon /> },
    { label: "Documents", link: "/dashboard/documents", icon: <DescriptionIcon /> },
    { label: "Announcements", link: "/dashboard/announcements", icon: <AnnouncementIcon /> },
  ],

  LANDLORD: [
    { label: "My Properties", link: "/dashboard/my-properties", icon: <ApartmentIcon /> },
    { label: "Tenants", link: "/dashboard/tenants", icon: <PeopleAltIcon /> },  ],

  CARETAKER: [
    { label: "Property Units", link: "/dashboard/my-units", icon: <ApartmentIcon /> },
    { label: "Tenants", link: "/dashboard/tenants", icon: <PeopleAltIcon /> },
    { label: "Maintenance Tasks", link: "/dashboard/maintenance-requests", icon: <BuildIcon /> },
    { label: "Messages", link: "/dashboard/messages", icon: <MessageIcon /> },
    { label: "Announcements", link: "/dashboard/announcements", icon: <AnnouncementIcon /> },
  ],

  ADMIN: [
    { label: "Overview Reports", link: "/dashboard/reports", icon: <AssessmentIcon /> },
    { label: "User Management", link: "/dashboard/users", icon: <AdminPanelSettingsIcon /> },
    { label: "Tenants", link: "/dashboard/tenants", icon: <PeopleAltIcon /> },
    { label: "Caretakers", link: "/dashboard/caretakers", icon: <SupportAgentIcon /> },
    { label: "Roles & Security", link: "/dashboard/roles", icon: <SecurityIcon /> },
    { label: "System Settings", link: "/dashboard/settings", icon: <SettingsIcon /> },
    { label: "System Logs", link: "/dashboard/logs", icon: <StorageIcon /> },
  ],
};

/**
 * Returns the menu items for the current active role selected in the switcher.
 * Falls back to TENANT if no role is provided.
 */
export const getMenuItems = (activeRole = "TENANT") => {
  // Normalize role name to match keys in menuDefinitions
  const roleKey = activeRole?.toUpperCase();
  const roleSpecificMenu = menuDefinitions[roleKey] || [];

  return [
    ...coreMenuItems,
    ...roleSpecificMenu,
  ];
};