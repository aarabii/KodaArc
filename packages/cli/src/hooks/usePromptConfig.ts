import { useContext } from "react";
import { PromptConfigContext } from "../providers/promptConfig/context";
import type { PromptConfigContextValue } from "../types";

export function usePromptConfig(): PromptConfigContextValue {
  const value = useContext(PromptConfigContext);

  if (!value) {
    throw new Error(
      "usePromptConfig must be used within a PromptConfigProvider",
    );
  }

  return value;
}

