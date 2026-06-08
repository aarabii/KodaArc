import type { ToastContextValue } from "../../providers/toast";

export type CommandContext = {
  exit: () => void;
  toast: ToastContextValue;
};

export type CommandType = {
  name: string;
  desc: string;
  value: string;
  action?: (ctx: CommandContext) => void | Promise<void>;
};
