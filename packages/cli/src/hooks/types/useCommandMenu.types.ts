import type { RefObject } from "react";
import type { ScrollBoxRenderable } from "@opentui/core";
import type { CommandType } from "../../components/commandPalette/types";

export type UseCommandMenuOptions = {
  showCommandMenu: boolean;
  commandQuery: string;
  commandIdx: number;
  scrollRef: RefObject<ScrollBoxRenderable | null>;
  handleContentChange: (content: string) => void;
  resolveCommand: (idx: number) => CommandType | null;
  setSelectedCommandIdx: (idx: number) => void;
};
