import { TextAttributes } from "@opentui/core";
import { useTheme } from "../hooks";

export function StatusBar() {
  const { colors } = useTheme();

  return (
    <box flexDirection="row" gap={1}>
      <text fg={colors.primary}>Build</text>
      <text attributes={TextAttributes.DIM} fg={colors.thinking}>
        &#8250;
      </text>
      <text>opus-4-8</text>
    </box>
  );
}
