import { useState, useContext, useRef, useEffect } from "react";
import API from "../services/api";
import "../styles/PromptInput.css";
import { PipelineContext } from "../context/PipelineContext";

function PromptInput() {
  const [prompt, setPrompt] = useState("");
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState({ show: false, message: "", type: "" });
  const textareaRef = useRef(null);
  const [isFocused, setIsFocused] = useState(false);

  const {
    setIntentData,
    setSystemDesign,
    setSchemaData,
    setValidationData,
    setRepairData,
    setRuntimeData,
    setCurrentStage,
    setIsGenerating,
  } = useContext(PipelineContext);

  const examples = [
    "Build a CRM with login and analytics",
    "Create a hospital management system",
    "Build an e-commerce platform with payments",
  ];

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = textareaRef.current.scrollHeight + "px";
    }
  }, [prompt]);

  // Auto-dismiss toast
  useEffect(() => {
    if (toast.show) {
      const timer = setTimeout(() => {
        setToast({ show: false, message: "", type: "" });
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [toast]);

  const showToast = (message, type = "error") => {
    setToast({ show: true, message, type });
  };

  const generateBlueprint = async () => {
    if (!prompt.trim()) {
      showToast("Please enter an application description", "warning");
      textareaRef.current?.focus();
      return;
    }

    try {
      setLoading(true);
      setIsGenerating(true);

      // Stage 1: Intent Extraction
      setCurrentStage("Intent Extraction");
      const response = await API.post("/generate-intent", {
        prompt: prompt,
      });
      setIntentData(response.data);

      // Stage 2: System Design
      setCurrentStage("System Design");
      const designResponse = await API.post("/generate-system-design", {
        intentData: response.data,
      });
      setSystemDesign(designResponse.data);

      // Stage 3: Schema Generation
      setCurrentStage("Schema Generation");
      const schemaResponse = await API.post("/generate-schema", {
        systemDesign: designResponse.data,
      });
      setSchemaData(schemaResponse.data);
      console.log("Schema:", schemaResponse.data);

      // Stage 4: Validation
      setCurrentStage("Validation");
      const validationResponse = await API.post("/validate-schema", {
        schemaData: schemaResponse.data,
      });
      setValidationData(validationResponse.data);
      console.log("Validation:", validationResponse.data);

      // Stage 5: Repair
      setCurrentStage("Repair Engine");
      const repairResponse = await API.post("/repair-schema", {
        schemaData: schemaResponse.data,
      });
      setRepairData(repairResponse.data);
      console.log("Repair:", repairResponse.data);

      // Stage 6: Runtime Simulation
      setCurrentStage("Runtime Simulation");
      const runtimeResponse = await API.post("/simulate-runtime", {
        schemaData: schemaResponse.data,
      });
      setRuntimeData(runtimeResponse.data);
      console.log("Runtime:", runtimeResponse.data);

      console.log("Intent Data:", response.data);
      console.log("System Design:", designResponse.data);

      setCurrentStage("Completed");
      setPrompt("");
      showToast("✨ Blueprint generated successfully!", "success");
    } catch (error) {
      console.error("Error:", error);
      showToast(
        error.response?.data?.message || "Something went wrong. Please try again.",
        "error"
      );
      setCurrentStage("");
    } finally {
      setLoading(false);
      setIsGenerating(false);
    }
  };

  const handleKeyDown = (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key === "Enter") {
      e.preventDefault();
      generateBlueprint();
    }
  };

  const handleExampleClick = (example) => {
    setPrompt(example);
    textareaRef.current?.focus();
  };

  const handleClear = () => {
    setPrompt("");
    textareaRef.current?.focus();
  };

  const charCount = prompt.length;
  const isNearLimit = charCount > 450;
  const isAtLimit = charCount >= 500;

  return (
    <div className="prompt-container" style={{ position: "relative", zIndex: 10 }}>
      {/* Header */}
      <div className="prompt-header">
        <div className="prompt-header-left">
          <span className="prompt-icon">💬</span>
          <h2 className="prompt-title">Describe Your Application</h2>
        </div>
        <span className="prompt-hint">Press Ctrl+Enter to submit</span>
      </div>

      {/* Textarea */}
      <div className={`textarea-wrapper ${isFocused ? "focused" : ""}`}>
        <textarea
          ref={textareaRef}
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          onKeyDown={handleKeyDown}
          placeholder="Describe the application you want to build..."
          disabled={loading}
          aria-label="Application description input"
          aria-describedby="char-count"
          className={isAtLimit ? "at-limit" : ""}
          maxLength={500}
          enterKeyHint="send"
          inputMode="text"
          autoComplete="off"
          style={{ 
            position: "relative", 
            zIndex: 20,
            pointerEvents: "auto !important",
            touchAction: "manipulation"
          }}
        />
        {loading && (
          <div className="textarea-overlay" style={{ pointerEvents: "none !important" }}>
            <div className="loading-spinner"></div>
            <span>Processing your request...</span>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="prompt-footer">
        <div className="footer-left">
          <span
            id="char-count"
            className={`char-count ${isNearLimit ? "near-limit" : ""} ${
              isAtLimit ? "at-limit" : ""
            }`}
          >
            <span className="char-icon">📝</span>
            {charCount} / 500 characters
          </span>
          {prompt && (
            <button
              className="clear-btn"
              onClick={handleClear}
              aria-label="Clear input"
              type="button"
              style={{ 
                pointerEvents: "auto !important",
                touchAction: "manipulation",
                position: "relative",
                zIndex: 30
              }}
            >
              ✕ Clear
            </button>
          )}
        </div>

        <div className="footer-right">
          <button
            className={`generate-btn ${loading ? "loading" : ""}`}
            onClick={generateBlueprint}
            disabled={loading || isAtLimit}
            aria-label={loading ? "Generating blueprint..." : "Generate blueprint"}
            type="button"
            style={{ 
              pointerEvents: "auto !important",
              touchAction: "manipulation",
              position: "relative",
              zIndex: 30
            }}
          >
            {loading ? (
              <>
                <span className="btn-spinner"></span>
                <span>Generating...</span>
              </>
            ) : (
              <>
                <span className="btn-icon">🚀</span>
                <span>Generate Blueprint</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Examples Section */}
      <div className="examples-section">
        <div className="examples-header">
          <span className="examples-icon">💡</span>
          <p className="examples-label">Try an example:</p>
        </div>

        <div className="example-chips" style={{ position: "relative", zIndex: 30 }}>
          {examples.map((example, index) => (
            <button
              key={index}
              className={`chip ${prompt === example ? "active" : ""}`}
              onClick={() => handleExampleClick(example)}
              disabled={loading}
              aria-label={`Use example: ${example}`}
              type="button"
              style={{ 
                pointerEvents: "auto !important",
                touchAction: "manipulation",
                position: "relative",
                zIndex: 30
              }}
            >
              <span className="chip-icon">✨</span>
              {example}
            </button>
          ))}
        </div>
      </div>

      {/* Toast Notification */}
      {toast.show && (
        <div className={`toast toast-${toast.type}`} role="alert" style={{ zIndex: 99999 }}>
          <div className="toast-content">
            <span className="toast-icon">
              {toast.type === "success" && "✅"}
              {toast.type === "error" && "❌"}
              {toast.type === "warning" && "⚠️"}
              {toast.type === "info" && "ℹ️"}
            </span>
            <span className="toast-message">{toast.message}</span>
          </div>
          <button
            className="toast-close"
            onClick={() => setToast({ show: false, message: "", type: "" })}
            aria-label="Dismiss notification"
            type="button"
            style={{ 
              pointerEvents: "auto !important",
              touchAction: "manipulation"
            }}
          >
            ✕
          </button>
        </div>
      )}
    </div>
  );
}

export default PromptInput;