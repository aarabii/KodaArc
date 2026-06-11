import { useContext } from "react";
import { ToastContext } from "../providers/toast/context";

export function useToast() {
  const value = useContext(ToastContext);
  if (!value) {
    throw new Error("useToast must be used within a ToastProvider");
  }

  return value;
}
