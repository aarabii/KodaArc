import type { Mode } from "@koda-arc/database/enums";
import type { SupportedChatModelId } from "@koda-arc/shared";

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
