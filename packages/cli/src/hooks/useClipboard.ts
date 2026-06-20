import { useContext } from "react";
import { ClipboardContext } from "../providers/context";
import type { ClipboardContextValue } from "../providers/types";

export function useClipboard(): ClipboardContextValue {
  const ctx = useContext(ClipboardContext);
  if (!ctx) {
    throw new Error(
      "useClipboard must be used within a ClipboardProvider",
    );
  }
  return ctx;
}
