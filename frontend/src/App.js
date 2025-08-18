import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage/LandingPage';
import LoginPage from './pages/Auth/LoginPage/LoginPage';
import AppLayout from './components/AppLayout';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/"
          element={
            <AppLayout>
              <LandingPage />
            </AppLayout>
          }
        />
        <Route path="/login"
          element={
            <AppLayout>
              <LoginPage />
            </AppLayout>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
