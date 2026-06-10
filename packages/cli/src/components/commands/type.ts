import type { DialogContextValue } from "../../providers/dialog";
import type { ToastContextValue } from "../../providers/toast";

export type CommandContext = {
  exit: () => void;
  toast: ToastContextValue;
  dialog: DialogContextValue;
};

export type CommandType = {
  name: string;
  desc: string;
  value: string;
  action?: (ctx: CommandContext) => void | Promise<void>;
};
