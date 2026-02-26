// src/App.jsx
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Layouts
import AppLayout from "./layouts/AppLayout";
import DashboardLayout from "./layouts/DashboardLayout";
import RoleSwitcherDashboard from "./layouts/RoleSwitcherDashboard";

// Pages
import LandingPage from "./pages/LandingPage/LandingPage";
import ListingsPage from "./pages/ListingsPage/ListingsPage";
import PropertyDetails from "./pages/ListingsPage/PropertyDetails";
import NotFound from "./pages/NotFoundPage/NotFound";

// Shared Dashboard Pages
import PropertiesPage from "./pages/PropertiesPage/PropertiesPage";
import PropertyPage from "./pages/PropertiesPage/PropertyPage";
import AnnouncementsPage from "./pages/AnnouncementPage/AnnouncementsPage";
import MessagesPage from "./pages/MessagesPage/MessagesPage";
import ConversationPage from "./pages/MessagesPage/ConversationPage";
import DocumentsPage from "./pages/DocumentPage/DocumentsPage";
import MaintenanceRequestsPage from "./pages/MaintenanceRequestPage/MaintenanceRequestsPage";
import ActivityFeedPage from "./pages/ActivityFeedPage/ActivityFeedPage";
import UserProfilePage from "./pages/UserProfilePage/UserProfilePage";

// Tenant Pages
import BrowseUnitsPage from "./pages/Tenant/BrowseUnitsPage";
import BrowseUnitPage from "./pages/Tenant/BrowseUnitPage";
import RentPaymentsPage from "./pages/RentPaymentPage/RentPaymentsPage";

// Landlord Pages
import LandlordTenants from "./pages/LandlordPage/LandlordTenants";
import TenantDetails from "./pages/LandlordPage/TenantDetails";
import LandlordCaretakers from "./pages/LandlordPage/LandlordCaretakers";
import LandlordCaretakerDetails from "./pages/LandlordPage/LandlordCaretakerDetails";
import LandlordFinance from "./pages/LandlordPage/LandlordFinance";
import LandlordReports from "./pages/LandlordPage/LandlordReports";

// Caretaker Pages
import CaretakerTasksPage from "./pages/CaretakerPage/CaretakerTasksPage";
import CaretakerReportsPage from "./pages/CaretakerPage/CaretakerReportsPage";

// Auth
import { AuthProvider } from "./pages/Auth/AuthContext";
import ProtectedRoute from "./pages/Auth/ProtectedRoute";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Public Routes */}
          <Route element={<AppLayout />}>
            <Route path="/" element={<LandingPage />} />
            <Route path="/properties" element={<ListingsPage />} />
            <Route path="/properties/:id" element={<PropertyDetails />} />
            <Route path="*" element={<NotFound />} />
          </Route>

          {/* Protected Multi-role Dashboard */}
          <Route
            path="/dashboard/*"
            element={
              <ProtectedRoute allowedRoles={["tenant", "landlord", "caretaker", "admin"]}>
                <DashboardLayout />
              </ProtectedRoute>
            }
          >
            {/* Default landing: Role switcher */}
            <Route index element={<RoleSwitcherDashboard />} />

            {/* Shared pages */}
            <Route path="properties" element={<PropertiesPage />} />
            <Route path="properties/:id" element={<PropertyPage />} />
            <Route path="announcements" element={<AnnouncementsPage />} />
            <Route path="messages" element={<MessagesPage />} />
            <Route path="messages/:id" element={<ConversationPage />} />
            <Route path="activities" element={<ActivityFeedPage />} />
            <Route path="documents" element={<DocumentsPage />} />
            <Route path="maintenance-requests" element={<MaintenanceRequestsPage />} />

            {/* User Profile (self + other users) */}
            <Route path="profile" element={<UserProfilePage />} />
            <Route path="profile/:userId" element={<UserProfilePage />} />

            {/* Tenant */}
            <Route path="browse-units" element={<BrowseUnitsPage />} />
            <Route path="browse-units/:id" element={<BrowseUnitPage />} />
            <Route path="rent-payments" element={<RentPaymentsPage />} />

            {/* Landlord */}
            <Route path="tenants" element={<LandlordTenants />} />
            <Route path="tenants/:id" element={<TenantDetails />} />
            <Route path="caretakers" element={<LandlordCaretakers />} />
            <Route path="caretakers/:id" element={<LandlordCaretakerDetails />} />
            <Route path="finances" element={<LandlordFinance />} />
            <Route path="reports" element={<LandlordReports />} />

            {/* Caretaker */}
            <Route path="tasks" element={<CaretakerTasksPage />} />
            <Route path="reports" element={<CaretakerReportsPage />} />

            {/* Fallback */}
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;