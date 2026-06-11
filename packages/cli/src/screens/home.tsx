import { useCallback } from "react";
import { useNavigate } from "react-router";
import { Header } from "../components/header";
import { InputBar } from "../components/inputBar";

export function Home() {
  const nav = useNavigate();

  const handleSubmit = useCallback(
    (txt: string) => {
      nav("/sessions/new", { state: { message: txt } });
    },
    [nav],
  );

  return (
    <box
      alignItems="center"
      justifyContent="center"
      flexGrow={1}
      width="100%"
      height="100%"
      gap={2}
    >
      <Header />
      <box width="100%" maxWidth={78} paddingX={2}>
        <InputBar onSubmit={() => {}} />
      </box>
    </box>
  );
}
