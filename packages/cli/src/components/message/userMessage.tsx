import { useTheme } from "../../hooks";

type Props = {
  message: string;
};

export function UserMessage({ message }: Props) {
  const { colors } = useTheme();

  return (
    <box width="100%" alignItems="center">
      <box border={["left"]} width="100%" borderColor={colors.brand.primary}>
        <box
          justifyContent="center"
          paddingX={2}
          paddingY={1}
          backgroundColor={colors.bg.input}
        >
          <text fg={colors.text.primary}>{message}</text>
        </box>
      </box>
    </box>
  );
}
