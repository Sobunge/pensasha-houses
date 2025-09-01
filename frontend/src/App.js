import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage/LandingPage";
import LoginPage from "./pages/Auth/LoginPage/LoginPage";
import AppLayout from "./components/AppLayout";
import RegistrationPage from "./pages/Auth/RegistrationPage/RegistrationPage";

function App() {
  return (
    <Router>
      <Routes>
        {/* Wrap all main routes in AppLayout */}
        <Route element={<AppLayout />}>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegistrationPage />} />

          {/* Future routes */}
          {/* <Route path="/houses" element={<BrowseHouses />} /> */}
          {/* <Route path="/list-property" element={<ListProperty />} /> */}
        </Route>

        {/* 404 Fallback */}
        <Route
          path="*"
          element={
            <AppLayout>
              <h1 style={{ padding: "2rem", textAlign: "center" }}>
                404 - Page Not Found
              </h1>
            </AppLayout>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
