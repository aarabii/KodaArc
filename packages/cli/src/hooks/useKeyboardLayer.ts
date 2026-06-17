import { useContext } from "react";
import { KeyboardLayerContext } from "../providers/context";
import type { KeyboardLayerContextvalue } from "../providers/types";

export function useKeyboardLayer(): KeyboardLayerContextvalue {
  const context = useContext(KeyboardLayerContext);

  if (!context) {
    throw new Error(
      "useKeyboardLayer must be used within a KeyboardLayerProvider",
    );
  }
  return context;
}
