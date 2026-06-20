import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Dashboard from './pages/Dashboard';
import AddTask from './pages/AddTask';
import { ToastProvider } from './components/ToastContainer';

function App() {
  // Read theme preference from local storage or default to light mode
  const [theme, setTheme] = useState(() => {
    const savedTheme = localStorage.getItem('theme');
    return savedTheme || 'light';
  });

  // Apply theme class to HTML element whenever theme changes
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  // Toggle between dark and light themes
  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  return (
    <ToastProvider>
      <Router>
        <div className="d-flex flex-column min-vh-100">
          {/* Header Navigation */}
          <Navbar theme={theme} toggleTheme={toggleTheme} />
          
          {/* Main Content Area */}
          <main className="flex-grow-1 py-4">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/add-task" element={<AddTask />} />
            </Routes>
          </main>
          
          {/* Footer Branding */}
          <footer className="py-3 border-top mt-auto bg-body-tertiary" style={{ transition: 'all 0.3s ease' }}>
            <div className="container text-center">
              <span className="text-muted small">
                © {new Date().getFullYear()} TaskFlow Portal. Made for Placement Assessment. All rights reserved.
              </span>
            </div>
          </footer>
        </div>
      </Router>
    </ToastProvider>
  );
}

export default App;
