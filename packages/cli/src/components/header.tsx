import { RGBA } from "@opentui/core";
import { useTheme } from "../hooks";

export function Header() {
  const { colors } = useTheme();

  return (
    <box justifyContent="center" alignItems="center" padding={1}>
      <box
        flexDirection="row"
        justifyContent="center"
        alignItems="center"
        gap={1}
      >
        <ascii-font font="block" text="Koda" color={RGBA.fromHex(colors.agent.thinking)} />
        <ascii-font font="tiny" text="-" color={RGBA.fromHex(colors.agent.thinking)} />
        <ascii-font font="block" text="Arc" color={RGBA.fromHex(colors.brand.primary)} />
      </box>
    </box>
  );
}
