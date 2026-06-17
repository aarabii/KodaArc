import { useContext } from "react";
import { DialogContext } from "../providers/context";
import type { DialogContextValue } from "../providers/types";

export function useDialog(): DialogContextValue {
  const value = useContext(DialogContext);

  if (!value) {
    throw new Error("useDialog must be used within a DialogProvider");
  }

  return value;
}
