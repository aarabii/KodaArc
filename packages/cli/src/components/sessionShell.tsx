import { TextAttributes } from "@opentui/core";
import type { ReactNode } from "react";
import { InputBar } from "./inputBar";
import { useTheme } from "../hooks";
import { Spinner } from "./spinner";

type Props = {
  children?: ReactNode;
  onSubmit: (txt: string) => void;
  inputDisabled?: boolean;
  loading?: boolean;
};

export function SessionShell({
  children,
  onSubmit,
  inputDisabled = false,
  loading = false,
}: Props) {
  const { colors } = useTheme();

  return (
    <box
      flexDirection="column"
      flexGrow={1}
      width="100%"
      height="100%"
      paddingX={2}
      paddingY={1}
    >
      <scrollbox flexGrow={1} width="100%" stickyScroll stickyStart="bottom">
        <box gap={1}>{children}</box>
      </scrollbox>
      <box flexShrink={0}>
        <InputBar onSubmit={onSubmit} disabled={inputDisabled} />
      </box>
      <box
        flexShrink={0}
        flexDirection="row"
        justifyContent="space-between"
        width="100%"
        height={1}
        gap={2}
        paddingLeft={1}
      >
        <box flexDirection="row" alignItems="center" gap={2}>
          {loading ? <Spinner /> : null}
        </box>

        <box flexDirection="row" flexShrink={0} gap={1} marginLeft="auto">
          <text fg={colors.brand.primary}>tab</text>
          <text fg={colors.text.muted}>agents</text>
        </box>
      </box>
    </box>
  );
}
