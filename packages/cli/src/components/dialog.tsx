import { TextAttributes, RGBA } from "@opentui/core";
import { useKeyboard, useTerminalDimensions } from "@opentui/react";
import type { DialogConfig } from "../types";
import { useKeyboardLayer } from "../hooks/useKeyboardLayer";
import { useTheme } from "../hooks/useTheme";

type DialogProps = {
  currentDialog: DialogConfig | null;
  close: () => void;
};

export function Dialog({ currentDialog, close }: DialogProps) {
  const { isTopLayer } = useKeyboardLayer();
  const { width, height } = useTerminalDimensions();
  const { colors } = useTheme();

  useKeyboard((key) => {
    if (!currentDialog || !isTopLayer("dialog")) return;

    if (key.name === "escape") {
      close();
    }
  });

  if (!currentDialog) {
    return null;
  }

  const { title, children } = currentDialog;

  return (
    <box
      position="absolute"
      left={0}
      top={0}
      width={width}
      height={height}
      justifyContent="center"
      alignItems="center"
      backgroundColor={RGBA.fromInts(0, 0, 0, 150)}
      zIndex={100}
      onMouseDown={() => close()}
    >
      <box
        width={Math.min(60, width - 41)}
        height="auto"
        borderColor={colors.brand.primary}
        border={["top", "bottom", "left", "right"]}
        customBorderChars={{
          topLeft: "╭",
          topRight: "╮",
          bottomLeft: "╰",
          bottomRight: "╯",
          vertical: "│",
          horizontal: "─",
          topT: "",
          bottomT: "",
          leftT: "",
          rightT: "",
          cross: "",
        }}
        onMouseDown={(e) => e.stopPropagation()}
      >
        <box
          width="100%"
          backgroundColor={colors.bg.elevated}
          paddingX={4}
          paddingY={1}
          flexDirection="column"
          gap={1}
        >
          <box
            paddingBottom={1}
            flexDirection="row"
            alignItems="center"
            justifyContent="space-between"
          >
            <text attributes={TextAttributes.BOLD} fg={colors.brand.primary}>
              {title}
            </text>
            <text fg={colors.text.muted} onMouseDown={() => close()}>
              X
            </text>
          </box>
          <box flexGrow={1}>{children}</box>
        </box>
      </box>
    </box>
  );
}
