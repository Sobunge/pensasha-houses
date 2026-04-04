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

// ======================= CORE =======================
export const coreMenuItems = [
  { label: "Dashboard", link: "/dashboard", icon: <DashboardIcon /> },
  { label: "Profile", link: "/dashboard/profile", icon: <PersonIcon /> },
];

// ======================= PERMISSION-BASED MENU =======================
export const permissionMenuItems = [
  {
    label: "Browse Units",
    link: "/dashboard/browse-units",
    icon: <SearchIcon />,
    permissions: ["PROPERTY_VIEW"],
  },
  {
    label: "My Properties",
    link: "/dashboard/properties",
    icon: <ApartmentIcon />,
    permissions: ["PROPERTY_VIEW"],
  },
  {
    label: "Announcements",
    link: "/dashboard/announcements",
    icon: <AnnouncementIcon />,
    permissions: ["ANNOUNCEMENT_VIEW"],
  },
  {
    label: "Messages",
    link: "/dashboard/messages",
    icon: <MessageIcon />,
    permissions: ["MESSAGE_VIEW"],
  },
  {
    label: "Maintenance Requests",
    link: "/dashboard/maintenance-requests",
    icon: <BuildIcon />,
    permissions: ["MAINTENANCE_VIEW", "MAINTENANCE_CREATE"],
  },
  {
    label: "Documents",
    link: "/dashboard/documents",
    icon: <DescriptionIcon />,
    permissions: ["DOCUMENT_VIEW"],
  },
  {
    label: "Rent Payments",
    link: "/dashboard/rent-payments",
    icon: <PaymentIcon />,
    permissions: ["RENT_VIEW", "RENT_PAY"],
  },
  {
    label: "Tenants",
    link: "/dashboard/tenants",
    icon: <PeopleAltIcon />,
    permissions: ["TENANT_VIEW"],
  },
  {
    label: "Caretakers",
    link: "/dashboard/caretakers",
    icon: <SupportAgentIcon />,
    permissions: ["CARETAKER_VIEW"],
  },
  {
    label: "Reports",
    link: "/dashboard/reports",
    icon: <AssessmentIcon />,
    permissions: ["REPORT_VIEW"],
  },
  {
    label: "Admin: Users",
    link: "/dashboard/users",
    icon: <AdminPanelSettingsIcon />,
    permissions: ["USER_VIEW"],
  },
  {
    label: "Roles & Permissions",
    link: "/dashboard/roles",
    icon: <SecurityIcon />,
    permissions: ["ROLE_VIEW"],
  },
  {
    label: "System Settings",
    link: "/dashboard/settings",
    icon: <SettingsIcon />,
    permissions: ["SYSTEM_CONFIG_VIEW"],
  },
  {
    label: "System Logs",
    link: "/dashboard/logs",
    icon: <StorageIcon />,
    permissions: ["SYSTEM_CONFIG_VIEW"],
  },
];

export const getMenuItems = (userPermissions = []) => {
  const has = (perm) => userPermissions.includes(perm);

  return [
    ...coreMenuItems,
    ...permissionMenuItems.filter(item => !item.permission || has(item.permission))
  ];
};