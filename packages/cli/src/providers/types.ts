import type { ReactNode, Dispatch, SetStateAction } from "react";
import type { Mode } from "@koda-arc/database/enums";
import type { SupportedChatModelId } from "@koda-arc/shared";
import type { ThemeColorProps, ThemeProps } from "../themes";

// --- Theme Types ---
export type ThemeContextValue = {
  colors: ThemeColorProps;
  currentTheme: ThemeProps;
  setTheme: (theme: ThemeProps) => void;
  currentSpinner: string;
  setSpinner: (spinner: string) => void;
};

// --- Dialog Types ---
export type DialogConfig = {
  title: string;
  children: ReactNode;
};

export type DialogContextValue = {
  open: (config: DialogConfig) => void;
  close: () => void;
};

// --- Toast Types ---
export type ToastVariant = "success" | "error" | "warning" | "info";

export type ToastOptions = {
  message: string;
  variant?: ToastVariant;
  duration?: number;
};

export const DEFAULT_TOAST_DURATION = 3000;

export type ToastContextValue = {
  show: (options: ToastOptions) => void;
};

// --- Keyboard Types ---
export type Responder = () => boolean;

export type KeyboardLayerContextvalue = {
  push: (id: string, responder?: Responder) => void;
  pop: (id: string) => void;
  isTopLayer: (id: string) => boolean;
  setResponder: (id: string, responder: Responder | null) => void;
};

// --- Prompt Config Types ---
export type PromptConfigContextValue = {
  mode: Mode;
  toggleMode: () => void;
  setMode: Dispatch<SetStateAction<Mode>>;
  model: SupportedChatModelId;
  setModel: Dispatch<SetStateAction<SupportedChatModelId>>;
};
