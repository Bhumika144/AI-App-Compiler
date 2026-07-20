import { useContext, useState, useEffect, useRef } from "react";
import { PipelineContext } from "../context/PipelineContext";
import "../styles/PipelineDashboard.css";

function PipelineDashboard() {
  const {
    currentStage,
    isGenerating,
    intentData,
    systemDesign,
    schemaData,
    validationData,
    repairData,
    runtimeData,
  } = useContext(PipelineContext);

  const [animatedProgress, setAnimatedProgress] = useState(0);
  const [touchActive, setTouchActive] = useState(null);
  const cardRefs = useRef({});

  // Stage configuration with icons and descriptions
  const stageNames = [
    "Intent Extraction",
    "System Design",
    "Schema Generation",
    "Validation",
    "Repair Engine",
    "Runtime Simulation",
  ];

  const stages = stageNames.map((name) => {
    // Determine if stage is completed based on data
    let completed = false;
    switch (name) {
      case "Intent Extraction":
        completed = !!intentData;
        break;
      case "System Design":
        completed = !!systemDesign;
        break;
      case "Schema Generation":
        completed = !!schemaData;
        break;
      case "Validation":
        completed = !!validationData;
        break;
      case "Repair Engine":
        completed = !!repairData;
        break;
      case "Runtime Simulation":
        completed = !!runtimeData;
        break;
      default:
        completed = false;
    }

    return {
      id: name.toLowerCase().replace(/\s+/g, "-"),
      name: name,
      icon: getStageIcon(name),
      description: getStageDescription(name),
      completed: completed,
      color: getStageColor(name),
    };
  });

  // Helper functions for stage metadata
  function getStageIcon(name) {
    const icons = {
      "Intent Extraction": "🎯",
      "System Design": "🏗️",
      "Schema Generation": "📊",
      "Validation": "✅",
      "Repair Engine": "🔧",
      "Runtime Simulation": "⚡",
    };
    return icons[name] || "📌";
  }

  function getStageDescription(name) {
    const descriptions = {
      "Intent Extraction": "Parsing natural language intent",
      "System Design": "Architecting system components",
      "Schema Generation": "Building data schemas",
      "Validation": "Validating generated artifacts",
      "Repair Engine": "Fixing validation issues",
      "Runtime Simulation": "Runtime environment setup",
    };
    return descriptions[name] || "";
  }

  function getStageColor(name) {
    const colors = {
      "Intent Extraction": "#7c3aed",
      "System Design": "#a855f7",
      "Schema Generation": "#22d3ee",
      "Validation": "#34d399",
      "Repair Engine": "#fbbf24",
      "Runtime Simulation": "#f87171",
    };
    return colors[name] || "#64748b";
  }

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

  // Get overall status
  const getOverallStatus = () => {
    if (isGenerating) return "In Progress";
    if (completedStages === 0) return "Not Started";
    if (completedStages === totalStages) return "Complete";
    return "Partial";
  };

  const overallStatus = getOverallStatus();

  // Get status color
  const getStatusColor = () => {
    if (isGenerating) return "status-in-progress";
    if (completedStages === 0) return "status-not-started";
    if (completedStages === totalStages) return "status-complete";
    return "status-partial";
  };

  // Touch handlers for cards
  const handleTouchStart = (stageId) => {
    setTouchActive(stageId);
  };

  const handleTouchEnd = () => {
    setTouchActive(null);
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
            {isGenerating ? `Running: ${currentStage}` : overallStatus}
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
                className={`progress-marker ${stage.completed ? "completed" : ""} ${
                  stage.name === currentStage && isGenerating ? "active" : ""
                }`}
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
        {stages.map((stage, index) => {
          const isRunning = stage.name === currentStage && isGenerating;
          const isCompleted = stage.completed;
          const isTouched = touchActive === stage.id;

          return (
            <div
              key={stage.id}
              className={`pipeline-status-card 
                ${isCompleted ? "completed" : ""} 
                ${isRunning ? "running" : ""}
                ${isTouched ? "touched" : ""}`}
              role="listitem"
              style={{ 
                "--card-accent": stage.color,
                touchAction: "manipulation"
              }}
              onTouchStart={() => handleTouchStart(stage.id)}
              onTouchEnd={handleTouchEnd}
              onTouchCancel={handleTouchEnd}
              onMouseDown={() => handleTouchStart(stage.id)}
              onMouseUp={handleTouchEnd}
              onMouseLeave={handleTouchEnd}
              ref={(el) => {
                if (el) cardRefs.current[stage.id] = el;
              }}
            >
              {/* Card Header */}
              <div className="card-header">
                <span className="card-step">Step {index + 1}</span>
                <span className="card-status-icon">
                  {isCompleted ? (
                    <span className="checkmark">✓</span>
                  ) : isRunning ? (
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
                <span className={`card-status 
                  ${isCompleted ? "status-done" : ""} 
                  ${isRunning ? "status-running" : ""}`}
                >
                  {isCompleted ? (
                    <>
                      <span className="status-check">✅</span>
                      Completed
                    </>
                  ) : isRunning ? (
                    <>
                      <span className="status-loading">⏳</span>
                      Running...
                    </>
                  ) : (
                    <>
                      <span className="status-pending">⏸️</span>
                      Waiting
                    </>
                  )}
                </span>
                {isCompleted && (
                  <span className="completion-time">✓ Done</span>
                )}
                {isRunning && (
                  <span className="running-indicator">
                    <span className="pulse-dot"></span>
                    Processing
                  </span>
                )}
              </div>

              {/* Connection Line (Desktop only) */}
              {index < stages.length - 1 && (
                <div className={`card-connector ${isCompleted ? "completed" : ""}`}>
                  <span className="connector-line"></span>
                </div>
              )}
            </div>
          );
        })}
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
          {isGenerating ? (
            <span className="message-progress">
              🚀 Processing: <strong>{currentStage}</strong>
            </span>
          ) : completedStages === totalStages ? (
            <span className="message-success">🎉 All stages completed successfully!</span>
          ) : completedStages === 0 ? (
            <span className="message-info">💡 Start the pipeline to see progress</span>
          ) : (
            <span className="message-partial">⏳ Pipeline paused at {currentStage || "unknown stage"}</span>
          )}
        </div>
      </div>
    </div>
  );
}

export default PipelineDashboard;