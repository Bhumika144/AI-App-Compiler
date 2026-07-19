import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Navbar.css";

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  // Check authentication status on mount and when localStorage changes
  useEffect(() => {
    const checkAuth = () => {
      const token = localStorage.getItem("token");
      const userData = localStorage.getItem("user");
      
      if (token && userData) {
        try {
          const parsedUser = JSON.parse(userData);
          setUser(parsedUser);
          setIsAuthenticated(true);
        } catch (error) {
          console.error("Error parsing user data:", error);
          setIsAuthenticated(false);
          setUser(null);
        }
      } else {
        setIsAuthenticated(false);
        setUser(null);
      }
    };

    checkAuth();

    // Listen for storage changes (in case of logout in another tab)
    window.addEventListener("storage", checkAuth);
    
    return () => {
      window.removeEventListener("storage", checkAuth);
    };
  }, []);

  // Handle click outside dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Handle escape key to close dropdown
  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === "Escape" && isDropdownOpen) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isDropdownOpen]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    if (isDropdownOpen) setIsDropdownOpen(false);
  };

  const toggleDropdown = () => {
    if (isAuthenticated) {
      setIsDropdownOpen(!isDropdownOpen);
      if (isMenuOpen) setIsMenuOpen(false);
    }
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const handleLogout = () => {
    // Remove token and user from localStorage
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    
    // Update state
    setIsAuthenticated(false);
    setUser(null);
    setIsDropdownOpen(false);
    
    // Redirect to login page
    navigate("/");
  };

  // Get user initials for avatar
  const getUserInitials = () => {
    if (!user) return "?";
    if (user.name) {
      const nameParts = user.name.split(" ");
      if (nameParts.length >= 2) {
        return `${nameParts[0][0]}${nameParts[1][0]}`.toUpperCase();
      }
      return user.name.substring(0, 2).toUpperCase();
    }
    if (user.email) {
      return user.email.substring(0, 2).toUpperCase();
    }
    return "?";
  };

  // Get display name
  const getDisplayName = () => {
    if (user?.name) return user.name;
    if (user?.email) return user.email.split("@")[0];
    return "User";
  };

  return (
    <nav className="navbar" role="navigation" aria-label="Main navigation">
      <div className="navbar-container">
        {/* Logo */}
        <div className="navbar-logo" onClick={() => navigate("/")} style={{ cursor: "pointer" }}>
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

        {/* Right Section - Profile / Auth */}
        <div className="navbar-right">
          {isAuthenticated ? (
            <div className="profile-container" ref={dropdownRef}>
              {/* Profile Avatar */}
              <button
                className={`profile-avatar ${isDropdownOpen ? "active" : ""}`}
                onClick={toggleDropdown}
                aria-label="User menu"
                aria-expanded={isDropdownOpen}
                aria-haspopup="true"
              >
                <span className="avatar-initials">{getUserInitials()}</span>
                <span className="avatar-status online"></span>
              </button>

              {/* Dropdown Menu */}
              {isDropdownOpen && (
                <div 
                  className="profile-dropdown"
                  role="menu"
                  aria-label="User profile menu"
                >
                  <div className="dropdown-header">
                    <div className="dropdown-avatar">
                      <span className="dropdown-avatar-initials">
                        {getUserInitials()}
                      </span>
                    </div>
                    <div className="dropdown-user-info">
                      <span className="dropdown-user-name">{getDisplayName()}</span>
                      <span className="dropdown-user-email">{user?.email || ""}</span>
                    </div>
                  </div>

                  <div className="dropdown-divider"></div>

                  <button
                    className="dropdown-logout"
                    onClick={handleLogout}
                    role="menuitem"
                  >
                    <span className="logout-icon">🚪</span>
                    <span>Logout</span>
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="auth-buttons">
              <button 
                className="auth-btn login-btn"
                onClick={() => navigate("/login")}
              >
                Log In
              </button>
              <button 
                className="auth-btn signup-btn"
                onClick={() => navigate("/signup")}
              >
                Sign Up
              </button>
            </div>
          )}

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
        </div>

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

            {isAuthenticated && (
              <>
                <div className="mobile-divider"></div>
                <div className="mobile-user-info">
                  <span className="mobile-user-name">{getDisplayName()}</span>
                  <span className="mobile-user-email">{user?.email || ""}</span>
                </div>
                <button 
                  className="mobile-logout-btn"
                  onClick={handleLogout}
                >
                  <span className="logout-icon">🚪</span>
                  Logout
                </button>
              </>
            )}
          </div>

          <div className="mobile-menu-footer">
            <span className="version-badge">Version 1.0.0</span>
            {!isAuthenticated && (
              <div className="mobile-auth-buttons">
                <button 
                  className="mobile-auth-btn login-btn"
                  onClick={() => navigate("/login")}
                >
                  Log In
                </button>
                <button 
                  className="mobile-auth-btn signup-btn"
                  onClick={() => navigate("/signup")}
                >
                  Sign Up
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;