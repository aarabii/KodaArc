import { TextAttributes } from "@opentui/core";
import { usePromptConfig, useTheme } from "../../hooks";
import { AgentState } from "@koda-arc/database/enums";

export function StatusBar() {
  const { agentState, model } = usePromptConfig();
  const { colors } = useTheme();

  return (
    <box flexDirection="row" gap={1}>
      <text
        fg={agentState === AgentState.PLAN ? colors.agent.plan : colors.agent.build}
      >
        {agentState === AgentState.PLAN ? "Plan" : "Build"}
      </text>
      <text attributes={TextAttributes.DIM} fg={colors.agent.thinking}>
        &#8250;
      </text>
      <text fg={colors.text.secondary}>{model}</text>
    </box>
  );
}
