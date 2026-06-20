import React from 'react';
import { NavLink } from 'react-router-dom';

const Navbar = ({ theme, toggleTheme }) => (
  <nav className="navbar navbar-expand-lg border-bottom py-2 bg-body-tertiary">
    <div className="container">
      {/* Brand logo */}
      <NavLink className="navbar-brand fw-bold fs-4 text-decoration-none" to="/">
        ✔️ Task<span className="text-primary">Flow</span>
      </NavLink>

      {/* Nav Link links */}
      <div className="d-flex align-items-center gap-3">
        <NavLink to="/" className={({ isActive }) => `nav-link ${isActive ? 'fw-bold text-primary' : 'text-secondary'}`}>
          Dashboard
        </NavLink>
        <NavLink to="/add-task" className={({ isActive }) => `nav-link ${isActive ? 'fw-bold text-primary' : 'text-secondary'}`}>
          Add Task
        </NavLink>
        {/* Simple Theme Toggle Icon button */}
        <button className="btn btn-sm border-0 fs-5" onClick={toggleTheme} style={{ cursor: 'pointer' }}>
          {theme === 'dark' ? '☀️' : '🌙'}
        </button>
      </div>
    </div>
  </nav>
);

export default Navbar;
