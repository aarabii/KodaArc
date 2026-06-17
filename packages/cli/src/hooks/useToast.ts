import { useContext } from "react";
import { ToastContext } from "../providers/context";
import type { ToastContextValue } from "../providers/types";

export function useToast(): ToastContextValue {
  const value = useContext(ToastContext);
  if (!value) {
    throw new Error("useToast must be used within a ToastProvider");
  }

  return value;
}
