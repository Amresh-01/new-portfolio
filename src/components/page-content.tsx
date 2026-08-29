"use client";

import { ReactNode } from "react";
import { useAgentMode } from "@/contexts/agent-mode";
import { AgentView } from "./agent-view";

export function PageContent({ children }: { children: ReactNode }) {
  const { isAgentMode } = useAgentMode();
  if (isAgentMode) return <AgentView />;
  return <>{children}</>;
}
