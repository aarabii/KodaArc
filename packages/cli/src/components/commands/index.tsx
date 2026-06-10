import type { RefObject } from "react";
import { TextAttributes, type ScrollBoxRenderable } from "@opentui/core";
import { getFilterCommands } from "./filterCommand";
import { COMMANDS } from "./cmd";
import { useTheme } from "../../providers/theme";

const MAX_VISIABLE_ITEMS = 5;

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
  const visiableHeight = Math.min(filtered.length, MAX_VISIABLE_ITEMS);

  if (filtered.length === 0) {
    return (
      <box paddingX={1}>
        <text attributes={TextAttributes.DIM}>No command found.</text>
      </box>
    );
  }

  return (
    <scrollbox ref={scrollRef} height={visiableHeight}>
      {filtered.map((cmd, i) => {
        const isSelected = i === selectedIdx;

        return (
          <box
            key={cmd.value}
            flexDirection="row"
            paddingX={1}
            height={1}
            overflow="hidden"
            backgroundColor={isSelected ? colors.selection : undefined}
            onMouseMove={() => onSelect(i)}
            onMouseDown={() => onExecute(i)}
          >
            <box width={COMMAND_COL_WIDTH} flexShrink={0}>
              <text selectable={false} fg={isSelected ? colors.primary : "white"}>
                /{cmd.name}
              </text>
            </box>
            <box flexGrow={1} flexShrink={1} overflow="hidden">
              <text selectable={false} fg={isSelected ? "white" : colors.thinking}>
                {cmd.desc}
              </text>
            </box>
          </box>
        );
      })}
    </scrollbox>
  );
}
