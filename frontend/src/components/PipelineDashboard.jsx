import { useContext, useState, useEffect } from "react";
import { PipelineContext } from "../context/PipelineContext";
import "../styles/PipelineDashboard.css";

function PipelineDashboard() {
  const {
    intentData,
    systemDesign,
    schemaData,
    validationData,
    repairData,
    runtimeData,
  } = useContext(PipelineContext);

  const [animatedProgress, setAnimatedProgress] = useState(0);

  // Stage configuration with icons and descriptions
  const stages = [
    {
      id: "intent",
      name: "Intent Extraction",
      icon: "🎯",
      description: "Parsing natural language intent",
      completed: !!intentData,
      color: "#7c3aed",
    },
    {
      id: "system",
      name: "System Design",
      icon: "🏗️",
      description: "Architecting system components",
      completed: !!systemDesign,
      color: "#a855f7",
    },
    {
      id: "schema",
      name: "Schema Generation",
      icon: "📊",
      description: "Building data schemas",
      completed: !!schemaData,
      color: "#22d3ee",
    },
    {
      id: "validation",
      name: "Validation",
      icon: "✅",
      description: "Validating generated artifacts",
      completed: !!validationData,
      color: "#34d399",
    },
    {
      id: "repair",
      name: "Repair",
      icon: "🔧",
      description: "Fixing validation issues",
      completed: !!repairData,
      color: "#fbbf24",
    },
    {
      id: "runtime",
      name: "Runtime",
      icon: "⚡",
      description: "Runtime environment setup",
      completed: !!runtimeData,
      color: "#f87171",
    },
  ];

  const completedStages = stages.filter((stage) => stage.completed).length;
  const totalStages = stages.length;
  const progressPercentage = (completedStages / totalStages) * 100;

  // Animate progress bar on load and update
  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimatedProgress(progressPercentage);
    }, 100);
    return () => clearTimeout(timer);
  }, [progressPercentage]);

  // Find current active stage (first incomplete or last completed)
  const getActiveStageIndex = () => {
    const index = stages.findIndex((stage) => !stage.completed);
    return index === -1 ? stages.length - 1 : index - 1;
  };

  const activeIndex = getActiveStageIndex();

  // Get overall status
  const getOverallStatus = () => {
    if (completedStages === 0) return "Not Started";
    if (completedStages === totalStages) return "Complete";
    return "In Progress";
  };

  const overallStatus = getOverallStatus();

  // Get status color
  const getStatusColor = () => {
    if (completedStages === 0) return "status-not-started";
    if (completedStages === totalStages) return "status-complete";
    return "status-in-progress";
  };

  return (
    <div className="dashboard-container" role="region" aria-label="Pipeline Dashboard">
      {/* Header */}
      <div className="dashboard-header">
        <div className="header-left">
          <span className="header-icon">⚡</span>
          <div>
            <h2 className="header-title">AI Compiler Pipeline</h2>
            <p className="header-subtitle">End-to-End Application Generation Workflow</p>
          </div>
        </div>
        <div className="header-right">
          <span className={`status-badge ${getStatusColor()}`}>
            <span className="status-dot"></span>
            {overallStatus}
          </span>
          <span className="stage-counter">
            {completedStages}/{totalStages} Complete
          </span>
        </div>
      </div>

      {/* Progress Section */}
      <div className="progress-section">
        <div className="progress-header">
          <div className="progress-label">
            <span className="progress-icon">📈</span>
            <span>Pipeline Progress</span>
          </div>
          <div className="progress-percentage">
            <span className="percentage-number">{Math.round(animatedProgress)}%</span>
          </div>
        </div>

        <div className="progress-track">
          <div
            className="progress-fill"
            style={{ width: `${animatedProgress}%` }}
            role="progressbar"
            aria-valuenow={Math.round(animatedProgress)}
            aria-valuemin="0"
            aria-valuemax="100"
            aria-label="Pipeline progress"
          >
            <div className="progress-glow"></div>
          </div>
          <div className="progress-markers">
            {stages.map((stage, index) => (
              <div
                key={index}
                className={`progress-marker ${stage.completed ? "completed" : ""}`}
                style={{ left: `${(index / (stages.length - 1)) * 100}%` }}
                aria-label={`Stage ${index + 1}: ${stage.name}`}
              >
                <span className="marker-dot"></span>
                <span className="marker-label">{index + 1}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Pipeline Grid */}
      <div className="pipeline-grid" role="list">
        {stages.map((stage, index) => (
          <div
            key={stage.id}
            className={`pipeline-card ${stage.completed ? "completed" : ""} ${
              index === activeIndex && !stage.completed ? "active" : ""
            }`}
            role="listitem"
            style={{ "--card-accent": stage.color }}
          >
            {/* Card Header */}
            <div className="card-header">
              <span className="card-step">Step {index + 1}</span>
              <span className="card-status-icon">
                {stage.completed ? (
                  <span className="checkmark">✓</span>
                ) : index === activeIndex && !stage.completed ? (
                  <span className="spinner"></span>
                ) : (
                  <span className="pending-dot"></span>
                )}
              </span>
            </div>

            {/* Card Content */}
            <div className="card-content">
              <div className="card-icon" style={{ background: `${stage.color}20` }}>
                <span>{stage.icon}</span>
              </div>
              <h3 className="card-title">{stage.name}</h3>
              <p className="card-description">{stage.description}</p>
            </div>

            {/* Card Footer */}
            <div className="card-footer">
              <span className={`card-status ${stage.completed ? "status-done" : "status-waiting"}`}>
                {stage.completed ? (
                  <>
                    <span className="status-check">✅</span>
                    Completed
                  </>
                ) : index === activeIndex && !stage.completed ? (
                  <>
                    <span className="status-loading">⏳</span>
                    In Progress
                  </>
                ) : (
                  <>
                    <span className="status-pending">⏸️</span>
                    Waiting
                  </>
                )}
              </span>
              {stage.completed && (
                <span className="completion-time">✓ Done</span>
              )}
            </div>

            {/* Connection Line (Desktop only) */}
            {index < stages.length - 1 && (
              <div className={`card-connector ${stage.completed ? "completed" : ""}`}>
                <span className="connector-line"></span>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Summary Footer */}
      <div className="dashboard-footer">
        <div className="footer-stats">
          <div className="stat-item">
            <span className="stat-value">{completedStages}</span>
            <span className="stat-label">Completed</span>
          </div>
          <div className="stat-divider"></div>
          <div className="stat-item">
            <span className="stat-value">{totalStages - completedStages}</span>
            <span className="stat-label">Remaining</span>
          </div>
          <div className="stat-divider"></div>
          <div className="stat-item">
            <span className="stat-value">{totalStages}</span>
            <span className="stat-label">Total Stages</span>
          </div>
        </div>
        <div className="footer-message">
          {completedStages === totalStages ? (
            <span className="message-success">🎉 All stages completed successfully!</span>
          ) : completedStages === 0 ? (
            <span className="message-info">💡 Start the pipeline to see progress</span>
          ) : (
            <span className="message-progress">🚀 Pipeline is running...</span>
          )}
        </div>
      </div>
    </div>
  );
}

export default PipelineDashboard;