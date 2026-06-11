import { useContext } from "react";
import { KeyboardLayerContext } from "../providers/keyboardLayer/context";

export function useKeyboardLayer() {
  const context = useContext(KeyboardLayerContext);

  if (!context) {
    throw new Error(
      "useKeyboardLayer must be used within a KeyboardLayerProvider",
    );
  }
  return context;
}
