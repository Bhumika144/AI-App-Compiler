import { useContext, useState, useRef, useEffect } from "react";
import { PipelineContext } from "../context/PipelineContext";
import "../styles/OutputPanel.css";

function OutputPanel() {
  const {
    intentData,
    systemDesign,
    schemaData,
    validationData,
    repairData,
    runtimeData,
  } = useContext(PipelineContext);

  const [activeTab, setActiveTab] = useState("intent");
  const [copied, setCopied] = useState(false);
  const jsonRef = useRef(null);

  // Tab configuration with icons and labels
  const tabs = [
    { id: "intent", label: "Intent", icon: "🎯" },
    { id: "system", label: "System Design", icon: "🏗️" },
    { id: "schema", label: "Schema", icon: "📊" },
    { id: "validation", label: "Validation", icon: "✅" },
    { id: "repair", label: "Repair", icon: "🔧" },
    { id: "runtime", label: "Runtime", icon: "⚡" },
  ];

  // Data mapping
  const dataMap = {
    intent: intentData,
    system: systemDesign,
    schema: schemaData,
    validation: validationData,
    repair: repairData,
    runtime: runtimeData,
  };

  const data = dataMap[activeTab] || null;
  const hasData = data !== null && data !== undefined;

  // Get data type for status badge
  const getDataType = () => {
    if (!hasData) return "empty";
    if (Array.isArray(data)) return "array";
    if (typeof data === "object") return "object";
    return "primitive";
  };

  const dataType = getDataType();

  // Get status badge color
  const getStatusColor = () => {
    if (!hasData) return "status-empty";
    if (dataType === "array") return "status-array";
    if (dataType === "object") return "status-object";
    return "status-primitive";
  };

  // Get status label
  const getStatusLabel = () => {
    if (!hasData) return "No Data";
    if (dataType === "array") return `${data.length} Items`;
    if (dataType === "object") return `${Object.keys(data).length} Keys`;
    return "Data Available";
  };

  // Copy to clipboard
  const handleCopy = async () => {
    if (!hasData) return;
    try {
      const jsonString = JSON.stringify(data, null, 2);
      await navigator.clipboard.writeText(jsonString);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  // Keyboard navigation for tabs
  const handleTabKeyDown = (e, tabId) => {
    const currentIndex = tabs.findIndex(t => t.id === tabId);
    let newIndex = currentIndex;

    if (e.key === "ArrowRight" || e.key === "ArrowDown") {
      e.preventDefault();
      newIndex = (currentIndex + 1) % tabs.length;
    } else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
      e.preventDefault();
      newIndex = (currentIndex - 1 + tabs.length) % tabs.length;
    }

    if (newIndex !== currentIndex) {
      setActiveTab(tabs[newIndex].id);
      document.getElementById(`tab-${tabs[newIndex].id}`)?.focus();
    }
  };

  // Syntax highlighting for JSON
  const renderSyntaxHighlightedJSON = (jsonData) => {
    if (!hasData) return null;

    const jsonString = JSON.stringify(jsonData, null, 2);
    const lines = jsonString.split("\n");

    return lines.map((line, index) => {
      // Match different JSON syntax elements
      const formattedLine = line
        .replace(
          /"([^"]+)":/g,
          '<span class="json-key">"$1"</span>:'
        )
        .replace(
          /: "([^"]+)"/g,
          ': <span class="json-string">"$1"</span>'
        )
        .replace(
          /: (\d+\.?\d*)/g,
          ': <span class="json-number">$1</span>'
        )
        .replace(
          /: (true|false)/g,
          ': <span class="json-boolean">$1</span>'
        )
        .replace(
          /: (null)/g,
          ': <span class="json-null">$1</span>'
        );

      return (
        <div
          key={index}
          className="json-line"
          dangerouslySetInnerHTML={{ __html: formattedLine }}
        />
      );
    });
  };

  // Render empty state
  const renderEmptyState = () => (
    <div className="empty-state">
      <div className="empty-state-icon">📭</div>
      <h3 className="empty-state-title">No Data Available</h3>
      <p className="empty-state-description">
        The <strong>{activeTab}</strong> output will appear here once the pipeline processes your request.
      </p>
      <div className="empty-state-hint">
        <span className="hint-dot"></span>
        <span>Waiting for pipeline execution...</span>
      </div>
    </div>
  );

  return (
    <div className="output-container">
      {/* Tabs */}
      <div className="tabs-wrapper">
        <div
          className="tabs-scroll"
          role="tablist"
          aria-label="Output data tabs"
        >
          {tabs.map((tab) => (
            <button
              key={tab.id}
              id={`tab-${tab.id}`}
              className={`tab-btn ${activeTab === tab.id ? "active" : ""}`}
              onClick={() => setActiveTab(tab.id)}
              onKeyDown={(e) => handleTabKeyDown(e, tab.id)}
              role="tab"
              aria-selected={activeTab === tab.id}
              aria-controls={`panel-${tab.id}`}
              tabIndex={activeTab === tab.id ? 0 : -1}
            >
              <span className="tab-icon">{tab.icon}</span>
              <span className="tab-label">{tab.label}</span>
              {activeTab === tab.id && (
                <span className="tab-active-indicator"></span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Output Header */}
      <div className="output-header">
        <div className="output-header-left">
          <h3 className="output-title">
            {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} Output
          </h3>
          <span className={`status-badge ${getStatusColor()}`}>
            {getStatusLabel()}
          </span>
        </div>
        <div className="output-header-right">
          {hasData && (
            <button
              className={`copy-btn ${copied ? "copied" : ""}`}
              onClick={handleCopy}
              aria-label="Copy JSON to clipboard"
              title="Copy to clipboard"
            >
              {copied ? (
                <>
                  <span className="copy-icon">✅</span>
                  <span>Copied!</span>
                </>
              ) : (
                <>
                  <span className="copy-icon">📋</span>
                  <span>Copy</span>
                </>
              )}
            </button>
          )}
        </div>
      </div>

      {/* JSON Viewer */}
      <div
        className={`json-viewer ${!hasData ? "empty" : ""}`}
        ref={jsonRef}
        role="tabpanel"
        id={`panel-${activeTab}`}
        aria-labelledby={`tab-${activeTab}`}
      >
        {hasData ? (
          <div className="json-content">
            <div className="json-line-numbers">
              {renderSyntaxHighlightedJSON(data)?.map((_, index) => (
                <span key={index} className="line-number">
                  {index + 1}
                </span>
              ))}
            </div>
            <div className="json-code">
              {renderSyntaxHighlightedJSON(data)}
            </div>
          </div>
        ) : (
          renderEmptyState()
        )}
      </div>

      {/* Footer */}
      {hasData && (
        <div className="output-footer">
          <span className="footer-info">
            <span className="footer-dot"></span>
            {dataType === "array"
              ? `${data.length} items`
              : dataType === "object"
              ? `${Object.keys(data).length} properties`
              : "Data ready"}
          </span>
          <span className="footer-info">
            ⏱️ {new Date().toLocaleTimeString()}
          </span>
        </div>
      )}
    </div>
  );
}

export default OutputPanel;