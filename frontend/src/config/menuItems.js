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
  { id: "dashboard", label: "Dashboard", link: "/dashboard", icon: <DashboardIcon /> },
  { id: "profile", label: "Profile", link: "/dashboard/profile", icon: <PersonIcon /> },
];

// ======================= ROLE-BASED MENUS =======================
const menuDefinitions = {
  TENANT: [
    { id: "browse-units", label: "Browse Units", link: "/dashboard/browse-units", icon: <SearchIcon /> },
    { id: "my-units", label: "My Rental Units", link: "/dashboard/my-units", icon: <ApartmentIcon /> },
    { id: "rent-payments", label: "Rent Payments", link: "/dashboard/rent-payments", icon: <PaymentIcon /> },
    { id: "maintenance-tenant", label: "Maintenance", link: "/dashboard/maintenance-requests", icon: <BuildIcon /> },
    { id: "documents", label: "Documents", link: "/dashboard/documents", icon: <DescriptionIcon /> },
    { id: "announcements-tenant", label: "Announcements", link: "/dashboard/announcements", icon: <AnnouncementIcon /> },
  ],

  LANDLORD: [
    { id: "my-properties", label: "My Properties", link: "/dashboard/my-properties", icon: <ApartmentIcon /> },
    { id: "tenants-landlord", label: "Tenants", link: "/dashboard/tenants", icon: <PeopleAltIcon /> },
  ],

  CARETAKER: [
    { id: "property-units", label: "Property Units", link: "/dashboard/my-units", icon: <ApartmentIcon /> },
    { id: "tenants-caretaker", label: "Tenants", link: "/dashboard/tenants", icon: <PeopleAltIcon /> },
    { id: "maintenance-caretaker", label: "Maintenance Tasks", link: "/dashboard/maintenance-requests", icon: <BuildIcon /> },
    { id: "messages", label: "Messages", link: "/dashboard/messages", icon: <MessageIcon /> },
    { id: "announcements-caretaker", label: "Announcements", link: "/dashboard/announcements", icon: <AnnouncementIcon /> },
  ],

  ADMIN: [
    { id: "reports", label: "Overview Reports", link: "/dashboard/reports", icon: <AssessmentIcon /> },
    { id: "users", label: "User Management", link: "/dashboard/users", icon: <AdminPanelSettingsIcon /> },
    { id: "tenants-admin", label: "Tenants", link: "/dashboard/tenants", icon: <PeopleAltIcon /> },
    { id: "caretakers", label: "Caretakers", link: "/dashboard/caretakers", icon: <SupportAgentIcon /> },
    { id: "roles", label: "Roles & Security", link: "/dashboard/roles", icon: <SecurityIcon /> },
    { id: "settings", label: "System Settings", link: "/dashboard/settings", icon: <SettingsIcon /> },
    { id: "logs", label: "System Logs", link: "/dashboard/logs", icon: <StorageIcon /> },
  ],
};

/**
 * Returns the menu items for the current active role selected in the switcher.
 * Strips 'ROLE_' prefix if present and falls back to TENANT if unmapped.
 */
export const getMenuItems = (activeRole = "TENANT") => {
  // Normalize string: strip "ROLE_" if Spring Security returns enum values like "ROLE_TENANT"
  const normalizedRole = activeRole?.toUpperCase().replace(/^ROLE_/, "");
  
  // Use requested role, or fall back to TENANT if invalid/unmapped
  const roleSpecificMenu = menuDefinitions[normalizedRole] || menuDefinitions.TENANT;

  return [
    ...coreMenuItems,
    ...roleSpecificMenu,
  ];
};