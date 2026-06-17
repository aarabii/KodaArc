import type { DialogContextValue } from "./dialog";
import type { ToastContextValue } from "./toast";

export type CommandContext = {
  exit: () => void;
  toast: ToastContextValue;
  dialog: DialogContextValue;
  nav: (path: string) => void;
};

export type CommandType = {
  name: string;
  desc: string;
  value: string;
  action?: (ctx: CommandContext) => void | Promise<void>;
};
