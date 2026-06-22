import { createContext, useState } from "react";

export const PipelineContext = createContext();

export const PipelineProvider = ({ children }) => {

  const [intentData, setIntentData] = useState(null);

  const [systemDesign, setSystemDesign] = useState(null);

  const [schemaData, setSchemaData] = useState(null);

  const [validationData, setValidationData] = useState(null);

  const [repairData, setRepairData] = useState(null);

  const [runtimeData, setRuntimeData] = useState(null);

  return (
    <PipelineContext.Provider
      value={{
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
      }}
    >
      {children}
    </PipelineContext.Provider>
  );
};