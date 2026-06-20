import { useCallback } from "react";
import { useNavigate } from "react-router";
import { TextAttributes } from "@opentui/core";

import { Header, InputBar } from "../components";
import { usePromptConfig } from "../hooks";

export function Home() {
  const nav = useNavigate();
  const { agentState, model } = usePromptConfig();

  const handleSubmit = useCallback(
    (text: string) => {
      nav("/sessions/new", { state: { message: text, agentState, model } });
    },
    [nav, agentState, model],
  );

  return (
    <box
      alignItems="center"
      justifyContent="center"
      flexGrow={1}
      gap={2}
      position="relative"
      width="100%"
      height="100%"
    >
      <Header />
      <box
        width="100%"
        maxWidth={78}
        paddingX={2}
        flexDirection="column"
        gap={1}
      >
        <InputBar onSubmit={handleSubmit} />
        <box flexDirection="row" gap={1} flexShrink={0} marginLeft="auto">
          <text>tab</text>
          <text attributes={TextAttributes.DIM}>agents</text>
        </box>
      </box>
    </box>
  );
}
