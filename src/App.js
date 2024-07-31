import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SignupPage from './pages/SignupPage';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import RecordMatchPage from './pages/RecordMatchPage';
import ConfirmMatchPage from './pages/ConfirmMatchPage';
import Navbar from './components/Navbar';

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/record-match" element={<RecordMatchPage />} />
        <Route path="/confirm-match" element={<ConfirmMatchPage />} />
      </Routes>
    </Router>
  );
};

export default App;
