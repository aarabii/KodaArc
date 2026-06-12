import { useTerminalDimensions } from "@opentui/react";
import type { ToastOptions } from "../../types";
import { splitBorder } from "../common";
import { useTheme } from "../../hooks/useTheme";

type ToastProps = {
  currentToast: ToastOptions | null;
};

export function Toast({ currentToast }: ToastProps) {
  const { width } = useTerminalDimensions();
  const { colors: themeColors } = useTheme();

  if (!currentToast) {
    return null;
  }

  const colors = themeColors[currentToast.variant ?? "info"];

  return (
    <box
      position="absolute"
      justifyContent="center"
      alignItems="flex-start"
      top={2}
      right={2}
      width={Math.max(1, Math.min(60, width - 6))}
      paddingRight={2}
      paddingTop={1}
      paddingBottom={1}
      backgroundColor={colors.bg}
      borderColor={colors.border}
      border={["left", "right"]}
      customBorderChars={splitBorder}
    >
      <box flexDirection="column" gap={1} width="100%">
        <text fg={colors.accent} marginX={1} wrapMode="word" width="100%">
          {currentToast.message}
        </text>
      </box>
    </box>
  );
}
