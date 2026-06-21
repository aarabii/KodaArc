import type { RefObject } from "react";
import { TextAttributes, type ScrollBoxRenderable } from "@opentui/core";
import { getFilterCommands } from "../../utils";
import { COMMANDS } from "./commandItem";
import { useTheme } from "../../hooks";

const MAX_VISIBLE_ITEMS = 5;

const COMMAND_COL_WIDTH =
  Math.max(...COMMANDS.map((cmd) => cmd.name.length)) + 4;

type CommandMenuProps = {
  q: string;
  selectedIdx: number;
  scrollRef: RefObject<ScrollBoxRenderable | null>;
  onSelect: (idx: number) => void;
  onExecute: (idx: number) => void;
};

export function CommandMenu({
  q,
  selectedIdx,
  scrollRef,
  onSelect,
  onExecute,
}: CommandMenuProps) {
  const { colors } = useTheme();
  const filtered = getFilterCommands(q);
  const visibleHeight = Math.min(filtered.length, MAX_VISIBLE_ITEMS);

  if (filtered.length === 0) {
    return (
      <box paddingX={1}>
        <text fg={colors.text.muted}>No command found.</text>
      </box>
    );
  }

  return (
    <scrollbox ref={scrollRef} height={visibleHeight}>
      {filtered.map((cmd, i) => {
        const isSelected = i === selectedIdx;

        return (
          <box
            key={cmd.value}
            flexDirection="row"
            paddingX={1}
            height={1}
            overflow="hidden"
            backgroundColor={isSelected ? colors.selection.bg : undefined}
            onMouseMove={() => onSelect(i)}
            onMouseDown={() => onExecute(i)}
            alignItems="center"
          >
            <box width={COMMAND_COL_WIDTH} flexShrink={0}>
              <text selectable={false} fg={isSelected ? colors.selection.text : colors.text.primary}>
                /{cmd.name}
              </text>
            </box>
            <box flexGrow={1} flexShrink={1} overflow="hidden">
              <text selectable={false} fg={isSelected ? colors.selection.text : colors.text.secondary}>
                {cmd.desc}
              </text>
            </box>
          </box>
        );
      })}
    </scrollbox>
  );
}
