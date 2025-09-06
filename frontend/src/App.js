import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage/LandingPage";
import AppLayout from "./components/AppLayout";
import ListingsPage from "./pages/ListingsPage/ListingsPage";
import NotFound from "./pages/NotFoundPage/NotFound";
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


function App() {
  return (
    <Router>
      <Routes>
        {/* Wrap all main routes in AppLayout */}
        <Route element={<AppLayout />}>
          <Route path="/" element={<LandingPage />} />
          <Route path="/properties" element={<ListingsPage />} />
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

          {/* 404 Fallback */}
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
