import { useTheme } from "../../hooks";

type Props = {
  message: string;
  model: string;
};

export function BotMessage({ message, model }: Props) {
  const { colors } = useTheme();

  return (
    <box width="100%" alignItems="center">
      <box paddingY={1} width="100%">
        <box paddingX={3} width="100%">
          <text>{message}</text>
        </box>
      </box>
      <box paddingX={3} paddingBottom={1} gap={1} width="100%">
        <box flexDirection="row" gap={2}>
          <text fg={colors.selection.text}>◉</text>
          <text>{model}</text>
        </box>
      </box>
    </box>
  );
}
