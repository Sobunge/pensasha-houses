// src/App.jsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Layouts
import AppLayout from "./layouts/AppLayout";
import DashboardLayout from "./layouts/DashboardLayout";

// Pages
import PropertyDetails from "./pages/ListingsPage/PropertyDetails";
import LandingPage from "./pages/LandingPage/LandingPage";
import ListingsPage from "./pages/ListingsPage/ListingsPage";
import NotFound from "./pages/NotFoundPage/NotFound";
import LandlordTenants from "./pages/LandlordPage/LandlordTenants";
import LandlordCaretakerDetails from "./pages/LandlordPage/LandlordCaretakerDetails";
import LandlordFinance from "./pages/LandlordPage/LandlordFinance";
import LandlordReports from "./pages/LandlordPage/LandlordReports";

// Tenant
import TenantDashboard from "./pages/Tenant/TenantDashboard";
import BrowsePropertiesPage from "./pages/Tenant/BrowsePropertiesPage";
import BrowsePropertyPage from "./pages/Tenant/BrowsePropertyPage";
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
import CaretakerTasksPage from "./pages/CaretakerPage/CaretakerTasksPage";
import CaretakerReportsPage from "./pages/CaretakerPage/CaretakerReportsPage";

// Landlord
import LandlordDashboard from "./pages/LandlordPage/LandlordDashboard";

// Caretaker
import CaretakerDashboard from "./pages/CaretakerPage/CaretakerDashboard";

// Admin
import AdminDashboard from "./pages/AdminPage/AdminDashboard";

// Menu items
import { tenantMenuItems, landlordMenuItems } from "./config/menuItems";

// Auth
import { AuthProvider } from "./pages/Auth/AuthContext";
import ProtectedRoute from "./pages/Auth/ProtectedRoute";
import TenantDetails from "./pages/LandlordPage/TenantDetails";
import LandlordCaretakers from "./pages/LandlordPage/LandlordCaretakers";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Public routes */}
          <Route element={<AppLayout />}>
            <Route path="/" element={<LandingPage />} />
            <Route path="/properties" element={<ListingsPage />} />
            <Route path="/property/:id" element={<PropertyDetails />} />
            <Route path="*" element={<NotFound />} /> {/* Public catch-all */}
          </Route>

          {/* Tenant routes */}
          <Route
            path="/tenant/*"
            element={
              <ProtectedRoute allowedRoles={["tenant"]}>
                <DashboardLayout menuItems={tenantMenuItems} />
              </ProtectedRoute>
            }
          >
            <Route index element={<TenantDashboard />} />
            <Route path="browse-properties" element={<BrowsePropertiesPage />} />
            <Route path="browse-properties/:id" element={<BrowsePropertyPage />} />
            <Route path="properties" element={<PropertiesPage />} />
            <Route path="properties/:id" element={<PropertyPage />} />
            <Route path="announcements" element={<AnnouncementsPage />} />
            <Route path="messages" element={<MessagesPage />} />
            <Route path="messages/:id" element={<ConversationPage />} />
            <Route path="documents" element={<DocumentsPage />} />
            <Route path="maintenance-requests" element={<MaintenanceRequestsPage />} />
            <Route path="activities" element={<ActivityFeedPage />} />
            <Route path="rent-payments" element={<RentPaymentsPage />} />
            <Route path="user-profile" element={<UserProfilePage />} />
            <Route path="*" element={<NotFound />} /> {/* Tenant catch-all */}
          </Route>

          {/* Landlord routes */}
          <Route
            path="/landlord/*"
            element={
              <ProtectedRoute allowedRoles={["landlord"]}>
                <DashboardLayout menuItems={landlordMenuItems} />
              </ProtectedRoute>
            }
          >
            <Route index element={<LandlordDashboard />} />
            <Route path="properties" element={<PropertiesPage />} />
            <Route path="properties/:id" element={<PropertyPage />} />
            <Route path="tenants" element={<LandlordTenants />} />
            <Route path="tenants/:id" element={<TenantDetails />} />
            <Route path="caretakers" element={<LandlordCaretakers />} />
            <Route path="caretakers/:id" element={<LandlordCaretakerDetails />} />
            <Route path="finances" element={<LandlordFinance />} />
            <Route path="reports" element={<LandlordReports />} />
            <Route path="messages" element={<MessagesPage />} />
            <Route path="messages/:id" element={<ConversationPage />} />
            <Route path="announcements" element={<AnnouncementsPage />} />
            <Route path="activities" element={<ActivityFeedPage />} />
            <Route path="user-profile" element={<UserProfilePage />} />
            <Route path="maintenance-requests" element={<MaintenanceRequestsPage />} />
            <Route path="*" element={<NotFound />} /> {/* Landlord catch-all */}
          </Route>

          {/* Caretaker routes */}
          <Route
            path="/caretaker/*"
            element={
              <ProtectedRoute allowedRoles={["caretaker"]}>
                <DashboardLayout menuItems={[]} />
              </ProtectedRoute>
            }
          >
            <Route index element={<CaretakerDashboard />} />
            <Route path="user-profile" element={<UserProfilePage />} />
            <Route path="properties" element={<PropertiesPage />} />
            <Route path="properties/:id" element={<PropertyPage />} />
            <Route path="announcements" element={<AnnouncementsPage />} />
            <Route path="maintenance-requests" element={<MaintenanceRequestsPage />} />
            <Route path="messages" element={<MessagesPage />} />
            <Route path="messages/:id" element={<ConversationPage />} />
            <Route path="activities" element={<ActivityFeedPage />} />
            <Route path="tasks" element={<CaretakerTasksPage />} />
            <Route path="reports" element={<CaretakerReportsPage />} />
            <Route path="*" element={<NotFound />} /> {/* Caretaker catch-all */}
          </Route>

          {/* Admin routes */}
          <Route
            path="/admin/*"
            element={
              <ProtectedRoute allowedRoles={["admin"]}>
                <DashboardLayout menuItems={[]} />
              </ProtectedRoute>
            }
          >
            <Route index element={<AdminDashboard />} />
            <Route path="user-profile" element={<UserProfilePage />} />
            <Route path="properties" element={<PropertiesPage />} />
            <Route path="properties/:id" element={<PropertyPage />} />
            <Route path="announcements" element={<AnnouncementsPage />} />
              <Route path="messages" element={<MessagesPage />} />
            <Route path="messages/:id" element={<ConversationPage />} />
            <Route path="activities" element={<ActivityFeedPage />} />
            <Route path="finances" element={<ActivityFeedPage />} />
            <Route path="documents" element={<DocumentsPage />} />
            <Route path="reports" element={<CaretakerReportsPage />} />
            <Route path="maintenance-requests" element={<MaintenanceRequestsPage />} />
            <Route path="*" element={<NotFound />} /> {/* Admin catch-all */}
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
