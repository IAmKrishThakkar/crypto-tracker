// components/Header.jsx
import React from 'react';
import { FaMoon, FaSun } from 'react-icons/fa';
import './../CSS/Header.css';

const Header = ({ darkMode, toggleDarkMode }) => {
  return (
    <header className="header">
      <div className="header-inner container">
        <div className="logo-section">
          <div className="logo-circle">₿</div>
          <h1 className="logo-title">Crypto Dashboard</h1>
        </div>
        <button
          onClick={toggleDarkMode}
          className="btn-icon toggle-btn"
          title="Toggle Theme"
        >
          {darkMode ? <FaSun color="#facc15" /> : <FaMoon color="#64748b" />}
        </button>
      </div>
    </header>
  );
};

export default Header;
