import { useEffect, useRef, useState } from "react";
import "../styles/FeaturesSection.css";

function FeaturesSection() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  const features = [
    {
      id: 1,
      title: "Intent Extraction",
      icon: "🎯",
      description:
        "Convert natural language requirements into structured application intent with advanced NLP.",
      color: "#7c3aed",
      gradient: "linear-gradient(135deg, #7c3aed, #a855f7)",
      bgGradient: "linear-gradient(135deg, rgba(124,58,237,0.08), rgba(168,85,247,0.04))",
    },
    {
      id: 2,
      title: "System Design",
      icon: "🏗️",
      description:
        "Automatically identify entities, roles, workflows and architecture patterns.",
      color: "#a855f7",
      gradient: "linear-gradient(135deg, #a855f7, #d946ef)",
      bgGradient: "linear-gradient(135deg, rgba(168,85,247,0.08), rgba(217,70,239,0.04))",
    },
    {
      id: 3,
      title: "Schema Generation",
      icon: "📊",
      description:
        "Generate UI, API, Database and Authentication schemas with best practices.",
      color: "#22d3ee",
      gradient: "linear-gradient(135deg, #22d3ee, #06b6d4)",
      bgGradient: "linear-gradient(135deg, rgba(34,211,238,0.08), rgba(6,182,212,0.04))",
    },
    {
      id: 4,
      title: "Validation Engine",
      icon: "✅",
      description:
        "Verify consistency, required fields and schema correctness automatically.",
      color: "#34d399",
      gradient: "linear-gradient(135deg, #34d399, #10b981)",
      bgGradient: "linear-gradient(135deg, rgba(52,211,153,0.08), rgba(16,185,129,0.04))",
    },
    {
      id: 5,
      title: "Repair Engine",
      icon: "🔧",
      description:
        "Detect errors and intelligently repair only affected sections with precision.",
      color: "#fbbf24",
      gradient: "linear-gradient(135deg, #fbbf24, #f59e0b)",
      bgGradient: "linear-gradient(135deg, rgba(251,191,36,0.08), rgba(245,158,11,0.04))",
    },
    {
      id: 6,
      title: "Runtime Simulation",
      icon: "⚡",
      description:
        "Preview how the generated blueprint would behave in real execution.",
      color: "#f87171",
      gradient: "linear-gradient(135deg, #f87171, #ef4444)",
      bgGradient: "linear-gradient(135deg, rgba(248,113,113,0.08), rgba(239,68,68,0.04))",
    }
  ];

  // Intersection Observer for entrance animation
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section 
      className="features-section" 
      ref={sectionRef}
      aria-label="Core capabilities and features"
    >
      {/* Header */}
      <div className="features-header">
        <div className="features-header-badge">
          <span className="badge-icon">🚀</span>
          <span>Features</span>
        </div>
        <h2 className="features-title">Core Capabilities</h2>
        <p className="features-subtitle">
          A compiler-inspired AI system designed for reliable software generation.
        </p>
        <div className="features-divider">
          <span className="divider-line"></span>
          <span className="divider-diamond">◆</span>
          <span className="divider-line"></span>
        </div>
      </div>

      {/* Grid */}
      <div className={`features-grid ${isVisible ? "visible" : ""}`}>
        {features.map((feature, index) => (
          <div 
            className="feature-card" 
            key={feature.id}
            style={{ 
              "--card-accent": feature.color,
              "--card-gradient": feature.gradient,
              "--card-bg": feature.bgGradient,
              animationDelay: `${index * 0.1}s`
            }}
            role="article"
            aria-labelledby={`feature-${feature.id}`}
          >
            {/* Glow effect */}
            <div className="card-glow"></div>
            
            {/* Top accent border */}
            <div className="card-accent-border"></div>
            
            {/* Card content */}
            <div className="card-content">
              <div className="card-header">
                <div className="card-icon-wrapper" style={{ background: feature.bgGradient }}>
                  <span className="card-icon">{feature.icon}</span>
                </div>
                <span className="card-number">0{feature.id}</span>
              </div>
              
              <h3 id={`feature-${feature.id}`} className="card-title">
                {feature.title}
              </h3>
              
              <p className="card-description">{feature.description}</p>
              
              <div className="card-footer">
                <span className="card-tag" style={{ color: feature.color }}>
                  Learn more →
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Bottom CTA */}
      <div className="features-cta">
        <div className="cta-content">
          <span className="cta-icon">💡</span>
          <p className="cta-text">Ready to build your next application?</p>
          <button className="cta-button" aria-label="Get started with AI App Compiler">
            <span>Get Started</span>
            <span className="cta-arrow">→</span>
          </button>
        </div>
      </div>
    </section>
  );
}

export default FeaturesSection;