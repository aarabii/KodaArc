import type { ReactNode, Dispatch, SetStateAction } from "react";
import type { Mode } from "@koda-arc/database/enums";
import type { SupportedChatModelId } from "@koda-arc/shared";

// --- Theme Types ---
export type SemanticColor = {
  accent: string;
  bg: string;
  border: string;
  text: string;
};

export type DiffSlot = {
  text: string;
  bg: string;
};

export type ThemeColorProps = {
  brand: {
    primary: string;
    accent: string;
  };

  text: {
    primary: string;
    secondary: string;
    muted: string;
    inverse: string;
    code: string;
  };

  bg: {
    base: string;
    surface: string;
    elevated: string;
    input: string;
    code: string;
  };

  border: {
    default: string;
    focused: string;
    dim: string;
    strong: string;
  };

  agent: {
    plan: string;
    thinking: string;
    executing: string;
    waiting: string;
    idle: string;
  };

  selection: {
    bg: string;
    text: string;
  };

  success: SemanticColor;
  error: SemanticColor;
  info: SemanticColor;
  warning: SemanticColor;

  diff: {
    added: DiffSlot;
    removed: DiffSlot;
    modified: DiffSlot;
    context: string;
  };

  input: {
    border: string;
    borderFocused: string;
    placeholder: string;
    cursor: string;
  };

  scrollbar: {
    track: string;
    thumb: string;
    thumbActive: string;
  };
};

export type ThemeProps = {
  name: string;
  colors: ThemeColorProps;
};

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

// --- Command Types ---
export type CommandContext = {
  exit: () => void;
  toast: ToastContextValue;
  dialog: DialogContextValue;
  nav: (path: string) => void;
  mode: Mode;
  setMode: (mode: Mode) => void;
  setModel: (model: SupportedChatModelId) => void;
};

export type CommandType = {
  name: string;
  desc: string;
  value: string;
  action?: (ctx: CommandContext) => void | Promise<void>;
};

// --- Chat Types ---
export type ClientMessagePart = { type: "text"; text: string };

export type Message =
  | {
      id: string;
      role: "user";
      content: string;
      mode: Mode;
      model: SupportedChatModelId;
    }
  | {
      id: string;
      role: "assistant";
      content: string;
      mode: Mode;
      model: SupportedChatModelId;
      parts: ClientMessagePart[];
      duration?: string;
      interrupted?: boolean;
    }
  | { id: string; role: "error"; content: string };

// --- Prompt Config Types ---
export type PromptConfigContextValue = {
  mode: Mode;
  toggleMode: () => void;
  setMode: Dispatch<SetStateAction<Mode>>;
  model: SupportedChatModelId;
  setModel: Dispatch<SetStateAction<SupportedChatModelId>>;
};
