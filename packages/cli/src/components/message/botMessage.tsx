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
          <text fg={colors.text.primary}>{message}</text>
        </box>
      </box>
      <box paddingX={3} paddingBottom={1} gap={1} width="100%">
        <box flexDirection="row" gap={2}>
          <text fg={colors.brand.accent}>◉</text>
          <text fg={colors.text.muted}>{model}</text>
        </box>
      </box>
    </box>
  );
}
