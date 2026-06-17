import { useRef, useState, useCallback, useMemo } from "react";
import type { ReactNode } from "react";
import type { ToastOptions, ToastContextValue } from "../types";
import { DEFAULT_TOAST_DURATION } from "../types";
import { ToastContext } from "../context";
import { Toast } from "../../components";

type ToastProviderProps = {
  children: ReactNode;
};

export function ToastProvider({ children }: ToastProviderProps) {
  const [currentToast, setCurrentToast] = useState<ToastOptions | null>(null);
  const timeoutHandleRef = useRef<NodeJS.Timeout | null>(null);

  const clearCurrentTimeout = useCallback(() => {
    if (timeoutHandleRef.current) {
      clearTimeout(timeoutHandleRef.current);
      timeoutHandleRef.current = null;
    }
  }, []);

  const show = useCallback(
    (options: ToastOptions) => {
      const duration = options.duration ?? DEFAULT_TOAST_DURATION;

      clearCurrentTimeout();

      setCurrentToast({
        ...options,
        variant: options.variant ?? "info",
        duration,
      });

      timeoutHandleRef.current = setTimeout(() => {
        setCurrentToast(null);
      }, duration).unref();
    },
    [clearCurrentTimeout],
  );

  const value: ToastContextValue = useMemo(() => ({ show }), [show]);

  return (
    <ToastContext.Provider value={value}>
      {children}
      <Toast currentToast={currentToast} />
    </ToastContext.Provider>
  );
}
