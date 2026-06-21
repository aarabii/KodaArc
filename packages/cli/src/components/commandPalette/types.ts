import type { AgentState } from "@koda-arc/database/enums";
import type { SupportedChatModelId } from "@koda-arc/shared";
import type {
  DialogContextValue,
  ToastContextValue,
} from "../../providers/types";

import type { IconName } from "../common/icon";

export type CommandContext = {
  exit: () => void;
  toast: ToastContextValue;
  dialog: DialogContextValue;
  nav: (path: string) => void;
  agentState: AgentState;
  setAgentState: (agentState: AgentState) => void;
  setModel: (model: SupportedChatModelId) => void;
};

export type CommandType = {
  name: string;
  desc: string;
  value: string;
  icon: IconName;
  action?: (ctx: CommandContext) => void | Promise<void>;
};

