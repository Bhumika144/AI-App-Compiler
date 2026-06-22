import "../styles/PipelineStatus.css";

function PipelineStatus() {
  const stages = [
    "Intent Extraction",
    "System Design",
    "Schema Generation",
    "Validation",
    "Repair Engine",
  ];

  return (
    <div className="pipeline-container">

      <h2 className="pipeline-title">
        Pipeline Overview
      </h2>

      <div className="pipeline-grid">

        {stages.map((stage, index) => (
          <div className="pipeline-card" key={index}>
            <div className="pipeline-number">
              {index + 1}
            </div>

            <h3>{stage}</h3>

            <p>
              Pending
            </p>
          </div>
        ))}

      </div>

    </div>
  );
}

export default PipelineStatus;