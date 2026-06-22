import { useState } from "react";
import "../styles/Footer.css";

function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const currentYear = new Date().getFullYear();

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail("");
      setTimeout(() => setSubscribed(false), 3000);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const footerLinks = {
    product: {
      title: "Product",
      links: [
        { label: "Features", href: "#features" },
        { label: "Pricing", href: "#pricing" },
        { label: "Documentation", href: "#docs" },
        { label: "Changelog", href: "#changelog" },
      ],
    },
    company: {
      title: "Company",
      links: [
        { label: "About", href: "#about" },
        { label: "Blog", href: "#blog" },
        { label: "Careers", href: "#careers" },
        { label: "Contact", href: "#contact" },
      ],
    },
    resources: {
      title: "Resources",
      links: [
        { label: "Community", href: "#community" },
        { label: "Support", href: "#support" },
        { label: "Status", href: "#status" },
        { label: "API Reference", href: "#api" },
      ],
    },
  };

  const socialLinks = [
    { name: "GitHub", icon: "🐙", href: "#github" },
    { name: "Twitter", icon: "🐦", href: "#twitter" },
    { name: "LinkedIn", icon: "💼", href: "#linkedin" },
    { name: "YouTube", icon: "▶️", href: "#youtube" },
  ];

  return (
    <footer className="footer" role="contentinfo" aria-label="Footer">
      <div className="footer-container">
        {/* Main Footer Content */}
        <div className="footer-grid">
          {/* Brand Column */}
          <div className="footer-brand">
            <div className="brand-logo">
              <span className="logo-icon">⚡</span>
              <span className="logo-text">AI App Compiler</span>
            </div>
            <p className="brand-description">
              Transform natural language into executable software blueprints
              with our AI-powered compiler.
            </p>
            <div className="brand-version">
              <span className="version-badge">v1.0.0</span>
              <span className="version-status">● Stable</span>
            </div>
          </div>

          {/* Links Columns */}
          <div className="footer-links">
            {Object.values(footerLinks).map((section) => (
              <div className="link-column" key={section.title}>
                <h3 className="link-column-title">{section.title}</h3>
                <ul className="link-list">
                  {section.links.map((link) => (
                    <li key={link.label}>
                      <a
                        href={link.href}
                        className="link-item"
                        aria-label={`${link.label} - ${section.title}`}
                      >
                        <span className="link-dot"></span>
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Newsletter Column */}
          <div className="footer-newsletter">
            <h3 className="newsletter-title">Stay Updated</h3>
            <p className="newsletter-description">
              Subscribe to our newsletter for updates and new features.
            </p>
            <form className="newsletter-form" onSubmit={handleSubscribe}>
              <div className="input-wrapper">
                <span className="input-icon">✉️</span>
                <input
                  type="email"
                  className="newsletter-input"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  aria-label="Email address for newsletter"
                />
                <button
                  type="submit"
                  className="subscribe-btn"
                  aria-label="Subscribe to newsletter"
                >
                  {subscribed ? "✓" : "→"}
                </button>
              </div>
              {subscribed && (
                <p className="subscribe-success">
                  ✅ Thanks for subscribing!
                </p>
              )}
            </form>
            <div className="newsletter-social">
              <span className="social-label">Follow us:</span>
              <div className="social-links">
                {socialLinks.map((social) => (
                  <a
                    key={social.name}
                    href={social.href}
                    className="social-link"
                    aria-label={`Follow us on ${social.name}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <span className="social-icon">{social.icon}</span>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="footer-bottom">
          <div className="footer-bottom-content">
            <p className="copyright">
              © {currentYear} AI App Compiler. All rights reserved.
            </p>
            <div className="legal-links">
              <a href="#privacy" className="legal-link">
                Privacy Policy
              </a>
              <span className="legal-divider">·</span>
              <a href="#terms" className="legal-link">
                Terms of Service
              </a>
              <span className="legal-divider">·</span>
              <a href="#cookies" className="legal-link">
                Cookie Policy
              </a>
            </div>
            <button
              className="back-to-top"
              onClick={scrollToTop}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
              aria-label="Back to top"
            >
              <span className={`back-arrow ${isHovered ? "hovered" : ""}`}>
                ↑
              </span>
              <span className="back-text">Back to Top</span>
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;