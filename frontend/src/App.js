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
// ... (other tenant imports)

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

// Notifications
import { NotificationProvider } from "./components/NotificationProvider";

function App() {
  return (
    <NotificationProvider>
      <AuthProvider>
        <Router>
          <Routes>
            {/* Public routes */}
            <Route element={<AppLayout />}>
              <Route path="/" element={<LandingPage />} />
              <Route path="/properties" element={<ListingsPage />} />
              <Route path="*" element={<NotFound />} />
            </Route>

            {/* Tenant routes */}
            <Route
              element={
                <ProtectedRoute allowedRoles={["tenant"]}>
                  <DashboardLayout menuItems={tenantMenuItems} />
                </ProtectedRoute>
              }
            >
              <Route path="/tenant" element={<TenantDashboard />} />
              {/* tenant subroutes */}
            </Route>

            {/* Landlord routes */}
            <Route
              element={
                <ProtectedRoute allowedRoles={["landlord"]}>
                  <DashboardLayout menuItems={landlordMenuItems} />
                </ProtectedRoute>
              }
            >
              <Route path="/landlord" element={<LandlordDashboard />} />
            </Route>

            {/* Caretaker routes */}
            <Route
              element={
                <ProtectedRoute allowedRoles={["caretaker"]}>
                  <DashboardLayout menuItems={[]} /> {/* add caretaker menu later */}
                </ProtectedRoute>
              }
            >
              <Route path="/caretaker" element={<CaretakerDashboard />} />
            </Route>

            {/* Admin routes */}
            <Route
              element={
                <ProtectedRoute allowedRoles={["admin"]}>
                  <DashboardLayout menuItems={[]} /> {/* add admin menu later */}
                </ProtectedRoute>
              }
            >
              <Route path="/admin" element={<AdminDashboard />} />
            </Route>

            {/* Catch all */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Router>
      </AuthProvider>
    </NotificationProvider>
  );
}

export default App;
