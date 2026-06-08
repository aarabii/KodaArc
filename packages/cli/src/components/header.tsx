import { RGBA } from "@opentui/core";

export function Header() {
  return (
    <box justifyContent="center" alignItems="center" padding={1}>
      <box
        flexDirection="row"
        justifyContent="center"
        alignItems="center"
        gap={1}
      >
        <ascii-font font="block" text="Koda" color={RGBA.fromHex("#3f5466")} />
        <ascii-font font="tiny" text="-" color="gray" />
        <ascii-font font="block" text="Arc" color={RGBA.fromHex("#d0cfcc")} />
      </box>
    </box>
  );
}
