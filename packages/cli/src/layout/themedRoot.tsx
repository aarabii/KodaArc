import type { ReactNode } from "react";
import { useTheme } from "../providers/theme";
import { Header } from "../components/header";
import { InputBar } from "../components/inputBar";

type Props = {
  children: ReactNode;
};

export function ThemedRoot({ children }: Props) {
  const { colors } = useTheme();

  return (
    <box
      backgroundColor={colors.background}
      width="100%"
      height="100%"
      flexGrow={1}
    >
      {children}
    </box>
  );
}

{
  /* <box
  alignItems="center"
  justifyContent="center"
  flexGrow={1}
  backgroundColor={colors.background}
  width="100%"
  height="100%"
  gap={2}
>
  <Header />
  <box width="100%" maxWidth={78} paddingX={2}>
    <InputBar onSubmit={() => {}} />
  </box>
</box>; */
}
