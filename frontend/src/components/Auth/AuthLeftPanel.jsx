import "../../styles/Auth.css";

function AuthLeftPanel() {
  const features = [
    { icon: "🎯", text: "Intent Extraction" },
    { icon: "🏗️", text: "System Design" },
    { icon: "📊", text: "Database Schema" },
    { icon: "✅", text: "Validation Engine" },
    { icon: "🔧", text: "Repair Engine" },
    { icon: "⚡", text: "Runtime Generator" },
  ];

  return (
    <div className="auth-left">
      {/* Blur Circles */}
      <div className="blur-circle circle-one"></div>
      <div className="blur-circle circle-two"></div>
      <div className="blur-circle circle-three"></div>

      <div className="auth-left-content">
        <span className="brand-tag">🚀 AI Powered Platform</span>

        <h1>
          AI App
          <br />
          <span className="highlight">Compiler</span>
        </h1>

        <p>
          Transform natural language into complete software
          blueprints using Artificial Intelligence.
        </p>

        <div className="feature-list">
          {features.map((feature, index) => (
            <div className="feature-item" key={index}>
              <span>{feature.icon}</span>
              {feature.text}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default AuthLeftPanel;