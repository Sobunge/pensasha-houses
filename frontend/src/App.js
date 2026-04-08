// src/App.jsx
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Layouts
import AppLayout from "./layouts/AppLayout";
import DashboardLayout from "./layouts/DashboardLayout";

// Pages
import LandingPage from "./pages/LandingPage/LandingPage";
import ListingsPage from "./pages/ListingsPage/ListingsPage";
import UserProfilePage from "./pages/UserProfilePage/UserProfilePage";
import PropertyDetails from "./pages/ListingsPage/PropertyDetails";
import NotFound from "./pages/NotFoundPage/NotFound";

// Shared Dashboard Pages
import MainDashboard from "./pages/DashboardPage/MainDashboard";

// Auth
import { AuthProvider } from "./pages/Auth/AuthContext";
import ProtectedRoute from "./pages/Auth/ProtectedRoute";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* ===== Public Routes ===== */}
          <Route element={<AppLayout />}>
            <Route path="/" element={<LandingPage />} />
            <Route path="/properties" element={<ListingsPage />} />
            <Route path="/properties/:id" element={<PropertyDetails />} />
            <Route path="*" element={<NotFound />} />
          </Route>

          {/* ===== Protected Dashboard (All Roles) ===== */}
          <Route
            path="/dashboard/*"
            element={
              <ProtectedRoute>
                <DashboardLayout />
              </ProtectedRoute>
            }
          >
            {/* Main Dashboard (dynamic based on permissions) */}
            <Route index element={<MainDashboard />} />
            
            {/* Optional shared pages if needed */}
            <Route path="profile" element={<UserProfilePage />} />
            <Route path="properties" element={<ListingsPage />} />
            <Route path="properties/:id" element={<PropertyDetails />} />

            {/* Fallback for unknown dashboard routes */}
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;