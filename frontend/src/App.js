// src/App.jsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Layouts
import AppLayout from "./layouts/AppLayout";
import DashboardLayout from "./layouts/DashboardLayout";

// Pages
import LandingPage from "./pages/LandingPage/LandingPage";
import ListingsPage from "./pages/ListingsPage/ListingsPage";
import NotFound from "./pages/NotFoundPage/NotFound";

// Tenant
import TenantDashboard from "./pages/Tenant/TenantDashboard";
import PropertiesPage from "./pages/PropertiesPage/PropertiesPage";
import PropertyPage from "./pages/PropertiesPage/PropertyPage";
import AnnouncementsPage from "./pages/AnnouncementPage/AnnouncementsPage";
import MessagesPage from "./pages/MessagesPage/MessagesPage";
import ConversationPage from "./pages/MessagesPage/ConversationPage";
import DocumentsPage from "./pages/DocumentPage/DocumentsPage";
import MaintenanceRequestsPage from "./pages/MaintenanceRequestPage/MaintenanceRequestsPage";
import ActivityFeedPage from "./pages/ActivityFeedPage/ActivityFeedPage";
import RentPaymentsPage from "./pages/RentPaymentPage/RentPaymentsPage";
import UserProfilePage from "./pages/UserProfilePage/UserProfilePage";

// Landlord
import LandlordDashboard from "./pages/LandlordPage/LandlordDashboard";

// Menu items
import { tenantMenuItems, landlordMenuItems } from "./config/menuItems";

// Auth
import { AuthProvider } from "./pages/Auth/AuthContext";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Public routes wrapped in AppLayout */}
          <Route element={<AppLayout />}>
            <Route path="/" element={<LandingPage />} />
            <Route path="/properties" element={<ListingsPage />} />
            <Route path="*" element={<NotFound />} />
          </Route>

          {/* Tenant routes */}
          <Route element={<DashboardLayout menuItems={tenantMenuItems} />}>
            <Route path="/tenant" element={<TenantDashboard />} />
            <Route path="/tenant/properties" element={<PropertiesPage />} />
            <Route path="/tenant/properties/:id" element={<PropertyPage />} />
            <Route path="/tenant/announcements" element={<AnnouncementsPage />} />
            <Route path="/tenant/messages" element={<MessagesPage />} />
            <Route path="/tenant/messages/:id" element={<ConversationPage />} />
            <Route path="/tenant/documents" element={<DocumentsPage />} />
            <Route path="/tenant/maintenance-requests" element={<MaintenanceRequestsPage />} />
            <Route path="/tenant/activities" element={<ActivityFeedPage />} />
            <Route path="/tenant/rent-payments" element={<RentPaymentsPage />} />
            <Route path="/tenant/user-profile" element={<UserProfilePage />} />
          </Route>

          {/* Landlord routes */}
          <Route element={<DashboardLayout menuItems={landlordMenuItems} />}>
            <Route path="/landlord" element={<LandlordDashboard />} />
            {/* Add additional landlord routes here */}
          </Route>

          {/* Fallback 404 for unknown dashboard routes */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
