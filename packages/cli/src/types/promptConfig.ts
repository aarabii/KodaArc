import type { Dispatch, SetStateAction } from "react";
import type { Mode } from "@koda-arc/database/enums";
import type { SupportedChatModelId } from "@koda-arc/shared";

export type PromptConfigContextValue = {
  mode: Mode;
  toggleMode: () => void;
  setMode: Dispatch<SetStateAction<Mode>>;
  model: SupportedChatModelId;
  setModel: Dispatch<SetStateAction<SupportedChatModelId>>;
};
