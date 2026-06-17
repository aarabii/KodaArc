import { createContext } from "react";
import type { PromptConfigContextValue } from "../../types";

export const PromptConfigContext =
  createContext<PromptConfigContextValue | null>(null);
