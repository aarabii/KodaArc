import { createContext } from "react";
import type {
  DialogContextValue,
  KeyboardLayerContextvalue,
  PromptConfigContextValue,
  ThemeContextValue,
  ToastContextValue,
} from "./types";

export const DialogContext = createContext<DialogContextValue | null>(null);

export const KeyboardLayerContext =
  createContext<KeyboardLayerContextvalue | null>(null);

export const PromptConfigContext =
  createContext<PromptConfigContextValue | null>(null);

export const ThemeContext = createContext<ThemeContextValue | null>(null);

export const ToastContext = createContext<ToastContextValue | null>(null);
