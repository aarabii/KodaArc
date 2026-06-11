import { useContext } from "react";
import { DialogContext } from "../providers/dialog/context";

export function useDialog() {
  const value = useContext(DialogContext);

  if (!value) {
    throw new Error("useDialog must be used within a Dialog Provider");
  }

  return value;
}
