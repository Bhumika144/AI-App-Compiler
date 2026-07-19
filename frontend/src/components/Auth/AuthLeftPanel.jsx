import "../../styles/Auth.css";

function AuthLeftPanel() {
  return (
    <div className="auth-left">

      <div className="blur-circle circle-one"></div>
      <div className="blur-circle circle-two"></div>

      <div className="auth-left-content">

        <span className="brand-tag">
          🚀 AI Powered Platform
        </span>

        <h1>
          AI App
          <br />
          Compiler
        </h1>

        <p>
          Transform natural language into complete software
          blueprints using Artificial Intelligence.
        </p>

        <div className="feature-list">

          <div className="feature-item">
            <span>✓</span>
            Intent Extraction
          </div>

          <div className="feature-item">
            <span>✓</span>
            System Design
          </div>

          <div className="feature-item">
            <span>✓</span>
            Database Schema
          </div>

          <div className="feature-item">
            <span>✓</span>
            Validation Engine
          </div>

          <div className="feature-item">
            <span>✓</span>
            Repair Engine
          </div>

          <div className="feature-item">
            <span>✓</span>
            Runtime Generator
          </div>

        </div>

      </div>

    </div>
  );
}

export default AuthLeftPanel;