import { useRef, useState, useMemo, type RefObject } from "react";
import type { ScrollBoxRenderable } from "@opentui/core";
import { useKeyboard } from "@opentui/react";
import { getFilterCommands } from "./filterCommand";
import type { CommandType } from "../../types";
import { useKeyboardLayer } from "../../hooks";

type UseCommandMenuOptions = {
  showCommandMenu: boolean;
  commandQuery: string;
  commandIdx: number;
  scrollRef: RefObject<ScrollBoxRenderable | null>;
  handleContentChange: (content: string) => void;
  resolveCommand: (idx: number) => CommandType | null;
  setSelectedCommandIdx: (idx: number) => void;
};

export function useCommandMenu(): UseCommandMenuOptions {
  const [txtValue, setTxtValue] = useState("");
  const [selectedIdx, setSelectedIdx] = useState(0);
  const [showCommandMenu, setShowCommandMenu] = useState(false);
  const scrollRef = useRef<ScrollBoxRenderable | null>(null);
  const { push, pop, isTopLayer } = useKeyboardLayer();

  const commandQuery =
    showCommandMenu && txtValue.startsWith("/") ? txtValue.slice(1) : "";

  const filteredCommands = useMemo(
    () => getFilterCommands(commandQuery),
    [commandQuery],
  );

  const close = () => {
    setShowCommandMenu(false);
    pop("command");
  };

  const handleContentChange = (content: string) => {
    setTxtValue(content);
    setSelectedIdx(0);

    const scrollbox = scrollRef.current;
    if (scrollbox) {
      scrollbox.scrollTo(0);
    }

    const prefix = content.startsWith("/") ? content.slice(1) : null;

    if (prefix !== null && !prefix.includes(" ")) {
      setShowCommandMenu(true);
      push("command", () => {
        close();
        return true;
      });
    } else {
      close();
    }
  };

  const resolveCommand = (idx: number): CommandType | null => {
    const cmd = filteredCommands[idx];
    if (cmd) {
      close();
    }
    return cmd || null;
  };

  useKeyboard((key) => {
    if (!showCommandMenu || !isTopLayer("command")) return;

    if (key.name === "escape") {
      key.preventDefault();
      close();
    } else if (key.name === "up") {
      key.preventDefault();
      setSelectedIdx((idx: number) => {
        const newIdx = Math.max(0, idx - 1);

        const sb = scrollRef.current;
        if (sb && newIdx < sb.scrollTop) {
          sb.scrollTo(newIdx);
        }

        return newIdx;
      });
    } else if (key.name === "down") {
      key.preventDefault();
      setSelectedIdx((idx: number) => {
        const newIdx = Math.min(filteredCommands.length - 1, idx + 1);
        const sb = scrollRef.current;
        if (sb) {
          const viewPortHeight = sb.viewport.height;
          const visibleEnd = sb.scrollTop + viewPortHeight - 1;
          if (newIdx > visibleEnd) {
            sb.scrollTo(newIdx - viewPortHeight + 1);
          }
        }
        return newIdx;
      });
    }
  });

  return {
    showCommandMenu,
    commandQuery,
    commandIdx: selectedIdx,
    scrollRef,
    handleContentChange,
    resolveCommand,
    setSelectedCommandIdx: setSelectedIdx,
  };
}
