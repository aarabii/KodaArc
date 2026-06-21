import { useState, useCallback } from "react";
import type { ReactNode } from "react";
import {
  DEFAULT_CHAT_MODEL_ID,
  type SupportedChatModelId,
} from "@koda-arc/shared";
import { AgentState } from "@koda-arc/database/enums";
import { PromptConfigContext } from "./context";

type PromptConfigProviderProps = {
  children: ReactNode;
};

export function PromptConfigProvider({ children }: PromptConfigProviderProps) {
  const [agentState, setAgentState] = useState<AgentState>(AgentState.PLAN);
  const [model, setModel] = useState<SupportedChatModelId>(
    DEFAULT_CHAT_MODEL_ID,
  );

  const toggleAgentState = useCallback(() => {
    setAgentState((m) => (m === AgentState.BUILD ? AgentState.PLAN : AgentState.BUILD));
  }, []);

  return (
    <PromptConfigContext.Provider
      value={{
        agentState,
        toggleAgentState,
        setAgentState,
        model,
        setModel,
      }}
    >
      {children}
    </PromptConfigContext.Provider>
  );
}
