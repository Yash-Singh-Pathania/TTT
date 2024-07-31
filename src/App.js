import React from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import SignupPage from './pages/SignupPage';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import RecordMatchPage from './pages/RecordMatchPage';
import ConfirmMatchPage from './pages/ConfirmMatchPage';
import Navbar from './components/Navbar';

const AppContent = () => {
  const location = useLocation();
  const hideNavbarPaths = ['/login', '/signup']; // List paths where Navbar should be hidden

  return (
    <>
      {!hideNavbarPaths.includes(location.pathname) && <Navbar />}
      <Routes>
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/record-match" element={<RecordMatchPage />} />
        <Route path="/confirm-match" element={<ConfirmMatchPage />} />
      </Routes>
    </>
  );
};

const App = () => {
  return (
    <Router>
      <AppContent />
    </Router>
  );
};

export default App;
