import { createContext, useState } from "react";

export const PipelineContext = createContext();

export const PipelineProvider = ({ children }) => {

  // Stage Outputs
  const [intentData, setIntentData] = useState(null);

  const [systemDesign, setSystemDesign] = useState(null);

  const [schemaData, setSchemaData] = useState(null);

  const [validationData, setValidationData] = useState(null);

  const [repairData, setRepairData] = useState(null);

  const [runtimeData, setRuntimeData] = useState(null);

  // Pipeline Status
  const [currentStage, setCurrentStage] = useState("");

  const [isGenerating, setIsGenerating] = useState(false);

  return (
    <PipelineContext.Provider
      value={{
        // Stage Data
        intentData,
        setIntentData,

        systemDesign,
        setSystemDesign,

        schemaData,
        setSchemaData,

        validationData,
        setValidationData,

        repairData,
        setRepairData,

        runtimeData,
        setRuntimeData,

        // Pipeline Animation
        currentStage,
        setCurrentStage,

        isGenerating,
        setIsGenerating,
      }}
    >
      {children}
    </PipelineContext.Provider>
  );
};