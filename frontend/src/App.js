import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage/LandingPage";
import AppLayout from "./components/AppLayout";
import ListingsPage from "./pages/ListingsPage/ListingsPage";
import NotFound from "./pages/NotFoundPage/NotFound";
import TenantDashboard from "./pages/Tenant/TenantDashboard";

function App() {
  return (
    <Router>
      <Routes>
        {/* Wrap all main routes in AppLayout */}
        <Route element={<AppLayout />}>
          <Route path="/" element={<LandingPage />} />
          <Route path="/properties" element={<ListingsPage />} />
          <Route path="/tenant" element={<TenantDashboard />} />

          {/* 404 Fallback */}
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
