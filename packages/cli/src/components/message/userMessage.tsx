import { AgentState } from "@koda-arc/database/enums";
import { EmptyBorder } from "../common";
import { useTheme } from "../../hooks";

type Props = {
  message: string;
  agentState: AgentState;
};

export function UserMessage({ message, agentState }: Props) {
  const { colors } = useTheme();

  return (
    <box width="100%" alignItems="center">
      <box
        border={["left"]}
        borderColor={
          agentState === AgentState.PLAN
            ? colors.agent.plan
            : colors.brand.primary
        }
        width="100%"
        customBorderChars={{
          ...EmptyBorder,
          vertical: "┃",
          bottomLeft: "╹",
        }}
      >
        <box
          justifyContent="center"
          paddingX={2}
          paddingY={1}
          backgroundColor={colors.brand.secondary}
          width="100%"
        >
          <text>{message}</text>
        </box>
      </box>
    </box>
  );
}
