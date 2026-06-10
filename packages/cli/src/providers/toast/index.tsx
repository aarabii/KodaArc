import {
  createContext,
  useContext,
  useRef,
  useState,
  useCallback,
} from "react";
import type { ReactNode } from "react";
import { useTerminalDimensions } from "@opentui/react";
import type { ToastOptions, ToastVariant } from "./types";
import { DEFAULT_TOAST_DURATION } from "./types";
import { splitBorder } from "../../components/border";
import { useTheme } from "../theme";

export type ToastContextValue = {
  show: (options: ToastOptions) => void;
};

const ToastContext = createContext<ToastContextValue | null>(null);

export function useToast(): ToastContextValue {
  const value = useContext(ToastContext);
  if (!value) {
    throw new Error("useToast must be used within a ToastProvider");
  }

  return value;
}

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

  const value: ToastContextValue = {
    show,
  };
  return (
    <ToastContext.Provider value={value}>
      {children}
      <Toast currentToast={currentToast} />
    </ToastContext.Provider>
  );
}

type ToastProps = {
  currentToast: ToastOptions | null;
};

function Toast({ currentToast }: ToastProps) {
  const { width } = useTerminalDimensions();
  const { colors: themeColors } = useTheme();

  if (!currentToast) {
    return null;
  }

  const colors = themeColors[currentToast.variant ?? "info"];

  return (
    <box
      position="absolute"
      justifyContent="center"
      alignItems="flex-start"
      top={2}
      right={2}
      width={Math.max(1, Math.min(60, width - 6))}
      paddingRight={2}
      paddingTop={1}
      paddingBottom={1}
      backgroundColor={colors.bg}
      borderColor={colors.border}
      border={["left", "right"]}
      customBorderChars={splitBorder}
    >
      <box flexDirection="column" gap={1} width="100%">
        <text fg={colors.accent} marginX={1} wrapMode="word" width="100%">
          {currentToast.message}
        </text>
      </box>
    </box>
  );
}
