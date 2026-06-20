import { TextAttributes } from "@opentui/core";
import { useTheme } from "../../hooks";

type Props = {
  message: string;
};

export function ErrorMessage({ message }: Props) {
  const { colors } = useTheme();

  return (
    <box width="100%" alignItems="center">
      <box border={["left"]} width="100%" borderColor={colors.errorMessage.border}>
        <box
          justifyContent="center"
          paddingX={2}
          paddingY={1}
          backgroundColor={colors.errorMessage.bg}
        >
          <text fg={colors.errorMessage.text}>{message}</text>
        </box>
      </box>
    </box>
  );
}
