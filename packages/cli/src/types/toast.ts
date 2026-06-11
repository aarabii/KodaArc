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
