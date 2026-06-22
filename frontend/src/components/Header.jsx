import { useState, useEffect, useRef } from "react";
import "../styles/Header.css";

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeLink, setActiveLink] = useState("/");
  const menuRef = useRef(null);
  const buttonRef = useRef(null);

  // Navigation links configuration
  const navLinks = [
    { path: "/", label: "Home", icon: "🏠" },
    { path: "/pipeline", label: "Pipeline", icon: "⚡" },
    { path: "/docs", label: "Documentation", icon: "📚" },
    { path: "/about", label: "About", icon: "ℹ️" },
  ];

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Handle click outside to close mobile menu
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        isMenuOpen &&
        menuRef.current &&
        !menuRef.current.contains(event.target) &&
        !buttonRef.current.contains(event.target)
      ) {
        setIsMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isMenuOpen]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMenuOpen]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const handleLinkClick = (path) => {
    setActiveLink(path);
    closeMenu();
  };

  return (
    <header className={`header ${isScrolled ? "scrolled" : ""}`}>
      <div className="header-container">
        {/* Logo */}
        <div className="header-logo">
          <a href="/" className="logo-link" aria-label="AI App Compiler Home">
            <div className="logo-icon-wrapper">
              <span className="logo-icon">⚡</span>
              <span className="logo-pulse"></span>
            </div>
            <div className="logo-text-wrapper">
              <span className="logo-text">AI App Compiler</span>
              <span className="logo-badge">Beta</span>
            </div>
          </a>
        </div>

        {/* Desktop Navigation */}
        <nav className="header-nav" aria-label="Main navigation">
          <ul className="nav-list">
            {navLinks.map((link) => (
              <li key={link.path} className="nav-item">
                <a
                  href={link.path}
                  className={`nav-link ${activeLink === link.path ? "active" : ""}`}
                  onClick={() => handleLinkClick(link.path)}
                  aria-current={activeLink === link.path ? "page" : undefined}
                >
                  <span className="nav-link-icon">{link.icon}</span>
                  <span className="nav-link-text">{link.label}</span>
                  {activeLink === link.path && (
                    <span className="nav-link-indicator"></span>
                  )}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {/* Right Actions */}
        <div className="header-actions">
          <button className="action-btn theme-toggle" aria-label="Toggle theme">
            <span className="theme-icon">🌙</span>
          </button>
          <button className="action-btn search-btn" aria-label="Search">
            <span className="search-icon">🔍</span>
          </button>
          <button className="action-btn cta-btn" aria-label="Get Started">
            <span>Get Started</span>
            <span className="cta-arrow">→</span>
          </button>

          {/* Hamburger Button */}
          <button
            ref={buttonRef}
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
        </div>

        {/* Mobile Menu Overlay */}
        <div
          className={`mobile-overlay ${isMenuOpen ? "open" : ""}`}
          onClick={closeMenu}
          aria-hidden="true"
        ></div>

        {/* Mobile Menu */}
        <div
          ref={menuRef}
          id="mobile-menu"
          className={`mobile-menu ${isMenuOpen ? "open" : ""}`}
          role="dialog"
          aria-label="Mobile navigation"
          aria-modal="true"
        >
          <div className="mobile-menu-header">
            <div className="mobile-logo">
              <span className="logo-icon">⚡</span>
              <span className="logo-text">AI App Compiler</span>
            </div>
            <button
              className="mobile-close-btn"
              onClick={closeMenu}
              aria-label="Close menu"
            >
              ✕
            </button>
          </div>

          <nav className="mobile-nav" aria-label="Mobile navigation">
            <ul className="mobile-nav-list">
              {navLinks.map((link) => (
                <li key={link.path} className="mobile-nav-item">
                  <a
                    href={link.path}
                    className={`mobile-nav-link ${
                      activeLink === link.path ? "active" : ""
                    }`}
                    onClick={() => handleLinkClick(link.path)}
                  >
                    <span className="mobile-nav-icon">{link.icon}</span>
                    <span className="mobile-nav-text">{link.label}</span>
                    {activeLink === link.path && (
                      <span className="mobile-nav-check">✓</span>
                    )}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="mobile-menu-footer">
            <div className="mobile-actions">
              <button className="mobile-action-btn">
                <span>🌙</span> Theme
              </button>
              <button className="mobile-action-btn">
                <span>🔍</span> Search
              </button>
            </div>
            <button className="mobile-cta-btn">
              Get Started →
            </button>
            <p className="mobile-version">Version 1.0.0</p>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;