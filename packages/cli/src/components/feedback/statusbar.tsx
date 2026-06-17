import { TextAttributes } from "@opentui/core";
import { usePromptConfig, useTheme } from "../../hooks";
import { Mode } from "@koda-arc/database/enums";

export function StatusBar() {
  const { mode, model } = usePromptConfig();
  const { colors } = useTheme();

  return (
    <box flexDirection="row" gap={1}>
      <text
        fg={mode === Mode.PLAN ? colors.agent.plan : colors.agent.executing}
      >
        {mode === Mode.PLAN ? "Plan" : "Build"}
      </text>
      <text attributes={TextAttributes.DIM} fg={colors.agent.thinking}>
        &#8250;
      </text>
      <text fg={colors.text.secondary}>{model}</text>
    </box>
  );
}
