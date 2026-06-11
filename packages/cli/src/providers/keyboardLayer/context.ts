import { createContext } from "react";
import type { KeyboardLayerContextvalue } from "../../types";

export const KeyboardLayerContext = createContext<KeyboardLayerContextvalue | null>(
  null,
);
