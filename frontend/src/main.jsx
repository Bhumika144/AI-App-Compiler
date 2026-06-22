import React from "react";
import ReactDOM from "react-dom/client";

import App from "./App";
import "./index.css";

import { PipelineProvider }
from "./context/PipelineContext";

ReactDOM.createRoot(
  document.getElementById("root")
).render(
  <React.StrictMode>
    <PipelineProvider>
      <App />
    </PipelineProvider>
  </React.StrictMode>
);