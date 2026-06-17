import { useContext } from "react";
import { PromptConfigContext } from "../providers/context";
import type { PromptConfigContextValue } from "../providers/types";

export function usePromptConfig(): PromptConfigContextValue {
  const value = useContext(PromptConfigContext);

  if (!value) {
    throw new Error(
      "usePromptConfig must be used within a PromptConfigProvider",
    );
  }

  return value;
}

