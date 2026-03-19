import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import GlobalSOS from './components/GlobalSOS';
import LiveAlerts from './components/LiveAlerts';

import Home from './pages/Home';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import SafeRoutes from './pages/SafeRoutes';
import Complaints from './pages/Complaints';
import Schemes from './pages/Schemes';

function App() {
  const [darkMode, setDarkMode] = useState(false);

  return (
    <Router>
      <div className={`${darkMode ? 'dark' : ''} min-h-screen transition-colors duration-300 font-sans`}>
        <div className="dark:bg-[#121212] dark:text-gray-100 min-h-screen relative">
          <Navbar darkMode={darkMode} setDarkMode={setDarkMode} />
          
          <LiveAlerts />
          <GlobalSOS />

          <main className="container mx-auto px-4 py-8">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/saferoutes" element={<SafeRoutes />} />
              <Route path="/complaints" element={<Complaints />} />
              <Route path="/schemes" element={<Schemes />} />
            </Routes>
          </main>
        </div>
      </div>
    </Router>
  );
}

export default App;
