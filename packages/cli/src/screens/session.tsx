import { useParams } from "react-router";
import { useTheme } from "../hooks";

export function Session() {
  const { id } = useParams();
  const { colors } = useTheme();

  return (
    <box flexGrow={1} padding={2}>
      <text fg={colors.text.primary}>Session {id}</text>
    </box>
  );
}
