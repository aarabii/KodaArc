import { useState, useCallback } from "react";
import type { ReactNode } from "react";
import {
  DEFAULT_CHAT_MODEL_ID,
  type SupportedChatModelId,
} from "@koda-arc/shared";
import { Mode } from "@koda-arc/database/enums";
import { PromptConfigContext } from "./context";

type PromptConfigProviderProps = {
  children: ReactNode;
};

export function PromptConfigProvider({
  children,
}: PromptConfigProviderProps) {
  const [mode, setMode] = useState<Mode>(Mode.BUILD);
  const [model, setModel] = useState<SupportedChatModelId>(
    DEFAULT_CHAT_MODEL_ID,
  );

  const toggleMode = useCallback(() => {
    setMode((m) => (m === Mode.BUILD ? Mode.PLAN : Mode.BUILD));
  }, []);

  return (
    <PromptConfigContext.Provider
      value={{
        mode,
        toggleMode,
        setMode,
        model,
        setModel,
      }}
    >
      {children}
    </PromptConfigContext.Provider>
  );
}
