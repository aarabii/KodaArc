import { AgentState } from "@koda-arc/database/enums";
import { useTheme } from "../../hooks";
import type { ClientMessagePart } from "../../hooks/useChats";
import { TextAttributes } from "@opentui/core";

type Props = {
  parts: ClientMessagePart[];
  model: string;
  agentState: AgentState;
  duration?: string;
  streaming?: boolean;
  interrupted?: boolean;
};

export function BotMessage({
  parts,
  model,
  agentState,
  duration,
  streaming = false,
  interrupted = false,
}: Props) {
  const { colors } = useTheme();
  const text = parts
    .filter((p) => p.type === "text")
    .map((p) => p.text)
    .join("");

  return (
    <box width="100%" alignItems="center">
      <box paddingY={1} width="100%">
        <box paddingX={3} width="100%">
          <text>{text}</text>
        </box>
      </box>

      <box paddingX={3} paddingBottom={1} gap={1} width="100%">
        <box flexDirection="row" gap={2}>
          <text
            attributes={interrupted ? TextAttributes.DIM : 0}
            fg={
              interrupted
                ? undefined
                : agentState === AgentState.PLAN
                  ? colors.agent.plan
                  : colors.agent.idle
            }
          >
            ◉
          </text>

          <box flexDirection="row" gap={1}>
            <text attributes={interrupted ? TextAttributes.DIM : 0}>
              {agentState === AgentState.PLAN ? "Plan" : "Build"}
            </text>

            <text attributes={TextAttributes.DIM} fg={colors.text.muted}>
              ›
            </text>
            <text attributes={TextAttributes.DIM}>{model}</text>
            {(duration || interrupted) && (
              <>
                <text attributes={TextAttributes.DIM} fg={colors.text.muted}>
                  ›
                </text>
                <text attributes={TextAttributes.DIM}>
                  {interrupted ? "interrupted" : duration}
                </text>
              </>
            )}
          </box>
        </box>
      </box>
    </box>
  );
}
