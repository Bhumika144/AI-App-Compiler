import { useState } from "react";
import "../styles/Navbar.css";

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <nav className="navbar" role="navigation" aria-label="Main navigation">
      <div className="navbar-container">
        {/* Logo */}
        <div className="navbar-logo">
          <span className="logo-icon">⚡</span>
          <span className="logo-text">AI App Compiler</span>
          <span className="logo-badge">v1.0</span>
        </div>

        {/* Desktop Navigation Links */}
        <div className="navbar-links desktop-nav">
          <a href="/" className="nav-link active" aria-current="page">
            Home
          </a>
          <a href="#pipeline" className="nav-link">
            Pipeline
          </a>
          <a href="#about" className="nav-link">
            About
          </a>
        </div>

        {/* Mobile Hamburger Button */}
        <button
          className={`hamburger-btn ${isMenuOpen ? "active" : ""}`}
          onClick={toggleMenu}
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          aria-expanded={isMenuOpen}
          aria-controls="mobile-menu"
        >
          <span className="hamburger-line"></span>
          <span className="hamburger-line"></span>
          <span className="hamburger-line"></span>
        </button>

        {/* Mobile Menu Overlay */}
        <div
          className={`mobile-menu-overlay ${isMenuOpen ? "open" : ""}`}
          onClick={closeMenu}
          role="button"
          aria-hidden={!isMenuOpen}
        ></div>

        {/* Mobile Navigation Menu */}
        <div
          id="mobile-menu"
          className={`mobile-menu ${isMenuOpen ? "open" : ""}`}
          role="dialog"
          aria-label="Mobile navigation"
          aria-modal="true"
        >
          <div className="mobile-menu-header">
            <span className="logo-icon">⚡</span>
            <span className="logo-text">AI App Compiler</span>
            <button
              className="mobile-close-btn"
              onClick={closeMenu}
              aria-label="Close menu"
            >
              ✕
            </button>
          </div>
          <div className="mobile-menu-links">
            <a href="/" className="mobile-nav-link active" onClick={closeMenu}>
              <span className="nav-icon">🏠</span>
              Home
            </a>
            <a href="#pipeline" className="mobile-nav-link" onClick={closeMenu}>
              <span className="nav-icon">⚙️</span>
              Pipeline
            </a>
            <a href="#about" className="mobile-nav-link" onClick={closeMenu}>
              <span className="nav-icon">ℹ️</span>
              About
            </a>
          </div>
          <div className="mobile-menu-footer">
            <span className="version-badge">Version 1.0.0</span>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;