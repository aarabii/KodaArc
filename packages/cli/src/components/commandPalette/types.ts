import type { Mode } from "@koda-arc/database/enums";
import type { SupportedChatModelId } from "@koda-arc/shared";
import type { DialogContextValue, ToastContextValue } from "../../providers/types";

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
