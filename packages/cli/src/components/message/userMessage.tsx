import { AgentState } from "@koda-arc/database/enums";
import { EmptyBorder, Icon } from "../common";
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
          flexDirection="row"
          gap={1}
          alignItems="center"
          paddingX={2}
          paddingY={1}
          backgroundColor={colors.brand.secondary}
          width="100%"
        >
          <Icon name="User" fg={colors.text.inverse || colors.bg.base} />
          <text>{message}</text>
        </box>
      </box>
    </box>
  );
}
