"use client";

import { createContext, useContext, useState, ReactNode } from "react";

type AgentModeCtx = {
  isAgentMode: boolean;
  toggle: () => void;
};

const AgentModeContext = createContext<AgentModeCtx>({ isAgentMode: false, toggle: () => {} });

export function AgentModeProvider({ children }: { children: ReactNode }) {
  const [isAgentMode, setIsAgentMode] = useState(false);
  return (
    <AgentModeContext.Provider value={{ isAgentMode, toggle: () => setIsAgentMode((v) => !v) }}>
      {children}
    </AgentModeContext.Provider>
  );
}

export const useAgentMode = () => useContext(AgentModeContext);
